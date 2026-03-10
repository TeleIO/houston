<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import GUI from 'lil-gui';
	import { formatUT } from '$lib/utils/time-formatters';
	import { createSecondaryProvider } from '$lib/stores/telemachus';
	import { OrbitalPositionData } from '$lib/services/orbital-position-data';
	import { PositionDataFormatter, type FormattedData } from '$lib/services/position-data-formatter';

	let container: HTMLDivElement;
	let renderer: THREE.WebGLRenderer;
	let camera: THREE.PerspectiveCamera;
	let controls: OrbitControls;
	let cameraSet = false;

	const distanceScaleFactor = 1;
	const referenceBodyScaleFactor = 1;
	const dashedLineLength = 100000;
	const maxLengthInThreeJS = 2000;
	const vehicleLength = 25000;
	const defaultZoomFactor = 40;

	const colors = [
		'#b4f489', '#f48e77', '#a4d1f2', '#99ffc6', '#fcc2e7', '#99ffc6',
		'#9d67e5', '#f49ab2', '#ffcc99', '#b7fca4'
	];
	const orbitPathColors = [
		'orange', '#b4c6f7', '#987cf9', '#6baedb', '#d0f788', '#f774dd',
		'#9dc3f9', '#edef70', '#f97292', '#adffb6'
	];
	const targetColor = '#51ff07';

	const vertexShader = `
		uniform vec3 viewVector;
		uniform float c;
		uniform float p;
		varying float intensity;
		void main() {
			vec3 vNormal = normalize(normalMatrix * normal);
			vec3 vNormel = normalize(normalMatrix * viewVector);
			intensity = pow(c - dot(vNormal, vNormel), p);
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

	const fragmentShader = `
		uniform vec3 glowColor;
		varying float intensity;
		void main() {
			vec3 glow = glowColor * intensity;
			gl_FragColor = vec4(glow, 1.0);
		}
	`;

	let guiParams = { lastUpdate: '00:00:00' };
	let currentVesselGeometry: THREE.Object3D | null = null;

	function buildVector(vector: number[]): THREE.Vector3 {
		return new THREE.Vector3(
			vector[0] * distanceScaleFactor,
			vector[1] * distanceScaleFactor,
			vector[2] * distanceScaleFactor
		);
	}

	function setPosition(mesh: THREE.Object3D, vector: number[]): void {
		const v = buildVector(vector);
		mesh.position.set(v.x, v.y, v.z);
	}

	function buildCurveGeometryFromPoints(points: THREE.Vector3[]): THREE.BufferGeometry {
		const curve = new THREE.CatmullRomCurve3(points);
		const curvePoints = curve.getPoints(360);
		const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
		geometry.computeBoundingBox();
		return geometry;
	}

	function buildReferenceBodyGeometry(group: THREE.Group, formattedData: FormattedData): void {
		for (let i = formattedData.referenceBodies.length - 1; i >= 0; i--) {
			const info = formattedData.referenceBodies[i];
			let color = info.color || colors[i % colors.length];
			let radius = info.radius * referenceBodyScaleFactor;

			if (info.name === 'Sun') color = 'yellow';

			let material: THREE.MeshBasicMaterial;
			if (info.type === 'currentPosition') {
				material = new THREE.MeshBasicMaterial({ color, wireframe: false });
			} else if (info.type === 'targetBodyCurrentPosition') {
				material = new THREE.MeshBasicMaterial({ color: targetColor, wireframe: false });
				radius *= 1.2;
			} else {
				const patchColor = info.linkedPatchID != null
					? orbitPathColors[info.linkedPatchID % orbitPathColors.length]
					: color;
				material = new THREE.MeshBasicMaterial({ color: patchColor, wireframe: true });
			}

			const sphereGeometry = new THREE.SphereGeometry(radius, 20, 20);
			const sphere = new THREE.Mesh(sphereGeometry, material);
			setPosition(sphere, info.truePosition);
			group.add(sphere);

			if (info.atmosphericRadius > 0) {
				const customMaterial = new THREE.ShaderMaterial({
					uniforms: {
						c: { value: 1 },
						p: { value: 1.5 },
						glowColor: { value: new THREE.Color('white') },
						viewVector: { value: camera?.position.clone() ?? sphere.position.clone() }
					},
					vertexShader,
					fragmentShader,
					side: THREE.FrontSide,
					blending: THREE.AdditiveBlending,
					transparent: true
				});

				const atmoGeometry = new THREE.SphereGeometry(
					(info.radius + info.atmosphericRadius) * referenceBodyScaleFactor, 20, 20
				);
				const atmo = new THREE.Mesh(atmoGeometry, customMaterial);
				setPosition(atmo, info.truePosition);
				group.add(atmo);
			}
		}
	}

	function buildVesselGeometry(group: THREE.Group, formattedData: FormattedData): void {
		for (const info of formattedData.vessels) {
			const color = info.type === 'currentVessel' ? 'white' : targetColor;
			const material = new THREE.MeshBasicMaterial({ color, wireframe: false });
			const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 'grey', wireframe: true });

			const geometry = new THREE.BoxGeometry(vehicleLength, vehicleLength, vehicleLength);
			const solidMesh = new THREE.Mesh(geometry, material);
			const wireMesh = new THREE.Mesh(geometry.clone(), wireframeMaterial);
			const cube = new THREE.Group();
			cube.add(solidMesh);
			cube.add(wireMesh);

			if (info.type === 'currentVessel') {
				currentVesselGeometry = cube;
			}

			setPosition(cube, info.truePosition);
			group.add(cube);
		}
	}

	function buildOrbitPathGeometry(group: THREE.Group, formattedData: FormattedData): void {
		for (let i = formattedData.orbitPatches.length - 1; i >= 0; i--) {
			const points = formattedData.orbitPatches[i].truePositions.map(buildVector);
			const color = formattedData.orbitPatches[i].parentType === 'targetVessel'
				? targetColor
				: orbitPathColors[i % orbitPathColors.length];

			const geometry = buildCurveGeometryFromPoints(points);
			const material = new THREE.LineBasicMaterial({ color, linewidth: 3 });
			group.add(new THREE.Line(geometry, material));
		}
	}

	function buildManeuverNodeGeometry(group: THREE.Group, formattedData: FormattedData): void {
		for (const maneuverNode of formattedData.maneuverNodes) {
			for (let j = maneuverNode.orbitPatches.length - 1; j >= 0; j--) {
				const orbitPatch = maneuverNode.orbitPatches[j];
				const points = orbitPatch.truePositions.map(buildVector);
				const geometry = buildCurveGeometryFromPoints(points);
				geometry.computeBoundingBox();

				const size = new THREE.Vector3();
				geometry.boundingBox!.getSize(size);
				const dashSize = size.x / Math.ceil(size.x / dashedLineLength) || dashedLineLength;

				const material = new THREE.LineDashedMaterial({
					color: orbitPathColors[j % orbitPathColors.length],
					dashSize,
					gapSize: dashSize,
					linewidth: 3
				});

				const line = new THREE.Line(geometry, material);
				line.computeLineDistances();
				group.add(line);
			}
		}
	}

	function positionCamera(scene: THREE.Scene, group: THREE.Group): void {
		const boundingBox = new THREE.Box3().setFromObject(group);
		const max = boundingBox.max;
		const scaleFactor = Math.max(
			maxLengthInThreeJS / (max.x || 1),
			maxLengthInThreeJS / (max.y || 1),
			maxLengthInThreeJS / (max.z || 1)
		);

		group.scale.set(scaleFactor, scaleFactor, scaleFactor);

		const vector = currentVesselGeometry
			? currentVesselGeometry.position.clone().multiplyScalar(scaleFactor)
			: new THREE.Vector3();

		const axisHelper = new THREE.AxesHelper(vehicleLength * 3 * scaleFactor);
		axisHelper.position.copy(vector);
		scene.add(axisHelper);

		const cameraOffset = vehicleLength * defaultZoomFactor * scaleFactor;

		if (!cameraSet) {
			controls.target.copy(vector);
			camera.position.set(
				vector.x + cameraOffset,
				vector.y + cameraOffset,
				vector.z + cameraOffset
			);
			camera.lookAt(vector);
			cameraSet = true;
		} else {
			controls.target0.copy(vector);
			controls.position0.set(
				vector.x + cameraOffset,
				vector.y + cameraOffset,
				vector.z + cameraOffset
			);
		}

		const updatedBB = new THREE.Box3().setFromObject(group);
		controls.maxDistance =
			Math.max(
				Math.abs(updatedBB.min.x) + Math.abs(updatedBB.max.x),
				Math.abs(updatedBB.min.y) + Math.abs(updatedBB.max.y),
				Math.abs(updatedBB.min.z) + Math.abs(updatedBB.max.z)
			) * 2;
		controls.minDistance = vehicleLength * scaleFactor;
	}

	function render(formattedData: FormattedData): void {
		requestAnimationFrame(() => {
			const scene = new THREE.Scene();
			const group = new THREE.Group();
			scene.add(group);

			buildReferenceBodyGeometry(group, formattedData);
			buildVesselGeometry(group, formattedData);
			buildOrbitPathGeometry(group, formattedData);
			buildManeuverNodeGeometry(group, formattedData);
			positionCamera(scene, group);

			renderer.render(scene, camera);
			guiParams.lastUpdate = formatUT(formattedData.currentUniversalTime);
		});
	}

	function toggleFullscreen(): void {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			container.requestFullscreen().then(() => renderer.domElement.focus());
		}
	}

	function resizeRenderer(): void {
		if (!camera || !renderer || !container) return;
		renderer.setSize(1, 1);
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.clientHeight);
	}

	onMount(() => {
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setClearColor('#3A1604');
		container.appendChild(renderer.domElement);

		camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, Number.MAX_SAFE_INTEGER);
		controls = new OrbitControls(camera, renderer.domElement);
		controls.addEventListener('change', () => {
			if (renderer && camera) {
				// Re-render on orbit change when no animation loop
			}
		});

		const gui = new GUI({ container, autoPlace: false });
		gui.add({ reset: () => controls.reset() }, 'reset').name('Reset');
		gui.add({ fullscreen: toggleFullscreen }, 'fullscreen').name('Toggle Fullscreen');
		gui.add(guiParams, 'lastUpdate').name('Updated').listen();

		const resizeObserver = new ResizeObserver(() => resizeRenderer());
		resizeObserver.observe(container);

		const formatter = new PositionDataFormatter({ onFormat: render });
		const { provider, cleanup } = createSecondaryProvider(2000);
		const posData = new OrbitalPositionData(provider, {
			onRecalculate: (data) => formatter.format(data)
		});
		void posData;

		return () => {
			cleanup();
			resizeObserver.disconnect();
			gui.destroy();
			renderer.dispose();
		};
	});
</script>

<div bind:this={container} class="orbital-map-viewport"></div>

<style>
	.orbital-map-viewport {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.orbital-map-viewport :global(canvas) {
		display: block;
	}
	.orbital-map-viewport :global(.lil-gui) {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>

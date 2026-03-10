<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import GUI from 'lil-gui';
	import { formatUT } from '$lib/utils/time-formatters';
	import { createSecondaryProvider } from '$lib/stores/telemachus';
	import { DockingPositionData } from '$lib/services/docking-position-data';

	/* eslint-disable @typescript-eslint/no-explicit-any */

	let container: HTMLDivElement;
	let renderer: THREE.WebGLRenderer;
	let camera: THREE.PerspectiveCamera;
	let controls: OrbitControls;
	let cameraSet = false;

	const distanceScaleFactor = 1;
	const maxLengthInThreeJS = 2000;
	const vehicleLength = 1;
	const defaultZoomFactor = 10;
	const targetColor = '#51ff07';

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

	function createMultiMaterialCube(color: string, length: number): THREE.Group {
		const geometry = new THREE.BoxGeometry(length, length, length);
		const solid = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color, wireframe: false }));
		const wire = new THREE.Mesh(geometry.clone(), new THREE.MeshBasicMaterial({ color: 'grey', wireframe: true }));
		const group = new THREE.Group();
		group.add(solid);
		group.add(wire);
		return group;
	}

	function render(positionData: Record<string, any>): void {
		requestAnimationFrame(() => {
			const scene = new THREE.Scene();
			const group = new THREE.Group();
			scene.add(group);

			// Vessel at origin
			const vesselCube = createMultiMaterialCube('white', vehicleLength);
			currentVesselGeometry = vesselCube;
			setPosition(vesselCube, [0, 0, 0]);
			group.add(vesselCube);

			// Target
			if (positionData.targetCurrentPosition?.truePosition) {
				const targetCube = createMultiMaterialCube(targetColor, vehicleLength);
				const pos = [
					positionData.targetCurrentPosition.truePosition[0] - positionData.vesselCurrentPosition.truePosition[0],
					positionData.targetCurrentPosition.truePosition[2] - positionData.vesselCurrentPosition.truePosition[2],
					positionData.targetCurrentPosition.truePosition[1] - positionData.vesselCurrentPosition.truePosition[1]
				];
				setPosition(targetCube, pos);
				group.add(targetCube);
			}

			// Position camera
			const boundingBox = new THREE.Box3().setFromObject(group);
			const max = boundingBox.max;
			const scaleFactor = Math.max(
				maxLengthInThreeJS / (max.x || 1),
				maxLengthInThreeJS / (max.y || 1),
				maxLengthInThreeJS / (max.z || 1)
			);

			group.scale.set(scaleFactor, scaleFactor, scaleFactor);

			const vector = currentVesselGeometry.position.clone().multiplyScalar(scaleFactor);
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

			renderer.render(scene, camera);
			guiParams.lastUpdate = formatUT(positionData.currentUniversalTime);
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

		const gui = new GUI({ container, autoPlace: false });
		gui.add({ reset: () => controls.reset() }, 'reset').name('Reset');
		gui.add({ fullscreen: toggleFullscreen }, 'fullscreen').name('Toggle Fullscreen');
		gui.add(guiParams, 'lastUpdate').name('Updated').listen();

		const resizeObserver = new ResizeObserver(() => resizeRenderer());
		resizeObserver.observe(container);

		const { provider, cleanup } = createSecondaryProvider(2000);
		const posData = new DockingPositionData(provider, { onRecalculate: render });
		void posData;

		return () => {
			cleanup();
			resizeObserver.disconnect();
			gui.destroy();
			renderer.dispose();
		};
	});
</script>

<div bind:this={container} class="docking-map-viewport"></div>

<style>
	.docking-map-viewport {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.docking-map-viewport :global(canvas) {
		display: block;
	}
	.docking-map-viewport :global(.lil-gui) {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>

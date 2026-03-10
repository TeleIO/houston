<script lang="ts">
	/*
	  The rendering logic and textures for the navball are from the KeRD project:
	  https://github.com/Lokaltog/KeRD/blob/develop/app/components/modules/navigation/index.js
	  Please review the licenses/ directory for more information
	*/
	import { onMount, onDestroy } from 'svelte';
	import { telemetryData, getActiveProvider } from '$lib/stores/telemachus';
	import { toRadians } from '$lib/utils/math-polyfill';

	let containerEl: HTMLDivElement;
	let headingEl: HTMLDivElement;
	let cleanup: (() => void) | null = null;

	const DISPLAY_RADIUS = 50;

	let pitch = 0;
	let roll = 0;
	let heading = 0;

	function wrapDegDelta(delta: number): number {
		if (delta > 180) delta -= 360;
		else if (delta < -180) delta += 360;
		return delta;
	}

	onMount(async () => {
		const provider = getActiveProvider();
		provider?.subscribeToData(['n.pitch', 'n.roll', 'n.heading']);

		const THREE = await import('three');
		const TWEEN = await import('@tweenjs/tween.js');

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize(1, 1);
		containerEl.innerHTML = '';
		containerEl.appendChild(renderer.domElement);

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 1000);
		camera.position.z = 190;

		scene.add(new THREE.AmbientLight(0xaaaaaa));

		const light1 = new THREE.DirectionalLight(0xffffff, 1);
		light1.position.set(1500, 1500, 500);
		const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
		light2.position.set(-1500, -1500, 500);
		scene.add(light1);
		scene.add(light2);

		const navballGeometry = new THREE.SphereGeometry(DISPLAY_RADIUS, 48, 48);
		const textureLoader = new THREE.TextureLoader();
		const navballTexture = textureLoader.load('/images/navball.png');
		navballTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

		const navballMaterial = new THREE.MeshPhongMaterial({
			map: navballTexture,
			bumpMap: textureLoader.load('/images/navball-normal.png'),
			bumpScale: 0.25,
			shininess: 80
		});

		const navballMesh = new THREE.Mesh(navballGeometry, navballMaterial);
		scene.add(navballMesh);

		function resize() {
			const width = containerEl.clientWidth;
			const height = containerEl.clientHeight;
			if (width > 0 && height > 0) {
				renderer.setSize(width, height);
			}
		}

		resize();
		window.addEventListener('resize', resize);

		let animationId: number;
		const rate = provider && 'rate' in provider ? (provider as any).rate : 500;

		function animate() {
			animationId = requestAnimationFrame(animate);
			TWEEN.update();
			renderer.render(scene, camera);
		}
		animate();

		const unsub = telemetryData.subscribe(($data) => {
			const newPitch = ($data['n.pitch'] as number) ?? 0;
			const newRoll = ($data['n.roll'] as number) ?? 0;
			const newHeading = ($data['n.heading'] as number) ?? 0;

			const tweenProps = { pitch, roll, heading };
			const tween = new TWEEN.Tween(tweenProps)
				.to(
					{
						pitch: pitch + wrapDegDelta(newPitch - pitch),
						roll: roll + wrapDegDelta(newRoll - roll),
						heading: heading + wrapDegDelta(newHeading - heading)
					},
					rate
				)
				.onUpdate(() => {
					navballMesh.rotation.order = 'ZXY';
					navballMesh.rotation.z = toRadians(-tweenProps.roll);
					navballMesh.rotation.x = toRadians(tweenProps.pitch);
					navballMesh.rotation.y = toRadians(270 - tweenProps.heading);
				})
				.start();

			pitch = newPitch;
			roll = newRoll;
			heading = newHeading;

			if (headingEl) {
				headingEl.innerHTML = heading.toFixed(1) + '&deg;';
			}
		});

		cleanup = () => {
			unsub();
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
			renderer.dispose();
		};
	});

	onDestroy(() => {
		cleanup?.();
	});
</script>

<div class="navigation-wrapper">
	<div id="navball" bind:this={containerEl}></div>
	<div id="navball-heading" bind:this={headingEl}></div>
</div>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { telemachusClient } from '$lib/stores/telemachus';

	interface CameraData {
		name: string;
		url: string;
	}

	interface Props {
		rate?: number;
	}

	let { rate = 1000 }: Props = $props();

	let cameras = $state<CameraData[]>([]);
	let selectedCameraName = $state('');
	let selectedCameraURL = $state('');
	let showList = $state(false);

	let cameraListInterval: ReturnType<typeof setInterval>;
	let imageRefreshInterval: ReturnType<typeof setInterval>;

	function hasSelectedCamera(): boolean {
		return selectedCameraURL !== '';
	}

	function selectCamera(name: string, url: string) {
		selectedCameraName = name;
		selectedCameraURL = url;
	}

	function selectCameraAndHideList(name: string, url: string) {
		selectCamera(name, url);
		showList = false;
	}

	function toggleCameraList() {
		showList = !showList;
	}

	async function updateCameraList() {
		const data = (await telemachusClient.getCameraList()) as CameraData[];
		if (!Array.isArray(data)) return;

		const sorted = [...data].sort((a, b) => {
			if (a.name === 'TelemachusFlightCamera') return -1;
			if (b.name === 'TelemachusFlightCamera') return 1;
			return a.name.localeCompare(b.name);
		});

		if (!hasSelectedCamera() && sorted.length > 0) {
			selectCamera(sorted[0].name, sorted[0].url);
		}

		cameras = sorted;
	}

	// Cache-busting image URL
	let imageUrl = $derived.by(() => {
		if (!selectedCameraURL) return '';
		return selectedCameraURL;
	});

	let imageSrc = $state('');

	function refreshImage() {
		if (!hasSelectedCamera()) return;
		imageSrc = selectedCameraURL + '?' + (Date.now() + Math.floor(Math.random() * 100 + 1));
	}

	onMount(() => {
		cameraListInterval = setInterval(updateCameraList, rate);
		imageRefreshInterval = setInterval(refreshImage, rate);
		updateCameraList();
	});

	onDestroy(() => {
		clearInterval(cameraListInterval);
		clearInterval(imageRefreshInterval);
	});
</script>

<div id="camera" class="camera gauge">
	<div class="readout-display">
		<div id="camera-selector-container" class="camera-selector" class:hidden={!showList}>
			<h2>Cameras</h2>
			<ul id="camera-list" class="camera-list">
				{#each cameras as camera}
					<li>
						<button
							class:selected={selectedCameraURL === camera.url}
							data-image-name={camera.name}
							data-image-url={camera.url}
							onclick={() => selectCameraAndHideList(camera.name, camera.url)}
						>
							{camera.name}
						</button>
					</li>
				{/each}
			</ul>
		</div>
		<div class="camera-display">
			<h2 id="camera-name">{selectedCameraName}</h2>
			<div class="camera-image-wrapper scanlines">
				{#if imageSrc}
					<img id="camera-image" src={imageSrc} alt={selectedCameraName} />
				{:else}
					<img id="camera-image" alt="" />
				{/if}
			</div>
		</div>
	</div>
	<div class="camera-list-button-wrapper">
		<button id="show-camera-list" onclick={toggleCameraList}>Choose Camera</button>
	</div>
</div>

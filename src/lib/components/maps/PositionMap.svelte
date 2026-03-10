<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { telemetryData, getActiveProvider } from '$lib/stores/telemachus';

	interface Props {
		mapId?: string;
		lockOnVessel?: boolean;
	}

	let { mapId = 'position-map', lockOnVessel = true }: Props = $props();

	let mapContainer: HTMLDivElement;
	let noMapEl: HTMLDivElement;
	let map: L.Map | null = null;
	let marker: L.CircleMarker | null = null;
	let previousBody = 'KERBIN';
	let cleanup: (() => void) | null = null;

	function convertCoords(lat: number, lng: number): [number, number] {
		return [lat, lng > 180 ? lng - 360 : lng];
	}

	function isMapAvailable(body: string): boolean {
		return body.toUpperCase() !== 'SUN';
	}

	onMount(async () => {
		const provider = getActiveProvider();
		provider?.subscribeToData(['v.lat', 'v.long', 'v.body']);

		const L = await import('leaflet');

		// Import KSP tile layers if available, otherwise use basic map
		let kspAvailable = false;
		try {
			// leaflet.ksp.js must be loaded as a script tag — it extends L globally
			if ((L as any).KSP) {
				kspAvailable = true;
			}
		} catch {
			// KSP plugin not available
		}

		if (kspAvailable) {
			const LKSP = (L as any).KSP;
			map = new LKSP.Map(mapId, {
				layers: [LKSP.CelestialBody[previousBody.toUpperCase()]],
				zoom: 'fit',
				bodyControl: false,
				layerControl: true,
				scaleControl: true
			});
			map!.fitWorld();
		} else {
			map = L.map(mapId, { center: [0, 0], zoom: 2 });
		}

		// Add graticule
		const { graticule } = await import('$lib/vendor/leaflet-graticule');
		graticule().addTo(map!);

		marker = L.circleMarker([0, 0], {
			color: '#FD7E23',
			opacity: 1.0,
			fillOpacity: 1.0,
			radius: 5
		});
		marker.addTo(map!);

		const unsub = telemetryData.subscribe(($data) => {
			const lat = ($data['v.lat'] as number) ?? 0;
			const lng = ($data['v.long'] as number) ?? 0;
			const body = ($data['v.body'] as string) ?? 'Kerbin';

			if (isMapAvailable(body)) {
				mapContainer.style.display = '';
				noMapEl.classList.add('hidden');

				// Update body if changed
				const bodyUpper = body.toUpperCase();
				if (previousBody !== bodyUpper && (L as any).KSP) {
					const newBody = (L as any).KSP.CelestialBody[bodyUpper];
					if (newBody) newBody.addTo(map!);
					previousBody = bodyUpper;
				}

				const coords = convertCoords(lat, lng);
				marker?.setLatLng(coords);
				if (lockOnVessel) {
					map?.panTo(coords);
				}
			} else {
				mapContainer.style.display = 'none';
				noMapEl.classList.remove('hidden');
			}
		});

		cleanup = () => {
			unsub();
			map?.remove();
		};
	});

	onDestroy(() => {
		cleanup?.();
	});
</script>

<div id="{mapId}-container" class="map-container readout-display">
	<div id={mapId} class="map" bind:this={mapContainer}></div>
	<div id="{mapId}-no-map" class="no-map-indicator hidden" bind:this={noMapEl}>NO MAP</div>
</div>

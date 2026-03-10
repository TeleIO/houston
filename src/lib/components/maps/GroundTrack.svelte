<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createSecondaryProvider, telemetryData } from '$lib/stores/telemachus';
	import { GroundTrackPositionDataFormatter, type FormattedGroundTrackData, type OrbitPath } from './ground-track-formatter';
	import { durationString } from '$lib/utils/time-formatters';
	import type { Unsubscriber } from 'svelte/store';

	interface Props {
		showAltitudeEstimate?: boolean;
	}

	let { showAltitudeEstimate = true }: Props = $props();

	const vesselColor = '#F5A623';
	const vesselSuborbitalColor = 'red';
	const maneuverNodeColor = '#b4f489';
	const targetColor = '#987cf9';

	let mapElement: HTMLDivElement;
	let noMapElement: HTMLDivElement;
	let altitudeChartElement = $state<HTMLDivElement | undefined>();

	let L: typeof import('leaflet');
	let map: any;
	let altitudeEstimateChart: any = null;

	let markers: {
		vesselCoordinates: any;
		vesselOrbitalPaths: any[];
		vesselSuborbitalPaths: any[];
		targetCoordinates: any;
		targetOrbitalPaths: any[];
		targetSuborbitalPaths: any[];
	};

	let cleanup: (() => void) | null = null;
	let unsubscribe: Unsubscriber;
	let formatter: GroundTrackPositionDataFormatter;

	function convertCoordinatesToMap(lat: number, lon: number): [number, number] {
		return [lat, lon > 180 ? lon - 360 : lon];
	}

	function setCoordinatesForMapObject(obj: any, lat: number, lon: number) {
		const [clat, clon] = convertCoordinatesToMap(lat, lon);
		obj.setLatLng([clat, clon]);
	}

	function renderOrbitPaths(
		markerArray: any[],
		orbitPaths: OrbitPath[],
		lineOptions: Record<string, any>
	) {
		// Clear existing paths
		for (const marker of markerArray) {
			marker.setLatLngs([]);
		}

		for (let i = 0; i < orbitPaths.length; i++) {
			const orbitPath = orbitPaths[i];

			if (!markerArray[i]) {
				markerArray[i] = L.polyline([], lineOptions);
				markerArray[i].addTo(map);
			}

			const style: Record<string, string> = {
				dashArray: orbitPath.pathType === 'maneuverNode' ? '5,10' : ''
			};
			if (orbitPath.pathType === 'maneuverNode') {
				style.color = maneuverNodeColor;
			}

			markerArray[i].setLatLngs(orbitPath.points);
			markerArray[i].setStyle(style);
		}
	}

	function render(formattedData: FormattedGroundTrackData) {
		if (!map || !markers) return;

		// Vessel position
		if (formattedData.vesselCurrentCoordinates) {
			setCoordinatesForMapObject(
				markers.vesselCoordinates,
				formattedData.vesselCurrentCoordinates[0],
				formattedData.vesselCurrentCoordinates[1]
			);
		}

		// Target position
		if (formattedData.targetCurrentCoordinates) {
			setCoordinatesForMapObject(
				markers.targetCoordinates,
				formattedData.targetCurrentCoordinates[0],
				formattedData.targetCurrentCoordinates[1]
			);
		}

		// Vessel orbit paths
		renderOrbitPaths(markers.vesselOrbitalPaths, formattedData.vesselOrbitalPaths, {
			color: vesselColor
		});
		renderOrbitPaths(markers.vesselSuborbitalPaths, formattedData.vesselSuborbitalPaths, {
			color: vesselSuborbitalColor
		});

		// Target orbit paths
		renderOrbitPaths(markers.targetOrbitalPaths, formattedData.targetOrbitalPaths, {
			color: targetColor
		});
		renderOrbitPaths(markers.targetSuborbitalPaths, formattedData.targetSuborbitalPaths, {
			color: vesselSuborbitalColor
		});

		// Altitude chart
		if (altitudeEstimateChart) {
			updateAltitudeEstimateChart(formattedData);
		}
	}

	function updateAltitudeEstimateChart(formattedData: FormattedGroundTrackData) {
		const chartData: {
			labels: string[];
			series: { name: string; data: (number | null)[] }[];
		} = {
			labels: [],
			series: [
				{ name: 'vessel', data: [] },
				{ name: 'atmosphere', data: [] },
				{ name: 'vesselManeuver', data: [] }
			]
		};

		if (formattedData.targetCurrentCoordinates) {
			chartData.series.push({ name: 'target', data: [] });
		}

		const maxLabelSections = 10;
		const rawChartData: Record<number, Record<string, number>> = {};

		buildAltitudePointsForChart(
			formattedData.vesselOrbitalPaths.filter((x) => x.pathType === 'orbitPath'),
			formattedData.vesselSuborbitalPaths.filter((x) => x.pathType === 'orbitPath'),
			'vessel',
			rawChartData
		);

		buildAltitudePointsForChart(
			formattedData.vesselOrbitalPaths.filter((x) => x.pathType === 'maneuverNode'),
			formattedData.vesselSuborbitalPaths.filter((x) => x.pathType === 'maneuverNode'),
			'vesselManeuver',
			rawChartData
		);

		buildAltitudePointsForChart(
			formattedData.targetOrbitalPaths,
			formattedData.targetSuborbitalPaths,
			'target',
			rawChartData
		);

		const sortedTimes = Object.keys(rawChartData)
			.map(Number)
			.sort((a, b) => a - b);

		if (sortedTimes.length === 0) return;

		const startTime = sortedTimes[0];
		const totalDelta = sortedTimes.length;
		const intervalPeriod = Math.floor(totalDelta / maxLabelSections);
		const intervalsCovered: Record<number, boolean> = {};

		for (let i = 0; i < sortedTimes.length; i++) {
			const time = sortedTimes[i];
			const deltaT = time - startTime;
			const dataPoint = rawChartData[time];

			const intervalSection = Math.floor(i / intervalPeriod);
			let label = '';
			if (!intervalsCovered[intervalSection] && intervalSection !== 0) {
				label = '-' + durationString(Number(deltaT.toFixed(0)));
				intervalsCovered[intervalSection] = true;
			}

			chartData.labels.push(label);
			chartData.series[0].data.push(dataPoint.vessel ?? null);
			chartData.series[1].data.push(formattedData.atmosphericRadius ?? null);
			chartData.series[2].data.push(dataPoint.vesselManeuver ?? null);

			if (formattedData.targetCurrentCoordinates) {
				chartData.series[3].data.push(dataPoint.target ?? null);
			}
		}

		requestAnimationFrame(() => {
			altitudeEstimateChart?.update(chartData, {
				low: 0,
				series: {
					atmosphere: { showArea: true, showPoint: false },
					target: {},
					vessel: {},
					vesselManeuver: {}
				}
			});
		});
	}

	function buildAltitudePointsForChart(
		orbitPaths: OrbitPath[],
		subOrbitalPaths: OrbitPath[],
		type: string,
		rawChartData: Record<number, Record<string, number>>
	) {
		const altitudePoints: Record<number, number> = {};

		for (const path of [...orbitPaths, ...subOrbitalPaths]) {
			for (const a of path.altitudes) {
				altitudePoints[a.time] = a.altitude;
			}
		}

		for (const [timeStr, altitude] of Object.entries(altitudePoints)) {
			const time = parseFloat(timeStr);
			rawChartData[time] = rawChartData[time] || {};
			rawChartData[time][type] = altitude;
		}
	}

	onMount(async () => {
		L = await import('leaflet');

		// Initialize the map
		map = L.map(mapElement, {
			center: [0, 0],
			zoom: 1,
			worldCopyJump: true
		});

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			noWrap: false
		}).addTo(map);

		map.fitWorld();

		const circleMarkerOptions = {
			color: '#FD7E23',
			opacity: 1.0,
			fillOpacity: 1.0,
			radius: 5
		};

		const targetMarkerOptions = {
			color: targetColor,
			opacity: 1.0,
			fillOpacity: 1.0,
			radius: 5
		};

		markers = {
			vesselCoordinates: L.circleMarker([0, 0], circleMarkerOptions).addTo(map),
			vesselOrbitalPaths: [],
			vesselSuborbitalPaths: [],
			targetCoordinates: L.circleMarker([0, 0], targetMarkerOptions).addTo(map),
			targetOrbitalPaths: [],
			targetSuborbitalPaths: []
		};

		// Initialize altitude estimate chart
		if (showAltitudeEstimate && altitudeChartElement) {
			const Chartist = await import('chartist');
			altitudeEstimateChart = new Chartist.LineChart(
				altitudeChartElement,
				{ labels: [], series: [[0]] },
				{}
			);
		}

		// Create secondary provider at 2000ms for ground track data
		const { provider, cleanup: providerCleanup } = createSecondaryProvider(2000);
		cleanup = providerCleanup;

		formatter = new GroundTrackPositionDataFormatter();
		formatter.onFormat = render;

		// Subscribe to telemetry for orbit patches etc. which trigger the formatter
		provider.subscribeToData([
			'o.orbitPatches',
			't.universalTime',
			'v.body',
			'v.lat',
			'v.long',
			'tar.name',
			'tar.type',
			'tar.o.orbitingBody',
			'tar.o.orbitPatches',
			'o.maneuverNodes'
		]);

		// Handle "no map" for sun orbit
		unsubscribe = telemetryData.subscribe(($data) => {
			const body = $data['v.body'] as string | undefined;
			if (!body) return;
			const isSun = body.toUpperCase() === 'SUN';
			if (mapElement) mapElement.style.display = isSun ? 'none' : '';
			if (noMapElement) noMapElement.classList.toggle('hidden', !isSun);
		});
	});

	onDestroy(() => {
		cleanup?.();
		unsubscribe?.();
		altitudeEstimateChart?.detach();
		map?.remove();
	});
</script>

<div class="map-container readout-display">
	<div class="map" bind:this={mapElement}></div>
	<div class="no-map-indicator hidden" bind:this={noMapElement}>NO MAP</div>
</div>

{#if showAltitudeEstimate}
	<div id="altitude-estimate" class="readout-display">
		<h2>Altitude Estimate</h2>
		<div class="ct-chart" bind:this={altitudeChartElement}></div>
	</div>
{/if}

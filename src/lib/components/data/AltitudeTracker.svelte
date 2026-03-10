<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { telemetryData } from '$lib/stores/telemachus';
	import { getActiveProvider } from '$lib/stores/telemachus';
	import type { Unsubscriber } from 'svelte/store';

	interface Props {
		maxDataPoints?: number;
	}

	let { maxDataPoints = 50 }: Props = $props();

	let chartElement: HTMLDivElement;
	let chart: any = null;

	const altitudeData: number[] = [];
	const heightFromTerrainData: number[] = [];

	let unsubscribe: Unsubscriber;

	function generateData() {
		const labelSize = Math.max(altitudeData.length, heightFromTerrainData.length);
		const labels: number[] = [];
		for (let i = 0; i < labelSize; i++) {
			labels[i] = i;
		}

		return {
			labels,
			series: [
				{ name: 'altitude', data: [...altitudeData] },
				{ name: 'terrain', data: [...heightFromTerrainData] }
			]
		};
	}

	function generateOptions() {
		return {
			series: {
				terrain: {
					showPoint: false,
					showArea: true
				},
				altitude: {
					showPoint: false
				}
			},
			axisY: {
				offset: 80,
				position: 'end' as const,
				low: 0,
				labelInterpolationFnc: (value: number) => {
					if (value >= 1e6) return (value / 1e6).toFixed(2) + 'Mm';
					if (value >= 1e3) return (value / 1e3).toFixed(2) + 'km';
					return value.toFixed(0) + 'm';
				}
			},
			axisX: {
				showLabel: false
			}
		};
	}

	function update(data: Record<string, unknown>) {
		const altitude = data['v.altitude'] as number | undefined;
		const terrainHeight = data['v.terrainHeight'] as number | undefined;
		const heightFromTerrain = data['v.heightFromTerrain'] as number | undefined;

		if (altitude == null) return;

		altitudeData.push(altitude);
		if (
			terrainHeight != null &&
			terrainHeight > -1 &&
			heightFromTerrain != null &&
			heightFromTerrain > -1
		) {
			heightFromTerrainData.push(terrainHeight);
		} else {
			heightFromTerrainData.push(0);
		}

		if (altitudeData.length > maxDataPoints) altitudeData.shift();
		if (heightFromTerrainData.length > maxDataPoints) heightFromTerrainData.shift();

		if (chart) {
			requestAnimationFrame(() => {
				chart.update(generateData());
			});
		}
	}

	onMount(async () => {
		const provider = getActiveProvider();
		if (provider) {
			provider.subscribeToData(['v.altitude', 'v.terrainHeight', 'v.heightFromTerrain']);
		}

		const Chartist = await import('chartist');
		chart = new Chartist.LineChart(chartElement, generateData(), generateOptions());

		unsubscribe = telemetryData.subscribe(($data) => {
			update($data);
		});
	});

	onDestroy(() => {
		unsubscribe?.();
		chart?.detach();
	});
</script>

<div class="legend">
	<p>
		<span id="altitude" class="item"></span>Altitude
		<span id="height-from-terrain" class="item"></span>Terrain Height
	</p>
</div>
<div id="altitude-tracker" bind:this={chartElement}></div>

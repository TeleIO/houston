<script lang="ts">
	import { telemetryData, getActiveProvider } from '$lib/stores/telemachus';
	import { getOrbitalBodyInfo } from '$lib/data/orbital-bodies';
	import { distanceString, degreeString, velocityString } from '$lib/utils/data-formatters';
	import { durationString } from '$lib/utils/time-formatters';
	import { onMount } from 'svelte';

	interface BodyRow {
		label: string;
		field: string;
		formatter: (value: any) => string;
	}

	let currentBody: string | null = $state(null);
	let bodyRows: BodyRow[] = $state([]);
	let rowValues: Record<string, string> = $state({});

	function buildRows(bodyId: number): BodyRow[] {
		const p = (prop: string) => `b.${prop}[${bodyId}]`;
		return [
			{ label: 'Name', field: p('name'), formatter: (v: any) => String(v ?? '') },
			{ label: 'Radius', field: p('radius'), formatter: (v: number) => distanceString(v) },
			{
				label: 'Atmosphere Contains O2?',
				field: p('atmosphereContainsOxygen'),
				formatter: (v: any) => String(v ?? '')
			},
			{
				label: 'Sphere of Influence',
				field: p('soi'),
				formatter: (v: any) => String(v ?? '')
			},
			{
				label: 'Max Atmospheric Density',
				field: p('maxAtmosphere'),
				formatter: (v: any) => String(v ?? '')
			},
			{
				label: 'Tidally Locked?',
				field: p('tidallyLocked'),
				formatter: (v: any) => String(v ?? '')
			},
			{
				label: 'GravitationalParameter',
				field: p('o.gravParameter'),
				formatter: (v: any) => String(v ?? '')
			},
			{
				label: "Body's Relative Velocity",
				field: p('o.relativeVelocity'),
				formatter: (v: number) => velocityString(v)
			},
			{ label: 'Apoapsis', field: p('o.ApA'), formatter: (v: number) => distanceString(v) },
			{ label: 'Periapsis', field: p('o.PeA'), formatter: (v: number) => distanceString(v) },
			{
				label: 'Time to Apoapsis',
				field: p('o.timeToAp'),
				formatter: (v: number) => '-' + durationString(v)
			},
			{
				label: 'Time to Periapsis',
				field: p('o.timeToPe'),
				formatter: (v: number) => '-' + durationString(v)
			},
			{
				label: 'Inclination',
				field: p('o.inclination'),
				formatter: (v: number) => degreeString(v)
			},
			{
				label: 'Eccentricity',
				field: p('o.eccentricity'),
				formatter: (v: number) => (v ?? 0).toFixed(3)
			},
			{
				label: 'Orbital Period',
				field: p('o.period'),
				formatter: (v: number) => durationString(v)
			},
			{
				label: 'True Anomaly',
				field: p('o.trueAnomaly'),
				formatter: (v: number) => degreeString(v)
			}
		];
	}

	onMount(() => {
		const provider = getActiveProvider();
		provider?.subscribeToData(['v.body']);
	});

	const unsub = telemetryData.subscribe(($data) => {
		const bodyName = ($data['v.body'] as string) ?? null;
		if (!bodyName) return;

		if (currentBody !== bodyName) {
			currentBody = bodyName;
			const body = getOrbitalBodyInfo(bodyName);
			if (!body) return;

			bodyRows = buildRows(body.id);

			const provider = getActiveProvider();
			provider?.subscribeToData(bodyRows.map((r) => r.field));
		}

		const values: Record<string, string> = {};
		for (const row of bodyRows) {
			const raw = $data[row.field];
			try {
				values[row.field] = raw != null ? row.formatter(raw) : '';
			} catch {
				values[row.field] = String(raw ?? '');
			}
		}
		rowValues = values;
	});
</script>

<table id="orbiting-body-info" class="readout-table">
	<tbody>
	{#each bodyRows as row}
		<tr>
			<th>{row.label}</th>
			<td>{rowValues[row.field] ?? ''}</td>
		</tr>
	{/each}
	</tbody>
</table>

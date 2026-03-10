<script lang="ts">
	import { telemetryData, getActiveProvider } from '$lib/stores/telemachus';
	import { getOrbitalBodyInfo } from '$lib/data/orbital-bodies';
	import { distanceString, velocityString, degreeString } from '$lib/utils/data-formatters';
	import { untrack } from 'svelte';

	let data = $derived($telemetryData);

	let isNoTarget = $derived(
		!data['tar.name'] || (data['tar.name'] as string).toLowerCase() === 'no target selected.'
	);

	// Subscribe to dynamic body fields when target changes
	$effect(() => {
		if (isNoTarget) return;
		const bodyName = data['v.body'] as string;
		const body = bodyName ? getOrbitalBodyInfo(bodyName) : null;
		const target = getOrbitalBodyInfo(data['tar.name'] as string);
		if (!body || !target) return;

		const provider = getActiveProvider();
		if (provider) {
			provider.subscribeToData([
				`b.o.gravParameter[${body.id}]`,
				`b.radius[${body.id}]`,
				`b.o.phaseAngle[${target.id}]`
			]);
		}
	});

	// Compute everything as derived values — no writes to state in effects
	let computed = $derived.by(() => {
		if (isNoTarget) return null;

		const bodyName = data['v.body'] as string;
		const body = bodyName ? getOrbitalBodyInfo(bodyName) : null;
		const target = getOrbitalBodyInfo(data['tar.name'] as string);
		if (!body || !target) return null;

		const radiusOfBody = data[`b.radius[${body.id}]`] as number | undefined;
		if (radiusOfBody == null) return null;

		const mu = data[`b.o.gravParameter[${body.id}]`] as number | undefined;

		let deltaV: number | null = null;
		if (mu) {
			const r1 = (data['o.ApA'] as number) + radiusOfBody;
			const r2 = (data['tar.o.ApA'] as number) + radiusOfBody;
			deltaV = Math.sqrt(mu / r1) * (Math.sqrt((2 * r2) / (r1 + r2)) - 1);
		}

		const r1 = data['o.PeA'] as number;
		const r2 = data['tar.o.PeA'] as number;
		const numberOfOrbits = Math.pow(
			0.5 * ((r1 + r2 + 2 * radiusOfBody) / (2 * radiusOfBody + 2 * r2)),
			1.5
		);
		const fractionalPart = numberOfOrbits < 1 ? numberOfOrbits : numberOfOrbits % 1;
		const sweepAngle = 360 * fractionalPart;
		const phaseAngle = 180 - sweepAngle;
		const targetsCurrentPhaseAngle = (data[`b.o.phaseAngle[${target.id}]`] as number) ?? null;

		const isGo =
			phaseAngle != null &&
			targetsCurrentPhaseAngle != null &&
			deltaV != null &&
			phaseAngle <= targetsCurrentPhaseAngle + 5 &&
			phaseAngle >= targetsCurrentPhaseAngle - 5 &&
			deltaV > 5;

		return { deltaV, sweepAngle, phaseAngle, targetsCurrentPhaseAngle, isGo };
	});

	let isGo = $derived(computed?.isGo ?? false);
</script>

<strong class="go-signal" class:go={isGo} class:no-go={!isGo && !isNoTarget}>
	{#if isGo}GO FOR INTERCEPT{:else if isNoTarget}NO TARGET{:else}NO GO{/if}
</strong>
<table class="readout-table">
	<tbody>
		<tr>
			<th>Vessel Altitude</th>
			<td>{isNoTarget ? '' : distanceString((data['v.altitude'] as number) ?? 0)}</td>
		</tr>
		<tr>
			<th>Vessel Orbital Velocity</th>
			<td>{isNoTarget ? '' : velocityString((data['v.orbitalVelocity'] as number) ?? 0)}</td>
		</tr>
		<tr>
			<th>Vessel Periapsis</th>
			<td>{isNoTarget ? '' : distanceString((data['o.ApA'] as number) ?? 0)}</td>
		</tr>
		<tr>
			<th>Target Periapsis</th>
			<td>{isNoTarget ? '' : distanceString((data['tar.o.ApA'] as number) ?? 0)}</td>
		</tr>
		<tr>
			<th>Delta-V</th>
			<td>{@html computed?.deltaV != null ? velocityString(computed.deltaV) : ''}</td>
		</tr>
		<tr>
			<th>Sweep Angle</th>
			<td>{@html computed?.sweepAngle != null ? degreeString(computed.sweepAngle) : ''}</td>
		</tr>
		<tr>
			<th>Phase Angle</th>
			<td>{@html computed?.phaseAngle != null ? degreeString(computed.phaseAngle) : ''}</td>
		</tr>
		<tr>
			<th>Target's Current Phase Angle</th>
			<td>{@html computed?.targetsCurrentPhaseAngle != null ? degreeString(computed.targetsCurrentPhaseAngle) : ''}</td>
		</tr>
	</tbody>
</table>

<style>
	.go-signal {
		display: block;
		text-align: center;
		padding: 0.5em;
		font-size: 1.2em;
		margin-bottom: 0.5em;
	}
	.go { color: #51ff07; }
	.no-go { color: #ff4444; }
</style>

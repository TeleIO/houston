<script lang="ts">
	import { telemetryData, getActiveProvider } from '$lib/stores/telemachus';
	import { getOrbitalBodyInfo } from '$lib/data/orbital-bodies';
	import {
		TWR,
		secondsToUseFuelAtCurrentThrust
	} from '$lib/utils/orbital-math';
	import {
		newtonsString,
		percentageString,
		tonnageString,
		plainNumberString,
		timeString
	} from '$lib/utils/data-formatters';
	import { onMount } from 'svelte';

	interface StageInfo {
		startThrust: number;
		startMass: number;
		resourceMass: number;
		isp: number;
		[key: string]: unknown;
	}

	interface ComputedStage {
		currentThrust: string;
		currentTWR: string;
		remainingFuel: string;
		timeUntilEmpty: string;
	}

	let atmoStage: ComputedStage | null = $state(null);
	let vacuumStage: ComputedStage | null = $state(null);

	function computeStage(stage: StageInfo, throttle: number, surfaceGravity: number): ComputedStage {
		const currentThrust = stage.startThrust * throttle;
		const currentTWR = TWR(currentThrust, stage.startMass, surfaceGravity);
		const timeUntilEmpty = secondsToUseFuelAtCurrentThrust(
			stage.resourceMass,
			currentThrust,
			stage.isp
		);

		return {
			currentThrust:
				newtonsString(currentThrust) + ' (' + percentageString(throttle) + ')',
			currentTWR: plainNumberString(currentTWR),
			remainingFuel: tonnageString(stage.resourceMass),
			timeUntilEmpty: timeUntilEmpty <= 0 ? 'NA' : timeString(timeUntilEmpty)
		};
	}

	onMount(() => {
		const provider = getActiveProvider();
		provider?.subscribeToData(['mj.stagingInfo', 'f.throttle', 'v.body']);
	});

	const unsub = telemetryData.subscribe(($data) => {
		const stagingInfo = $data['mj.stagingInfo'] as Record<string, StageInfo[]> | undefined;
		if (!stagingInfo) return;

		const bodyName = ($data['v.body'] as string) ?? 'Kerbin';
		const body = getOrbitalBodyInfo(bodyName);
		if (!body) return;

		const throttle = ($data['f.throttle'] as number) ?? 0;

		if (stagingInfo.atmo?.length) {
			const lastAtmo = stagingInfo.atmo[stagingInfo.atmo.length - 1];
			atmoStage = computeStage(lastAtmo, throttle, body.surfaceGravity);
		}

		if (stagingInfo.vacuum?.length) {
			const lastVacuum = stagingInfo.vacuum[stagingInfo.vacuum.length - 1];
			vacuumStage = computeStage(lastVacuum, throttle, body.surfaceGravity);
		}
	});

	const rows = ['Current Thrust', 'TWR', 'Remaining Fuel', 'Time until empty'] as const;
	const keys = ['currentThrust', 'currentTWR', 'remainingFuel', 'timeUntilEmpty'] as const;
</script>

<table id="current-stage-atmo" class="readout-table">
	<caption>Atmosphere</caption>
	<tbody>
	{#if atmoStage}
		{#each rows as label, i}
			<tr>
				<th>{label}</th>
				<td>{atmoStage[keys[i]]}</td>
			</tr>
		{/each}
	{/if}
	</tbody>
</table>

<table id="current-stage-vacuum" class="readout-table">
	<caption>Vacuum</caption>
	<tbody>
	{#if vacuumStage}
		{#each rows as label, i}
			<tr>
				<th>{label}</th>
				<td>{vacuumStage[keys[i]]}</td>
			</tr>
		{/each}
	{/if}
	</tbody>
</table>

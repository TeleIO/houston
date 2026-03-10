<script lang="ts">
	import { telemetryData, getActiveProvider } from '$lib/stores/telemachus';
	import { getOrbitalBodyInfo } from '$lib/data/orbital-bodies';
	import { TWR, MaxTWR } from '$lib/utils/orbital-math';
	import {
		tonnageString,
		plainNumberString,
		velocityString,
		timeString
	} from '$lib/utils/data-formatters';
	import { onMount } from 'svelte';

	interface StageInfo {
		startThrust: number;
		startMass: number;
		endMass: number;
		stagedMass: number;
		resourceMass: number;
		maxAccel: number;
		isp: number;
		deltaV: number;
		deltaTime: number;
		[key: string]: unknown;
	}

	interface ComputedRow {
		stage: number;
		startMass: string;
		endMass: string;
		stagedMass: string;
		burnedMass: string;
		twr: string;
		maxTwr: string;
		isp: string;
		atmoDeltaV: string;
		vacDeltaV: string;
		time: string;
	}

	let rows: ComputedRow[] = $state([]);

	const columns = [
		'Stage', 'Start Mass', 'End Mass', 'Staged Mass', 'Burned Mass',
		'TWR', 'Max TWR', 'ISP', 'Atmo \u0394V', 'Vac \u0394V', 'Time'
	];

	onMount(() => {
		const provider = getActiveProvider();
		provider?.subscribeToData(['mj.stagingInfo', 'v.body']);
	});

	const unsub = telemetryData.subscribe(($data) => {
		const stagingInfo = $data['mj.stagingInfo'] as Record<string, StageInfo[]> | undefined;
		if (!stagingInfo?.atmo?.length) {
			rows = [];
			return;
		}

		const bodyName = ($data['v.body'] as string) ?? 'Kerbin';
		const body = getOrbitalBodyInfo(bodyName);
		if (!body) return;

		const stages = stagingInfo.atmo.length;
		const newRows: ComputedRow[] = [];

		for (let i = 0; i < stages; i++) {
			const atmo = stagingInfo.atmo[i];
			const vacuum = stagingInfo.vacuum[i];

			const thrust = Math.min(atmo.startThrust, vacuum.startThrust);
			let twr = TWR(thrust, atmo.startMass, body.surfaceGravity);
			if (isNaN(twr)) twr = 0;

			const maxAccel = Math.min(atmo.maxAccel, vacuum.maxAccel);
			let maxTwr = MaxTWR(maxAccel, body.surfaceGravity);
			if (isNaN(maxTwr)) maxTwr = 0;

			const isp = Math.min(atmo.isp, vacuum.isp);
			const time = Math.min(atmo.deltaTime, vacuum.deltaTime);

			newRows.push({
				stage: i,
				startMass: tonnageString(atmo.startMass),
				endMass: tonnageString(atmo.endMass),
				stagedMass: tonnageString(atmo.stagedMass),
				burnedMass: tonnageString(atmo.resourceMass),
				twr: plainNumberString(twr),
				maxTwr: plainNumberString(maxTwr),
				isp: plainNumberString(isp),
				atmoDeltaV: velocityString(atmo.deltaV),
				vacDeltaV: velocityString(vacuum.deltaV),
				time: timeString(time)
			});
		}

		rows = newRows;
	});
</script>

<div id="staging-info-table-wrapper">
	<table id="staging-info-table" class="readout-table">
		<thead>
			<tr>
				{#each columns as col}
					<th>{@html col}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					<td>{row.stage}</td>
					<td>{row.startMass}</td>
					<td>{row.endMass}</td>
					<td>{row.stagedMass}</td>
					<td>{row.burnedMass}</td>
					<td>{row.twr}</td>
					<td>{row.maxTwr}</td>
					<td>{row.isp}</td>
					<td>{row.atmoDeltaV}</td>
					<td>{row.vacDeltaV}</td>
					<td>{row.time}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

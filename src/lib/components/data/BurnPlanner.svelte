<script lang="ts">
	import { telemetryData, getActiveProvider } from '$lib/stores/telemachus';
	import { getOrbitalBodyInfo } from '$lib/data/orbital-bodies';
	import {
		TWR,
		weightOfFuelUsedDuringBurn,
		deltaVForBurn
	} from '$lib/utils/orbital-math';
	import {
		newtonsString,
		tonnageString,
		velocityString,
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

	let stageInput = $state(0);
	let mode = $state<'atmo' | 'vacuum'>('atmo');
	let throttleInput = $state(100);
	let burnTimeInput = $state(0);

	let totalThrust = $state('NA');
	let startingFuel = $state('NA');
	let deltaV = $state('NA');
	let formattedTime = $state('NA');
	let twrDisplay = $state('NA');
	let remainingFuel = $state('NA');
	let warning = $state('');

	onMount(() => {
		const provider = getActiveProvider();
		provider?.subscribeToData(['mj.stagingInfo', 'v.body']);
	});

	const unsub = telemetryData.subscribe(($data) => {
		const stagingInfo = $data['mj.stagingInfo'] as Record<string, StageInfo[]> | undefined;
		if (!stagingInfo) return;

		const bodyName = ($data['v.body'] as string) ?? 'Kerbin';
		const body = getOrbitalBodyInfo(bodyName);
		if (!body) return;

		const stages = stagingInfo[mode];
		const stage = stages?.[stageInput];

		if (!stage) {
			totalThrust = 'NA';
			startingFuel = 'NA';
			formattedTime = 'NA';
			deltaV = 'NA';
			twrDisplay = 'NA';
			remainingFuel = 'NA';
			warning = 'Stage not found!';
			return;
		}

		const throttlePct = Math.min(100, Math.max(0, throttleInput)) / 100;
		const thrust = stage.startThrust * throttlePct;

		const burnedFuelRaw = weightOfFuelUsedDuringBurn(thrust, stage.isp, burnTimeInput);
		const burnedFuel = isNaN(burnedFuelRaw) ? 0 : burnedFuelRaw;
		const endMass = stage.startMass - burnedFuel;

		const dv = deltaVForBurn(thrust, stage.startMass, endMass, burnTimeInput);
		let twr = TWR(thrust, stage.startMass, body.surfaceGravity);
		if (isNaN(twr)) twr = 0;

		const remaining = stage.resourceMass - burnedFuel;

		totalThrust = newtonsString(stage.startThrust);
		startingFuel = tonnageString(stage.resourceMass);
		formattedTime = timeString(burnTimeInput || 0);
		deltaV = velocityString(dv);
		twrDisplay = plainNumberString(twr);
		remainingFuel = tonnageString(remaining);
		warning = remaining < 0 ? 'Not enough fuel for burn!' : '';
	});
</script>

<table id="burn-planner-table" class="readout-table">
	<tbody>
		<tr>
			<th>Stage</th>
			<td><input id="burn-planner-stage" type="number" min="0" bind:value={stageInput} /></td>
		</tr>
		<tr>
			<th>Total Thrust</th>
			<td id="burn-planner-total-thrust">{totalThrust}</td>
		</tr>
		<tr>
			<th>Starting Fuel</th>
			<td id="burn-planner-starting-fuel">{startingFuel}</td>
		</tr>
		<tr>
			<td colspan="2">
				<select id="burn-planner-mode" bind:value={mode}>
					<option value="atmo">Atmo</option>
					<option value="vacuum">Vacuum</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>Thrust %</th>
			<td>
				<input
					id="burn-planner-throttle"
					type="number"
					min="0"
					max="100"
					bind:value={throttleInput}
				/>
			</td>
		</tr>
		<tr>
			<th>&Delta;t (s)</th>
			<td>
				<input
					id="burn-planner-burn-time"
					type="number"
					min="0"
					bind:value={burnTimeInput}
				/>
			</td>
		</tr>
	</tbody>
	<tbody class="results">
		<tr>
			<th>&Delta;v</th>
			<td id="burn-planner-delta-v">{deltaV}</td>
		</tr>
		<tr>
			<th>Burn Duration</th>
			<td id="burn-planner-formatted-time">{formattedTime}</td>
		</tr>
		<tr>
			<th>TWR</th>
			<td id="burn-planner-twr">{twrDisplay}</td>
		</tr>
		<tr>
			<th>Remaining Fuel</th>
			<td id="burn-planner-remaining-fuel">{remainingFuel}</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<td colspan="2" id="burn-planner-warning">{warning}</td>
		</tr>
	</tfoot>
</table>

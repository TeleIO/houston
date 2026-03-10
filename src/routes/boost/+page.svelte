<script lang="ts">
	import ThrottleGauge from '$lib/components/gauges/ThrottleGauge.svelte';
	import AtmosphericDensityGauge from '$lib/components/gauges/AtmosphericDensityGauge.svelte';
	import ButtonIndicator from '$lib/components/indicators/ButtonIndicator.svelte';
	import ResourceBar from '$lib/components/data/ResourceBar.svelte';
	import ReadoutTable from '$lib/components/data/ReadoutTable.svelte';
	import Navball from '$lib/components/navigation/Navball.svelte';
	import CurrentStageBurnInfo from '$lib/components/data/CurrentStageBurnInfo.svelte';
	import BurnPlanner from '$lib/components/data/BurnPlanner.svelte';
	import StagingInfoTable from '$lib/components/data/StagingInfoTable.svelte';
	import {
		distanceString,
		heightFromTerrainString,
		velocityString
	} from '$lib/utils/data-formatters';

	const flightDataRows = [
		{ label: 'Altitude', field: 'v.altitude', formatter: (v: number) => distanceString(v) },
		{
			label: 'Height from Terrain',
			field: 'v.heightFromTerrain',
			formatter: (v: number) => heightFromTerrainString(v)
		},
		{
			label: 'Surface Velocity',
			field: 'v.surfaceVelocity',
			formatter: (v: number) => velocityString(v)
		},
		{
			label: 'Vertical Velocity',
			field: 'v.verticalSpeed',
			formatter: (v: number) => velocityString(v)
		},
		{
			label: 'Orbital Velocity',
			field: 'v.orbitalVelocity',
			formatter: (v: number) => velocityString(v)
		},
		{ label: 'G-Force', field: 'v.geeForce', formatter: (v: number) => v.toFixed(3) }
	];
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/boost.css" />
</svelte:head>

<div id="top-panel">
	<div id="navigation-and-atmospheric-density" class="gauge">
		<Navball />

		<AtmosphericDensityGauge />
	</div>

	<div id="throttle-and-button-panel">
		<ThrottleGauge />

		<div id="button-panel">
			<ButtonIndicator field="v.rcsValue" label="RCS" />
			<ButtonIndicator field="v.sasValue" label="SAS" />
			<ButtonIndicator field="v.lightValue" label="LGHT" />
			<ButtonIndicator field="v.gearValue" label="GEAR" />
			<ButtonIndicator field="v.brakeValue" label="BRK" />
		</div>

		<div class="readout-display">
			<h2>Flight Data</h2>
			<ReadoutTable rows={flightDataRows} />
		</div>
	</div>

	<div id="resources" class="readout-display">
		<div class="resource-grid">
			<ResourceBar
				resourceName="LiquidFuel"
				label="Liquid Fuel"
				showCurrentStage={true}
				showTotal={true}
				valuePrefix="liquid-fuel"
			/>

			<ResourceBar
				resourceName="SolidFuel"
				label="Solid Fuel"
				showCurrentStage={true}
				showTotal={true}
				valuePrefix="solid-fuel"
			/>

			<ResourceBar
				resourceName="Oxidizer"
				label="Oxidizer"
				showCurrentStage={true}
				showTotal={true}
				valuePrefix="oxidizer"
			/>

			<ResourceBar
				resourceName="Monopropellant"
				label="Monopropellant"
				showCurrentStage={true}
				showTotal={true}
				valuePrefix="monopropellant"
			/>

			<ResourceBar
				resourceName="ElectricCharge"
				label="Electric Charge"
				showCurrentStage={true}
				showTotal={true}
				valuePrefix="electric-charge"
			/>

			<ResourceBar
				resourceName="XenonGas"
				label="Xenon Gas"
				showCurrentStage={true}
				showTotal={true}
				valuePrefix="xenon-gas"
			/>
		</div>

		<div id="ablator-readout">
			<ResourceBar
				resourceName="Ablator"
				label="Ablator"
				showCurrentStage={false}
				showTotal={true}
				valuePrefix="ablator"
			/>
		</div>
	</div>
</div>

<div id="bottom-panel">
	<div class="readout-display">
		<h2>Current Throttle Info</h2>
		<CurrentStageBurnInfo />
	</div>

	<div class="readout-display">
		<h2>Burn Planner</h2>
		<BurnPlanner />
	</div>

	<div class="readout-display">
		<h2>Staging Info</h2>
		<StagingInfoTable />
	</div>
</div>

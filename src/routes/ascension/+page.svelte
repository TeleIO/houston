<script lang="ts">
	import ThrottleGauge from '$lib/components/gauges/ThrottleGauge.svelte';
	import AtmosphericDensityGauge from '$lib/components/gauges/AtmosphericDensityGauge.svelte';
	import ButtonIndicator from '$lib/components/indicators/ButtonIndicator.svelte';
	import ResourceBar from '$lib/components/data/ResourceBar.svelte';
	import ReadoutTable from '$lib/components/data/ReadoutTable.svelte';
	import Navball from '$lib/components/navigation/Navball.svelte';
	import PositionMap from '$lib/components/maps/PositionMap.svelte';
	import CameraFeed from '$lib/components/camera/CameraFeed.svelte';
	import AltitudeTracker from '$lib/components/data/AltitudeTracker.svelte';
	import {
		distanceString,
		heightFromTerrainString,
		degreeString,
		velocityString
	} from '$lib/utils/data-formatters';
	import { durationString } from '$lib/utils/time-formatters';

	const readoutRows = [
		{ label: 'Altitude', field: 'v.altitude', formatter: (v: number) => distanceString(v) },
		{ label: 'Apoapsis', field: 'o.ApA', formatter: (v: number) => distanceString(v) },
		{ label: 'Periapsis', field: 'o.PeA', formatter: (v: number) => distanceString(v) },
		{
			label: 'Time to Apoapsis',
			field: 'o.timeToAp',
			formatter: (v: number) => '-' + durationString(v)
		},
		{
			label: 'Time to Periapsis',
			field: 'o.timeToPe',
			formatter: (v: number) => '-' + durationString(v)
		},
		{
			label: 'Height from Terrain',
			field: 'v.heightFromTerrain',
			formatter: (v: number) => heightFromTerrainString(v)
		},
		{ label: 'Inclination', field: 'o.inclination', formatter: (v: number) => degreeString(v) },
		{
			label: 'Orbital Velocity',
			field: 'v.orbitalVelocity',
			formatter: (v: number) => velocityString(v)
		},
		{
			label: 'Surface Velocity',
			field: 'v.surfaceVelocity',
			formatter: (v: number) => velocityString(v)
		}
	];
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/ascension.css" />
</svelte:head>

<div id="top-panel">
	<div id="throttle-and-map">
		<ThrottleGauge />

		<PositionMap mapId="position-map" />
	</div>

	<div id="resources" class="readout-display">
		<ResourceBar
			resourceName="LiquidFuel"
			label="Liquid Fuel"
			showCurrentStage={true}
			showTotal={true}
			valuePrefix="liquid-fuel"
		/>

		<ResourceBar
			resourceName="Oxidizer"
			label="Oxidizer"
			showCurrentStage={true}
			showTotal={true}
			valuePrefix="oxidizer"
		/>
	</div>

	<div id="navigation-and-atmospheric-density" class="gauge">
		<Navball />

		<AtmosphericDensityGauge />
	</div>

	<CameraFeed />

	<div id="ascension-data-and-button-panel">
		<ReadoutTable rows={readoutRows} />

		<div id="button-panel">
			<ButtonIndicator field="v.rcsValue" label="RCS" />
			<ButtonIndicator field="v.sasValue" label="SAS" />
			<ButtonIndicator field="v.lightValue" label="LGHT" />
			<ButtonIndicator field="v.gearValue" label="GEAR" />
			<ButtonIndicator field="v.brakeValue" label="BRK" />
		</div>
	</div>
</div>

<div class="readout-display">
	<AltitudeTracker maxDataPoints={50} />
</div>

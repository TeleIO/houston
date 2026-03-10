<script lang="ts">
	import ThrottleGauge from '$lib/components/gauges/ThrottleGauge.svelte';
	import AtmosphericDensityGauge from '$lib/components/gauges/AtmosphericDensityGauge.svelte';
	import ButtonIndicator from '$lib/components/indicators/ButtonIndicator.svelte';
	import ResourceBar from '$lib/components/data/ResourceBar.svelte';
	import ReadoutTable from '$lib/components/data/ReadoutTable.svelte';
	import Navball from '$lib/components/navigation/Navball.svelte';
	import CameraFeed from '$lib/components/camera/CameraFeed.svelte';
	import AltitudeTracker from '$lib/components/data/AltitudeTracker.svelte';
	import GroundTrack from '$lib/components/maps/GroundTrack.svelte';
	import {
		distanceString,
		heightFromTerrainString,
		velocityString
	} from '$lib/utils/data-formatters';

	const readoutRows = [
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
			label: 'Vertical Speed',
			field: 'v.verticalSpeed',
			formatter: (v: number) => velocityString(v)
		}
	];
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/landing.css" />
</svelte:head>

<div id="top-panel">
	<GroundTrack showAltitudeEstimate={false} />

	<div id="navigation-and-atmospheric-density" class="gauge">
		<Navball />

		<AtmosphericDensityGauge />
	</div>

	<div id="throttle-and-button-readout">
		<div id="ablator-readout" class="readout-display">
			<ResourceBar
				resourceName="Ablator"
				label="Ablator"
				showCurrentStage={false}
				showTotal={true}
				valuePrefix="ablator"
			/>
		</div>

		<div id="button-panel">
			<ButtonIndicator field="v.rcsValue" label="RCS" />
			<ButtonIndicator field="v.sasValue" label="SAS" />
			<ButtonIndicator field="v.lightValue" label="LGHT" />
			<ButtonIndicator field="v.gearValue" label="GEAR" />
			<ButtonIndicator field="v.brakeValue" label="BRK" />
		</div>

		<ThrottleGauge />
	</div>

	<div id="landing-data" class="readout-display">
		<ReadoutTable rows={readoutRows} />

		<div id="resources">
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
	</div>
</div>

<div id="bottom-panel">
	<CameraFeed />

	<div class="readout-display">
		<AltitudeTracker maxDataPoints={50} />
	</div>
</div>

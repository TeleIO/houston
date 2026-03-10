<script lang="ts">
	import ButtonIndicator from '$lib/components/indicators/ButtonIndicator.svelte';
	import ResourceBar from '$lib/components/data/ResourceBar.svelte';
	import ReadoutTable from '$lib/components/data/ReadoutTable.svelte';
	import CameraFeed from '$lib/components/camera/CameraFeed.svelte';
	import GroundTrack from '$lib/components/maps/GroundTrack.svelte';
	import { distanceString, degreeString, velocityString } from '$lib/utils/data-formatters';
	import { durationString } from '$lib/utils/time-formatters';

	const orbitalDataRows = [
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
		{ label: 'Inclination', field: 'o.inclination', formatter: (v: number) => degreeString(v) },
		{
			label: 'Eccentricity',
			field: 'o.eccentricity',
			formatter: (v: number) => v.toFixed(3)
		},
		{
			label: 'Orbital Velocity',
			field: 'v.orbitalVelocity',
			formatter: (v: number) => velocityString(v)
		}
	];
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/vessel-overview.css" />
</svelte:head>

<div id="top-panel">
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
				resourceName="Oxidizer"
				label="Oxidizer"
				showCurrentStage={true}
				showTotal={true}
				valuePrefix="oxidizer"
			/>

			<ResourceBar
				resourceName="ElectricCharge"
				label="Electric Charge"
				showCurrentStage={true}
				showTotal={true}
				valuePrefix="electric-charge"
			/>

			<ResourceBar
				resourceName="Monopropellant"
				label="Monopropellant"
				showCurrentStage={true}
				showTotal={true}
				valuePrefix="monopropellant"
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

	<CameraFeed rate={1000} />

	<div id="orbital-data-and-buttons">
		<ReadoutTable rows={orbitalDataRows} />

		<div id="button-panel">
			<ButtonIndicator field="v.rcsValue" label="RCS" />
			<ButtonIndicator field="v.sasValue" label="SAS" />
		</div>
	</div>
</div>

<div id="ground-track-wrapper">
	<GroundTrack showAltitudeEstimate={true} />
</div>

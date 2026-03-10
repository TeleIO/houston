<script lang="ts">
	import ActionButton from '$lib/components/indicators/ActionButton.svelte';
	import ResourceBar from '$lib/components/data/ResourceBar.svelte';
	import ReadoutTable from '$lib/components/data/ReadoutTable.svelte';
	import PositionMap from '$lib/components/maps/PositionMap.svelte';
	import OrbitingBodyInfoTable from '$lib/components/data/OrbitingBodyInfoTable.svelte';
	import {
		distanceString,
		degreeString,
		velocityString,
		accelerationSensorString,
		pressureSensorString,
		temperatureString
	} from '$lib/utils/data-formatters';
	import { durationString } from '$lib/utils/time-formatters';

	const sensorRows = [
		{
			label: 'Gravity Sensor',
			field: 's.sensor.grav',
			formatter: (v: [string, number[]]) => accelerationSensorString(v)
		},
		{
			label: 'Acceleration Sensor',
			field: 's.sensor.acc',
			formatter: (v: [string, number[]]) => accelerationSensorString(v)
		},
		{
			label: 'Pressure Sensor',
			field: 's.sensor.pres',
			formatter: (v: [string, number[]]) => pressureSensorString(v)
		},
		{
			label: 'Temperature Sensor',
			field: 's.sensor.temp',
			formatter: (v: any) => temperatureString(v[1][0])
		},
		{ label: 'G-Force', field: 'v.geeForce', formatter: (v: number) => v.toFixed(3) }
	];

	const targetRows = [
		{ label: 'Target Name', field: 'tar.name', formatter: (v: string) => v },
		{ label: 'Target Type', field: 'tar.type', formatter: (v: string) => v },
		{
			label: 'Target Distance',
			field: 'tar.distance',
			formatter: (v: number) => distanceString(v)
		},
		{
			label: "Target's Orbiting Body",
			field: 'tar.o.orbitingBody',
			formatter: (v: string) => v
		},
		{
			label: 'Target Apoapsis',
			field: 'tar.o.ApA',
			formatter: (v: number) => distanceString(v)
		},
		{
			label: 'Target Periapsis',
			field: 'tar.o.PeA',
			formatter: (v: number) => distanceString(v)
		},
		{
			label: 'Target Time to Apoapsis',
			field: 'tar.o.timeToAp',
			formatter: (v: number) => '-' + durationString(v)
		},
		{
			label: 'Target Time to Periapsis',
			field: 'tar.o.timeToPe',
			formatter: (v: number) => '-' + durationString(v)
		},
		{
			label: 'Target Inclination',
			field: 'tar.o.inclination',
			formatter: (v: number) => degreeString(v)
		},
		{
			label: 'Target Eccentricity',
			field: 'tar.o.eccentricity',
			formatter: (v: number) => v.toFixed(3)
		},
		{
			label: 'Target Orbital Period',
			field: 'tar.o.period',
			formatter: (v: number) => durationString(v)
		},
		{
			label: 'Target Velocity',
			field: 'tar.o.velocity',
			formatter: (v: number) => velocityString(v)
		},
		{
			label: 'Target Relative Velocity',
			field: 'tar.o.relativeVelocity',
			formatter: (v: number) => velocityString(v)
		}
	];
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/sysops.css" />
</svelte:head>

<div id="top-panel">
	<div id="map-and-sensors">
		<PositionMap mapId="position-map" />

		<div class="readout-display">
			<h2>Sensor Info</h2>
			<ReadoutTable rows={sensorRows} />

			<ResourceBar
				resourceName="Ore"
				label="Ore"
				showCurrentStage={false}
				showTotal={true}
				valuePrefix="ore"
			/>
		</div>
	</div>

	<div id="actions-and-target-info">
		<table id="custom-actions" class="gauge">
			<thead>
				<tr><th colspan="5">Custom Actions</th></tr>
			</thead>
			<tbody>
				<tr>
					<td><ActionButton buttonId="1" apiString="f.ag1" /></td>
					<td><ActionButton buttonId="2" apiString="f.ag2" /></td>
					<td><ActionButton buttonId="3" apiString="f.ag3" /></td>
					<td><ActionButton buttonId="4" apiString="f.ag4" /></td>
					<td><ActionButton buttonId="5" apiString="f.ag5" /></td>
				</tr>
				<tr>
					<td><ActionButton buttonId="6" apiString="f.ag6" /></td>
					<td><ActionButton buttonId="7" apiString="f.ag7" /></td>
					<td><ActionButton buttonId="8" apiString="f.ag8" /></td>
					<td><ActionButton buttonId="9" apiString="f.ag9" /></td>
					<td><ActionButton buttonId="10" apiString="f.ag10" /></td>
				</tr>
			</tbody>
		</table>

		<div class="readout-display">
			<h2>Target Info</h2>
			<ReadoutTable rows={targetRows} />
		</div>
	</div>

	<div class="readout-display">
		<h2>Orbiting Body Info</h2>
		<OrbitingBodyInfoTable />
	</div>
</div>

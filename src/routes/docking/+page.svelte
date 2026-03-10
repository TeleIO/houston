<script lang="ts">
	import ButtonIndicator from '$lib/components/indicators/ButtonIndicator.svelte';
	import ThrottleGauge from '$lib/components/gauges/ThrottleGauge.svelte';
	import ReadoutTable from '$lib/components/data/ReadoutTable.svelte';
	import Navball from '$lib/components/navigation/Navball.svelte';
	import CameraFeed from '$lib/components/camera/CameraFeed.svelte';
	import DockingMap from '$lib/components/maps/DockingMap.svelte';
	import { degreeString, distanceString } from '$lib/utils/data-formatters';

	const dockingInfoRows = [
		{ label: 'X Angle', field: 'dock.ax', formatter: degreeString },
		{ label: 'Y Angle', field: 'dock.ay', formatter: degreeString },
		{ label: 'Z Angle', field: 'dock.az', formatter: degreeString },
		{ label: 'X Distance', field: 'dock.x', formatter: distanceString },
		{ label: 'Y Distance', field: 'dock.y', formatter: distanceString }
	];
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/docking.css" />
</svelte:head>

<div id="top-panel">
	<div id="docking-map-container" class="readout-display">
		<DockingMap />
	</div>

	<CameraFeed />
</div>

<div id="bottom-panel">
	<div class="readout-display">
		<h2>Docking Info</h2>
		<ReadoutTable rows={dockingInfoRows} />
	</div>

	<div id="navigation-throttle-and-buttons">
		<div id="navigation-and-buttons" class="gauge">
			<Navball />
			<div id="button-panel">
				<ButtonIndicator field="v.rcsValue" label="RCS" />
				<ButtonIndicator field="v.sasValue" label="SAS" />
			</div>
		</div>
		<div id="throttle-panel">
			<ThrottleGauge />
		</div>
	</div>
</div>

<script lang="ts">
	import OrbitalMap from '$lib/components/maps/OrbitalMap.svelte';
	import NavigationOrbitInfoTable from '$lib/components/navigation/NavigationOrbitInfoTable.svelte';
	import HohmannIntercept from '$lib/components/navigation/HohmannIntercept.svelte';
	import ManeuverNodeEditor from '$lib/components/navigation/ManeuverNodeEditor.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/fido.css" />
	<link rel="stylesheet" href="/stylesheets/navigation.css" />
</svelte:head>

<div id="top-panel">
	<div id="orbital-map-container" class="readout-display">
		<OrbitalMap />
	</div>

	<div class="readout-display">
		<h2>Orbit Info</h2>
		<NavigationOrbitInfoTable />
	</div>
</div>

<div id="bottom-panel">
	<div class="readout-display">
		<h2>Hohmann Transfer Tool</h2>
		<HohmannIntercept />
	</div>

	<div id="maneuver_nodes" class="readout-display">
		<h2>Maneuver Node Editor</h2>
		<ManeuverNodeEditor />
	</div>
</div>

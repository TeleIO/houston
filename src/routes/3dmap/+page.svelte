<script lang="ts">
	import OrbitalMap from '$lib/components/maps/OrbitalMap.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/3dmap.css" />
</svelte:head>

<div id="orbital-map-container" class="readout-display">
	<OrbitalMap />
</div>

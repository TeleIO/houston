<script lang="ts">
	import GroundTrack from '$lib/components/maps/GroundTrack.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/ground-track.css" />
</svelte:head>

<div id="ground-track-wrapper">
	<GroundTrack showAltitudeEstimate={true} />
</div>

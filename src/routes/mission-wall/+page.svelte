<script lang="ts">
	import GroundTrack from '$lib/components/maps/GroundTrack.svelte';
	import CameraFeed from '$lib/components/camera/CameraFeed.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/mission-wall.css" />
</svelte:head>

<div id="ground-track-wrapper">
	<GroundTrack showAltitudeEstimate={true} />
</div>

<div id="orbital-map-and-camera-container-test">
	<div id="orbital-map-container" class="readout-display">
		<!-- TODO: OrbitalMap component (datalink.rate=2000) -->
		<div id="orbital-map"></div>
	</div>

	<CameraFeed />
</div>

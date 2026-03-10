<script lang="ts">
	import CameraFeed from '$lib/components/camera/CameraFeed.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/camera.css" />
</svelte:head>

<CameraFeed rate={1000} />

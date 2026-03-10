<script lang="ts">
	import CurrentStageBurnInfo from '$lib/components/data/CurrentStageBurnInfo.svelte';
	import StagingInfoTable from '$lib/components/data/StagingInfoTable.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/staging-analysis.css" />
</svelte:head>

<div id="top-panel">
	<div class="readout-display">
		<h2>Current Throttle Info</h2>
		<CurrentStageBurnInfo />
	</div>

	<div class="readout-display">
		<h2>Staging Info</h2>
		<StagingInfoTable />
	</div>
</div>

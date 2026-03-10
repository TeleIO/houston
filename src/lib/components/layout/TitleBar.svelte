<script lang="ts">
	import { formatUT, formatMET } from '$lib/utils/time-formatters';
	import { telemetry, connectionStatus } from '$lib/stores/telemachus';

	let { title }: { title: string } = $props();

	let lossOfSignal = $derived($connectionStatus === 'lost');
	let missionTime = $derived(
		lossOfSignal ? '\u26A0 LOS \u26A0' : formatMET($telemetry['v.missionTime'] as number)
	);
	let universalTime = $derived(formatUT($telemetry['t.universalTime'] as number));
</script>

<header id="title-bar">
	<div id="mission-time-warp-indicator" class="readout-display">
		<span id="mission-time" class:loss-of-signal={lossOfSignal}>{missionTime}</span>
	</div>

	<h1>{title}</h1>

	<div id="world-clock" class="readout-display">
		{universalTime}
	</div>
</header>

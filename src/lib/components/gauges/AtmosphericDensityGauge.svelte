<script lang="ts">
	import { telemetryField } from '$lib/stores/telemachus';

	const pressure = telemetryField<number>('v.atmosphericPressure');

	function logScale(x: number): number {
		return Math.log(2.0 * x);
	}

	const max = logScale(100);

	let gaugeValue = $derived.by(() => {
		const raw = logScale(($pressure ?? 0) * 100);
		return isFinite(raw) ? raw : 0;
	});
</script>

<div class="atmospheric-density-wrapper">
	<progress class="atmospheric_density" value={gaugeValue} {max}></progress>
	<p>Atmosphere</p>
</div>

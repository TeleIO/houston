<script lang="ts">
	import { telemetryField } from '$lib/stores/telemachus';

	const throttle = telemetryField<number>('f.throttle');
</script>

<div class="throttle-wrapper gauge">
	<p>
		<span class="min">0</span>
		Throttle
		<span class="max">100</span>
	</p>
	<progress class="throttle" value={($throttle ?? 0) * 100} max="100"></progress>
</div>

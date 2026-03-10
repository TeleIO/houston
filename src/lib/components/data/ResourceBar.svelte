<script lang="ts">
	import { telemetryField } from '$lib/stores/telemachus';

	interface Props {
		resourceName: string;
		label: string;
		showCurrentStage?: boolean;
		showTotal?: boolean;
		valuePrefix?: string;
	}

	let {
		resourceName,
		label,
		showCurrentStage = false,
		showTotal = true,
		valuePrefix = resourceName
	}: Props = $props();

	const totalAvailable = $derived(telemetryField<number>(`r.resource[${resourceName}]`));
	const totalMax = $derived(telemetryField<number>(`r.resourceMax[${resourceName}]`));
	const currentStageAvailable = $derived(telemetryField<number>(`r.resourceCurrent[${resourceName}]`));
	const currentStageMax = $derived(telemetryField<number>(`r.resourceCurrentMax[${resourceName}]`));

	function formatValue(value: number | undefined | null): string {
		if (value == null || value < 0) return 'NA';
		return value.toFixed(2);
	}
</script>

<div class="resource-readout">
	<p>{label}</p>

	{#if showCurrentStage}
		<div>
			<span class="label">Current Stage</span><br />
			{#if showTotal}
				<div class="totals">
					<span>{formatValue($currentStageAvailable)}</span>/<span
						>{formatValue($currentStageMax)}</span
					>
				</div>
			{/if}
			<progress value={$currentStageAvailable ?? 0} max={$currentStageMax ?? 0}>0%</progress>
		</div>
	{/if}

	<div>
		{#if showCurrentStage}
			<span class="label">Total</span><br />
		{/if}
		{#if showTotal}
			<div class="totals">
				<span>{formatValue($totalAvailable)}</span>/<span>{formatValue($totalMax)}</span>
			</div>
		{/if}
		<progress value={$totalAvailable ?? 0} max={$totalMax ?? 0}>0%</progress>
	</div>
</div>

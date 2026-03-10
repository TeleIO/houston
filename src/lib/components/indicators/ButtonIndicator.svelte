<script lang="ts">
	import { telemetryField } from '$lib/stores/telemachus';

	interface Props {
		field: string;
		label: string;
	}

	let { field, label }: Props = $props();

	const value = $derived(telemetryField<boolean>(field));
</script>

<div class="button-indicator" class:on={$value}>
	<span>{label}</span>
</div>

<script lang="ts">
	import { telemachusClient } from '$lib/stores/telemachus';

	interface Props {
		buttonId: string;
		apiString: string;
	}

	let { buttonId, apiString }: Props = $props();

	let active = $state(false);

	async function handleClick() {
		active = true;
		try {
			await telemachusClient.sendMessage({ action: apiString });
		} finally {
			active = false;
		}
	}
</script>

<div
	class="action-button"
	class:on={active}
	role="button"
	tabindex="0"
	onclick={handleClick}
	onkeydown={(e) => e.key === 'Enter' && handleClick()}
>
	{buttonId}
</div>

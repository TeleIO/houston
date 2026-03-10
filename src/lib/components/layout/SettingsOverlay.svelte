<script lang="ts">
	import { settings, updateSettings } from '$lib/stores/settings';

	let {
		open = false,
		onClose
	}: {
		open: boolean;
		onClose: () => void;
	} = $props();

	let host = $state($settings.host);
	let port = $state($settings.port);

	$effect(() => {
		host = $settings.host;
		port = $settings.port;
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		updateSettings({ host, port });
		onClose();
	}
</script>

<section id="settings_overlay" class:open>
	<form id="settings" onsubmit={handleSubmit}>
		<h2>Settings</h2>
		<fieldset>
			<label for="host">Host</label>
			<input name="host" id="host" type="text" placeholder="localhost" bind:value={host} /><br />

			<label for="port">Port</label>
			<input name="port" id="port" type="text" placeholder="8085" bind:value={port} />
		</fieldset>

		<button type="submit">Save &amp; Close</button>
	</form>
</section>

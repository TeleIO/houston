<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import TitleBar from '$lib/components/layout/TitleBar.svelte';
	import Navigation from '$lib/components/layout/Navigation.svelte';
	import SettingsOverlay from '$lib/components/layout/SettingsOverlay.svelte';
	import { startPolling } from '$lib/stores/telemachus';

	let { children } = $props();

	let navOpen = $state(false);
	let settingsOpen = $state(false);

	const pageTitles: Record<string, string> = {
		'/ascension': 'Ascension Module',
		'/boost': 'BOOST/EECOM',
		'/camera': 'Camera Feed',
		'/docking': 'Docking',
		'/ground-track': 'Ground Track',
		'/landing': 'Landing Module',
		'/mission-wall': 'Mission Wall',
		'/navigation': 'Navigation',
		'/staging-analysis': 'Staging Analysis',
		'/sysops': 'SYSOPS',
		'/vessel-overview': 'Vessel Overview',
		'/3dmap': '3D Orbital Map'
	};

	let currentTitle = $derived(pageTitles[$page.url.pathname] ?? 'Houston');

	onMount(() => {
		const stop = startPolling();
		return stop;
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/application.css" />
</svelte:head>

<Navigation
	open={navOpen}
	onToggle={() => (navOpen = !navOpen)}
	onOpenSettings={() => {
		settingsOpen = true;
		navOpen = false;
	}}
/>

<SettingsOverlay open={settingsOpen} onClose={() => (settingsOpen = false)} />

<div id="station">
	<TitleBar title={currentTitle} />
	<div id="content">
		{@render children()}
	</div>
</div>

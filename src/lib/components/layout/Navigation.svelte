<script lang="ts">
	import NavItem from './NavItem.svelte';
	import { settings } from '$lib/stores/settings';

	let {
		open = false,
		onToggle,
		onOpenSettings
	}: {
		open: boolean;
		onToggle: () => void;
		onOpenSettings: () => void;
	} = $props();

	let telemachusUrl = $derived(
		`http://${$settings.host}:${$settings.port}/telemachus/console.html`
	);
	let mkonUrl = $derived(
		`http://${$settings.host}:${$settings.port}/telemachus/MKON/index.html`
	);
</script>

<div id="open-navigation">
	<a href="#nav" onclick={(e) => { e.preventDefault(); onToggle(); }}>&darr; Open</a>
</div>

<nav class:open>
	<div id="close-navigation">
		<a href="#nav" onclick={(e) => { e.preventDefault(); onToggle(); }}>&uarr; Close Navigation</a>
	</div>

	<div id="overlay-grid">
		<figure>
			<figcaption>FIDO</figcaption>
			<ul>
				<NavItem navItem="ascension" title="Ascension" url="/ascension" />
				<NavItem navItem="navigation" title="Navigation" url="/navigation" />
				<NavItem navItem="landing" title="Landing" url="/landing" />
				<NavItem navItem="docking" title="Docking" url="/docking" />
			</ul>
		</figure>

		<figure>
			<figcaption>BOOST/EECOM</figcaption>
			<ul>
				<NavItem navItem="boost" title="BOOST/EECOM" url="/boost" />
			</ul>
		</figure>

		<figure>
			<figcaption>SYSOPS</figcaption>
			<ul>
				<NavItem navItem="sysops" title="SYSOPS" url="/sysops" />
				<NavItem navItem="map" title="Orbital Map" url="/3dmap" />
			</ul>
		</figure>

		<figure>
			<figcaption>CAPCOM</figcaption>
			<ul>
				<NavItem navItem="vessel-overview" title="Vessel Overview" url="/vessel-overview" />
				<NavItem navItem="map" title="Orbital Map" url="/3dmap" />
			</ul>
		</figure>

		<figure>
			<figcaption>TOOLS</figcaption>
			<ul>
				<NavItem navItem="ground-track" title="Ground Track" url="/ground-track" />
				<NavItem navItem="map" title="Orbital Map" url="/3dmap" />
				<NavItem navItem="mission-wall" title="Mission Wall" url="/mission-wall" />
				<NavItem navItem="camera" title="Camera Feed" url="/camera" />
				<NavItem navItem="staging-analysis" title="Staging Analysis" url="/staging-analysis" />
				<NavItem
					navItem="telemachus"
					title="Telemachus Console"
					url={telemachusUrl}
					id="telemachus-console"
					imageName="telemachus-preview.png"
				/>
				<NavItem
					navItem="mkon"
					title="MKON"
					url={mkonUrl}
					id="mkon"
					imageName="mkon-preview.png"
				/>
				<li id="settings-link">
					<a
						href="#settings"
						onclick={(e) => {
							e.preventDefault();
							onOpenSettings();
						}}
					>
						<img src="/images/settings-preview.svg" alt="Settings" />
						Settings
					</a>
				</li>
			</ul>
		</figure>
	</div>
</nav>

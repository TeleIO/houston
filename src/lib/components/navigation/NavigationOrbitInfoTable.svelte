<script lang="ts">
	import { telemetryData } from '$lib/stores/telemachus';
	import { distanceString, degreeString, velocityString } from '$lib/utils/data-formatters';
	import { durationString } from '$lib/utils/time-formatters';

	let data = $derived($telemetryData);

	let vesselBody = $derived((data['v.body'] as string) ?? '');
	let vesselAltitude = $derived(distanceString((data['v.altitude'] as number) ?? 0));

	let vesselApoapsis = $derived(distanceString((data['o.ApA'] as number) ?? 0));
	let targetApoapsis = $derived(distanceString((data['tar.o.ApA'] as number) ?? 0));

	let vesselPeriapsis = $derived(distanceString((data['o.PeA'] as number) ?? 0));
	let targetPeriapsis = $derived(distanceString((data['tar.o.PeA'] as number) ?? 0));

	let vesselTimeToAp = $derived('-' + durationString((data['o.timeToAp'] as number) ?? 0));
	let targetTimeToAp = $derived('-' + durationString((data['tar.o.timeToAp'] as number) ?? 0));

	let vesselTimeToPe = $derived('-' + durationString((data['o.timeToPe'] as number) ?? 0));
	let targetTimeToPe = $derived('-' + durationString((data['tar.o.timeToPe'] as number) ?? 0));

	let vesselInclination = $derived(degreeString((data['o.inclination'] as number) ?? 0));
	let targetInclination = $derived(degreeString((data['tar.o.inclination'] as number) ?? 0));

	let vesselEccentricity = $derived(((data['o.eccentricity'] as number) ?? 0).toFixed(3));
	let targetEccentricity = $derived(((data['tar.o.eccentricity'] as number) ?? 0).toFixed(3));

	let vesselOrbitalPeriod = $derived(durationString((data['o.period'] as number) ?? 0));
	let targetOrbitalPeriod = $derived(durationString((data['tar.o.period'] as number) ?? 0));

	let vesselTrueAnomaly = $derived(degreeString((data['o.trueAnomaly'] as number) ?? 0));
	let targetTrueAnomaly = $derived(degreeString((data['tar.o.trueAnomaly'] as number) ?? 0));

	let vesselSurfaceVelocity = $derived(velocityString((data['v.surfaceVelocity'] as number) ?? 0));
	let vesselVerticalSpeed = $derived(velocityString((data['v.verticalSpeed'] as number) ?? 0));
	let vesselOrbitalVelocity = $derived(velocityString((data['v.orbitalVelocity'] as number) ?? 0));

	let vesselRelativeVelocity = $derived(velocityString((data['o.relativeVelocity'] as number) ?? 0));
	let targetRelativeVelocity = $derived(velocityString((data['tar.o.relativeVelocity'] as number) ?? 0));

	let vesselGForce = $derived(((data['v.geeForce'] as number) ?? 0).toFixed(2));
</script>

<table class="readout-table">
	<thead>
		<tr>
			<th></th>
			<th>Vessel</th>
			<th>Target</th>
		</tr>
	</thead>
	<tbody>
		<tr><th>Reference Body</th><td>{vesselBody}</td><td>{vesselBody}</td></tr>
		<tr><th>Altitude</th><td>{vesselAltitude}</td><td></td></tr>
		<tr><th>Apoapsis</th><td>{vesselApoapsis}</td><td>{targetApoapsis}</td></tr>
		<tr><th>Periapsis</th><td>{vesselPeriapsis}</td><td>{targetPeriapsis}</td></tr>
		<tr><th>Time to Apoapsis</th><td>{vesselTimeToAp}</td><td>{targetTimeToAp}</td></tr>
		<tr><th>Time to Periapsis</th><td>{vesselTimeToPe}</td><td>{targetTimeToPe}</td></tr>
		<tr><th>Inclination</th><td>{vesselInclination}</td><td>{targetInclination}</td></tr>
		<tr><th>Eccentricity</th><td>{vesselEccentricity}</td><td>{targetEccentricity}</td></tr>
		<tr><th>Orbital Period</th><td>{vesselOrbitalPeriod}</td><td>{targetOrbitalPeriod}</td></tr>
		<tr><th>True Anomaly</th><td>{vesselTrueAnomaly}</td><td>{targetTrueAnomaly}</td></tr>
		<tr><th>Surface Velocity</th><td>{vesselSurfaceVelocity}</td><td></td></tr>
		<tr><th>Vertical Velocity</th><td>{vesselVerticalSpeed}</td><td></td></tr>
		<tr><th>Orbital Velocity</th><td>{vesselOrbitalVelocity}</td><td></td></tr>
		<tr><th>Relative Velocity</th><td>{vesselRelativeVelocity}</td><td>{targetRelativeVelocity}</td></tr>
		<tr><th>G-Force</th><td>{vesselGForce}</td><td></td></tr>
	</tbody>
</table>

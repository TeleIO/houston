#!/usr/bin/env bun
/**
 * Demo Telemachus server — mimics the KSP Telemachus HTTP API.
 * Run with: bun run scripts/demo-server.ts
 * Then open Houston with default settings (localhost:8085).
 */

const PORT = 8085;

// Orbital simulation state
const startTime = Date.now();
const kerbinRadius = 600_000;
const mu = 3.5316e12; // Kerbin GM
const periapsis = 85_000;
const apoapsis = 120_000;
const semiMajorAxis = kerbinRadius + (periapsis + apoapsis) / 2;
const eccentricity = 0.01;
const orbitalPeriod = 2040;
const inclination = 28.5;

let throttle = 0;
let liquidFuel = 400;
const liquidFuelMax = 400;
let oxidizer = 489;
const oxidizerMax = 489;
let electricCharge = 150;
const electricChargeMax = 150;

function generateTelemetry(requestedFields: string[]): Record<string, unknown> {
	const elapsed = (Date.now() - startTime) / 1000;
	const missionTime = elapsed;

	const trueAnomaly = ((elapsed / orbitalPeriod) * 2 * Math.PI) % (2 * Math.PI);
	const r = semiMajorAxis * (1 - eccentricity * eccentricity) /
		(1 + eccentricity * Math.cos(trueAnomaly));
	const altitude = r - kerbinRadius;
	const orbitalVelocity = Math.sqrt(mu * (2 / r - 1 / semiMajorAxis));
	const surfaceVelocity = orbitalVelocity - 174.94;
	const verticalSpeed = orbitalVelocity * eccentricity * Math.sin(trueAnomaly) /
		(1 + eccentricity * Math.cos(trueAnomaly));
	const meanAnomaly = trueAnomaly - eccentricity * Math.sin(trueAnomaly);
	const timeToAp = ((Math.PI - meanAnomaly) / (2 * Math.PI)) * orbitalPeriod;
	const timeToPe = ((2 * Math.PI - meanAnomaly) / (2 * Math.PI)) * orbitalPeriod;
	const kerbinRotation = (2 * Math.PI) / 21_549.425;
	const longitude = ((trueAnomaly - kerbinRotation * elapsed) * 180 / Math.PI) % 360;
	const latitude = inclination * Math.sin(trueAnomaly);
	const pitch = 5 * Math.sin(elapsed * 0.1);
	const roll = 2 * Math.sin(elapsed * 0.07);
	const heading = (elapsed * 0.5) % 360;
	const atmosphericPressure = altitude < 70_000 ? Math.exp(-altitude / 5000) : 0;
	electricCharge = Math.max(0, electricChargeMax - (elapsed * 0.01));
	const universalTime = 1_000_000 + elapsed * 4;
	const gForce = 1.0 + throttle * 2.5;

	const allData: Record<string, unknown> = {
		'v.altitude': altitude,
		'v.heightFromTerrain': altitude,
		'v.orbitalVelocity': orbitalVelocity,
		'v.surfaceVelocity': Math.abs(surfaceVelocity),
		'v.verticalSpeed': verticalSpeed,
		'v.geeForce': gForce,
		'v.lat': latitude,
		'v.long': longitude,
		'v.body': 'Kerbin',
		'v.name': 'Demo Vessel',
		'v.atmosphericPressure': atmosphericPressure,
		'v.missionTime': missionTime,
		'v.height': altitude,
		'o.ApA': apoapsis,
		'o.PeA': periapsis,
		'o.timeToAp': Math.abs(timeToAp),
		'o.timeToPe': Math.abs(timeToPe),
		'o.inclination': inclination,
		'o.eccentricity': eccentricity,
		'o.orbitalPeriod': orbitalPeriod,
		'o.trueAnomaly': trueAnomaly * 180 / Math.PI,
		'o.semiMajorAxis': semiMajorAxis,
		'o.LAN': 45.0,
		'o.argumentOfPeriapsis': 90.0,
		't.universalTime': universalTime,
		't.timeWarp': 1,
		'f.throttle': throttle,
		'v.rcsValue': true,
		'v.sasValue': true,
		'v.lightValue': false,
		'v.gearValue': false,
		'v.brakeValue': false,
		'n.pitch': pitch,
		'n.roll': roll,
		'n.heading': heading,
		'r.resource{LiquidFuel}': liquidFuel,
		'r.resourceMax{LiquidFuel}': liquidFuelMax,
		'r.resource{Oxidizer}': oxidizer,
		'r.resourceMax{Oxidizer}': oxidizerMax,
		'r.resource{ElectricCharge}': electricCharge,
		'r.resourceMax{ElectricCharge}': electricChargeMax,
		'r.resource{MonoPropellant}': 30,
		'r.resourceMax{MonoPropellant}': 30,
		'r.resource{Ablator}': 200,
		'r.resourceMax{Ablator}': 200,
		'r.resource{SolidFuel}': 0,
		'r.resourceMax{SolidFuel}': 0,
		'r.resource{XenonGas}': 50,
		'r.resourceMax{XenonGas}': 50,
		'r.resource{Ore}': 0,
		'r.resourceMax{Ore}': 100,
		'r.resourceCurrent{LiquidFuel}': liquidFuel * 0.3,
		'r.resourceCurrentMax{LiquidFuel}': liquidFuelMax * 0.3,
		'r.resourceCurrent{Oxidizer}': oxidizer * 0.3,
		'r.resourceCurrentMax{Oxidizer}': oxidizerMax * 0.3,
		'r.resourceCurrent{ElectricCharge}': electricCharge,
		'r.resourceCurrentMax{ElectricCharge}': electricChargeMax,
		'r.resourceCurrent{MonoPropellant}': 30,
		'r.resourceCurrentMax{MonoPropellant}': 30,
		'r.resourceCurrent{SolidFuel}': 0,
		'r.resourceCurrentMax{SolidFuel}': 0,
		'r.resourceCurrent{XenonGas}': 50,
		'r.resourceCurrentMax{XenonGas}': 50,
		'tar.name': 'Station Alpha',
		'tar.type': 'Ship',
		'tar.distance': 12_500 + 1000 * Math.sin(elapsed * 0.02),
		'tar.o.orbitingBody': 'Kerbin',
		'tar.o.ApA': 150_000,
		'tar.o.PeA': 145_000,
		'tar.o.timeToAp': 500,
		'tar.o.timeToPe': 1200,
		'tar.o.inclination': 28.6,
		'tar.o.eccentricity': 0.002,
		'tar.o.period': 2200,
		'tar.o.velocity': 2250,
		'tar.o.relativeVelocity': 15.3 + 5 * Math.sin(elapsed * 0.05),
		'dock.ax': 0.5 * Math.sin(elapsed * 0.3),
		'dock.ay': 0.3 * Math.cos(elapsed * 0.2),
		'dock.az': 0.1 * Math.sin(elapsed * 0.4),
		'dock.x': 5.0 * Math.cos(elapsed * 0.1),
		'dock.y': 3.0 * Math.sin(elapsed * 0.15),
		's.sensor.grav': ['Gravioli Detector', [[9.81]]],
		's.sensor.acc': ['Accelerometer', [[gForce * 9.81]]],
		's.sensor.pres': ['Barometer', [[atmosphericPressure * 101325]]],
		's.sensor.temp': ['Thermometer', [[250 + 20 * Math.sin(elapsed * 0.01)]]],
		'v.stageValue': 3,
		'o.maneuverNodes': 0,
	};

	// Return only requested fields (using brace-notation keys as Telemachus does)
	if (requestedFields.length === 0) return allData;

	const result: Record<string, unknown> = {};
	for (const field of requestedFields) {
		if (field in allData) {
			result[field] = allData[field];
		}
	}
	return result;
}

Bun.serve({
	port: PORT,
	fetch(req) {
		const url = new URL(req.url);

		// CORS headers for dev
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': '*',
		};

		if (req.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		// Telemachus datalink endpoint
		if (url.pathname === '/telemachus/datalink') {
			if (req.method === 'POST') {
				// Handle commands
				return req.json().then((body: Record<string, unknown>) => {
					if (body.action === 'f.throttleUp') throttle = Math.min(1, throttle + 0.1);
					if (body.action === 'f.throttleDown') throttle = Math.max(0, throttle - 0.1);
					return Response.json({ status: 'ok' }, { headers: corsHeaders });
				});
			}

			// GET — return requested telemetry
			const fields = [...url.searchParams.keys()];
			const data = generateTelemetry(fields);
			return Response.json(data, { headers: corsHeaders });
		}

		// Camera list endpoint
		if (url.pathname === '/telemachus/cameras') {
			return Response.json([
				{ name: 'Main Camera', index: 0 },
				{ name: 'Docking Camera', index: 1 }
			], { headers: corsHeaders });
		}

		return new Response('Houston Demo Server', { status: 200, headers: corsHeaders });
	}
});

console.log(`Houston demo server running on http://localhost:${PORT}`);
console.log('Simulating vessel in 85-120km Kerbin orbit');
console.log('Press Ctrl+C to stop');

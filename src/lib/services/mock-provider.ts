import type { DataProvider } from './data-provider';

/**
 * Mock data provider that generates realistic KSP telemetry.
 * Simulates a vessel in low Kerbin orbit with slowly changing parameters.
 */
export class MockProvider implements DataProvider {
	private subscribedFields: Record<string, string> = {};
	private loopTimeout: ReturnType<typeof setTimeout> | null = null;
	private active = false;
	private dataCallbacks: ((data: Record<string, unknown>) => void)[] = [];
	private connectionCallbacks: ((state: 'connected' | 'disconnected' | 'connecting') => void)[] = [];
	private startTime = Date.now();
	private missionStartTime = Date.now();

	rate: number;

	// Orbital parameters for a ~100km circular-ish Kerbin orbit
	private periapsis = 85_000; // m
	private apoapsis = 120_000; // m
	private orbitalPeriod = 2040; // seconds (~34 min)
	private inclination = 28.5; // degrees
	private eccentricity = 0.01;

	// Vessel state
	private throttle = 0;
	private liquidFuel = 400;
	private liquidFuelMax = 400;
	private oxidizer = 489;
	private oxidizerMax = 489;
	private electricCharge = 150;
	private electricChargeMax = 150;
	private monopropellant = 30;
	private monopropellantMax = 30;
	private ablator = 200;
	private ablatorMax = 200;

	constructor(rate = 500) {
		this.rate = rate;
	}

	updateConnection(): void {
		// no-op for mock
	}

	subscribeToData(fields: string[]): void {
		for (const field of fields) {
			this.subscribedFields[field] = field;
		}
	}

	unsubscribeFromData(fields: string[]): void {
		for (const field of fields) {
			delete this.subscribedFields[field];
		}
	}

	onData(callback: (data: Record<string, unknown>) => void): void {
		this.dataCallbacks.push(callback);
	}

	onConnectionChange(callback: (state: 'connected' | 'disconnected' | 'connecting') => void): void {
		this.connectionCallbacks.push(callback);
	}

	private emitData(data: Record<string, unknown>): void {
		for (const cb of this.dataCallbacks) {
			try { cb(data); } catch (e) { console.error(e); }
		}
	}

	private emitConnection(state: 'connected' | 'disconnected' | 'connecting'): void {
		for (const cb of this.connectionCallbacks) {
			try { cb(state); } catch (e) { console.error(e); }
		}
	}

	start(): void {
		if (this.active) return;
		this.active = true;
		this.startTime = Date.now();
		this.missionStartTime = Date.now();
		this.emitConnection('connected');
		this.poll();
	}

	stop(): void {
		this.active = false;
		if (this.loopTimeout !== null) {
			clearTimeout(this.loopTimeout);
			this.loopTimeout = null;
		}
		this.emitConnection('disconnected');
	}

	async sendMessage(params: Record<string, unknown>): Promise<Record<string, unknown>> {
		// Simulate action group toggles
		const action = params['action'] as string | undefined;
		if (action === 'f.throttleUp') {
			this.throttle = Math.min(1, this.throttle + 0.1);
		} else if (action === 'f.throttleDown') {
			this.throttle = Math.max(0, this.throttle - 0.1);
		}
		return { status: 'ok' };
	}

	async getCameraList(): Promise<unknown> {
		return [
			{ name: 'Main Camera', url: '/images/camera-test.jpeg' },
			{ name: 'Docking Camera', url: '/images/camera-test.jpeg' }
		];
	}

	private generateData(): Record<string, unknown> {
		const elapsed = (Date.now() - this.startTime) / 1000; // seconds
		const missionTime = (Date.now() - this.missionStartTime) / 1000;

		// True anomaly advances around the orbit
		const trueAnomaly = ((elapsed / this.orbitalPeriod) * 2 * Math.PI) % (2 * Math.PI);

		// Altitude varies between periapsis and apoapsis
		const kerbinRadius = 600_000;
		const semiMajorAxis = kerbinRadius + (this.periapsis + this.apoapsis) / 2;
		const r = semiMajorAxis * (1 - this.eccentricity * this.eccentricity) /
			(1 + this.eccentricity * Math.cos(trueAnomaly));
		const altitude = r - kerbinRadius;

		// Orbital velocity (vis-viva)
		const mu = 3.5316e12; // Kerbin GM
		const orbitalVelocity = Math.sqrt(mu * (2 / r - 1 / semiMajorAxis));
		const surfaceVelocity = orbitalVelocity - 174.94; // subtract Kerbin rotation

		// Vertical speed (radial component)
		const verticalSpeed = orbitalVelocity * this.eccentricity * Math.sin(trueAnomaly) /
			(1 + this.eccentricity * Math.cos(trueAnomaly));

		// Time to apoapsis/periapsis (simplified)
		const meanAnomaly = trueAnomaly - this.eccentricity * Math.sin(trueAnomaly);
		const timeToAp = ((Math.PI - meanAnomaly) / (2 * Math.PI)) * this.orbitalPeriod;
		const timeToPe = ((2 * Math.PI - meanAnomaly) / (2 * Math.PI)) * this.orbitalPeriod;

		// Ground track position
		const kerbinRotation = (2 * Math.PI) / 21_549.425; // Kerbin sidereal day in rad/s
		const longitude = ((trueAnomaly - kerbinRotation * elapsed) * 180 / Math.PI) % 360;
		const latitude = this.inclination * Math.sin(trueAnomaly);

		// Attitude (slowly drifting)
		const pitch = 5 * Math.sin(elapsed * 0.1);
		const roll = 2 * Math.sin(elapsed * 0.07);
		const heading = (elapsed * 0.5) % 360;

		// Atmospheric pressure (essentially 0 at 100km)
		const atmosphericPressure = altitude < 70_000
			? Math.exp(-altitude / 5000)
			: 0;

		// Height from terrain (Kerbin is mostly flat at ~0m)
		const heightFromTerrain = altitude;

		// Slowly deplete electric charge (realistic drain)
		this.electricCharge = Math.max(0,
			this.electricChargeMax - (elapsed * 0.01));

		// Universal time (KSP epoch + elapsed)
		const universalTime = 1_000_000 + elapsed * 4; // 4x time warp

		// G-force (1.0 in orbit unless thrusting)
		const gForce = 1.0 + this.throttle * 2.5;

		const data: Record<string, unknown> = {
			// Vessel
			'v.altitude': altitude,
			'v.heightFromTerrain': heightFromTerrain,
			'v.orbitalVelocity': orbitalVelocity,
			'v.surfaceVelocity': Math.abs(surfaceVelocity),
			'v.verticalSpeed': verticalSpeed,
			'v.geeForce': gForce,
			'v.lat': latitude,
			'v.long': longitude,
			'v.body': 'Kerbin',
			'v.name': 'Mock Vessel I',
			'v.atmosphericPressure': atmosphericPressure,
			'v.missionTime': missionTime,
			'v.height': altitude,

			// Orbit
			'o.ApA': this.apoapsis,
			'o.PeA': this.periapsis,
			'o.timeToAp': Math.abs(timeToAp),
			'o.timeToPe': Math.abs(timeToPe),
			'o.inclination': this.inclination,
			'o.eccentricity': this.eccentricity,
			'o.orbitalPeriod': this.orbitalPeriod,
			'o.trueAnomaly': trueAnomaly * 180 / Math.PI,
			'o.semiMajorAxis': semiMajorAxis,
			'o.LAN': 45.0,
			'o.argumentOfPeriapsis': 90.0,

			// Time
			't.universalTime': universalTime,
			't.timeWarp': 1,

			// Flight controls
			'f.throttle': this.throttle,

			// Button states
			'v.rcsValue': true,
			'v.sasValue': true,
			'v.lightValue': false,
			'v.gearValue': false,
			'v.brakeValue': false,

			// Attitude
			'n.pitch': pitch,
			'n.roll': roll,
			'n.heading': heading,

			// Resources - total
			'r.resource[LiquidFuel]': this.liquidFuel,
			'r.resourceMax[LiquidFuel]': this.liquidFuelMax,
			'r.resource[Oxidizer]': this.oxidizer,
			'r.resourceMax[Oxidizer]': this.oxidizerMax,
			'r.resource[ElectricCharge]': this.electricCharge,
			'r.resourceMax[ElectricCharge]': this.electricChargeMax,
			'r.resource[MonoPropellant]': this.monopropellant,
			'r.resourceMax[MonoPropellant]': this.monopropellantMax,
			'r.resource[Ablator]': this.ablator,
			'r.resourceMax[Ablator]': this.ablatorMax,
			'r.resource[SolidFuel]': 0,
			'r.resourceMax[SolidFuel]': 0,
			'r.resource[XenonGas]': 50,
			'r.resourceMax[XenonGas]': 50,
			'r.resource[Ore]': 0,
			'r.resourceMax[Ore]': 100,

			// Resources - current stage
			'r.resourceCurrent[LiquidFuel]': this.liquidFuel * 0.3,
			'r.resourceCurrentMax[LiquidFuel]': this.liquidFuelMax * 0.3,
			'r.resourceCurrent[Oxidizer]': this.oxidizer * 0.3,
			'r.resourceCurrentMax[Oxidizer]': this.oxidizerMax * 0.3,
			'r.resourceCurrent[ElectricCharge]': this.electricCharge,
			'r.resourceCurrentMax[ElectricCharge]': this.electricChargeMax,
			'r.resourceCurrent[MonoPropellant]': this.monopropellant,
			'r.resourceCurrentMax[MonoPropellant]': this.monopropellantMax,
			'r.resourceCurrent[SolidFuel]': 0,
			'r.resourceCurrentMax[SolidFuel]': 0,
			'r.resourceCurrent[XenonGas]': 50,
			'r.resourceCurrentMax[XenonGas]': 50,

			// Target (simulate a target vessel in slightly higher orbit)
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
			'tar.o.trueAnomaly': (trueAnomaly * 180 / Math.PI + 15) % 360,
			'tar.o.semiMajorAxis': kerbinRadius + 147_500,
			'tar.o.LAN': 45.2,
			'tar.o.argumentOfPeriapsis': 88.0,

			// Docking data
			'dock.ax': 0.5 * Math.sin(elapsed * 0.3),
			'dock.ay': 0.3 * Math.cos(elapsed * 0.2),
			'dock.az': 0.1 * Math.sin(elapsed * 0.4),
			'dock.x': 5.0 * Math.cos(elapsed * 0.1),
			'dock.y': 3.0 * Math.sin(elapsed * 0.15),

			// Sensors
			's.sensor.grav': ['Gravioli Detector', [[9.81]]],
			's.sensor.acc': ['Accelerometer', [[gForce * 9.81]]],
			's.sensor.pres': ['Barometer', [[atmosphericPressure * 101325]]],
			's.sensor.temp': ['Thermometer', [[250 + 20 * Math.sin(elapsed * 0.01)]]],

			// Staging info (simplified)
			'v.stageValue': 3,

			// Maneuver nodes
			'o.maneuverNodes': 0,
		};

		// Only return subscribed fields
		const result: Record<string, unknown> = {};
		for (const field of Object.keys(this.subscribedFields)) {
			if (field in data) {
				result[field] = data[field];
			}
		}
		return result;
	}

	private poll(): void {
		if (!this.active) return;

		const data = this.generateData();
		this.emitData(data);

		if (this.active) {
			this.loopTimeout = setTimeout(() => this.poll(), this.rate);
		}
	}
}

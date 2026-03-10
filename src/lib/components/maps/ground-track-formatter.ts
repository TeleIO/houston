/**
 * Orbital path segment as computed by the formatter.
 */
export interface OrbitPath {
	type: 'orbital' | 'suborbital';
	pathType: 'orbitPath' | 'maneuverNode';
	parentType: string;
	points: [number, number][];
	altitudes: { time: number; altitude: number }[];
}

export interface FormattedGroundTrackData {
	vesselCurrentCoordinates: [number, number] | null;
	targetCurrentCoordinates: [number, number] | null;
	vesselSuborbitalPaths: OrbitPath[];
	vesselOrbitalPaths: OrbitPath[];
	targetSuborbitalPaths: OrbitPath[];
	targetOrbitalPaths: OrbitPath[];
	currentUniversalTime: number;
	referenceBodyName: string;
	atmosphericRadius: number;
}

/**
 * Converts raw position data from OrbitalPositionData into lat/lon paths
 * suitable for rendering on a Leaflet map.
 *
 * This is a faithful port of ground_track_position_data_formatter.js.
 */
export class GroundTrackPositionDataFormatter {
	private rootReferenceBodyName: string | null = null;
	private currentUniversalTime: number = 0;
	public onFormat: ((data: FormattedGroundTrackData) => void) | null = null;

	constructor(opts?: { numberOfSegments?: number }) {
		// numberOfSegments is used by the original OrbitalPositionData for request batching
		void (opts?.numberOfSegments ?? 120);
	}

	format(positionData: any): void {
		const formattedData: FormattedGroundTrackData = {
			vesselCurrentCoordinates: null,
			targetCurrentCoordinates: null,
			vesselSuborbitalPaths: [],
			vesselOrbitalPaths: [],
			targetSuborbitalPaths: [],
			targetOrbitalPaths: [],
			currentUniversalTime: positionData.currentUniversalTime,
			referenceBodyName: positionData.vesselBody,
			atmosphericRadius: this.getAtmosphericRadius(positionData.vesselBody)
		};

		this.currentUniversalTime = positionData.currentUniversalTime;
		this.formatVesselCurrentCoordinates(positionData, formattedData);
		this.formatTargetCurrentCoordinates(positionData, formattedData);
		this.formatVesselOrbitalPaths(positionData, formattedData);
		this.formatTargetOrbitalPaths(positionData, formattedData);

		this.onFormat?.(formattedData);
	}

	private getAtmosphericRadius(_bodyName: string): number {
		// In the original, this calls datalink.getOrbitalBodyInfo(). Since we don't
		// have that API wired yet, return a sensible Kerbin default.
		// TODO: wire to provider.getOrbitalBodyInfo() when available
		return 70000;
	}

	private formatVesselCurrentCoordinates(positionData: any, formattedData: FormattedGroundTrackData) {
		this.rootReferenceBodyName = positionData.vesselBody;
		const currentPosition = positionData.vesselCurrentPosition?.relativePosition;
		if (!currentPosition) return;
		const info = this.rootReferenceBody(positionData);
		if (!info) return;
		const coords = this.coordinatesFromVector(currentPosition, info.radius);
		if (coords) formattedData.vesselCurrentCoordinates = coords;
	}

	private formatTargetCurrentCoordinates(positionData: any, formattedData: FormattedGroundTrackData) {
		if (this.rootReferenceBodyName !== positionData['tar.o.orbitingBody']) return;
		if (positionData['tar.type'] !== 'Vessel') return;
		const currentPosition = positionData.targetCurrentPosition?.relativePosition;
		if (!currentPosition) return;
		const info = this.rootReferenceBody(positionData);
		if (!info) return;
		const coords = this.coordinatesFromVector(currentPosition, info.radius);
		if (coords) formattedData.targetCurrentCoordinates = coords;
	}

	private formatVesselOrbitalPaths(positionData: any, formattedData: FormattedGroundTrackData) {
		const orbitPatches = positionData['o.orbitPatches'] ?? [];
		const pathSet = this.formatPathSet(positionData, orbitPatches, 'currentVessel', 'orbitPath');

		formattedData.vesselOrbitalPaths = formattedData.vesselOrbitalPaths.concat(
			pathSet.filter((x) => x.type === 'orbital')
		);
		formattedData.vesselSuborbitalPaths = formattedData.vesselSuborbitalPaths.concat(
			pathSet.filter((x) => x.type === 'suborbital')
		);

		this.formatManeuverNodes(positionData, formattedData, positionData['o.maneuverNodes'] ?? []);
	}

	private formatTargetOrbitalPaths(positionData: any, formattedData: FormattedGroundTrackData) {
		if (positionData['tar.type'] !== 'Vessel') return;
		const orbitPatches = positionData['tar.o.orbitPatches'] ?? [];
		const pathSet = this.formatPathSet(positionData, orbitPatches, 'targetVessel', 'orbitPath');

		formattedData.targetOrbitalPaths = pathSet.filter((x) => x.type === 'orbital');
		formattedData.targetSuborbitalPaths = pathSet.filter((x) => x.type === 'suborbital');
	}

	private formatManeuverNodes(
		positionData: any,
		formattedData: FormattedGroundTrackData,
		maneuverNodes: any[]
	) {
		for (const node of maneuverNodes) {
			if (node.referenceBody !== this.rootReferenceBodyName) break;

			for (const orbitPatch of node.orbitPatches ?? []) {
				const pathSet = this.formatPathSet(
					positionData,
					[orbitPatch],
					'currentVessel',
					'maneuverNode'
				);
				if (pathSet.length === 0) return;

				formattedData.vesselOrbitalPaths = formattedData.vesselOrbitalPaths.concat(
					pathSet.filter((x) => x.type === 'orbital')
				);
				formattedData.vesselSuborbitalPaths = formattedData.vesselSuborbitalPaths.concat(
					pathSet.filter((x) => x.type === 'suborbital')
				);
			}
		}
	}

	private formatPathSet(
		positionData: any,
		orbitPatches: any[],
		parentType: string,
		pathType: 'orbitPath' | 'maneuverNode'
	): OrbitPath[] {
		const pathSets: OrbitPath[] = [];
		let currentPathType: string | null = null;
		let currentPathSet: OrbitPath | null = null;
		const info = this.rootReferenceBody(positionData);
		if (!info) return pathSets;
		const orbitalClearance = this.orbitalClearanceDistance(positionData);

		for (const orbitPatch of orbitPatches) {
			if (orbitPatch.referenceBody !== this.rootReferenceBodyName) break;

			const posData = orbitPatch.positionData ?? {};
			const sortedTimes = this.sortedUniversalTimes(posData);

			for (const time of sortedTimes) {
				const key = time.toString();
				const entry = posData[key];
				if (!entry?.relativePosition) continue;
				const position = entry.relativePosition;

				const coordinates = this.coordinatesFromVector(position, info.radius);
				if (!coordinates) continue;
				const length = this.vectorLength(position);

				if (
					length <= info.radius ||
					(time < this.currentUniversalTime && pathType !== 'maneuverNode')
				) {
					continue;
				}

				const type = length > orbitalClearance ? 'orbital' : 'suborbital';

				if (type !== currentPathType) {
					currentPathSet = {
						type,
						pathType,
						parentType,
						points: [],
						altitudes: []
					};
					pathSets.push(currentPathSet);
				}

				currentPathSet!.points.push(coordinates);
				currentPathSet!.altitudes.push({ time, altitude: length - info.radius });
				currentPathType = type;
			}
		}

		return pathSets;
	}

	private vectorLength(v: number[]): number {
		return Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
	}

	private coordinatesFromVector(vector: number[], radius: number): [number, number] | null {
		const [x, y, z] = vector;
		const lat = 90 - Math.acos(z / radius) * (180 / Math.PI);
		const lon = ((270 + Math.atan2(x, y) * (180 / Math.PI)) % 360) - 180;
		if (isNaN(lat) || isNaN(lon)) return null;
		return [lat, lon];
	}

	private sortedUniversalTimes(data: Record<string, any>): number[] {
		return Object.keys(data)
			.map((x) => parseFloat(x))
			.sort((a, b) => b - a);
	}

	private orbitalClearanceDistance(positionData: any): number {
		const info = this.rootReferenceBody(positionData);
		return (info?.radius ?? 600000) + this.getAtmosphericRadius(this.rootReferenceBodyName ?? '');
	}

	private rootReferenceBody(positionData: any): { radius: number } | null {
		return positionData.referenceBodies?.[this.rootReferenceBodyName ?? ''] ?? null;
	}
}

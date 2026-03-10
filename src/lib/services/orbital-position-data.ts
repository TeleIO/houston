import { getOrbitalBodyInfo } from '$lib/data/orbital-bodies';
import type { DataProvider } from './data-provider';

/* eslint-disable @typescript-eslint/no-explicit-any */
type PositionData = Record<string, any>;

export interface OrbitalPositionDataOptions {
	onRecalculate?: ((data: PositionData) => void) | null;
	numberOfSegments?: number;
}

export class OrbitalPositionData {
	private provider: DataProvider;
	private timeoutRate = 1000;
	private mutexTimestamp: number | null = null;
	private rootReferenceBody: { name: string; id: number } | null = null;
	options: Required<OrbitalPositionDataOptions>;

	constructor(provider: DataProvider, options?: OrbitalPositionDataOptions) {
		this.provider = provider;
		this.options = {
			onRecalculate: options?.onRecalculate ?? null,
			numberOfSegments: options?.numberOfSegments ?? 120
		};
		this.initializeDatalink();
	}

	private isLocked(): boolean {
		return !!(
			this.mutexTimestamp &&
			this.mutexTimestamp < (Date.now() / 1000 | 0) + this.timeoutRate
		);
	}

	private mutexLock(): void {
		this.mutexTimestamp = Date.now();
	}

	private mutexUnlock(): void {
		this.mutexTimestamp = null;
	}

	recalculate(data: PositionData): void {
		if (this.isLocked()) return;
		this.mutexLock();

		const positionData: PositionData = {
			...data,
			currentUniversalTime: data['t.universalTime'],
			vesselBody: data['v.body'],
			vesselCurrentPosition: { relativePosition: null },
			targetCurrentPosition: { relativePosition: null }
		};

		this.getPositionsAndRecalculate(positionData);
	}

	private async getPositionsAndRecalculate(positionData: PositionData): Promise<void> {
		const requestParams: Record<string, string> = {};
		const referenceBody = getOrbitalBodyInfo(positionData.vesselBody);
		if (!referenceBody) {
			this.mutexUnlock();
			return;
		}
		this.rootReferenceBody = referenceBody;

		requestParams['currentReferenceBodyRadius'] = `b.radius[${referenceBody.id}]`;
		requestParams['currentReferenceBodyTruePosition'] = `b.o.truePositionAtUT[${referenceBody.id},${positionData.currentUniversalTime}]`;
		requestParams['vesselCurrentPositionRelativePosition'] = `o.relativePositionAtUTForOrbitPatch[0,${positionData.currentUniversalTime}]`;

		this.buildRelativePositionRequestsForOrbitPatches(
			requestParams, 'vesselCurrentOrbit',
			positionData['o.orbitPatches'] ?? [], positionData.currentUniversalTime
		);

		this.buildRelativePositionRequestsForManeuverNodeOrbitPatches(
			requestParams, 'vesselManeuverNodes',
			positionData['o.maneuverNodes'] ?? [], positionData.currentUniversalTime
		);

		if (positionData['tar.type']) {
			if (positionData['tar.o.orbitPatches']?.length > 0) {
				this.buildRelativePositionRequestsForOrbitPatches(
					requestParams, 'targetCurrentOrbit',
					positionData['tar.o.orbitPatches'], positionData.currentUniversalTime, 'tar.o'
				);
				requestParams['targetCurrentPositionRelativePosition'] = `tar.o.relativePositionAtUTForOrbitPatch[0,${positionData.currentUniversalTime}]`;
			} else {
				const body = getOrbitalBodyInfo(positionData['tar.name']);
				if (body) {
					requestParams[`${body.name}[metadata]radius`] = `b.radius[${body.id}]`;
					requestParams[`${body.name}[${positionData.currentUniversalTime}]TruePosition`] = `b.o.truePositionAtUT[${body.id},${positionData.currentUniversalTime}]`;
					requestParams[`${body.name}[metadata]currentTruePosition`] = `b.o.truePositionAtUT[${body.id},${positionData.currentUniversalTime}]`;
				}
			}
		}

		try {
			const data = await this.provider.sendMessage(requestParams);
			positionData['currentReferenceBodyRadius'] = data['currentReferenceBodyRadius'];
			positionData['currentReferenceBodyTruePosition'] = data['currentReferenceBodyTruePosition'];

			this.buildReferenceBodyPositionData(data, positionData);
			this.buildReferenceBodyMetadata(data, positionData);

			positionData.vesselCurrentPosition.relativePosition = data['vesselCurrentPositionRelativePosition'];
			this.buildRelativePositionPositionDataForOrbitPatches(data, positionData, 'vesselCurrentOrbit', 'o.orbitPatches');

			if (positionData['o.maneuverNodes']) {
				this.buildRelativePositionPositionDataForManeuverNodeOrbitPatches(data, positionData, 'vesselManeuverNodes', 'o.maneuverNodes');
			}

			if (positionData['tar.o.orbitPatches']) {
				this.buildRelativePositionPositionDataForOrbitPatches(data, positionData, 'targetCurrentOrbit', 'tar.o.orbitPatches');
				positionData.targetCurrentPosition.relativePosition = data['targetCurrentPositionRelativePosition'];
			}

			this.mutexUnlock();
			this.options.onRecalculate?.(positionData);
		} catch {
			this.mutexUnlock();
		}
	}

	private buildRelativePositionRequestsForOrbitPatches(
		requestParams: Record<string, string>,
		orbitPatchType: string,
		orbitPatches: any[],
		currentUniversalTime: number,
		requestPrefix = 'o'
	): void {
		for (let i = 0; i < orbitPatches.length; i++) {
			const orbitPatch = orbitPatches[i];
			const startUT = orbitPatch.startUT;
			const endUT = orbitPatch.endUT;
			const referenceBody = getOrbitalBodyInfo(orbitPatch.referenceBody);
			if (!referenceBody || !this.rootReferenceBody) continue;

			const timeInterval = (endUT - startUT) / this.options.numberOfSegments;

			for (let j = 0; j < this.options.numberOfSegments; j++) {
				let UTForInterval = startUT + timeInterval * j;
				if (UTForInterval > endUT) UTForInterval = endUT;

				requestParams[`${this.rootReferenceBody.name}[${UTForInterval}]TruePosition`] =
					`b.o.truePositionAtUT[${this.rootReferenceBody.id},${UTForInterval}]`;
				requestParams[`${orbitPatchType}[${i}][${UTForInterval}]RelativePosition`] =
					`${requestPrefix}.relativePositionAtUTForOrbitPatch[${i},${UTForInterval}]`;
				requestParams[`${orbitPatch.referenceBody}[${UTForInterval}]TruePosition`] =
					`b.o.truePositionAtUT[${referenceBody.id},${UTForInterval}]`;
			}

			requestParams[`${orbitPatch.referenceBody}[metadata]radius`] = `b.radius[${referenceBody.id}]`;
			requestParams[`${orbitPatch.referenceBody}[metadata]currentTruePosition`] = `b.o.truePositionAtUT[${referenceBody.id},${currentUniversalTime}]`;
		}
	}

	private buildRelativePositionRequestsForManeuverNodeOrbitPatches(
		requestParams: Record<string, string>,
		maneuverNodeType: string,
		maneuverNodes: any[],
		currentUniversalTime: number
	): void {
		const requestPrefix = 'o.maneuverNodes.relativePositionAtUTForManeuverNodesOrbitPatch';

		for (let i = 0; i < maneuverNodes.length; i++) {
			const maneuverNode = maneuverNodes[i];
			const labelPrefix = `${maneuverNodeType}[${i}]`;

			for (let j = 0; j < maneuverNode.orbitPatches.length; j++) {
				const orbitPatch = maneuverNode.orbitPatches[j];
				const startUT = orbitPatch.startUT;
				const endUT = orbitPatch.endUT;
				const period = orbitPatch.period;
				const endTransition = orbitPatch.patchEndTransition;
				const referenceBody = getOrbitalBodyInfo(orbitPatch.referenceBody);
				if (!referenceBody || !this.rootReferenceBody) continue;

				const expectedUT = startUT + period;
				const timeInterval =
					expectedUT < endUT && endTransition === 'MANEUVER'
						? (expectedUT - startUT) / this.options.numberOfSegments
						: (endUT - startUT) / this.options.numberOfSegments;

				let UTForInterval = startUT;
				for (let k = 0; k < this.options.numberOfSegments; k++) {
					UTForInterval = (UTForInterval ?? startUT) + timeInterval;
					if (UTForInterval > endUT) UTForInterval = endUT;

					requestParams[`${this.rootReferenceBody.name}[${UTForInterval}]TruePosition`] =
						`b.o.truePositionAtUT[${this.rootReferenceBody.id},${UTForInterval}]`;
					requestParams[`${labelPrefix}[${j}][${UTForInterval}]RelativePosition`] =
						`${requestPrefix}[${i},${j},${UTForInterval}]`;
					requestParams[`${orbitPatch.referenceBody}[${UTForInterval}]TruePosition`] =
						`b.o.truePositionAtUT[${referenceBody.id},${UTForInterval}]`;
				}

				requestParams[`${orbitPatch.referenceBody}[metadata]radius`] = `b.radius[${referenceBody.id}]`;
				requestParams[`${orbitPatch.referenceBody}[metadata]currentTruePosition`] = `b.o.truePositionAtUT[${referenceBody.id},${currentUniversalTime}]`;
			}
		}
	}

	private buildRelativePositionPositionDataForOrbitPatches(
		rawData: Record<string, any>,
		positionData: PositionData,
		orbitPatchType: string,
		orbitPatchesKey: string
	): void {
		const regex = new RegExp(`${orbitPatchType}\\[(\\d+)\\]\\[([\\d.]+)\\]RelativePosition`);
		const orbitPatches = (positionData[orbitPatchesKey] = positionData[orbitPatchesKey] ?? {});

		for (const key of Object.keys(rawData)) {
			const match = regex.exec(key);
			if (match) {
				const orbitPatchIndex = parseInt(match[1]);
				const universalTime = match[2];
				const relativePosition = rawData[key];

				const orbitPatch = (orbitPatches[orbitPatchIndex] = orbitPatches[orbitPatchIndex] ?? {});
				const opPositionData = (orbitPatch.positionData = orbitPatch.positionData ?? {});
				opPositionData[universalTime] = opPositionData[universalTime] ?? {};
				opPositionData[universalTime].relativePosition = relativePosition;
			}
		}
	}

	private buildRelativePositionPositionDataForManeuverNodeOrbitPatches(
		rawData: Record<string, any>,
		positionData: PositionData,
		maneuverNodeType: string,
		maneuverNodesKey: string
	): void {
		const regex = new RegExp(
			`${maneuverNodeType}\\[(\\d+)\\]\\[(\\d+)\\]\\[([\\d.]+)\\]RelativePosition`
		);
		const maneuverNodes = (positionData[maneuverNodesKey] = positionData[maneuverNodesKey] ?? {});

		for (const key of Object.keys(rawData)) {
			const match = regex.exec(key);
			if (match) {
				const maneuverNodeIndex = parseInt(match[1]);
				const orbitPatchIndex = parseInt(match[2]);
				const universalTime = match[3];
				const relativePosition = rawData[key];

				const orbitPatch = (maneuverNodes[maneuverNodeIndex].orbitPatches[orbitPatchIndex] =
					maneuverNodes[maneuverNodeIndex].orbitPatches[orbitPatchIndex] ?? {});
				const opPositionData = (orbitPatch.positionData = orbitPatch.positionData ?? {});
				opPositionData[universalTime] = opPositionData[universalTime] ?? {};
				opPositionData[universalTime].relativePosition = relativePosition;
			}
		}
	}

	private buildReferenceBodyPositionData(rawData: Record<string, any>, positionData: PositionData): void {
		const regex = /(\w+)\[([\d.]+)\]TruePosition$/;

		for (const key of Object.keys(rawData)) {
			const match = regex.exec(key);
			if (match) {
				const referenceBodyName = match[1];
				const universalTime = match[2];
				const truePosition = rawData[key];

				const referenceBodies = (positionData.referenceBodies = positionData.referenceBodies ?? {});
				const referenceBodyObject = (referenceBodies[referenceBodyName] = referenceBodies[referenceBodyName] ?? {});
				referenceBodyObject.positionData = referenceBodyObject.positionData ?? {};
				referenceBodyObject.positionData[universalTime] = referenceBodyObject.positionData[universalTime] ?? {};
				referenceBodyObject.positionData[universalTime].truePosition = truePosition;
			}
		}
	}

	private buildReferenceBodyMetadata(rawData: Record<string, any>, positionData: PositionData): void {
		const regex = /(\w+)\[metadata\](\w+)$/;

		for (const key of Object.keys(rawData)) {
			const match = regex.exec(key);
			if (match) {
				const referenceBodyName = match[1];
				const field = match[2];
				const value = rawData[key];

				const referenceBodies = (positionData.referenceBodies = positionData.referenceBodies ?? {});
				const referenceBodyObject = (referenceBodies[referenceBodyName] = referenceBodies[referenceBodyName] ?? {});
				referenceBodyObject[field] = value;
			}
		}
	}

	private initializeDatalink(): void {
		this.provider.subscribeToData([
			'o.orbitPatches', 't.universalTime', 'v.body',
			'tar.name', 'tar.type', 'tar.o.orbitingBody',
			'tar.o.orbitPatches', 'o.maneuverNodes'
		]);

		this.provider.onData((data) => this.recalculate(data));
	}
}

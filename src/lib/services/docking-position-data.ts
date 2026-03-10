import { matrixAdd } from '$lib/utils/math-polyfill';
import { getOrbitalBodyInfo } from '$lib/data/orbital-bodies';
import type { DataProvider } from './data-provider';

/* eslint-disable @typescript-eslint/no-explicit-any */
type PositionData = Record<string, any>;

export interface DockingPositionDataOptions {
	onRecalculate?: ((data: PositionData) => void) | null;
	numberOfSegments?: number;
}

export class DockingPositionData {
	private provider: DataProvider;
	private timeoutRate = 1000;
	private mutexTimestamp: number | null = null;
	options: Required<DockingPositionDataOptions>;

	constructor(provider: DataProvider, options?: DockingPositionDataOptions) {
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
			targetBody: data['tar.o.orbitingBody'],
			vesselCurrentPosition: { relativePosition: null },
			targetCurrentPosition: { relativePosition: null }
		};

		this.getPositionsAndRecalculate(positionData);
	}

	private async getPositionsAndRecalculate(positionData: PositionData): Promise<void> {
		const requestParams: Record<string, string> = {};

		const vesselBody = getOrbitalBodyInfo(positionData.vesselBody);
		if (!vesselBody) {
			this.mutexUnlock();
			return;
		}

		requestParams['vesselBodyTruePosition'] = `b.o.truePositionAtUT[${vesselBody.id},${positionData.currentUniversalTime}]`;
		requestParams['vesselRelativePosition'] = `o.relativePositionAtUTForOrbitPatch[0,${positionData.currentUniversalTime}]`;

		if (positionData['tar.type']) {
			if (positionData['tar.o.orbitPatches']?.length > 0) {
				const targetBody = getOrbitalBodyInfo(positionData.targetBody);
				if (targetBody) {
					requestParams['targetBodyTruePosition'] = `b.o.truePositionAtUT[${targetBody.id},${positionData.currentUniversalTime}]`;
					requestParams['targetRelativePosition'] = `tar.o.relativePositionAtUTForOrbitPatch[0,${positionData.currentUniversalTime}]`;
				}
			} else {
				const body = getOrbitalBodyInfo(positionData['tar.name']);
				if (body) {
					requestParams['targetTruePosition'] = `b.o.truePositionAtUT[${body.id},${positionData.currentUniversalTime}]`;
				}
			}
		}

		try {
			const data = await this.provider.sendMessage(requestParams);

			positionData.vesselCurrentPosition.truePosition = this.truePositionForRelativePosition(
				data['vesselRelativePosition'] as number[],
				data['vesselBodyTruePosition'] as number[]
			);

			if (positionData['tar.type']) {
				if (positionData['tar.o.orbitPatches']) {
					positionData.targetCurrentPosition.truePosition = this.truePositionForRelativePosition(
						data['targetRelativePosition'] as number[],
						data['targetBodyTruePosition'] as number[]
					);
				} else {
					positionData.targetCurrentPosition.truePosition = data['targetTruePosition'];
				}
			}

			this.mutexUnlock();
			this.options.onRecalculate?.(positionData);
		} catch {
			this.mutexUnlock();
		}
	}

	private truePositionForRelativePosition(
		relativePositionVector: number[],
		frameOfReferenceVector: number[]
	): number[] {
		const transformed = [
			relativePositionVector[0],
			relativePositionVector[2],
			relativePositionVector[1]
		];
		return matrixAdd(frameOfReferenceVector, transformed);
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

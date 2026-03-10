import { matrixAdd, scaleMatrix } from '$lib/utils/math-polyfill';
import { getOrbitalBodyInfo } from '$lib/data/orbital-bodies';

export interface FormattedReferenceBody {
	name: string;
	type: string;
	radius: number;
	truePosition: number[];
	linkedPatchID?: number;
	linkedPatchType?: string;
	atmosphericRadius: number;
	color?: string;
}

export interface FormattedVessel {
	name: string;
	type: string;
	truePosition: number[];
	referenceBodyName: string;
}

export interface FormattedOrbitPatch {
	type: string;
	parentType: string;
	parentName: string;
	truePositions: number[][];
}

export interface FormattedManeuverNode {
	type: string;
	parentType: string;
	parentName: string;
	orbitPatches: FormattedOrbitPatch[];
}

export interface FormattedReferenceBodyPath {
	referenceBodyName: string;
	truePositions: number[][];
}

export interface FormattedData {
	referenceBodies: FormattedReferenceBody[];
	vessels: FormattedVessel[];
	orbitPatches: FormattedOrbitPatch[];
	maneuverNodes: FormattedManeuverNode[];
	referenceBodyPaths: FormattedReferenceBodyPath[];
	distancesFromRootReferenceBody: FormattedReferenceBodyPath[];
	currentUniversalTime: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type PositionData = Record<string, any>;

export interface PositionDataFormatterOptions {
	onFormat?: ((data: FormattedData) => void) | null;
	numberOfSegments?: number;
}

export class PositionDataFormatter {
	private rootReferenceBodyName: string | null = null;
	private options: Required<PositionDataFormatterOptions>;

	constructor(options?: PositionDataFormatterOptions) {
		this.options = {
			onFormat: options?.onFormat ?? null,
			numberOfSegments: options?.numberOfSegments ?? 120
		};
	}

	format(positionData: PositionData): void {
		const formattedData: FormattedData = {
			referenceBodies: [],
			vessels: [],
			orbitPatches: [],
			maneuverNodes: [],
			referenceBodyPaths: [],
			distancesFromRootReferenceBody: [],
			currentUniversalTime: positionData.currentUniversalTime
		};

		this.formatReferenceBodies(positionData, formattedData);
		this.formatCurrentVessel(positionData, formattedData);
		this.formatTargetVessel(positionData, formattedData);
		this.formatOrbitalPatches(positionData, formattedData);
		this.formatManeuverNodes(positionData, formattedData);
		this.formatTargetOrbitPatches(positionData, formattedData);
		this.formatReferenceBodyPaths(positionData, formattedData);

		this.options.onFormat?.(formattedData);
	}

	private formatReferenceBodies(positionData: PositionData, formattedData: FormattedData): void {
		const referenceBodyNames = Object.keys(positionData.referenceBodies ?? {});

		for (const name of referenceBodyNames) {
			const info = positionData.referenceBodies[name];
			let type = 'currentPosition';

			if (positionData['tar.type'] === 'CelestialBody' && positionData['tar.name'] === name) {
				type = 'targetBodyCurrentPosition';
			}

			const bodyInfo = getOrbitalBodyInfo(name);

			formattedData.referenceBodies.push({
				name,
				type,
				radius: info.radius,
				truePosition: this.formatTruePositionVector(info.currentTruePosition),
				atmosphericRadius: bodyInfo?.atmosphericRadius ?? 0,
				color: bodyInfo?.color
			});
		}
	}

	private formatReferenceBodyPaths(positionData: PositionData, formattedData: FormattedData): void {
		const referenceBodyNames = Object.keys(positionData.referenceBodies ?? {});
		for (const name of referenceBodyNames) {
			const info = positionData.referenceBodies[name];
			const positionDataKeys = Object.keys(info.positionData ?? {});
			const sortedUniversalTimes = positionDataKeys.map(parseFloat).reverse();

			const positions: number[][] = [];
			for (const ut of sortedUniversalTimes) {
				const key = ut.toString();
				positions.push(this.formatTruePositionVector(info.positionData[key].truePosition));
			}

			formattedData.referenceBodyPaths.push({
				referenceBodyName: name,
				truePositions: positions
			});
		}
	}

	private formatCurrentVessel(positionData: PositionData, formattedData: FormattedData): void {
		const currentVesselTruePosition = this.truePositionForRelativePosition(
			positionData.vesselCurrentPosition.relativePosition,
			this.formatTruePositionVector(
				positionData.referenceBodies[positionData.vesselBody].currentTruePosition
			)
		);

		this.rootReferenceBodyName = positionData.vesselBody;

		formattedData.vessels.push({
			name: 'current vessel',
			type: 'currentVessel',
			truePosition: currentVesselTruePosition,
			referenceBodyName: positionData.vesselBody
		});
	}

	private formatTargetVessel(positionData: PositionData, formattedData: FormattedData): void {
		if (!positionData['tar.type']) return;
		if (positionData['tar.type'] === 'Vessel') {
			const targetCurrentTruePosition = this.truePositionForRelativePosition(
				positionData.targetCurrentPosition.relativePosition,
				this.formatTruePositionVector(
					positionData.referenceBodies[positionData['tar.o.orbitingBody']].currentTruePosition
				)
			);

			formattedData.vessels.push({
				name: positionData['tar.name'],
				type: 'targetVessel',
				truePosition: targetCurrentTruePosition,
				referenceBodyName: positionData['tar.o.orbitingBody']
			});
		}
	}

	private formatTargetOrbitPatches(positionData: PositionData, formattedData: FormattedData): void {
		if (!positionData['tar.type']) return;
		if (positionData['tar.o.orbitPatches']?.length > 0) {
			formattedData.orbitPatches = formattedData.orbitPatches.concat(
				this.formatOrbitPatchesInternal(
					formattedData,
					positionData,
					positionData['tar.o.orbitPatches'],
					{ type: 'orbitPatch', parentType: 'targetVessel', parentName: positionData['tar.name'] },
					{ linkedPatchType: 'orbitPatch' }
				)
			);
		}
	}

	private formatOrbitalPatches(positionData: PositionData, formattedData: FormattedData): void {
		formattedData.orbitPatches = this.formatOrbitPatchesInternal(
			formattedData,
			positionData,
			positionData['o.orbitPatches'],
			{ type: 'orbitPatch', parentType: 'vessel', parentName: 'current vessel' },
			{ linkedPatchType: 'orbitPatch' }
		);
	}

	private formatManeuverNodes(positionData: PositionData, formattedData: FormattedData): void {
		const maneuverNodes = positionData['o.maneuverNodes'] ?? [];
		for (const maneuverNode of maneuverNodes) {
			const orbitPatches = this.formatOrbitPatchesInternal(
				formattedData,
				positionData,
				maneuverNode.orbitPatches,
				{ type: 'maneuverNode', parentType: 'vessel', parentName: 'current vessel' },
				{ linkedPatchType: 'maneuverNode' }
			);

			formattedData.maneuverNodes.push({
				type: 'maneuverNode',
				parentType: 'vessel',
				parentName: 'current vessel',
				orbitPatches
			});
		}
	}

	private findProjectedPositionOfReferenceBody(
		rootReferenceBody: any,
		body: any,
		universalTime: number
	): number[] {
		const distancePoints = this.findDistanceVectorBetweenBodiesAtTime(
			rootReferenceBody,
			body,
			universalTime
		);
		return matrixAdd(distancePoints[1], scaleMatrix(-1, distancePoints[0]));
	}

	private findDistanceVectorBetweenBodiesAtTime(
		rootBody: any,
		targetBody: any,
		universalTime: number
	): [number[], number[]] {
		const closestUniversalTime = this.findTruePositionClosestToRelativeTime(
			universalTime,
			rootBody.positionData
		);
		return [
			rootBody.positionData[closestUniversalTime!].truePosition,
			targetBody.positionData[universalTime].truePosition
		];
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

	private findTruePositionClosestToRelativeTime(
		universalTime: number,
		positionData: Record<string, any>
	): number | null {
		const sortedUniversalTimes = Object.keys(positionData)
			.map(parseFloat)
			.sort((a, b) => a - b);

		let closestTime: number | null = null;
		let closestDistance: number | null = null;

		for (const time of sortedUniversalTimes) {
			const distance = Math.abs(universalTime - time);
			if (closestTime === null || closestDistance === null || distance < closestDistance) {
				closestTime = time;
				closestDistance = distance;
			}
		}

		return closestTime;
	}

	private formatOrbitPatchesInternal(
		formattedData: FormattedData,
		positionData: PositionData,
		rawOrbitPatches: any[],
		orbitPatchOptions: { type: string; parentType: string; parentName: string },
		referenceBodyOptions?: { linkedPatchType?: string }
	): FormattedOrbitPatch[] {
		const formattedOrbitPatches: FormattedOrbitPatch[] = [];
		let lastPatchesPoint: number[] | null = null;

		for (let j = 0; j < rawOrbitPatches.length; j++) {
			const orbitPatch = rawOrbitPatches[j];
			const referenceBody = positionData.referenceBodies[orbitPatch.referenceBody];
			const sortedUniversalTimes = this.sortedUniversalTimes(orbitPatch.positionData);
			const positions: number[][] = [];
			let distanceFromLastPatchesPoint: number[] | null = null;
			const middleUniversalTime =
				sortedUniversalTimes[Math.floor((sortedUniversalTimes.length - 1) / 2)];

			for (let k = 0; k < sortedUniversalTimes.length; k++) {
				const key = sortedUniversalTimes[k].toString();

				let frameOfReferenceVector: number[];
				if (
					orbitPatch.referenceBody === this.rootReferenceBodyName ||
					orbitPatch.referenceBody === 'Sun'
				) {
					frameOfReferenceVector = this.formatTruePositionVector(
						referenceBody.currentTruePosition
					);
				} else {
					frameOfReferenceVector = this.findProjectedPositionOfReferenceBody(
						this.rootReferenceBody(positionData),
						referenceBody,
						sortedUniversalTimes[k]
					);
				}

				const relativePositionVector = orbitPatch.positionData[key].relativePosition;
				let projectedTruePosition = this.truePositionForRelativePosition(
					relativePositionVector,
					frameOfReferenceVector
				);

				if (lastPatchesPoint !== null) {
					if (k === 0) {
						distanceFromLastPatchesPoint = [
							lastPatchesPoint[0] - projectedTruePosition[0],
							lastPatchesPoint[1] - projectedTruePosition[1],
							lastPatchesPoint[2] - projectedTruePosition[2]
						];
					}

					projectedTruePosition = [
						projectedTruePosition[0] + distanceFromLastPatchesPoint![0],
						projectedTruePosition[1] + distanceFromLastPatchesPoint![1],
						projectedTruePosition[2] + distanceFromLastPatchesPoint![2]
					];

					if (
						middleUniversalTime === sortedUniversalTimes[k] &&
						orbitPatch.referenceBody !== this.rootReferenceBodyName
					) {
						const positionOfReferenceBody = [
							frameOfReferenceVector[0] + distanceFromLastPatchesPoint![0],
							frameOfReferenceVector[1] + distanceFromLastPatchesPoint![1],
							frameOfReferenceVector[2] + distanceFromLastPatchesPoint![2]
						];

						const bodyInfo = getOrbitalBodyInfo(orbitPatch.referenceBody);
						formattedData.referenceBodies.push({
							name: orbitPatch.referenceBody,
							type: 'projected',
							radius: referenceBody.radius,
							truePosition: positionOfReferenceBody,
							linkedPatchID: j,
							atmosphericRadius: bodyInfo?.atmosphericRadius ?? 0,
							...(referenceBodyOptions ?? {})
						});
					}
				}

				positions.push(projectedTruePosition);
			}

			lastPatchesPoint = positions[positions.length - 1] ?? null;

			formattedOrbitPatches.push({
				truePositions: positions,
				...orbitPatchOptions
			});
		}

		return formattedOrbitPatches;
	}

	private formatTruePositionVector(vector: number[]): number[] {
		return vector;
	}

	private sortedUniversalTimes(positionData: Record<string, any>): number[] {
		return Object.keys(positionData)
			.map(parseFloat)
			.sort((a, b) => b - a);
	}

	private rootReferenceBody(positionData: PositionData): any {
		return positionData.referenceBodies[this.rootReferenceBodyName!];
	}
}

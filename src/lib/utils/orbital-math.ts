export interface UniversalDateTimeParts {
	year: number;
	day: number;
	universalTime: number;
	hour: number;
	minutes: number;
	seconds: string;
}

export interface PQWVector {
	p: number;
	q: number;
	w: number;
}

export interface IJKVector {
	i: number;
	j: number;
	k: number;
}

type VectorRecord = Record<string, number>;

const SECONDS_PER_YEAR = 365 * 24 * 3600;
const SECONDS_PER_DAY = 24 * 3600;

export function partsOfUniversalDateTime(time: number | null | undefined): UniversalDateTimeParts {
	time = time ?? 0;
	const year = ((time / SECONDS_PER_YEAR) | 0) + 1;
	time %= SECONDS_PER_YEAR;
	const day = ((time / SECONDS_PER_DAY) | 0) + 1;
	time %= SECONDS_PER_DAY;
	const universalTime = time;
	const hour = (time / 3600) | 0;
	time %= 3600;
	const minutes = (time / 60) | 0;
	const seconds = (time % 60 | 0).toFixed();
	return { year, day, universalTime, hour, minutes, seconds };
}

export function calculateGMSTInDegrees(universalDateTime: number): number {
	const timeParts = partsOfUniversalDateTime(universalDateTime);
	const G = 6.697374558;
	const dayFactor = 0.06570982441908;
	const timeFactor = 1.00273790935;
	return G + dayFactor * timeParts.day + timeFactor * timeParts.hour;
}

export function eccentricAnomalyFromTrueAnomalyAndEccentricity(
	trueAnomaly: number,
	eccentricity: number
): number {
	return (
		2 *
		Math.atan(
			Math.sqrt((1 - eccentricity) / (1 + eccentricity)) * Math.tan(trueAnomaly / 2)
		)
	);
}

export function meanMotionFromGravitationalParametersAndSemimajorAxis(
	gravitationalParameter: number,
	semiMajorAxis: number
): number {
	return Math.sqrt(gravitationalParameter / Math.pow(semiMajorAxis, 3));
}

export function meanAnomalyFromEccentricAnomalyAndEccentricity(
	eccentricAnomaly: number,
	eccentricity: number
): number {
	return eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly);
}

export function meanAnomalyAtTimeAndMeanMotion(
	meanMotion: number,
	startTime: number,
	endTime: number,
	originalMeanAnomaly: number
): number {
	const deltaT = endTime - startTime;
	return originalMeanAnomaly + meanMotion * deltaT;
}

export function estimateEccentricAnomalyFromMeanAnomalyAndEccentricity(
	meanAnomaly: number,
	eccentricity: number
): number {
	let error = 100;
	let eccentricAnomaly1 = meanAnomaly;
	while (error > 0.00000000001) {
		const newEccentricAnomaly = meanAnomaly + eccentricity * Math.sin(eccentricAnomaly1);
		error = Math.abs(newEccentricAnomaly - eccentricAnomaly1);
		eccentricAnomaly1 = newEccentricAnomaly;
	}
	return eccentricAnomaly1;
}

export function trueAnomalyFromEccentricAnomalyAndEccentricity(
	eccentricAnomaly: number,
	eccentricity: number
): number {
	const x = Math.sqrt(1 - eccentricity) * Math.cos(eccentricAnomaly / 2);
	const y = Math.sqrt(1 + eccentricity) * Math.sin(eccentricAnomaly / 2);
	return 2 * Math.atan2(y, x);
}

export function findSemiLatusRectum(semiMajorAxis: number, eccentricity: number): number {
	return semiMajorAxis * (1 - Math.pow(eccentricity, 2));
}

export function findPolarEquationOfConic(
	semiMajorAxis: number,
	eccentricity: number,
	trueAnomaly: number
): number {
	const p = findSemiLatusRectum(semiMajorAxis, eccentricity);
	return p / (1 + eccentricity * Math.cos(trueAnomaly));
}

export function positionVectorInPQWFrame(
	semiMajorAxis: number,
	eccentricity: number,
	trueAnomaly: number
): PQWVector {
	const r = findPolarEquationOfConic(semiMajorAxis, eccentricity, trueAnomaly);
	return {
		p: r * Math.cos(trueAnomaly),
		q: r * Math.sin(trueAnomaly),
		w: 0
	};
}

export function velocityVectorInPQWFrame(
	semiMajorAxis: number,
	eccentricity: number,
	trueAnomaly: number,
	gravitationalParameter: number
): PQWVector {
	const p = findSemiLatusRectum(semiMajorAxis, eccentricity);
	void Math.sqrt(gravitationalParameter / p); // original never used the factor
	return {
		p: -Math.sin(trueAnomaly),
		q: eccentricity + Math.cos(trueAnomaly),
		w: 0
	};
}

export function transformVector(matrix: number[][], vector: VectorRecord): VectorRecord {
	const vectorKeys = Object.keys(vector);
	const newVector: VectorRecord = {};
	for (let i = 0; i < matrix.length; i++) {
		const row = matrix[i];
		const derivativeVector = vectorKeys[i];
		for (let j = 0; j < vectorKeys.length; j++) {
			const currentKey = vectorKeys[j];
			if (!newVector[derivativeVector]) newVector[derivativeVector] = 0;
			newVector[derivativeVector] += vector[currentKey] * row[j];
		}
	}
	return newVector;
}

export function transformPositionPQWVectorToIJKFrame(
	vector: PQWVector,
	inclination: number,
	longitudeOfAscendingNode: number,
	argumentOfPeriapsis: number
): IJKVector {
	const omega = longitudeOfAscendingNode;
	const w = argumentOfPeriapsis;
	const i = inclination;

	const transformationMatrix = [
		[
			Math.cos(omega) * Math.cos(w) - Math.sin(omega) * Math.sin(w) * Math.cos(i),
			-Math.cos(omega) * Math.sin(w) - Math.sin(omega) * Math.cos(w) * Math.cos(i),
			Math.sin(omega) * Math.sin(i)
		],
		[
			Math.sin(omega) * Math.cos(w) + Math.cos(omega) * Math.sin(w) * Math.cos(i),
			-Math.sin(omega) * Math.sin(w) + Math.cos(omega) * Math.cos(w) * Math.cos(i),
			-Math.cos(omega) * Math.sin(i)
		],
		[
			Math.sin(w) * Math.sin(i),
			Math.cos(w) * Math.sin(i),
			Math.cos(i)
		]
	];

	const vecRecord: VectorRecord = { p: vector.p, q: vector.q, w: vector.w };
	const transformed = transformVector(transformationMatrix, vecRecord);
	return { i: transformed.p, j: transformed.q, k: transformed.w };
}

export function findLatitudeOfPositionUnitVector(vector: IJKVector): number {
	const x = Math.sqrt(Math.pow(vector.i, 2) + Math.pow(vector.j, 2));
	return Math.atan(vector.k / x);
}

export function angularFrequencyOfBody(period: number): number {
	return (2 * Math.PI) / period;
}

export function calculateGMSTInRadiansForOrigin(vector: IJKVector, longitude: number): number {
	const theta = Math.atan(vector.j / vector.i);
	return theta - longitude;
}

export function findLongitudeOfPositionUnitVector(
	vector: IJKVector,
	angularVelocityOfPlanet: number,
	startTime: number,
	endTime: number,
	GMSTInRadians: number
): number {
	const deltaT = endTime - startTime;
	const theta = Math.atan(vector.j / vector.i);
	return theta - GMSTInRadians - angularVelocityOfPlanet * deltaT;
}

export function TWR(thrust: number, totalMass: number, surfaceGravity: number): number {
	return thrust / (totalMass * surfaceGravity);
}

export function MaxTWR(maxAcceleration: number, surfaceGravity: number): number {
	return maxAcceleration / surfaceGravity;
}

export function secondsToUseFuelAtCurrentThrust(
	massOfFuel: number,
	thrust: number,
	isp: number
): number {
	if (thrust <= 0 || isp <= 0) return -1;
	return massOfFuel / ((thrust / isp) * (1 / 9.81));
}

export function weightOfFuelUsedDuringBurn(
	thrust: number,
	isp: number,
	deltaT: number
): number {
	return (thrust / isp) * (1 / 9.81) * deltaT;
}

export function deltaVForBurn(
	thrust: number,
	startMass: number,
	endMass: number,
	deltaT: number
): number {
	if (deltaT > 0 && startMass > endMass && startMass > 0 && endMass > 0) {
		return (thrust * deltaT) / (startMass - endMass) * Math.log(startMass / endMass);
	}
	return 0.0;
}

export function toDegrees(angleInRadians: number): number {
	return angleInRadians * (180 / Math.PI);
}

export function toRadians(angleInDegrees: number): number {
	return angleInDegrees * (Math.PI / 180);
}

export function crossProduct(x: number[], y: number[]): number[] {
	return [
		x[1] * y[2] - x[2] * y[1],
		x[2] * y[0] - x[0] * y[2],
		x[0] * y[1] - x[1] * y[0]
	];
}

export function matrixAdd(...arrays: number[][]): number[] {
	const count = arrays[0].length;
	const results: number[] = [];
	for (let next = 0; next < count; next++) {
		let sum = 0;
		for (let i = 0; i < arrays.length; i++) {
			sum += Number(arrays[i][next]);
		}
		results[next] = sum;
	}
	return results;
}

export function scaleMatrix(factor: number, matrix: number[]): number[] {
	const result: number[] = [];
	for (let i = 0; i < matrix.length; i++) {
		result[i] = factor * matrix[i];
	}
	return result;
}

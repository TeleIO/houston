import numeral from 'numeral';

export function distanceString(value: number): string {
	return numeral(value).format('0,0.000 a') + 'm';
}

export function heightFromTerrainString(value: number): string {
	if (value <= -1) return 'NA';
	return numeral(value).format('0,0.000 a') + 'm';
}

export function degreeString(value: number): string {
	return numeral(value).format('0.000') + '\u00B0';
}

export function velocityString(value: number): string {
	return numeral(value).format('0,0.000 a') + 'm/s';
}

export function temperatureString(value: number): string {
	if (!value) return 'NA';
	return numeral(value).format('0,000') + '\u00B0C';
}

export function accelerationSensorString(value: [string, number[]]): string {
	if (value[0] === 'No Sensors of the Appropriate Type') return 'NA';
	return numeral(value[1][0]).format('0,000') + 'G';
}

export function pressureSensorString(value: [string, number[]]): string {
	if (value[0] === 'No Sensors of the Appropriate Type') return 'NA';
	return numeral(value[1][0]).format('0,000') + 'Pa';
}

export function gravitySensorString(value: [string, number[]]): string {
	if (value[0] === 'No Sensors of the Appropriate Type') return 'NA';
	return numeral(value[1][0]).format('0,000 a') + 'm/s\u00B2';
}

export function newtonsString(value: number): string {
	return numeral(value).format('0,0.00') + ' N';
}

export function percentageString(value: number): string {
	return numeral(value).format('0%');
}

export function tonnageString(value: number): string {
	return numeral(value).format('0,0.00') + ' t';
}

export function timeString(value: number): string {
	return numeral(value).format('00:00:00');
}

export function plainNumberString(value: number): string {
	return numeral(value).format('0,0.00');
}

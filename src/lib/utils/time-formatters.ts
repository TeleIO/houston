const SECONDS_PER_YEAR = 365 * 24 * 3600;
const SECONDS_PER_DAY = 24 * 3600;

function hourMinSec(t: number): string {
	t = t ?? 0;
	let hour: string | number = (t / 3600) | 0;
	if (hour < 10) hour = '0' + hour;
	t %= 3600;
	let min: string | number = (t / 60) | 0;
	if (min < 10) min = '0' + min;
	let sec: string | number = (t % 60 | 0).toFixed();
	if (Number(sec) < 10) sec = '0' + sec;
	return `${hour}:${min}:${sec}`;
}

export function formatUT(t: number | null | undefined): string {
	t = t ?? 0;
	const year = ((t / SECONDS_PER_YEAR) | 0) + 1;
	t %= SECONDS_PER_YEAR;
	const day = ((t / SECONDS_PER_DAY) | 0) + 1;
	t %= SECONDS_PER_DAY;
	return `Year ${year}, Day ${day}, ${hourMinSec(t)} UT`;
}

export function formatMET(t: number | null | undefined): string {
	t = t ?? 0;
	let result = 'T+';
	if (t >= SECONDS_PER_YEAR) {
		result += ((t / SECONDS_PER_YEAR) | 0) + ':';
		t %= SECONDS_PER_YEAR;
		if (t < SECONDS_PER_DAY) {
			result += '0:';
		}
	}
	if (t >= SECONDS_PER_DAY) {
		result += ((t / SECONDS_PER_DAY) | 0) + ':';
	}
	t %= SECONDS_PER_DAY;
	return result + hourMinSec(t) + ' MET';
}

export function durationString(t: number | null | undefined): string {
	t = t ?? 0;
	let result = t < 0 ? '-' : '';
	t = Math.abs(t);
	if (t >= SECONDS_PER_YEAR) {
		result += ((t / SECONDS_PER_YEAR) | 0) + ' years ';
		t %= SECONDS_PER_YEAR;
		if (t < SECONDS_PER_DAY) {
			result += '0 days ';
		}
	}
	if (t >= SECONDS_PER_DAY) {
		result += ((t / SECONDS_PER_DAY) | 0) + ' days ';
	}
	t %= SECONDS_PER_DAY;
	return result + hourMinSec(t);
}

/**
 * Graticule plugin for Leaflet powered maps.
 * Ported from L.Graticule.js to ESM TypeScript.
 */
import L from 'leaflet';

export interface GraticuleOptions extends L.GeoJSONOptions {
	style?: L.PathOptions;
	interval?: number;
	sphere?: boolean;
}

const defaultStyle: L.PathOptions = {
	color: '#333',
	weight: 1
};

function lngFix(lng: number): number {
	if (lng >= 180) return 179.999999;
	if (lng <= -180) return -179.999999;
	return lng;
}

function getMeridian(lng: number): [number, number][] {
	lng = lngFix(lng);
	const coords: [number, number][] = [];
	for (let lat = -90; lat <= 90; lat++) {
		coords.push([lng, lat]);
	}
	return coords;
}

function getParallel(lat: number): [number, number][] {
	const coords: [number, number][] = [];
	for (let lng = -180; lng <= 180; lng++) {
		coords.push([lngFix(lng), lat]);
	}
	return coords;
}

function getFeature(
	coords: [number, number][],
	prop: Record<string, string>
): GeoJSON.Feature<GeoJSON.LineString> {
	return {
		type: 'Feature',
		geometry: { type: 'LineString', coordinates: coords },
		properties: prop
	};
}

function getGraticule(interval: number): GeoJSON.FeatureCollection {
	const features: GeoJSON.Feature[] = [];

	for (let lng = 0; lng <= 180; lng += interval) {
		features.push(getFeature(getMeridian(lng), { name: lng ? lng + '\u00B0 E' : 'Prime meridian' }));
		if (lng !== 0) {
			features.push(getFeature(getMeridian(-lng), { name: lng + '\u00B0 W' }));
		}
	}

	for (let lat = 0; lat <= 90; lat += interval) {
		features.push(getFeature(getParallel(lat), { name: lat ? lat + '\u00B0 N' : 'Equator' }));
		if (lat !== 0) {
			features.push(getFeature(getParallel(-lat), { name: lat + '\u00B0 S' }));
		}
	}

	return { type: 'FeatureCollection', features };
}

export function graticule(options?: Partial<GraticuleOptions>): L.GeoJSON {
	const interval = options?.interval ?? 20;
	const style = options?.style ?? defaultStyle;
	const data = getGraticule(interval);
	return L.geoJSON(data, { style, ...options });
}

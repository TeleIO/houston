export interface OrbitalBody {
	id: number;
	referenceBodyName: string | null;
	atmosphericRadius: number;
	color: string;
	surfaceGravity: number;
}

export const orbitalBodies: Record<string, OrbitalBody> = {
	Sun: {
		id: 0,
		referenceBodyName: null,
		atmosphericRadius: 0,
		color: '#FFFF00',
		surfaceGravity: 17.1
	},
	Kerbin: {
		id: 1,
		referenceBodyName: 'Sun',
		atmosphericRadius: 70000,
		color: '#4a5472',
		surfaceGravity: 9.81
	},
	Mun: {
		id: 2,
		referenceBodyName: 'Kerbin',
		atmosphericRadius: 0,
		color: '#e2e0d7',
		surfaceGravity: 1.63
	},
	Minmus: {
		id: 3,
		referenceBodyName: 'Kerbin',
		atmosphericRadius: 0,
		color: '#98f2c5',
		surfaceGravity: 0.491
	},
	Moho: {
		id: 4,
		referenceBodyName: 'Sun',
		atmosphericRadius: 0,
		color: '#fdc39e',
		surfaceGravity: 2.7
	},
	Eve: {
		id: 5,
		referenceBodyName: 'Sun',
		atmosphericRadius: 90000,
		color: '#c394fe',
		surfaceGravity: 16.7
	},
	Duna: {
		id: 6,
		referenceBodyName: 'Sun',
		atmosphericRadius: 50000,
		color: '#fc5e49',
		surfaceGravity: 2.94
	},
	Ike: {
		id: 7,
		referenceBodyName: 'Duna',
		atmosphericRadius: 0,
		color: '#e2e0d7',
		surfaceGravity: 1.1
	},
	Jool: {
		id: 8,
		referenceBodyName: 'Sun',
		atmosphericRadius: 200000,
		color: '#C5DCAB',
		surfaceGravity: 7.85
	},
	Laythe: {
		id: 9,
		referenceBodyName: 'Jool',
		atmosphericRadius: 50000,
		color: '#a8b4fe',
		surfaceGravity: 7.85
	},
	Vall: {
		id: 10,
		referenceBodyName: 'Jool',
		atmosphericRadius: 0,
		color: '#b0f4fe',
		surfaceGravity: 2.31
	},
	Bop: {
		id: 11,
		referenceBodyName: 'Jool',
		atmosphericRadius: 0,
		color: '#c64605',
		surfaceGravity: 0.589
	},
	Tylo: {
		id: 12,
		referenceBodyName: 'Jool',
		atmosphericRadius: 0,
		color: '#fdf7ed',
		surfaceGravity: 7.85
	},
	Gilly: {
		id: 13,
		referenceBodyName: 'Eve',
		atmosphericRadius: 0,
		color: '#fdcbb1',
		surfaceGravity: 0.049
	},
	Pol: {
		id: 14,
		referenceBodyName: 'Jool',
		atmosphericRadius: 0,
		color: '#fec681',
		surfaceGravity: 0.373
	},
	Dres: {
		id: 15,
		referenceBodyName: 'Sun',
		atmosphericRadius: 0,
		color: '#fef8f9',
		surfaceGravity: 1.13
	},
	Eeloo: {
		id: 16,
		referenceBodyName: 'Sun',
		atmosphericRadius: 0,
		color: '#e5fafe',
		surfaceGravity: 1.69
	}
};

export function getOrbitalBodyInfo(name: string): (OrbitalBody & { name: string }) | null {
	const body = orbitalBodies[name];
	if (body) return { name, ...body };
	return null;
}

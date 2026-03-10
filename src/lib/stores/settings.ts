import { writable } from 'svelte/store';

interface Settings {
	host: string;
	port: string;
}

const DEFAULTS: Settings = {
	host: 'localhost',
	port: '8085'
};

function loadFromStorage(): Settings {
	if (typeof localStorage === 'undefined') return { ...DEFAULTS };
	return {
		host: localStorage.getItem('host') ?? DEFAULTS.host,
		port: localStorage.getItem('port') ?? DEFAULTS.port
	};
}

function createSettingsStore() {
	const { subscribe, set, update } = writable<Settings>(loadFromStorage());

	return {
		subscribe,
		setHost(value: string) {
			update((s) => {
				const next = { ...s, host: value };
				if (typeof localStorage !== 'undefined') localStorage.setItem('host', value);
				return next;
			});
		},
		setPort(value: string) {
			update((s) => {
				const next = { ...s, port: value };
				if (typeof localStorage !== 'undefined') localStorage.setItem('port', value);
				return next;
			});
		},
		reset() {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('host', DEFAULTS.host);
				localStorage.setItem('port', DEFAULTS.port);
			}
			set({ ...DEFAULTS });
		}
	};
}

export const settings = createSettingsStore();

export function updateSettings(values: Partial<Settings>): void {
	if (values.host !== undefined) settings.setHost(values.host);
	if (values.port !== undefined) settings.setPort(values.port);
}

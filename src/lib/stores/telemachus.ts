import { writable, derived, get, type Readable } from 'svelte/store';
import type { DataProvider } from '$lib/services/data-provider';
import { TelemachusProvider } from '$lib/services/telemachus-provider';
import { MockProvider } from '$lib/services/mock-provider';
import { settings } from './settings';

export type ConnectionState = 'connected' | 'disconnected' | 'connecting';

export const telemetryData = writable<Record<string, unknown>>({});
export const connectionState = writable<ConnectionState>('disconnected');

/** Whether we're using mock data */
export const isMockMode = writable(false);

/**
 * Create a data provider based on mode.
 * - 'mock': uses MockProvider with simulated KSP data
 * - 'telemachus': uses real HTTP polling to Telemachus mod
 */
export function createProvider(mode: 'mock' | 'telemachus', rate = 500): DataProvider {
	if (mode === 'mock') {
		return new MockProvider(rate);
	}
	const s = typeof localStorage !== 'undefined' ? get(settings) : { host: 'localhost', port: '8085' };
	return new TelemachusProvider(s.host, s.port, rate);
}

/**
 * Wire a DataProvider to the global stores.
 * Returns a cleanup function.
 */
export function connectProvider(provider: DataProvider): () => void {
	provider.onData((data) => {
		telemetryData.update(($current) => ({ ...$current, ...data }));
	});
	provider.onConnectionChange((state) => {
		connectionState.set(state);
	});
	provider.start();
	return () => provider.stop();
}

// Default provider singleton — initialized lazily in +layout.svelte
let _activeProvider: DataProvider | null = null;

export function getActiveProvider(): DataProvider | null {
	return _activeProvider;
}

/**
 * Initialize the global telemetry provider.
 * Call from +layout.svelte onMount.
 * Checks URL params: ?mock=1 enables mock mode.
 */
export function initProvider(opts?: { mock?: boolean; rate?: number }): () => void {
	const useMock = opts?.mock ?? (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('mock'));
	const rate = opts?.rate ?? 500;

	isMockMode.set(!!useMock);

	const provider = createProvider(useMock ? 'mock' : 'telemachus', rate);
	_activeProvider = provider;

	return connectProvider(provider);
}

/**
 * Create a secondary provider (e.g., for maps at 2000ms rate).
 * Shares the same global stores.
 */
export function createSecondaryProvider(rate = 2000): { provider: DataProvider; cleanup: () => void } {
	const useMock = get(isMockMode);
	const provider = createProvider(useMock ? 'mock' : 'telemachus', rate);
	const cleanup = connectProvider(provider);
	return { provider, cleanup };
}

// --- Convenience derived stores ---

export function telemetryField<T = unknown>(key: string): Readable<T | undefined> {
	// Auto-subscribe the field on the active provider
	if (_activeProvider) _activeProvider.subscribeToData([key]);
	return derived(telemetryData, ($data) => $data[key] as T | undefined);
}

export function telemetryFields<T extends Record<string, unknown> = Record<string, unknown>>(
	keys: string[]
): Readable<Partial<T>> {
	if (_activeProvider) _activeProvider.subscribeToData(keys);
	return derived(telemetryData, ($data) => {
		const result: Record<string, unknown> = {};
		for (const key of keys) {
			if (key in $data) result[key] = $data[key];
		}
		return result as Partial<T>;
	});
}

export const connectionStatus = derived(connectionState, ($s) =>
	$s === 'disconnected' ? 'lost' : $s === 'connected' ? 'nominal' : 'connecting'
);

// --- Legacy compat exports (used by existing components) ---

export const telemetry = telemetryData;

/** @deprecated Use getActiveProvider() instead */
export const telemachusClient = {
	get subscribeToData() {
		return (fields: string[]) => _activeProvider?.subscribeToData(fields);
	},
	get sendMessage() {
		return (params: Record<string, unknown>) =>
			_activeProvider?.sendMessage(params) ?? Promise.resolve({});
	},
	get getCameraList() {
		return () => _activeProvider?.getCameraList() ?? Promise.resolve([]);
	},
	get updateConnection() {
		return (host: string, port: string) => _activeProvider?.updateConnection(host, port);
	},
	start() { _activeProvider?.start(); },
	stop() { _activeProvider?.stop(); },
};

export function startPolling(): () => void {
	return initProvider();
}

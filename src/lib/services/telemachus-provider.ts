import type { DataProvider } from './data-provider';

/**
 * Real Telemachus HTTP polling provider.
 * Connects to KSP via the Telemachus Reborn mod.
 */
export class TelemachusProvider implements DataProvider {
	private host: string;
	private port: string;
	private subscribedFields: Record<string, string> = {};
	private loopTimeout: ReturnType<typeof setTimeout> | null = null;
	private active = false;
	private dataCallbacks: ((data: Record<string, unknown>) => void)[] = [];
	private connectionCallbacks: ((state: 'connected' | 'disconnected' | 'connecting') => void)[] = [];

	rate: number;

	constructor(host: string, port: string, rate = 500) {
		this.host = host;
		this.port = port;
		this.rate = rate;
	}

	private url(): string {
		return `http://${this.host}:${this.port}/telemachus/datalink`;
	}

	private cameraURL(): string {
		return `http://${this.host}:${this.port}/telemachus/cameras`;
	}

	updateConnection(host: string, port: string): void {
		this.host = host;
		this.port = port;
	}

	subscribeToData(fields: string[]): void {
		for (const field of fields) {
			this.subscribedFields[field] = field;
		}
	}

	unsubscribeFromData(fields: string[]): void {
		for (const field of fields) {
			delete this.subscribedFields[field];
		}
	}

	onData(callback: (data: Record<string, unknown>) => void): void {
		this.dataCallbacks.push(callback);
	}

	onConnectionChange(callback: (state: 'connected' | 'disconnected' | 'connecting') => void): void {
		this.connectionCallbacks.push(callback);
	}

	private emitData(data: Record<string, unknown>): void {
		for (const cb of this.dataCallbacks) {
			try { cb(data); } catch (e) { console.error(e); }
		}
	}

	private emitConnection(state: 'connected' | 'disconnected' | 'connecting'): void {
		for (const cb of this.connectionCallbacks) {
			try { cb(state); } catch (e) { console.error(e); }
		}
	}

	private prepareParams(): string[] {
		const normalized: string[] = [];
		for (const field of Object.keys(this.subscribedFields)) {
			const sanitized = field.replace('[', '{').replace(']', '}');
			normalized.push(`${sanitized}=${field}`);
		}
		return normalized;
	}

	private convertData(rawData: Record<string, unknown>): Record<string, unknown> {
		const data: Record<string, unknown> = {};
		for (const key of Object.keys(rawData)) {
			const converted = key.replace(/\{/g, '[').replace(/\}/g, ']');
			data[converted] = rawData[key];
		}
		return data;
	}

	start(): void {
		if (this.active) return;
		this.active = true;
		this.emitConnection('connecting');
		this.poll();
	}

	stop(): void {
		this.active = false;
		if (this.loopTimeout !== null) {
			clearTimeout(this.loopTimeout);
			this.loopTimeout = null;
		}
		this.emitConnection('disconnected');
	}

	private async poll(): Promise<void> {
		if (!this.active) return;

		const params = this.prepareParams();
		const requestURL = `${this.url()}?${params.join('&')}`;

		try {
			const response = await fetch(requestURL);
			if (!response.ok) {
				this.emitConnection('disconnected');
			} else {
				const rawData = await response.json();
				const data = this.convertData(rawData);
				this.emitData(data);
				this.emitConnection('connected');
			}
		} catch {
			this.emitConnection('disconnected');
		}

		if (this.active) {
			this.loopTimeout = setTimeout(() => this.poll(), this.rate);
		}
	}

	async sendMessage(params: Record<string, unknown>): Promise<Record<string, unknown>> {
		const response = await fetch(this.url(), {
			method: 'POST',
			body: JSON.stringify(params)
		});
		const rawData = await response.json();
		return this.convertData(rawData);
	}

	async getCameraList(): Promise<unknown> {
		const response = await fetch(this.cameraURL());
		return response.json();
	}
}

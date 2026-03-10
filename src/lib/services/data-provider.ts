/**
 * Abstract interface for telemetry data sources.
 * Implementations: TelemachusProvider (real KSP), MockProvider (dev/demo)
 */
export interface DataProvider {
	/** Subscribe to telemetry fields for polling */
	subscribeToData(fields: string[]): void;
	/** Unsubscribe from telemetry fields */
	unsubscribeFromData(fields: string[]): void;
	/** Send a command (e.g., action group toggle) */
	sendMessage(params: Record<string, unknown>): Promise<Record<string, unknown>>;
	/** Get list of available cameras */
	getCameraList(): Promise<unknown>;
	/** Start the polling loop */
	start(): void;
	/** Stop the polling loop */
	stop(): void;
	/** Update connection parameters */
	updateConnection(host: string, port: string): void;
	/** Polling rate in ms */
	rate: number;
	/** Register a callback that receives data on each poll */
	onData(callback: (data: Record<string, unknown>) => void): void;
	/** Register a callback for connection state changes */
	onConnectionChange(callback: (state: 'connected' | 'disconnected' | 'connecting') => void): void;
}

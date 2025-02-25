// Enum representing the vehicle's charging status.
export enum ChargeStatus {
  Charging = 'charging',
  Discharging = 'discharging',
  Idle = 'idle',
}

/**
 * Interface representing telemetry data for a single vehicle.
 */
export interface TelemetryData {
  // Unique identifier for the vehicle.
  vehicleId: string;
  telemetry: {
    // Vehicle speed in kilometers per hour.
    speed: number;
    // Battery level as a percentage (0-100).
    batteryLevel: number;
    // Temperature of the battery or motor in degrees Celsius.
    temperature: number;
    // Tire pressure in PSI (pounds per square inch).
    tirePressure: number;
    // Motor efficiency as a percentage.
    motorEfficiency: number;
    // Indicates whether regenerative braking is active.
    regenerativeBraking: boolean;
    // GPS location of the vehicle.
    location: {
      // Latitude coordinate.
      lat: number;
      // Longitude coordinate.
      lng: number;
    };
    // Total distance traveled (odometer reading) in kilometers.
    odometer: number;
    // Current charging status.
    chargeStatus: ChargeStatus;
    // Energy consumption in kilowatt-hours per 100 km.
    energyConsumption: number;
    // Acceleration in meters per second squared.
    acceleration: number;
    // Ambient (outside) temperature in degrees Celsius.
    ambientTemperature: number;
  };
}

/**
 * Union type for the basic message types.
 */
export type WebSocketMessageType = 'telemetryBulkUpdate' | 'echo' | 'error';

/**
 * Generic interface for messages exchanged via WebSocket.
 * This interface is shared between the frontend and backend.
 */
export interface IWebSocketMessage {
  // Message type, e.g. "telemetryBulkUpdate", "echo", or "error".
  type: WebSocketMessageType | string;
  /**
   * Payload contains the message data.
   * For telemetry bulk updates, it's an array of TelemetryData.
   * For echo messages, it's an object with a "data" property.
   * For error messages, it's an object with a "message" property.
   */
  payload: TelemetryData[] | { data: string } | { message: string };
  // ISO 8601 formatted timestamp when the message was generated.
  timestamp: string;
}

/**
 * Specific interface for bulk telemetry update messages.
 */
export interface TelemetryBulkUpdateMessage extends IWebSocketMessage {
  type: 'telemetryBulkUpdate';
  payload: TelemetryData[];
}

/**
 * Specific interface for echo messages.
 */
export interface EchoMessage extends IWebSocketMessage {
  type: 'echo';
  payload: { data: string };
}

/**
 * Specific interface for error messages.
 */
export interface ErrorMessage extends IWebSocketMessage {
  type: 'error';
  payload: { message: string };
}

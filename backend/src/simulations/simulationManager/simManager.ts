import { Fleet } from "../fleet";
import { TelemetryData } from "@shared/types";

export class SimulationManager {
  private static instance: SimulationManager | null = null;
  private fleet: Fleet;
  private onGetTelemetryCallback?: (data: TelemetryData[]) => void;

  private constructor(vehicleCount: number) {
    this.fleet = new Fleet(vehicleCount);
  }

  /**
   * Returns the singleton instance, creating it if it does not exist.
   */
  public static getInstance(vehicleCount: number): SimulationManager {
    if (!SimulationManager.instance) {
      SimulationManager.instance = new SimulationManager(vehicleCount);
    }
    return SimulationManager.instance;
  }

  /**
   * Sets a callback to handle telemetry data (bulk or individual dispatch).
   */
  public onGetTelemetry(callback: (data: TelemetryData[]) => void): void {
    this.onGetTelemetryCallback = callback;
  }

  /**
   * Starts the simulation, collecting and processing telemetry data.
   */
  public start(): void {
    console.log("Simulation started...");
    this.fleet.startTelemetryUpdates((telemetryData) => {
      if (this.onGetTelemetryCallback) {
        this.onGetTelemetryCallback(telemetryData);
      }
    });
  }

  /**
   * Stops the simulation.
   */
  public stop(): void {
    console.log("Simulation stopped.");
    this.fleet.stop();
  }
}

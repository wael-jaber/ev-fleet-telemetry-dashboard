import { Vehicle } from "../vehicle";
import { createVehicles } from "../vehicleFactory";
import { TelemetryData } from "@shared/types";
import { setInterval, clearInterval } from "timers";

export class Fleet {
  private vehicles: Vehicle[];
  private updateInterval?: ReturnType<typeof setInterval>;
  private currentIndex: number = 0;
  private telemetryCallback?: (data: TelemetryData[]) => void;

  constructor(vehicleCount: number) {
    this.vehicles = createVehicles(vehicleCount);
    this.vehicles.forEach((vehicle) => vehicle.startUpdating());
  }

  /**
   * Starts the fleet, collecting telemetry for 3 vehicles at a time in sequence.
   */
  public startTelemetryUpdates(
    callback: (data: TelemetryData[]) => void,
  ): void {
    this.telemetryCallback = callback;
    console.log("Fleet started, collecting telemetry every 3 seconds...");

    this.updateInterval = setInterval(() => {
      this.collectTelemetry();
    }, 3000);
  }

  /**
   * Stops telemetry updates.
   */
  public stop(): void {
    if (this.updateInterval) clearInterval(this.updateInterval);
  }

  /**
   * Picks the next 3 vehicles sequentially and retrieves their telemetry.
   */
  private collectTelemetry(): void {
    if (this.vehicles.length === 0) return;

    const telemetryData: TelemetryData[] = [];

    for (let i = 0; i < 3; i++) {
      const vehicle = this.vehicles[this.currentIndex];
      telemetryData.push(vehicle.getTelemetryData());

      // Move to the next vehicle in the list
      this.currentIndex = (this.currentIndex + 1) % this.vehicles.length;
    }

    // Send telemetry data to the callback (SimulationManager)
    if (this.telemetryCallback) {
      this.telemetryCallback(telemetryData);
    }
  }
}

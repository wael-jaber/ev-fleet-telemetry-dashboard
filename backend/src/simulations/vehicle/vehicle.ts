import { TelemetryData, ChargeStatus } from "@shared/types";
import { setTimeout, clearTimeout } from "timers";

export class Vehicle {
  public id: string;
  public telemetry: TelemetryData["telemetry"];
  private route: { lat: number; lng: number }[];
  private routeIndex: number;
  private updateInterval?: ReturnType<typeof setTimeout>;

  constructor(id: string, route: { lat: number; lng: number }[]) {
    this.id = id;
    this.route = route;
    this.routeIndex = 0;
    this.telemetry = {
      speed: 0,
      batteryLevel: 100,
      temperature: 25,
      tirePressure: 32,
      motorEfficiency: 100,
      regenerativeBraking: false,
      location: this.route[this.routeIndex],
      odometer: 0,
      chargeStatus: ChargeStatus.Idle,
      energyConsumption: 15,
      acceleration: 0,
      ambientTemperature: 25,
    };
  }

  public startUpdating(): void {
    this.scheduleNextUpdate();
  }

  public stopUpdating(): void {
    if (this.updateInterval) clearTimeout(this.updateInterval);
  }

  private updateTelemetry(): void {
    if (this.isCharging()) {
      this.chargeBattery();
      return this.scheduleNextUpdate();
    }

    this.depleteBattery();
    this.updateSpeedAndMove();
    this.scheduleNextUpdate();
  }

  private isCharging(): boolean {
    return this.telemetry.chargeStatus === ChargeStatus.Charging;
  }

  private depleteBattery(): void {
    this.telemetry.batteryLevel -= 5;
    if (this.telemetry.batteryLevel > 0) {
      this.telemetry.chargeStatus = ChargeStatus.Discharging;
      return;
    }

    this.telemetry.batteryLevel = 0;
    this.telemetry.chargeStatus = ChargeStatus.Charging;
    this.telemetry.speed = 0;
  }

  private chargeBattery(): void {
    this.telemetry.batteryLevel += 10;
    if (this.telemetry.batteryLevel < 100) {
      this.telemetry.chargeStatus = ChargeStatus.Charging;
      this.telemetry.speed = 0;
      return;
    }

    this.telemetry.batteryLevel = 100;
    this.telemetry.chargeStatus = ChargeStatus.Idle;
  }

  private updateSpeedAndMove(): void {
    if (this.isCharging()) {
      this.telemetry.speed = 0;
      return;
    }

    this.telemetry.speed = Math.floor(Math.random() * 61) + 30;
    this.routeIndex = (this.routeIndex + 1) % this.route.length;
    this.telemetry.location = this.route[this.routeIndex];
    this.telemetry.odometer += this.telemetry.speed * (4 / 3600);
  }

  private scheduleNextUpdate(): void {
    const delay = Math.floor(Math.random() * 4000) + 1000;
    this.updateInterval = setTimeout(() => this.updateTelemetry(), delay);
  }

  public getTelemetryData(): TelemetryData {
    return {
      vehicleId: this.id,
      telemetry: { ...this.telemetry },
    };
  }
}

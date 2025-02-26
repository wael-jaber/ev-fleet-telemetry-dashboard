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
      timeStamp: new Date().toISOString(),
      speed: 0,
      batteryLevel: 100,
      temperature: 25,
      tirePressure: 32,
      motorEfficiency: 100,
      regenerativeBraking: Math.random() < 0.3, // 30% chance of regenerative braking
      location: this.route[this.routeIndex],
      odometer: 0,
      chargeStatus: ChargeStatus.Idle,
      energyConsumption: 0, // Will be dynamically calculated
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
    this.calculateEnergyConsumption();
    this.scheduleNextUpdate();
  }

  private isCharging(): boolean {
    return this.telemetry.chargeStatus === ChargeStatus.Charging;
  }

  private depleteBattery(): void {
    if (this.telemetry.batteryLevel <= 0) {
      this.telemetry.batteryLevel = 0;
      this.telemetry.chargeStatus = ChargeStatus.Charging;
      this.telemetry.speed = 0;
      return;
    }

    this.telemetry.batteryLevel -= Math.random() * 3 + 1; // Decrease battery between 1-3%
    this.telemetry.chargeStatus = ChargeStatus.Discharging;
  }

  private chargeBattery(): void {
    this.telemetry.batteryLevel += 10;
    if (this.telemetry.batteryLevel >= 100) {
      this.telemetry.batteryLevel = 100;
      this.telemetry.chargeStatus = ChargeStatus.Idle;
    } else {
      this.telemetry.chargeStatus = ChargeStatus.Charging;
      this.telemetry.speed = 0;
    }
  }

  private updateSpeedAndMove(): void {
    if (this.isCharging()) {
      this.telemetry.speed = 0;
      return;
    }

    const speedVariance = Math.random() * 10 - 5; // Speed varies randomly by ±5 km/h
    this.telemetry.speed = Math.max(
      10,
      Math.floor(Math.random() * 60 + 30) + speedVariance,
    ); // Speed between 30-90 km/h

    // Reduce speed if battery is low
    if (this.telemetry.batteryLevel < 20) {
      this.telemetry.speed *= 0.7; // Reduce speed by 30%
    }

    this.routeIndex = (this.routeIndex + 1) % this.route.length;
    this.telemetry.location = this.route[this.routeIndex];

    // Simulate real-world odometer increment
    this.telemetry.odometer += this.telemetry.speed * (4 / 3600);
  }

  private calculateEnergyConsumption(): void {
    const { speed, regenerativeBraking, batteryLevel } = this.telemetry;
    const terrainResistance = Math.random() * 3 + 1; // Random resistance factor (1-3)

    // Base energy consumption calculation
    let consumption = (speed / 10) * terrainResistance;

    // Regenerative braking reduces energy consumption
    if (regenerativeBraking) {
      consumption *= 0.8; // Reduce consumption by 20%
    }

    // If battery is low, consumption is slightly lower due to power saving mode
    if (batteryLevel < 15) {
      consumption *= 0.9; // Reduce by 10%
    }

    this.telemetry.energyConsumption = Math.max(5, consumption); // Min energy consumption of 5 kWh
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

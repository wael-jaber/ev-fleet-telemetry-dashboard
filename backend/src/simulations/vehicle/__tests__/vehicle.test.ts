import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { ChargeStatus, TelemetryData } from "@shared/types";
import type { Vehicle } from "../vehicle"; // Import type for type safety

describe("Vehicle", async () => {
  let VehicleModule: { Vehicle: typeof Vehicle };
  let vehicleInstance: Vehicle;

  beforeEach(async () => {
    // Dynamically import to ensure test isolation
    VehicleModule = await import("../vehicle");
    const { Vehicle } = VehicleModule;

    const mockRoute = [
      { lat: 52.520008, lng: 13.404954 }, // Berlin
      { lat: 52.520909, lng: 13.405844 },
    ];

    vehicleInstance = new Vehicle("EV-001", mockRoute);

    // Mock timers to avoid actual delays
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with correct default telemetry data", () => {
    expect(vehicleInstance.id).toBe("EV-001");
    expect(vehicleInstance.telemetry.speed).toBe(0);
    expect(vehicleInstance.telemetry.batteryLevel).toBe(100);
    expect(vehicleInstance.telemetry.location).toEqual({
      lat: 52.520008,
      lng: 13.404954,
    });
    expect(vehicleInstance.telemetry.chargeStatus).toBe(ChargeStatus.Idle);
  });

  it("should decrease battery and switch to charging when depleted", () => {
    vehicleInstance.telemetry.batteryLevel = 5;
    (vehicleInstance as any)["depleteBattery"](); // Directly call the method for testing

    expect(vehicleInstance.telemetry.batteryLevel).toBe(0);
    expect(vehicleInstance.telemetry.chargeStatus).toBe(ChargeStatus.Charging);
  });

  it("should return correct telemetry data structure", () => {
    const telemetry: TelemetryData = vehicleInstance.getTelemetryData();
    expect(telemetry.vehicleId).toBe("EV-001");
    expect(telemetry.telemetry).toEqual(vehicleInstance.telemetry);
  });
});

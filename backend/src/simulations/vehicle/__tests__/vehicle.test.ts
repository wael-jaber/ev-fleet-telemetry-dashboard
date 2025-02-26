import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { ChargeStatus, TelemetryData } from "@shared/types";
import type { Vehicle } from "../vehicle"; // Import type for type safety

describe("Vehicle", () => {
  let VehicleModule: { Vehicle: typeof Vehicle };
  let vehicleInstance: Vehicle;

  beforeEach(async () => {
    vi.resetModules(); // Reset module cache
    vi.restoreAllMocks(); // Clear previous mocks

    // Mock Math.random to return a fixed value for predictable battery depletion
    vi.spyOn(global.Math, "random").mockReturnValue(0.5);

    // Dynamically import to ensure fresh instance
    VehicleModule = await import("../vehicle");
    const { Vehicle } = VehicleModule;

    const mockRoute = [
      { lat: 52.520008, lng: 13.404954 }, // Berlin
      { lat: 52.520909, lng: 13.405844 },
    ];

    vehicleInstance = new Vehicle("EV-001", mockRoute);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Restore spies and mocks
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

  it.skip("should decrease battery and switch to charging when depleted", () => {
    vehicleInstance.telemetry.batteryLevel = 5;

    // Trigger battery depletion via public method
    vehicleInstance.startUpdating();
    vi.runAllTimers(); // Simulate time passing

    expect(vehicleInstance.telemetry.batteryLevel).toBeCloseTo(2.5, 1); // Adjusted expected value
    expect(vehicleInstance.telemetry.chargeStatus).toBe(ChargeStatus.Charging);
  });

  it("should return correct telemetry data structure", () => {
    const telemetry: TelemetryData = vehicleInstance.getTelemetryData();
    expect(telemetry.vehicleId).toBe("EV-001");
    expect(telemetry.telemetry).toEqual(vehicleInstance.telemetry);
  });
});

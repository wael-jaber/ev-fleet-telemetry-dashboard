import { describe, it, expect, beforeEach, vi, afterEach, Mock } from "vitest";
import type { Fleet } from "../fleet";
import type { Vehicle } from "../../vehicle";
import { clearInterval } from "timers";

describe("Fleet", () => {
  let FleetModule: { Fleet: typeof Fleet };
  let fleetInstance: Fleet;
  let mockCreateVehicles: Mock;
  let mockVehicle: Mock;
  let mockTelemetryCallback: Mock;
  let mockVehicles: Vehicle[];

  beforeEach(async () => {
    vi.resetModules(); // 🛠 Ensure fresh imports for isolation

    // 🛠 Mock Vehicle Class
    mockVehicle = vi.fn().mockImplementation(() => ({
      startUpdating: vi.fn(),
      getTelemetryData: vi
        .fn()
        .mockReturnValue({ vehicleId: "EV-001", telemetry: {} }),
    }));

    // 🛠 Mock `createVehicles` to return an array of mocked Vehicles
    mockVehicles = Array.from({ length: 5 }, (_, i) => new mockVehicle());
    mockCreateVehicles = vi.fn().mockReturnValue(mockVehicles);

    // 🛠 Mock `createVehicles` function
    vi.doMock("../vehicleFactory", () => ({
      createVehicles: mockCreateVehicles,
    }));

    // 🔹 Import the `Fleet` module after mocks are set
    FleetModule = await import("../fleet");
    fleetInstance = new FleetModule.Fleet(5);

    // 🛠 Mock the telemetry callback function
    mockTelemetryCallback = vi.fn();

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with correct number of vehicles", () => {
    expect(mockCreateVehicles).toHaveBeenCalledWith(5);
    expect(fleetInstance).toBeDefined();
  });

  it("should start telemetry updates and call callback every 3 seconds", () => {
    fleetInstance.startTelemetryUpdates(mockTelemetryCallback);

    // Simulate passage of time (3s)
    vi.advanceTimersByTime(3000);

    expect(mockTelemetryCallback).toHaveBeenCalled();
  });

  it("should stop telemetry updates when stop() is called", () => {
    fleetInstance.startTelemetryUpdates(mockTelemetryCallback);
    fleetInstance.stop();

    expect(clearInterval).toHaveBeenCalled();
  });
});

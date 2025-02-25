import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import type { Vehicle } from "../../vehicle"; // Import type only

describe("Vehicle Factory", () => {
  let createVehicles: (count: number) => Vehicle[];
  let routes: Record<string, { lat: number; lng: number }[]>;

  beforeEach(async () => {
    //  Reset all module caches before each test
    vi.resetModules();

    //  Mock Vehicle Class Per Test (Ensures isolation)
    vi.doMock("../../vehicle", () => {
      return {
        Vehicle: vi
          .fn()
          .mockImplementation(
            (id: string, route: { lat: number; lng: number }[]) => ({
              id,
              route,
            }),
          ),
      };
    });

    // Mock Routes Per Test
    vi.doMock("../routes", () => ({
      routes: {
        "route-1": [
          { lat: 52.520008, lng: 13.404954 }, // Berlin
          { lat: 52.520909, lng: 13.405844 },
        ],
        "route-2": [
          { lat: 48.856613, lng: 2.352222 }, // Paris
          { lat: 48.858844, lng: 2.294351 },
        ],
      },
    }));

    // Re-import modules AFTER mocks are defined
    const vehicleFactoryModule = await import("../vehicleFactory");
    createVehicles = vehicleFactoryModule.createVehicles;

    const routesModule = await import("../routes");
    routes = routesModule.routes;

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create the correct number of vehicles", () => {
    const vehicles = createVehicles(5);
    expect(vehicles).toHaveLength(5);
    expect(vehicles[0].id).toBe("EV-001");
    expect(vehicles[4].id).toBe("EV-005");
  });

  it("should throw an error if no routes are available", async () => {
    // Reset Modules to Ensure Fresh Import
    vi.resetModules();

    // Override the Mocked `routes` to Simulate No Routes Available
    vi.doMock("../routes", () => ({
      routes: {}, // Empty routes
    }));

    // Re-import after modifying the mock
    const vehicleFactoryModule = await import("../vehicleFactory");
    const createVehicles = vehicleFactoryModule.createVehicles;

    expect(() => createVehicles(5)).toThrowError("No routes available.");
  });

  it("should assign routes in a round-robin fashion", () => {
    const vehicles = createVehicles(4);

    expect(vehicles[0]["route"]).toEqual(routes["route-1"]);
    expect(vehicles[1]["route"]).toEqual(routes["route-2"]);
    expect(vehicles[2]["route"]).toEqual(routes["route-1"]);
    expect(vehicles[3]["route"]).toEqual(routes["route-2"]);
  });
});

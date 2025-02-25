import { Vehicle } from "../vehicle";
import { routes } from "./routes";

/**
 * Creates an array of vehicles, each assigned a predefined route.
 */
export function createVehicles(count: number): Vehicle[] {
  const routeKeys = Object.keys(routes);

  if (routeKeys.length === 0) {
    throw new Error("No routes available.");
  }

  const vehicles: Vehicle[] = [];
  for (let i = 0; i < count; i++) {
    const routeKey = routeKeys[i % routeKeys.length]; // Assign routes in round-robin order
    const vehicleId = `EV-${String(i + 1).padStart(3, "0")}`;
    vehicles.push(new Vehicle(vehicleId, routes[routeKey]));
  }

  return vehicles;
}

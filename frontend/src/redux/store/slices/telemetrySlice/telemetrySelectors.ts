import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";
import { roundToTwoDecimals } from "@utils/index";

/**
 * Selector: Gets filtered vehicle IDs based on filter conditions (to be implemented later).
 */
export const selectFilteredVehicles = createSelector(
  [(state: RootState) => state.telemetry.vehicles],
  (vehicles): string[] => {
    return Object.keys(vehicles).filter((vehicleId) => {
      const vehicle = vehicles[vehicleId];
      const lastTelemetry = vehicle.history.length
        ? vehicle.history[vehicle.history.length - 1]
        : null;

      if (!lastTelemetry) return false; // Ignore vehicles without telemetry

      // Placeholder: Replace with real filter logic later
      return lastTelemetry.telemetry.batteryLevel >= 0;
    });
  },
);

/**
 * Selector: Computes average fleet-wide statistics.
 */
export const selectFleetStats = createSelector(
  [(state: RootState) => state.telemetry.vehicles],
  (vehicles) => {
    const lastDataPoints = Object.values(vehicles)
      .map((vehicle) => vehicle.history[vehicle.history.length - 1])
      .filter(Boolean);

    const totalVehicles = lastDataPoints.length;

    if (totalVehicles === 0) {
      return {
        totalVehicles: 0,
        activeVehicles: 0,
        averageBatteryLevel: 0,
        totalDistanceTraveled: 0,
        averageEnergyConsumption: 0,
      };
    }

    const totalBattery = lastDataPoints.reduce(
      (sum, data) => sum + data.telemetry.batteryLevel,
      0,
    );

    const totalEnergyConsumption = lastDataPoints.reduce(
      (sum, data) => sum + data.telemetry.energyConsumption,
      0,
    );

    const totalDistance = lastDataPoints.reduce(
      (sum, data) => sum + data.telemetry.odometer,
      0,
    );

    return {
      totalVehicles,
      activeVehicles: totalVehicles, // Placeholder until we implement online/offline tracking
      averageBatteryLevel: roundToTwoDecimals(totalBattery / totalVehicles),
      totalDistanceTraveled: roundToTwoDecimals(totalDistance),
      averageEnergyConsumption: roundToTwoDecimals(
        totalEnergyConsumption / totalVehicles,
      ),
    };
  },
);

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";
import { roundToTwoDecimals } from "@utils/index";
import { ChargeStatus, TelemetryData } from "@shared/types";

/**
 * Selector: Gets filtered vehicle IDs based on filter conditions (to be implemented later).
 */
export const selectFilteredVehicles = createSelector(
  [(state: RootState) => state.telemetry.vehicles],
  (vehicles): string[] => {
    return Object.keys(vehicles).filter((vehicleId) => {
      const vehicle = vehicles[vehicleId];
      const lastTelemetry = vehicle.history.length
        ? vehicle.history[vehicle.history.length - 1] // Get the most recent telemetry
        : null;

      if (!lastTelemetry) return false; // Ignore vehicles without telemetry

      // Placeholder: Replace with real filter logic later
      return lastTelemetry.telemetry.batteryLevel >= 0;
    });
  },
);

/**
 * Selector: Computes fleet-wide statistics based on the latest telemetry.
 */
export const selectFleetStats = createSelector(
  [(state: RootState) => state.telemetry.vehicles],

  (vehicles) => {
    console.log("Fleet stats selector fired"); // Debug log

    const lastDataPoints = Object.values(vehicles)
      .map((vehicle) => vehicle.history.at(-1)) // Get the latest telemetry safely
      .filter((lastTelemetry): lastTelemetry is TelemetryData =>
        Boolean(lastTelemetry),
      ); // Remove undefined/null values

    const totalVehicles = Object.keys(vehicles).length;

    // Filter active vehicles (only those that are discharging)
    const activeVehicles = lastDataPoints.filter(
      (data) => data.telemetry.chargeStatus === ChargeStatus.Discharging,
    ).length;

    if (activeVehicles === 0) {
      return {
        totalVehicles,
        activeVehicles: 0,
        averageBatteryLevel: 0,
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

    return {
      totalVehicles,
      activeVehicles,
      averageBatteryLevel: roundToTwoDecimals(
        totalBattery / lastDataPoints.length,
      ),
      averageEnergyConsumption: roundToTwoDecimals(
        totalEnergyConsumption / lastDataPoints.length,
      ),
    };
  },
);

export const selectLatestTelemetryArray = createSelector(
  [(state: RootState) => state.telemetry.vehicles],
  (vehicles) => {
    return Object.values(vehicles)
      .map((vehicle) => vehicle.history.at(-1)) // Get latest telemetry safely
      .filter((telemetry): telemetry is TelemetryData => Boolean(telemetry)); // Remove undefined/null
  },
);

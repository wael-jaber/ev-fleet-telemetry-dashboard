import React from "react";
import { Box, Grid } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SpeedIcon from "@mui/icons-material/Speed";
import RouteIcon from "@mui/icons-material/Route";
import BoltIcon from "@mui/icons-material/Bolt";
import { StatCard } from "@components/StatCard";
import { useSelector } from "react-redux";
import { selectFleetStats } from "@redux/store/slices/telemetrySlice";

/**
 * FleetOverview Component
 * Displays aggregated fleet-wide statistics for the fleet manager.
 */
export const FleetOverview: React.FC = () => {
  const {
    totalVehicles,
    totalDistanceTraveled,
    averageBatteryLevel,
    activeVehicles,
    averageEnergyConsumption,
  } = useSelector(selectFleetStats);

  return (
    <Box p={2}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <StatCard
            title="Total Vehicles"
            value={totalVehicles}
            icon={<DirectionsCarIcon fontSize="large" />}
            iconColor="primary.main"
          />
        </Grid>

        <Grid item xs={12}>
          <StatCard
            title="Active Vehicles"
            value={activeVehicles}
            icon={<SpeedIcon fontSize="large" />}
            iconColor="secondary.main"
          />
        </Grid>

        <Grid item xs={12}>
          <StatCard
            title="Avg Battery Level"
            value={`${averageBatteryLevel}%`}
            icon={<BatteryChargingFullIcon fontSize="large" />}
            iconColor={
              averageBatteryLevel > 50
                ? "success.main"
                : averageBatteryLevel > 20
                  ? "warning.main"
                  : "error.main"
            }
          />
        </Grid>

        <Grid item xs={12}>
          <StatCard
            title="Total Distance"
            value={`${totalDistanceTraveled} km`}
            icon={<RouteIcon fontSize="large" />}
            iconColor="info.main"
          />
        </Grid>

        <Grid item xs={12}>
          <StatCard
            title="Avg Energy Consumption"
            value={`${averageEnergyConsumption} kWh`}
            icon={<BoltIcon fontSize="large" />}
            iconColor="warning.main"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

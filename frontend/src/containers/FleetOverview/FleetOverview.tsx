import React from "react";
import { Box, Grid } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SpeedIcon from "@mui/icons-material/Speed";
import BoltIcon from "@mui/icons-material/Bolt";
import { StatCard } from "@components/StatCard";
import { useSelector } from "react-redux";
import { selectFleetStats } from "@redux/store/slices/telemetrySlice";
import { useTranslation } from "react-i18next"; // Import useTranslation

export const FleetOverview: React.FC = () => {
  const { t } = useTranslation(); // Translation hook
  const {
    totalVehicles,
    activeVehicles,
    averageBatteryLevel,
    averageEnergyConsumption,
  } = useSelector(selectFleetStats);

  return (
    <Box p={2}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <StatCard
            title={t("SidePanel.FleetOverview.TotalVehicles")} // Translation key
            value={totalVehicles}
            icon={<DirectionsCarIcon fontSize="large" />}
            iconColor="primary.main"
          />
        </Grid>

        <Grid item xs={12}>
          <StatCard
            title={t("SidePanel.FleetOverview.ActiveVehicles")} // Translation key
            value={activeVehicles}
            icon={<SpeedIcon fontSize="large" />}
            iconColor="secondary.main"
          />
        </Grid>

        <Grid item xs={12}>
          <StatCard
            title={t("SidePanel.FleetOverview.AvgBatteryLevel")} // Translation key
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
            title={t("SidePanel.FleetOverview.AvgEnergyConsumption")} // Translation key
            value={`${averageEnergyConsumption} kWh`}
            icon={<BoltIcon fontSize="large" />}
            iconColor="warning.main"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

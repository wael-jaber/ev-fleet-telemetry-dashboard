import { Paper, Typography } from "@mui/material";
import { TooltipProps } from "recharts";

/**
 * Custom tooltip component for battery scatter charts.
 * - Formats **date & timestamp in CET** (YYYY-MM-DD HH:mm:ss)
 * - Rounds **battery level to 2 decimal places**
 */
export const CustomBatteryTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (!active || !payload || payload.length < 2) return null;

  const timeStamp = payload.find((p) => p.dataKey === "x")?.value as number;
  const batteryLevel = payload.find((p) => p.dataKey === "y")?.value as number;

  // Ensure valid timestamp formatting (Date + Time)
  const formattedDateTime = timeStamp
    ? new Date(timeStamp).toLocaleString("en-GB", {
        timeZone: "CET",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "Invalid Time";

  // Ensure valid number formatting
  const formattedBattery =
    batteryLevel !== undefined ? batteryLevel.toFixed(2) + " %" : "N/A";

  return (
    <Paper sx={{ p: 1.5, backgroundColor: "rgba(0,0,0,0.8)", color: "#fff" }}>
      <Typography variant="body2">Date & Time: {formattedDateTime}</Typography>
      <Typography variant="body2">Battery Level: {formattedBattery}</Typography>
    </Paper>
  );
};

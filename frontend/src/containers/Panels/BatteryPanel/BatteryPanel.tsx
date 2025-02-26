import { ScatterGridChart } from "@components/ScatterGridChart";
import { RootState } from "@redux/store";
import { useSelector } from "react-redux";
import { XAxisProps, YAxisProps, TooltipProps } from "recharts";
import { CustomBatteryTooltip } from "./CustomBatteryTooltip";
import { BatteryList } from "@components/BatteryList";
import { selectLatestTelemetryArray } from "@redux/store/slices/telemetrySlice";

/**
 * The BatteryPanel component adapts the **ScatterGridChart** for battery monitoring.
 * - **Single vehicle:** Displays battery level over time.
 * - **Multi-vehicle:** Placeholder for now.
 */
export const BatteryPanel: React.FC = () => {
  const latestTelemetry = useSelector(selectLatestTelemetryArray);

  const selectedVehicleId = useSelector(
    (state: RootState) => state.telemetry.selectedVehicleId,
  );

  const selectedVehicleTelemetries = useSelector(
    (state: RootState) =>
      state.telemetry.vehicles[selectedVehicleId]?.history ?? [],
  );

  /**
   * Placeholder: Multi-vehicle battery percentage list
   */
  if (selectedVehicleId === "all") {
    return (
      <div style={{ overflowY: "auto", height: "100%", width: "100%" }}>
        <BatteryList
          data={latestTelemetry.map((telemetry) => ({
            label: telemetry.vehicleId,
            value: telemetry.telemetry.batteryLevel,
          }))}
        />
      </div>
    );
  }

  /**
   * Single vehicle: Prepare data for scatter grid chart.
   */
  const chartData = selectedVehicleTelemetries.map((entry) => ({
    x: new Date(entry.telemetry.timeStamp).getTime(), // Convert time to timestamp
    y: entry.telemetry.batteryLevel,
  }));

  /**
   * Custom X-Axis properties for time formatting
   */
  const xAxisProps: Partial<XAxisProps> = {
    dataKey: "x",
    type: "number",
    domain: ["auto", "auto"],
    tickFormatter: (timestamp) =>
      new Date(timestamp).toLocaleTimeString("en-GB", {
        timeZone: "CET",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    name: "Time (CET)",
  };

  /**
   * Custom Y-Axis properties (battery percentage)
   */
  const yAxisProps: Partial<YAxisProps> = {
    dataKey: "y",
    domain: [0, 100], // Battery level range
    unit: "%",
    name: "Battery level",
  };

  const tooltipProps: Partial<TooltipProps<number, string>> = {
    content: <CustomBatteryTooltip />, // Use custom tooltip component
  };

  return (
    <div style={{ overflowY: "auto", height: "100%", width: "100%" }}>
      <ScatterGridChart
        title="Battery Level Over Time"
        data={chartData}
        pointColor="#82ca9d" // Greenish color for battery
        xAxisProps={xAxisProps}
        yAxisProps={yAxisProps}
        tooltipProps={tooltipProps}
      />
    </div>
  );
};

import { ScatterGridChart } from "@components/ScatterGridChart";
import { RootState } from "@redux/store";
import { useSelector } from "react-redux";
import { XAxisProps, YAxisProps, TooltipProps } from "recharts";
import { CustomBatteryTooltip } from "./CustomBatteryTooltip";
import { BatteryList } from "@components/BatteryList";
import { selectLatestTelemetryArray } from "@redux/store/slices/telemetrySlice";
import { useTranslation } from "react-i18next";

export const BatteryPanel: React.FC = () => {
  const { t } = useTranslation();
  const latestTelemetry = useSelector(selectLatestTelemetryArray);

  const selectedVehicleId = useSelector(
    (state: RootState) => state.telemetry.selectedVehicleId,
  );

  const selectedVehicleTelemetries = useSelector(
    (state: RootState) =>
      state.telemetry.vehicles[selectedVehicleId]?.history ?? [],
  );

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

  const chartData = selectedVehicleTelemetries.map((entry) => ({
    x: new Date(entry.telemetry.timeStamp).getTime(),
    y: entry.telemetry.batteryLevel,
  }));

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
    name: t("Dashboard.DashboardGrid.Panels.BatteryPanel.xAxisLabel"),
  };

  const yAxisProps: Partial<YAxisProps> = {
    dataKey: "y",
    domain: [0, 100],
    unit: "%",
    name: t("Dashboard.DashboardGrid.Panels.BatteryPanel.yAxisLabel"),
  };

  const tooltipProps: Partial<TooltipProps<number, string>> = {
    content: <CustomBatteryTooltip />,
  };

  return (
    <div style={{ overflowY: "auto", height: "100%", width: "100%" }}>
      <ScatterGridChart
        title={t("Dashboard.DashboardGrid.Panels.BatteryPanel.title")}
        data={chartData}
        pointColor="#82ca9d"
        xAxisProps={xAxisProps}
        yAxisProps={yAxisProps}
        tooltipProps={tooltipProps}
      />
    </div>
  );
};

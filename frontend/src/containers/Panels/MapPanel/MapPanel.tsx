import { DataPoint, Map } from "@components/Map";
import { RootState } from "@redux/store";
import { selectLatestTelemetryArray } from "@redux/store/slices/telemetrySlice";
import { TelemetryData } from "@shared/types";
import L from "leaflet";
import { useSelector } from "react-redux";

const getIcon = (id: string) =>
  L.divIcon({
    className: "custom-marker",
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <span style="
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: min(1.2vw, 10px);
          font-weight: bold;
          margin-bottom: 2px;
          white-space: nowrap;
        ">
          ${id}
        </span>
        <img src="/black-van.png" width="32" height="32" />
      </div>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
  });

/**
 * The MapPanel component provides location data for all vehicles or a selected vehicle.
 */
export const MapPanel: React.FC = () => {
  const latestTelemetry = useSelector(selectLatestTelemetryArray);
  const selectedVehicleId = useSelector(
    (state: RootState) => state.telemetry.selectedVehicleId,
  );

  const selectedVehicleTelemetries = useSelector(
    (state: RootState) =>
      state.telemetry.vehicles[selectedVehicleId]?.history ?? [],
  );

  let dataPoints: TelemetryData[] = [];

  if (selectedVehicleId === "all") {
    dataPoints = latestTelemetry;
  } else if (selectedVehicleTelemetries.length > 0) {
    dataPoints = [
      selectedVehicleTelemetries[selectedVehicleTelemetries.length - 1],
    ];
  }

  const vehiclePositions: DataPoint[] = dataPoints.map((telemetry) => ({
    id: telemetry.vehicleId,
    lat: telemetry.telemetry.location.lat,
    lng: telemetry.telemetry.location.lng,
  }));

  return <Map dataPoints={vehiclePositions} iconMapper={getIcon} />;
};

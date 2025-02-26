import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box } from "@mui/material";

/**
 * Interface for generic data points on the map
 */
export interface DataPoint {
  id: string;
  lat: number;
  lng: number;
}

/**
 * Props for Map component
 */
export interface MapProps {
  dataPoints: DataPoint[]; // Generic points instead of vehicles
  iconMapper: (id: string) => L.Icon | L.DivIcon; // Allow external icons
}

/**
 * Helper component to adjust map view based on data points' locations.
 */
const FitBounds: React.FC<{ dataPoints: DataPoint[] }> = ({ dataPoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || dataPoints.length === 0) return;

    if (dataPoints.length === 1) {
      // Center the map on a single data point
      map.setView([dataPoints[0].lat, dataPoints[0].lng], 14);
    } else {
      // Fit multiple data points in view
      const bounds = L.latLngBounds(dataPoints.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, dataPoints]);

  return null;
};

/**
 * The Map component displays generic data points on a map.
 */
export const Map: React.FC<MapProps> = ({ dataPoints, iconMapper }) => {
  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <MapContainer
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100%",
          minWidth: "100%",
          position: "absolute", // Ensure full coverage
          top: 0,
          left: 0,
        }}
      >
        {/* Tile layer (base map) */}
        <TileLayer url="https://tile.openstreetmap.de/{z}/{x}/{y}.png" />

        {/* Render markers for each data point */}
        {dataPoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={iconMapper(point.id)}
          />
        ))}

        {/* Adjust map view based on data points' positions */}
        <FitBounds dataPoints={dataPoints} />
      </MapContainer>
    </Box>
  );
};

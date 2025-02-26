import axios from "axios";
import { TelemetryData } from "@shared/types";
import { REST_URL } from "@consts/index";

const API_BASE_URL = REST_URL;

/**
 * Fetches historical telemetry data from the backend API.
 * Ensures data is sorted by timestamp before returning.
 */
export const fetchTelemetryData = async (): Promise<TelemetryData[]> => {
  try {
    const response = await axios.get<TelemetryData[]>(
      `${API_BASE_URL}/telemetry`,
    );

    return response.data.sort(
      (a, b) =>
        new Date(a.telemetry.timeStamp).getTime() -
        new Date(b.telemetry.timeStamp).getTime(),
    );
  } catch (error) {
    console.error("Failed to fetch telemetry data:", error);
    return [];
  }
};

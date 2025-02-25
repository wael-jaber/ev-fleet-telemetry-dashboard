import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TelemetryData } from "@shared/types";
import { mockTelemetryState } from "./mockdata";

export interface VehicleTelemetry {
  history: TelemetryData[];
}

export interface TelemetryState {
  vehicles: Record<string, VehicleTelemetry>;
  selectedVehicleId: string | "all";
}

const initialState: TelemetryState = mockTelemetryState;

const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    updateTelemetry: (state, action: PayloadAction<TelemetryData[]>) => {
      action.payload.forEach((data) => {
        if (!state.vehicles[data.vehicleId]) {
          state.vehicles[data.vehicleId] = { history: [] };
        }
        state.vehicles[data.vehicleId].history.push(data);
      });
    },
    setSelectedVehicle: (state, action: PayloadAction<string | "all">) => {
      state.selectedVehicleId = action.payload;
    },
  },
});

export const { updateTelemetry, setSelectedVehicle } = telemetrySlice.actions;
export default telemetrySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TelemetryData } from "@shared/types";

export interface VehicleTelemetry {
  history: TelemetryData[];
}

export interface TelemetryState {
  vehicles: Record<string, VehicleTelemetry>;
  selectedVehicleId: string | "all";
  webSocketConnected: boolean;
}

const initialState: TelemetryState = {
  vehicles: {},
  selectedVehicleId: "all",
  webSocketConnected: false,
};

const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    updateTelemetry: (state, action: PayloadAction<TelemetryData[]>) => {
      action.payload.forEach((telemetry) => {
        const { vehicleId } = telemetry;

        if (!state.vehicles[vehicleId]) {
          state.vehicles[vehicleId] = { history: [] };
        }

        state.vehicles[vehicleId].history.push(telemetry);
      });
    },

    setSelectedVehicle: (state, action: PayloadAction<string | "all">) => {
      state.selectedVehicleId = action.payload;
    },

    setWebSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.webSocketConnected = action.payload;
    },
  },
});

export const { updateTelemetry, setSelectedVehicle, setWebSocketConnected } =
  telemetrySlice.actions;
export default telemetrySlice.reducer;

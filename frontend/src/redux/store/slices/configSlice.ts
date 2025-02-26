import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for panel positions
interface PanelPositions {
  desktop: Record<string, { x: number; y: number; w: number; h: number }>;
  mobile: Record<string, { x: number; y: number; w: number; h: number }>;
}

// Initial panel positions (can be updated by the user)
const initialPanelPositions: PanelPositions = {
  desktop: {
    fleetOverview: { x: 0, y: 0, w: 2, h: 2 },
    vehicleList: { x: 0, y: 2, w: 2, h: 2 },
    fleetMap: { x: 2, y: 0, w: 4, h: 3 },
    vehicleDetails: { x: 2, y: 3, w: 4, h: 2 },
    alerts: { x: 2, y: 5, w: 4, h: 2 },
  },
  mobile: {
    fleetOverview: { x: 0, y: 0, w: 3, h: 1 },
    vehicleList: { x: 0, y: 1, w: 3, h: 1 },
    fleetMap: { x: 0, y: 2, w: 3, h: 2 },
    vehicleDetails: { x: 0, y: 4, w: 3, h: 1 },
    alerts: { x: 0, y: 5, w: 3, h: 1 },
  },
};

interface ConfigState {
  theme: "light" | "dark";
  panelPositions: PanelPositions;
}

const initialState: ConfigState = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  panelPositions: initialPanelPositions,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
    updatePanelPositions(state, action: PayloadAction<PanelPositions>) {
      state.panelPositions = action.payload;
    },
  },
});

export const { toggleTheme, updatePanelPositions } = configSlice.actions;
export default configSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPanel, PanelConfigRedux } from "@utils/types";

// Define the type for panel positions
interface PanelPositions {
  desktop: PanelConfigRedux[];
  mobile: PanelConfigRedux[];
}

// Initial panel positions (can be updated by the user)
const initialPanelPositions: PanelPositions = {
  desktop: [
    {
      id: "speed",
      title: "Redux.panelsPosition.desktop.speed",
      component: ComponentPanel.speed,
      layout: { x: 0, y: 1, w: 1, h: 1 },
    },
    {
      id: "battery",
      title: "Redux.panelsPosition.desktop.battery",
      component: ComponentPanel.battery,
      layout: { x: 1, y: 1, w: 1, h: 1 },
    },
    {
      id: "location",
      title: "Redux.panelsPosition.desktop.location",
      component: ComponentPanel.location,
      layout: { x: 0, y: 0, w: 2, h: 1 },
    },
  ],
  mobile: [
    {
      id: "speed",
      title: "Redux.panelsPosition.desktop.speed",
      component: ComponentPanel.speed,
      layout: { x: 0, y: 0, w: 1, h: 2 },
    },
    {
      id: "battery2",
      title: "Redux.panelsPosition.desktop.battery",
      component: ComponentPanel.battery,
      layout: { x: 0, y: 1, w: 1, h: 2 },
    },
    {
      id: "location2",
      title: "Redux.panelsPosition.desktop.location",
      component: ComponentPanel.location,
      layout: { x: 0, y: 2, w: 2, h: 2 },
    },
  ],
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
    updateMobilePanelPositions(
      state,
      action: PayloadAction<Pick<PanelConfigRedux, "id" | "layout">[]>,
    ) {
      action.payload.forEach(({ id, layout }) => {
        const panel = state.panelPositions.mobile.find((p) => p.id === id);
        if (panel) {
          panel.layout = layout;
        }
      });
    },
    updateDesktopPanelPositions(
      state,
      action: PayloadAction<Pick<PanelConfigRedux, "id" | "layout">[]>,
    ) {
      action.payload.forEach(({ id, layout }) => {
        const panel = state.panelPositions.desktop.find((p) => p.id === id);
        if (panel) {
          panel.layout = layout;
        }
      });
    },
  },
});

export const {
  toggleTheme,
  updateMobilePanelPositions,
  updateDesktopPanelPositions,
} = configSlice.actions;
export default configSlice.reducer;

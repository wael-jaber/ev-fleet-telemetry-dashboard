import { PanelConfig } from "@components/PanelsGrid";

export enum ComponentPanel {
  speed = "speed",
  battery = "battery",
  location = "location",
}

export type PanelConfigRedux = Omit<PanelConfig, "component"> & {
  component: ComponentPanel;
};

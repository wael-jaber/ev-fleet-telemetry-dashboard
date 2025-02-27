import { Meta, StoryObj } from "@storybook/react";
import { Map } from "../Map";
import L from "leaflet";
import { Box } from "@mui/material";
import { withDarkTheme, withLightTheme } from "@storyHelpers/ThemeDecorator";

const sampleIconMapper = () =>
  new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

const meta: Meta<typeof Map> = {
  title: "Components/Map",
  component: Map,
  tags: ["autodocs"],
  argTypes: {
    dataPoints: { control: "object" },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", height: "500px" }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Map>;

export const LightMode: Story = {
  args: {
    dataPoints: [
      { id: "1", lat: 52.52, lng: 13.405 },
      { id: "2", lat: 48.8566, lng: 2.3522 },
      { id: "3", lat: 51.5074, lng: -0.1278 },
    ],
    iconMapper: sampleIconMapper,
  },
  decorators: [withLightTheme],
};

export const DarkMode: Story = {
  args: {
    dataPoints: [
      { id: "1", lat: 52.52, lng: 13.405 },
      { id: "2", lat: 48.8566, lng: 2.3522 },
      { id: "3", lat: 51.5074, lng: -0.1278 },
    ],
    iconMapper: sampleIconMapper,
  },
  decorators: [withDarkTheme],
};

export const SinglePoint: Story = {
  args: {
    dataPoints: [{ id: "1", lat: 37.7749, lng: -122.4194 }],
    iconMapper: sampleIconMapper,
  },
};

export const NoPoints: Story = {
  args: {
    dataPoints: [],
    iconMapper: sampleIconMapper,
  },
};

export const ClusteredPoints: Story = {
  args: {
    dataPoints: [
      { id: "1", lat: 40.7128, lng: -74.006 },
      { id: "2", lat: 40.713, lng: -74.007 },
      { id: "3", lat: 40.714, lng: -74.008 },
    ],
    iconMapper: sampleIconMapper,
  },
};

export const ExtremeLocations: Story = {
  args: {
    dataPoints: [
      { id: "1", lat: -90, lng: 0 },
      { id: "2", lat: 90, lng: 0 },
      { id: "3", lat: 0, lng: 180 },
      { id: "4", lat: 0, lng: -180 },
    ],
    iconMapper: sampleIconMapper,
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { PanelsGrid, PanelsGridProps } from "../PanelsGrid";
import { Box } from "@mui/material";
import { withDarkTheme, withLightTheme } from "@storyHelpers/ThemeDecorator";

const meta: Meta<typeof PanelsGrid> = {
  title: "Components/PanelsGrid",
  component: PanelsGrid,
  tags: ["autodocs"],
  argTypes: {
    panels: { control: "object" },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: "100%",
          height: "600px",
          maxWidth: "900px", // TODO: Fix Storybook layout issue with grid sizing
          margin: "auto",
          p: 2,
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PanelsGrid>;

// TODO: Investigate why Storybook passes incorrect width/height to panels.

const samplePanels: PanelsGridProps["panels"] = [
  {
    id: "panel-1",
    title: "Battery",
    component: (
      <Box sx={{ bgcolor: "primary.light", width: "100%", height: "100%" }} />
    ),
    layout: { x: 0, y: 0, w: 1, h: 1 },
  },
  {
    id: "panel-2",
    title: "Map",
    component: (
      <Box sx={{ bgcolor: "secondary.light", width: "100%", height: "100%" }} />
    ),
    layout: { x: 1, y: 0, w: 1, h: 1 },
  },
];

// Light & Dark Mode Stories (Default)
export const LightMode: Story = {
  args: {
    panels: samplePanels,
    cols: { lg: 2, md: 2, sm: 1 },
    rowHeight: 200,
    onLayoutChange: (updatedPanels) =>
      console.log("Updated Layout:", updatedPanels),
  },
  decorators: [withLightTheme],
};

export const DarkMode: Story = {
  args: {
    panels: samplePanels,
    cols: { lg: 2, md: 2, sm: 1 },
    rowHeight: 200,
    onLayoutChange: (updatedPanels) =>
      console.log("Updated Layout:", updatedPanels),
  },
  decorators: [withDarkTheme],
};

// Additional Stories

export const SingleLargePanel: Story = {
  args: {
    panels: [
      {
        id: "panel-1",
        title: "Full-Width Panel",
        component: (
          <Box sx={{ bgcolor: "info.light", width: "100%", height: "100%" }} />
        ),
        layout: { x: 0, y: 0, w: 2, h: 1 },
      },
    ],
    cols: { lg: 2, md: 2, sm: 1 },
    rowHeight: 250,
    onLayoutChange: (updatedPanels) =>
      console.log("Updated Layout:", updatedPanels),
  },
};

export const ManyPanels: Story = {
  args: {
    panels: Array.from({ length: 6 }, (_, i) => ({
      id: `panel-${i + 1}`,
      title: `Panel ${i + 1}`,
      component: (
        <Box sx={{ bgcolor: "warning.light", width: "100%", height: "100%" }} />
      ),
      layout: { x: i % 2, y: Math.floor(i / 2), w: 1, h: 1 },
    })),
    cols: { lg: 2, md: 2, sm: 1 },
    rowHeight: 200,
    onLayoutChange: (updatedPanels) =>
      console.log("Updated Layout:", updatedPanels),
  },
};

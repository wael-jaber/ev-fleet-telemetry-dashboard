import { Meta, StoryObj } from "@storybook/react";
import { ScatterGridChart, ScatterGridChartProps } from "../ScatterGridChart";
import { Box } from "@mui/material";
import { withDarkTheme, withLightTheme } from "@storyHelpers/ThemeDecorator";
import { XAxisProps, YAxisProps } from "recharts";

const meta: Meta<typeof ScatterGridChart> = {
  title: "Components/ScatterGridChart",
  component: ScatterGridChart,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    maxVisiblePoints: { control: "number" },
    pointColor: { control: "color" },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", height: "400px" }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScatterGridChart>;

const sampleData: ScatterGridChartProps["data"] = [
  { x: Date.now() - 50000, y: 95 },
  { x: Date.now() - 40000, y: 92 },
  { x: Date.now() - 30000, y: 87 },
  { x: Date.now() - 20000, y: 83 },
  { x: Date.now() - 10000, y: 79 },
];

/** Custom X-Axis props for time formatting */
const xAxisProps: Partial<XAxisProps> = {
  dataKey: "x",
  type: "number",
  domain: ["auto", "auto"],
  tickFormatter: (timestamp) =>
    new Date(timestamp).toLocaleTimeString("en-GB", {
      timeZone: "CET",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  name: "Time (CET)",
};

/** Custom Y-Axis props for battery percentage */
const yAxisProps: Partial<YAxisProps> = {
  dataKey: "y",
  domain: [0, 100],
  unit: "%",
  name: "Battery Level",
};

/** Light & Dark Mode Stories */
export const LightMode: Story = {
  args: {
    title: "Battery Level Over Time",
    data: sampleData,
    pointColor: "#82ca9d",
    xAxisProps,
    yAxisProps,
  },
  decorators: [withLightTheme],
};

export const DarkMode: Story = {
  args: {
    title: "Battery Level Over Time",
    data: sampleData,
    pointColor: "#82ca9d",
    xAxisProps,
    yAxisProps,
  },
  decorators: [withDarkTheme],
};

/** Additional Stories */
export const LargeDataset: Story = {
  args: {
    title: "Large Dataset",
    data: Array.from({ length: 30 }, (_, i) => ({
      x: Date.now() - i * 5000,
      y: Math.random() * 100,
    })),
    xAxisProps,
    yAxisProps,
  },
};

export const FewPoints: Story = {
  args: {
    title: "Few Data Points",
    data: [
      { x: Date.now() - 10000, y: 40 },
      { x: Date.now(), y: 70 },
    ],
    xAxisProps,
    yAxisProps,
  },
};

export const EmptyData: Story = {
  args: {
    title: "No Data Available",
    data: [],
    xAxisProps,
    yAxisProps,
  },
};

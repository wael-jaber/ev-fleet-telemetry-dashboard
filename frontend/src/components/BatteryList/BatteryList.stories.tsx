import { Meta, StoryObj } from "@storybook/react";
import { BatteryList, BatteryListProps } from "../BatteryList";
import { withDarkTheme, withLightTheme } from "@storyHelpers/ThemeDecorator";

const meta: Meta<typeof BatteryList> = {
  title: "Components/BatteryList",
  component: BatteryList,
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "List of battery percentages with labels",
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BatteryList>;

const sampleData: BatteryListProps["data"] = [
  { label: "Vehicle A", value: 85.4 },
  { label: "Vehicle B", value: 52.1 },
  { label: "Vehicle C", value: 18.6 },
  { label: "Vehicle D", value: 7.3 },
];

/**
 * **Light Mode Story**
 * - Uses `withLightTheme`
 */
export const LightMode: Story = {
  args: { data: sampleData },
  decorators: [withLightTheme],
};

/**
 * **Dark Mode Story**
 * - Uses `withDarkTheme`
 */
export const DarkMode: Story = {
  args: { data: sampleData },
  decorators: [withDarkTheme],
};

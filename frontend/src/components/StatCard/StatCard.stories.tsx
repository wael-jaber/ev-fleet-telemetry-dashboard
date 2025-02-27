import { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "../StatCard";
import { withDarkTheme, withLightTheme } from "@storyHelpers/ThemeDecorator";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BoltIcon from "@mui/icons-material/Bolt";

const meta: Meta<typeof StatCard> = {
  title: "Components/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
    iconColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

// Light & Dark Mode Stories (Default)
export const LightMode: Story = {
  args: {
    title: "Total Vehicles",
    value: 42,
    icon: <DirectionsCarIcon fontSize="large" />,
    iconColor: "primary.main",
  },
  decorators: [withLightTheme],
};

export const DarkMode: Story = {
  args: {
    title: "Total Vehicles",
    value: 42,
    icon: <DirectionsCarIcon fontSize="large" />,
    iconColor: "primary.main",
  },
  decorators: [withDarkTheme],
};

// Additional Stories

export const BatteryLevel: Story = {
  args: {
    title: "Battery Level",
    value: "85%",
    icon: <BatteryChargingFullIcon fontSize="large" />,
    iconColor: "success.main",
  },
};

export const EnergyConsumption: Story = {
  args: {
    title: "Energy Consumption",
    value: "12.5 kWh",
    icon: <BoltIcon fontSize="large" />,
    iconColor: "warning.main",
  },
};

export const LargeValue: Story = {
  args: {
    title: "Mileage",
    value: "123,456 km",
    icon: <DirectionsCarIcon fontSize="large" />,
    iconColor: "info.main",
  },
};

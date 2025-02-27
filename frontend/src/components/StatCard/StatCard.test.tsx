import { render, screen } from "@testing-library/react";
import { StatCard } from "../StatCard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { describe, it, expect } from "vitest";

describe("StatCard", () => {
  it("renders with title and value", () => {
    render(
      <StatCard
        title="Total Vehicles"
        value={42}
        icon={<DirectionsCarIcon />}
      />,
    );

    expect(screen.getByText("Total Vehicles")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders with an icon", () => {
    render(
      <StatCard
        title="Total Vehicles"
        value={42}
        icon={<DirectionsCarIcon data-testid="stat-icon" />}
      />,
    );

    expect(screen.getByTestId("stat-icon")).toBeInTheDocument();
  });
});

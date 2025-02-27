import { render, screen } from "@testing-library/react";
import { BatteryList, BatteryListProps } from "../BatteryList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { describe, it, expect } from "vitest";

const theme = createTheme(); // Ensures correct theme styles are applied

describe("BatteryList", () => {
  it("renders a list of battery values", () => {
    const data: BatteryListProps["data"] = [
      { label: "Vehicle A", value: 85.4 },
      { label: "Vehicle B", value: 52.1 },
      { label: "Vehicle C", value: 18.6 },
    ];

    render(
      <ThemeProvider theme={theme}>
        <BatteryList data={data} />
      </ThemeProvider>,
    );

    expect(screen.getByText("Vehicle A")).toBeInTheDocument();
    expect(screen.getByText("85.4%")).toBeInTheDocument();
    expect(screen.getByText("Vehicle B")).toBeInTheDocument();
    expect(screen.getByText("52.1%")).toBeInTheDocument();
    expect(screen.getByText("Vehicle C")).toBeInTheDocument();
    expect(screen.getByText("18.6%")).toBeInTheDocument();
  });

  it("renders empty state when no data is provided", () => {
    render(
      <ThemeProvider theme={theme}>
        <BatteryList data={[]} />
      </ThemeProvider>,
    );
    expect(screen.getByText("No data available.")).toBeInTheDocument();
  });

  it("applies correct color styles based on battery level", () => {
    const data: BatteryListProps["data"] = [
      { label: "High Battery", value: 80 },
      { label: "Medium Battery", value: 40 },
      { label: "Low Battery", value: 15 },
    ];

    render(
      <ThemeProvider theme={theme}>
        <BatteryList data={data} />
      </ThemeProvider>,
    );

    const getProgressBarColor = (text: string) => {
      const progressBar = screen
        .getByText(text)
        .parentElement?.querySelector(".MuiLinearProgress-bar");
      return progressBar
        ? window.getComputedStyle(progressBar).backgroundColor
        : null;
    };

    expect(getProgressBarColor("80.0%")).toBe("rgb(25, 118, 210)"); // Green
    expect(getProgressBarColor("40.0%")).toBe("rgb(255, 165, 0)"); // Orange
    expect(getProgressBarColor("15.0%")).toBe("rgb(255, 0, 0)"); // Red
  });
});

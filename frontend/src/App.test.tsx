import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { describe, it, expect } from "vitest";

describe("App Component", () => {
  it("renders the heading", () => {
    render(<App />);
    // @ts-expect-error : look at https://github.com/testing-library/jest-dom/issues/515
    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });

  it("increments count on button click", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /count is 0/i });

    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: /count is 1/i }),
      // @ts-expect-error : look at https://github.com/testing-library/jest-dom/issues/515
    ).toBeInTheDocument();
  });
});

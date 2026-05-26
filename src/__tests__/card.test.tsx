import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "../components/card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Hello card</Card>);
    expect(screen.getByText("Hello card")).toBeInTheDocument();
  });

  it("applies interactive class when interactive", () => {
    const { container } = render(<Card interactive>Tap me</Card>);
    expect(container.firstChild).toHaveClass("cursor-pointer");
  });

  it("applies compact radius for piece-link rows", () => {
    const { container } = render(<Card size="compact">Row</Card>);
    expect(container.firstChild).toHaveClass("rounded-xl");
    expect(container.firstChild).not.toHaveClass("rounded-3xl");
  });

  it("applies rectangle radius for calendar-style panels", () => {
    const { container } = render(<Card size="rectangle">Panel</Card>);
    expect(container.firstChild).toHaveClass("rounded-3xl");
  });
});

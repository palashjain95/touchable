import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { pressableDivProps } from "../lib/a11y";

describe("accessibility", () => {
  it("buttons expose focus-visible ring utilities", () => {
    render(<Button fullWidth={false}>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" }).className).toContain("focus-visible:ring");
  });

  it("interactive Card with onClick is a keyboard-activatable button", () => {
    const onClick = vi.fn();
    render(
      <Card interactive aria-label="Open item" onClick={onClick}>
        Row
      </Card>,
    );
    const control = screen.getByRole("button", { name: "Open item" });
    fireEvent.keyDown(control, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("pressableDivProps activates on Space", () => {
    const onClick = vi.fn();
    render(
      <div {...pressableDivProps({ onClick })} aria-label="Filter">
        Filter
      </div>,
    );
    const chip = screen.getByRole("button", { name: "Filter" });
    fireEvent.keyDown(chip, { key: " " });
    expect(onClick).toHaveBeenCalled();
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { CSSProperties } from "react";
import { PillNeutral, PillAccent } from "../components/pill";

describe("Pill", () => {
  it("renders neutral pill", () => {
    render(<PillNeutral>Draft</PillNeutral>);
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });

  it("renders accent pill", () => {
    render(
      <PillAccent style={{ "--bg-accent": "var(--primary)" } as CSSProperties}>
        Active
      </PillAccent>,
    );
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});

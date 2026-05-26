import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InputField, inputFieldClass } from "../components/input-field";

describe("InputField", () => {
  it("renders with input-field shell class", () => {
    render(<InputField placeholder="My Project" aria-label="Display name" />);
    const input = screen.getByRole("textbox", { name: "Display name" });
    expect(input).toHaveClass("input-field");
    expect(input).toHaveClass("h-8");
    expect(input).toHaveAttribute("spellcheck", "false");
  });

  it("supports default size", () => {
    render(<InputField size="default" aria-label="Title" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-11");
  });

  it("inputFieldClass merges extra classes", () => {
    expect(inputFieldClass("compact", "bg-muted/25")).toContain("input-field");
    expect(inputFieldClass("compact", "bg-muted/25")).toContain("bg-muted/25");
  });

  it("sets aria-invalid when invalid", () => {
    render(<InputField invalid aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });
});

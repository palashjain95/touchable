import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownValue,
  DropdownContent,
  DropdownItem,
} from "./dropdown";

describe("Dropdown", () => {
  it("renders trigger with selected value", () => {
    render(
      <Dropdown defaultValue="welcome">
        <DropdownTrigger>
          <DropdownValue placeholder="Select..." />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="welcome">Welcome</DropdownItem>
          <DropdownItem value="recital">Recital</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("Welcome");
  });

  it("renders pill trigger for filter dropdowns", () => {
    render(
      <Dropdown defaultValue="mine">
        <DropdownTrigger variant="pill" aria-label="Project filter">
          <DropdownValue placeholder="Filter projects" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="mine">Created by me</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const trigger = screen.getByRole("combobox", { name: "Project filter" });
    expect(trigger).toHaveTextContent("Created by me");
    expect(trigger.className).toContain("rounded-full");
  });
});

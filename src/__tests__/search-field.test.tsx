import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SearchField } from "../components/search-field";

describe("SearchField", () => {
  it("renders search input with icon", () => {
    render(<SearchField placeholder="Search projects" />);
    expect(screen.getByRole("searchbox", { name: "Search projects" })).toBeInTheDocument();
  });

  it("renders pill variant shell", () => {
    const { container } = render(
      <SearchField variant="pill" aria-label="Search projects" />,
    );
    expect(container.querySelector('[role="search"]')).toHaveClass("rounded-full");
  });
});

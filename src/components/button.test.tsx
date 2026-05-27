import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, ButtonNeutral, ButtonDisc, ButtonLink, ButtonIconLinkLabeled } from "./button";

describe("Button", () => {
  it("renders primary button", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("renders disabled neutral button", () => {
    render(
      <ButtonNeutral disabled fullWidth={false}>
        Cancel
      </ButtonNeutral>,
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
  });

  it("renders text link", () => {
    render(<ButtonLink href="/tokens">View tokens</ButtonLink>);
    const link = screen.getByRole("link", { name: "View tokens" });
    expect(link).toHaveAttribute("href", "/tokens");
  });

  it("renders icon link with label beside", () => {
    render(
      <ButtonIconLinkLabeled
        href="https://example.com"
        label="Documentation"
        external
        icon={<span data-testid="icon" />}
      />,
    );
    const link = screen.getByRole("link", { name: "Documentation" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders disc with swatch fill", () => {
    render(<ButtonDisc swatchColor="#336699" aria-label="Pick colour" />);
    const button = screen.getByRole("button", { name: "Pick colour" });
    const swatch = button.querySelector("[data-disc-swatch]");
    expect(swatch).toBeTruthy();
    expect(swatch).toHaveStyle({ background: "#336699" });
  });
});

import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithA11y } from "@/lib/accessibility-testing";
import Link from "./link";

describe("Link", () => {
  it("renders with default props", () => {
    renderWithA11y(<Link href="/test">Test Link</Link>);
    
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Test Link");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("renders with custom size", () => {
    renderWithA11y(<Link href="/test" size="xl">Test Link</Link>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveStyle({ fontSize: "var(--font-size-xl)" });
  });

  it("renders with custom weight", () => {
    renderWithA11y(<Link href="/test" weight="bold">Test Link</Link>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveStyle({ fontWeight: "700" });
  });

  it("renders with underline", () => {
    renderWithA11y(<Link href="/test" underline>Test Link</Link>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveClass("underline");
  });

  it("renders with custom line height", () => {
    renderWithA11y(<Link href="/test" lineHeight="tight">Test Link</Link>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveStyle({ lineHeight: "var(--line-height-tight)" });
  });

  it("renders with secondary variant", () => {
    renderWithA11y(<Link href="/test" variant="secondary">Test Link</Link>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveStyle({ color: "var(--color-secondary)" });
  });

  it("renders external link", () => {
    renderWithA11y(<Link href="https://example.com" external>External Link</Link>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders with custom className", () => {
    renderWithA11y(<Link href="/test" className="custom-class">Test Link</Link>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });

  it("should pass accessibility tests", async () => {
    const { axe } = renderWithA11y(<Link href="/test">Accessible Link</Link>);
    
    const results = await axe();
    expect(results).toHaveNoViolations();
  });
}); 
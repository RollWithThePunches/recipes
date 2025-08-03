import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithA11y } from "@/lib/accessibility-testing";
import Heading from "./heading";

describe("Heading", () => {
  it("renders with default props", () => {
    renderWithA11y(<Heading>Test Heading</Heading>);
    
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Heading");
    expect(heading).toHaveClass("text-[var(--color-text-heading)]");
  });

  it("renders with custom heading level", () => {
    renderWithA11y(<Heading as="h2">Test Heading</Heading>);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    renderWithA11y(<Heading size="5xl">Test Heading</Heading>);
    
    const heading = screen.getByRole("heading");
    expect(heading).toHaveStyle({ fontSize: "var(--font-size-5xl)" });
  });

  it("renders with body font", () => {
    renderWithA11y(<Heading font="body">Test Heading</Heading>);
    
    const heading = screen.getByRole("heading");
    expect(heading).toHaveStyle({ 
      fontFamily: "var(--font-family-body)",
      lineHeight: "var(--line-height-normal)"
    });
  });

  it("renders with heading font", () => {
    renderWithA11y(<Heading font="heading">Test Heading</Heading>);
    
    const heading = screen.getByRole("heading");
    expect(heading).toHaveStyle({ 
      fontFamily: "var(--font-family-heading)",
      lineHeight: "var(--line-height-snug)"
    });
  });

  it("renders with custom className", () => {
    renderWithA11y(<Heading className="custom-class">Test Heading</Heading>);
    
    const heading = screen.getByRole("heading");
    expect(heading).toHaveClass("custom-class");
  });

  it("renders with custom id", () => {
    renderWithA11y(<Heading id="test-id">Test Heading</Heading>);
    
    const heading = screen.getByRole("heading");
    expect(heading).toHaveAttribute("id", "test-id");
  });

  it("should pass accessibility tests", async () => {
    const { axe } = renderWithA11y(<Heading>Accessible Heading</Heading>);
    
    const results = await axe();
    expect(results).toHaveNoViolations();
  });
}); 
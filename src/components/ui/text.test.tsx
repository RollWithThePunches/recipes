import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithA11y } from "@/lib/accessibility-testing";
import Text from "./text";

describe("Text", () => {
  it("renders with default props", () => {
    renderWithA11y(<Text>Test text</Text>);
    const text = screen.getByText("Test text");
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe("P");
  });

  it("renders with custom size", () => {
    renderWithA11y(<Text size="lg">Large text</Text>);
    const text = screen.getByText("Large text");
    expect(text).toHaveStyle({ fontSize: "var(--font-size-lg)" });
  });

  it("renders with custom color", () => {
    renderWithA11y(<Text color="heading">Heading colored text</Text>);
    const text = screen.getByText("Heading colored text");
    expect(text).toHaveStyle({ color: "var(--color-text-heading)" });
  });

  it("renders with custom weight", () => {
    renderWithA11y(<Text weight="bold">Bold text</Text>);
    const text = screen.getByText("Bold text");
    expect(text).toHaveStyle({ fontWeight: "700" });
  });

  it("renders with custom line height", () => {
    renderWithA11y(<Text lineHeight="tight">Tight line height text</Text>);
    const text = screen.getByText("Tight line height text");
    expect(text).toHaveStyle({ lineHeight: "var(--line-height-tight)" });
  });

  it("renders as different element", () => {
    renderWithA11y(<Text as="span">Span text</Text>);
    const text = screen.getByText("Span text");
    expect(text.tagName).toBe("SPAN");
  });

  it("renders with custom className", () => {
    renderWithA11y(<Text className="custom-class">Custom class text</Text>);
    const text = screen.getByText("Custom class text");
    expect(text).toHaveClass("custom-class");
  });

  it("passes through additional props", () => {
    renderWithA11y(<Text data-testid="test-text">Props text</Text>);
    const text = screen.getByTestId("test-text");
    expect(text).toBeInTheDocument();
  });

  it("meets accessibility standards", async () => {
    const { axe } = renderWithA11y(<Text>Accessible text</Text>);
    const results = await axe();
    expect(results).toHaveNoViolations();
  });
}); 
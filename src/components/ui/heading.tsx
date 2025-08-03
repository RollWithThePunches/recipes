import React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps {
  /**
   * The heading level (h1, h2, h3, h4, h5, h6)
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  
  /**
   * The font size to use
   */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  
  /**
   * The font family to use
   */
  font?: "body" | "heading";
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * The content to display
   */
  children: React.ReactNode;
  
  /**
   * Optional ID for the heading (useful for accessibility)
   */
  id?: string;
}

const sizeToFontSize = {
  xs: "var(--font-size-xs)",
  sm: "var(--font-size-sm)",
  base: "var(--font-size-base)",
  lg: "var(--font-size-lg)",
  xl: "var(--font-size-xl)",
  "2xl": "var(--font-size-2xl)",
  "3xl": "var(--font-size-3xl)",
  "4xl": "var(--font-size-4xl)",
  "5xl": "var(--font-size-5xl)",
  "6xl": "var(--font-size-6xl)",
} as const;

const fontToFontFamily = {
  body: "var(--font-family-body)",
  heading: "var(--font-family-heading)",
} as const;

export function Heading({
  as: Component = "h1",
  size = "4xl",
  font = "heading",
  className,
  children,
  id,
  ...props
}: HeadingProps) {
  const fontSize = sizeToFontSize[size];
  const fontFamily = fontToFontFamily[font];
  
  return (
    <Component
      id={id}
      className={cn(
        "text-[var(--color-text-heading)]",
        className
      )}
      style={{
        fontSize,
        fontFamily,
        lineHeight: font === "heading" ? "var(--line-height-tight)" : "var(--line-height-normal)",
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Heading; 
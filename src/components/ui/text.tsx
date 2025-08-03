import React from "react";
import { cn } from "@/lib/utils";

export interface TextProps {
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  color?: "body" | "heading" | "on-dark" | "secondary" | "primary" | "success" | "warning" | "error" | "info";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  lineHeight?: "tight" | "snug" | "normal" | "relaxed" | "loose";
  className?: string;
  children: React.ReactNode;
  as?: "p" | "span" | "div";
  [key: string]: unknown;
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

const weightToFontWeight = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

const lineHeightToValue = {
  tight: "var(--line-height-tight)",
  snug: "var(--line-height-snug)",
  normal: "var(--line-height-normal)",
  relaxed: "var(--line-height-relaxed)",
  loose: "var(--line-height-loose)",
} as const;

const colorToValue = {
  body: "var(--color-text-body)",
  heading: "var(--color-text-heading)",
  "on-dark": "var(--color-text-on-dark)",
  secondary: "var(--color-secondary)",
  primary: "var(--color-primary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  info: "var(--color-info)",
} as const;

export function Text({
  size = "base",
  color = "body",
  weight = "normal",
  lineHeight = "normal",
  className,
  children,
  as: Component = "p",
  ...props
}: TextProps) {
  const fontSize = sizeToFontSize[size];
  const fontWeight = weightToFontWeight[weight];
  const lineHeightValue = lineHeightToValue[lineHeight];
  const colorValue = colorToValue[color];

  return (
    <Component
      className={cn(className)}
      style={{
        fontSize,
        fontWeight,
        lineHeight: lineHeightValue,
        fontFamily: "var(--font-family-body)",
        color: colorValue,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Text; 
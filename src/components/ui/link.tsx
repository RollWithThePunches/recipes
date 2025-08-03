import React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

export interface LinkProps {
  /**
   * The URL to navigate to
   */
  href: string;
  
  /**
   * The content to display
   */
  children: React.ReactNode;
  
  /**
   * The font size to use
   */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  
  /**
   * The font weight to use
   */
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  
  /**
   * Whether to show underline decoration
   */
  underline?: boolean;
  
  /**
   * The line height to use
   */
  lineHeight?: "tight" | "snug" | "normal" | "relaxed" | "loose";
  
  /**
   * The color variant to use
   */
  variant?: "primary" | "secondary" | "body";
  color?: "body" | "heading" | "on-dark" | "secondary" | "primary" | "success" | "warning" | "error" | "info";
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Whether to open in new tab
   */
  external?: boolean;
  
  /**
   * Additional props for the link element
   */
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

const variantToColor = {
  primary: "var(--color-link)",
  secondary: "var(--color-secondary)",
  body: "var(--color-text-body)",
} as const;

const variantToHoverColor = {
  primary: "var(--color-link-hover)",
  secondary: "var(--color-primary)",
  body: "var(--color-link-hover)",
} as const;

export function Link({
  href,
  children,
  size = "base",
  weight = "normal",
  underline = false,
  lineHeight = "normal",
  variant = "primary",
  className,
  color,
  external = false,
  ...props
}: LinkProps) {
  const fontSize = sizeToFontSize[size];
  const fontWeight = weightToFontWeight[weight];
  const lineHeightValue = lineHeightToValue[lineHeight];
  const colorValue = color ? colorToValue[color] : variantToColor[variant];
  const hoverColor = variantToHoverColor[variant];
  
  const linkClasses = cn(
    "transition-colors duration-[var(--transition-fast)]",
    underline && "underline decoration-solid underline-offset-2",
    className
  );
  
  const linkStyle = {
    fontSize,
    fontWeight,
    lineHeight: lineHeightValue,
    fontFamily: "var(--font-family-body)",
    color: colorValue,
    "--hover-color": hoverColor,
  } as React.CSSProperties & { "--hover-color": string };
  
  // Handle external links
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        style={linkStyle}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  // Handle internal links
  return (
    <NextLink
      href={href}
      className={linkClasses}
      style={linkStyle}
      {...props}
    >
      {children}
    </NextLink>
  );
}

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

export default Link; 
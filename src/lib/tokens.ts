/**
 * Design Tokens for Recipe Browser App
 * TypeScript version for use in components and utilities
 */

export const colors = {
  // Primary Colors
  primary: "#FF3D4A",
  secondary: "#8B1300",

  // Background Colors
  background: "#FFFFFF",
  backgroundDark: "#333333",
  backgroundYellow: "#FFF9E8",
  backgroundOverlay: "rgba(0, 0, 0, 0.5)",

  // Text Colors
  textHeading: "#333333",
  textBody: "#000000",
  textOnDark: "#FFFFFF",

  // Interactive Colors
  link: "#8B1300",
  linkHover: "#FF3D4A",
  hoverBackground: "#f2f2f2",
  buttonHover: "#8B1300",
  focus: "#8B1300",

  // Footer
  footerBackground: "#333333",

  // Status Colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#8B1300",

  // Card Colors
  cardBackground: "#FFFFFF",
  cardBorder: "#E5E5E5",
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "40px",
  "4xl": "48px",
  "5xl": "60px",
  "6xl": "80px",
  "7xl": "120px",
} as const;

export const typography = {
  fontFamily: {
    body: "'Lexend', sans-serif",
    heading: "'Madimi One', cursive",
  },
  fontSize: {
    xs: "0.625rem", // 10px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.25rem", // 20px
    xl: "1.5rem", // 24px
    "2xl": "1.75rem", // 28px
    "3xl": "2rem", // 32px
    "4xl": "2.5rem", // 40px
    "5xl": "3rem", // 48px
    "6xl": "4rem", // 64px
  },
  lineHeight: {
    tight: "100%",
    snug: "125%",
    normal: "150%",
    relaxed: "175%",
    loose: "200%",
  },
} as const;

export const borderRadius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
} as const;

export const transitions = {
  fast: "150ms ease-in-out",
  normal: "250ms ease-in-out",
  slow: "350ms ease-in-out",
} as const;

export const shadows = {
  card: "0 2px 8px rgba(0, 0, 0, 0.1)",
  cardHover: "0 4px 16px rgba(0, 0, 0, 0.15)",
} as const;

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Component-specific token collections
export const buttons = {
  primary: {
    background: colors.primary,
    text: colors.textOnDark,
    hover: colors.hoverBackground,
  },
  secondary: {
    background: colors.background,
    text: colors.secondary,
    border: colors.secondary,
    hover: colors.hoverBackground,
  },
  tertiary: {
    background: "transparent",
    text: colors.secondary,
    hover: colors.hoverBackground,
  },
} as const;

export const focus = {
  ring: `2px solid ${colors.focus}`,
  ringOffset: "2px",
} as const;

// Export all tokens as a single object
export const tokens = {
  colors,
  spacing,
  typography,
  borderRadius,
  transitions,
  shadows,
  zIndex,
  breakpoints,
  buttons,
  focus,
} as const;

export default tokens;

/**
 * Style utilities for Recipe Browser App
 * Helper functions and types for using design tokens in components
 */

import { tokens } from './tokens';

// Type definitions for better developer experience
export type ColorToken = keyof typeof tokens.colors;
export type SpacingToken = keyof typeof tokens.spacing;
export type FontSizeToken = keyof typeof tokens.typography.fontSize;
export type LineHeightToken = keyof typeof tokens.typography.lineHeight;
export type BorderRadiusToken = keyof typeof tokens.borderRadius;
export type TransitionToken = keyof typeof tokens.transitions;
export type BreakpointToken = keyof typeof tokens.breakpoints;

// Utility function to get CSS custom property
export const cssVar = (token: string): string => `var(--${token})`;

// Helper functions for common styling patterns
export const getColor = (color: ColorToken): string => tokens.colors[color];
export const getSpacing = (spacing: SpacingToken): string => tokens.spacing[spacing];
export const getFontSize = (size: FontSizeToken): string => tokens.typography.fontSize[size];
export const getLineHeight = (height: LineHeightToken): string => tokens.typography.lineHeight[height];
export const getBorderRadius = (radius: BorderRadiusToken): string => tokens.borderRadius[radius];
export const getTransition = (transition: TransitionToken): string => tokens.transitions[transition];

// Common style objects for inline styles
export const styles = {
  // Typography styles
  heading: {
    fontFamily: tokens.typography.fontFamily.heading,
    color: tokens.colors.textHeading,
    lineHeight: tokens.typography.lineHeight.snug,
  },
  body: {
    fontFamily: tokens.typography.fontFamily.body,
    color: tokens.colors.textBody,
    lineHeight: tokens.typography.lineHeight.normal,
  },
  
  // Button styles
  buttonPrimary: {
    backgroundColor: tokens.buttons.primary.background,
    color: tokens.buttons.primary.text,
    borderRadius: tokens.borderRadius.md,
    padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
    fontSize: tokens.typography.fontSize.base,
    fontFamily: tokens.typography.fontFamily.body,
    border: 'none',
    cursor: 'pointer',
    transition: tokens.transitions.normal,
  },
  buttonSecondary: {
    backgroundColor: tokens.buttons.secondary.background,
    color: tokens.buttons.secondary.text,
    borderRadius: tokens.borderRadius.md,
    padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
    fontSize: tokens.typography.fontSize.base,
    fontFamily: tokens.typography.fontFamily.body,
    border: 'none',
    cursor: 'pointer',
    transition: tokens.transitions.normal,
  },
  
  // Card styles
  card: {
    backgroundColor: tokens.colors.cardBackground,
    borderRadius: tokens.borderRadius.lg,
    boxShadow: tokens.shadows.card,
    border: `1px solid ${tokens.colors.cardBorder}`,
    transition: tokens.transitions.normal,
  },
  
  // Focus styles
  focusRing: {
    outline: tokens.focus.ring,
    outlineOffset: tokens.focus.ringOffset,
  },
  
  // Layout styles
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `0 ${tokens.spacing.lg}`,
  },
  
  // Mobile responsive helpers
  mobileContainer: {
    padding: `0 ${tokens.spacing.md}`,
  },
} as const;

// CSS class name generators for consistent styling
export const classNames = {
  // Spacing classes using CSS custom properties
  padding: (size: SpacingToken) => `p-[${tokens.spacing[size]}]`,
  margin: (size: SpacingToken) => `m-[${tokens.spacing[size]}]`,
  
  // Typography classes
  fontSize: (size: FontSizeToken) => `text-[${tokens.typography.fontSize[size]}]`,
  
  // Color classes
  textColor: (color: ColorToken) => `text-[${tokens.colors[color]}]`,
  backgroundColor: (color: ColorToken) => `bg-[${tokens.colors[color]}]`,
  
  // Border radius classes
  borderRadius: (radius: BorderRadiusToken) => `rounded-[${tokens.borderRadius[radius]}]`,
};

// Media query helpers
export const mediaQueries = {
  sm: `@media (min-width: ${tokens.breakpoints.sm})`,
  md: `@media (min-width: ${tokens.breakpoints.md})`,
  lg: `@media (min-width: ${tokens.breakpoints.lg})`,
  xl: `@media (min-width: ${tokens.breakpoints.xl})`,
  '2xl': `@media (min-width: ${tokens.breakpoints['2xl']})`,
};

// Accessibility helpers
export const a11y = {
  // Screen reader only text
  srOnly: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden' as const,
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    border: '0',
  },
  
  // Focus management
  focusable: {
    ':focus': styles.focusRing,
  },
  
  // Skip link
  skipLink: {
    position: 'absolute' as const,
    top: '-40px',
    left: '6px',
    backgroundColor: tokens.colors.primary,
    color: tokens.colors.textOnDark,
    padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
    borderRadius: tokens.borderRadius.md,
    textDecoration: 'none',
    transition: tokens.transitions.fast,
    zIndex: tokens.zIndex.tooltip,
    ':focus': {
      top: '6px',
    },
  },
};

// Common animation/transition classes
export const animations = {
  fadeIn: {
    opacity: 0,
    animation: 'fadeIn 0.3s ease-in-out forwards',
  },
  slideUp: {
    transform: 'translateY(20px)',
    opacity: 0,
    animation: 'slideUp 0.3s ease-out forwards',
  },
  hover: {
    transition: tokens.transitions.normal,
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadows.cardHover,
    },
  },
};

export default {
  tokens,
  styles,
  classNames,
  mediaQueries,
  a11y,
  animations,
  getColor,
  getSpacing,
  getFontSize,
  getLineHeight,
  getBorderRadius,
  getTransition,
  cssVar,
}; 
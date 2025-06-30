# Design Tokens Documentation

This directory contains the design tokens and styling utilities for the Recipe Browser App, implementing the design system requirements with accessibility-focused patterns.

## Files Overview

- **`tokens.css`** - CSS custom properties (CSS variables) for all design tokens
- **`../lib/tokens.ts`** - TypeScript version of design tokens for JavaScript/React usage
- **`../lib/styles.ts`** - Utility functions and helpers for using design tokens

## Usage Examples

### 1. Using CSS Custom Properties

```css
.recipe-card {
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--card-shadow);
  transition: var(--transition-normal);
}

.recipe-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  color: var(--color-text-heading);
  line-height: var(--line-height-snug);
}
```

### 2. Using TypeScript Tokens in React Components

```tsx
import { tokens, styles } from '@/lib/styles';

const RecipeCard = ({ recipe }) => {
  return (
    <div style={styles.card}>
      <h3 style={{
        ...styles.heading,
        fontSize: tokens.typography.fontSize['2xl']
      }}>
        {recipe.title}
      </h3>
      <p style={styles.body}>
        {recipe.description}
      </p>
    </div>
  );
};
```

### 3. Using with Tailwind CSS Classes

```tsx
// Using arbitrary values with our tokens
<div className="bg-[var(--color-background)] p-[var(--spacing-xl)] rounded-[var(--radius-lg)]">
  <h2 className="text-[var(--font-size-2xl)] text-[var(--color-text-heading)]">
    Recipe Title
  </h2>
</div>
```

### 4. Using Helper Functions

```tsx
import { getColor, getSpacing, getFontSize } from '@/lib/styles';

const buttonStyle = {
  backgroundColor: getColor('primary'),
  padding: `${getSpacing('md')} ${getSpacing('xl')}`,
  fontSize: getFontSize('base'),
};
```

## Design System Specifications

### Colors
- **Primary**: `#FF3D4A` - Use for call-to-action buttons, important highlights
- **Secondary**: `#007DB7` - Use for links, secondary buttons, focus states
- **Text**: `#000000` for body text, `#333333` for headings
- **Background**: `#FFFFFF` for main backgrounds

### Typography
- **Headings**: Madimi One (Google Fonts)
- **Body**: Lexend (Google Fonts)
- **Font Sizes**: `.625rem` to `4rem` following consistent scale
- **Line Heights**: 100% to 200% for different content types

### Spacing Scale
- **XS to 7XL**: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `40px`, `48px`, `60px`, `80px`, `120px`
- Use consistently across margins, padding, and layout spacing

## Accessibility Features

### Focus Management
```css
/* Automatic focus rings for interactive elements */
button:focus,
input:focus {
  outline: var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}
```

### Screen Reader Support
```tsx
// Use the sr-only utility for screen reader only content
<span className="sr-only">Additional context for screen readers</span>

// Or with styles
<span style={a11y.srOnly}>Hidden visual text</span>
```

### Skip Links
```tsx
// Skip to main content for keyboard navigation
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

## Mobile-First Responsive Design

### Breakpoints
- **sm**: `640px`
- **md**: `768px` 
- **lg**: `1024px`
- **xl**: `1280px`
- **2xl**: `1536px`

### Usage
```css
/* Mobile-first approach */
.container {
  padding: var(--spacing-md);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-lg);
  }
}
```

## Component Examples

### Button Component
```tsx
const Button = ({ variant = 'primary', children, ...props }) => {
  const buttonStyle = variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary;
  
  return (
    <button style={buttonStyle} {...props}>
      {children}
    </button>
  );
};
```

### Card Component
```tsx
const Card = ({ children, hover = false }) => {
  return (
    <div 
      style={{
        ...styles.card,
        ...(hover && animations.hover)
      }}
    >
      {children}
    </div>
  );
};
```

## Best Practices

1. **Always use design tokens** instead of hardcoded values
2. **Prioritize CSS custom properties** for styling, use TypeScript tokens for dynamic values
3. **Follow mobile-first responsive design** patterns
4. **Include proper ARIA attributes** and semantic HTML
5. **Test with keyboard navigation** and screen readers
6. **Use consistent spacing** from the spacing scale
7. **Apply focus management** for all interactive elements

## Updating Tokens

To update design tokens:

1. Modify `tokens.css` for CSS custom properties
2. Update `tokens.ts` for TypeScript values
3. Ensure both files stay in sync
4. Test across all components using the tokens
5. Update this documentation if new patterns are added 
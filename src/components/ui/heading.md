# Heading Component

A reusable heading component that provides consistent typography and accessibility across the application.

**🔥 CRITICAL**: Always use this component instead of raw `<h1>`, `<h2>`, `<h3>`, etc. tags.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h1"` | The HTML heading element to render |
| `size` | `"xs" \| "sm" \| "base" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl" \| "5xl" \| "6xl"` | `"4xl"` | The font size to use (maps to CSS custom properties) |
| `font` | `"body" \| "heading"` | `"heading"` | The font family to use |
| `className` | `string` | - | Additional CSS classes |
| `children` | `React.ReactNode` | - | The content to display |
| `id` | `string` | - | Optional ID for the heading (useful for accessibility) |

## Usage Examples

### Basic Usage
```tsx
// ✅ CORRECT - Use Heading component
<Heading>Page Title</Heading>

// ❌ INCORRECT - Using raw HTML tags
<h1>Page Title</h1>
```

### Custom Heading Level
```tsx
<Heading as="h2">Section Title</Heading>
```

### Custom Size
```tsx
<Heading size="5xl">Large Title</Heading>
```

### Body Font
```tsx
<Heading font="body">Body Font Heading</Heading>
```

### With Custom Classes
```tsx
<Heading className="text-center mb-4">Centered Heading</Heading>
```

### With ID for Accessibility
```tsx
<Heading id="main-title">Main Title</Heading>
```

## Design Tokens

The component uses the following design tokens:

- **Font Sizes**: `--font-size-xs` through `--font-size-6xl`
- **Font Families**: `--font-family-body` and `--font-family-heading`
- **Line Heights**: `--line-height-snug` for headings, `--line-height-normal` for body
- **Colors**: `--color-text-heading`

## Accessibility

- Proper semantic HTML heading elements
- Supports ARIA attributes through standard HTML props
- Uses design tokens for consistent styling
- Passes axe-core accessibility tests 
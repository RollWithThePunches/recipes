# Text Component

A reusable text component that standardizes paragraph styling across the application using design tokens.

**🔥 CRITICAL**: Always use this component instead of raw `<p>`, `<span>`, or `<div>` tags for text content.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "base" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl" \| "5xl" \| "6xl"` | `"base"` | Font size using design tokens |
| `color` | `"body" \| "heading" \| "on-dark" \| "secondary" \| "primary" \| "success" \| "warning" \| "error" \| "info"` | `"body"` | Text color using design tokens |
| `weight` | `"light" \| "normal" \| "medium" \| "semibold" \| "bold"` | `"normal"` | Font weight |
| `lineHeight` | `"tight" \| "snug" \| "normal" \| "relaxed" \| "loose"` | `"normal"` | Line height using design tokens |
| `className` | `string` | - | Additional CSS classes |
| `children` | `React.ReactNode` | - | Text content (required) |
| `as` | `"p" \| "span" \| "div"` | `"p"` | HTML element to render |

## Usage Examples

### Basic Usage
```tsx
import Text from "@/components/ui/text";

// ✅ CORRECT - Use Text component
<Text>This is default body text</Text>

// ❌ INCORRECT - Using raw HTML tags
<p>This is default body text</p>
```

### Custom Styling
```tsx
<Text 
  size="lg" 
  color="heading" 
  weight="semibold" 
  lineHeight="relaxed"
>
  Large heading-colored text with custom weight and line height
</Text>
```

### Different Element Types
```tsx
<Text as="span" size="sm" color="secondary">
  Small secondary text as span
</Text>
```

### With Additional Classes
```tsx
<Text 
  size="base" 
  weight="light" 
  className="mb-4 text-center"
>
  Centered text with bottom margin
</Text>
```

## Design Token Usage

The Text component uses the following design tokens:

### Font Sizes
- `xs`: `var(--font-size-xs)` (10px)
- `sm`: `var(--font-size-sm)` (14px)
- `base`: `var(--font-size-base)` (16px)
- `lg`: `var(--font-size-lg)` (20px)
- `xl`: `var(--font-size-xl)` (24px)
- `2xl`: `var(--font-size-2xl)` (28px)
- `3xl`: `var(--font-size-3xl)` (32px)
- `4xl`: `var(--font-size-4xl)` (40px)
- `5xl`: `var(--font-size-5xl)` (48px)
- `6xl`: `var(--font-size-6xl)` (64px)

### Colors
- `body`: `var(--color-text-body)` (#000000)
- `heading`: `var(--color-text-heading)` (#333333)
- `on-dark`: `var(--color-text-on-dark)` (#FFFFFF)
- `secondary`: `var(--color-secondary)` (#8B1300)
- `primary`: `var(--color-primary)` (#FF3D4A)
- `success`: `var(--color-success)` (#10B981)
- `warning`: `var(--color-warning)` (#F59E0B)
- `error`: `var(--color-error)` (#EF4444)
- `info`: `var(--color-info)` (#8B1300)

### Font Weights
- `light`: 300
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

### Line Heights
- `tight`: `var(--line-height-tight)` (100%)
- `snug`: `var(--line-height-snug)` (125%)
- `normal`: `var(--line-height-normal)` (150%)
- `relaxed`: `var(--line-height-relaxed)` (175%)
- `loose`: `var(--line-height-loose)` (200%)

## Accessibility

- Uses semantic HTML elements (`p`, `span`, `div`)
- Maintains proper text contrast ratios
- Supports screen readers and assistive technologies
- Follows WCAG 2.1 guidelines

## Best Practices

1. **Use semantic elements**: Choose the appropriate `as` prop for the context
2. **Consistent sizing**: Use the predefined size tokens for consistency
3. **Color hierarchy**: Use `heading` for important text, `body` for regular content
4. **Readable line heights**: Use `normal` or `relaxed` for longer text blocks
5. **Weight sparingly**: Use `light` and `normal` for body text, `semibold` and `bold` for emphasis 
# Link Component

A reusable link component that provides consistent typography and styling across the application.

**🔥 CRITICAL**: Always use this component instead of raw `<a>` tags.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | The URL to navigate to |
| `children` | `React.ReactNode` | - | The content to display |
| `size` | `"xs" \| "sm" \| "base" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl" \| "5xl" \| "6xl"` | `"base"` | The font size to use |
| `weight` | `"light" \| "normal" \| "medium" \| "semibold" \| "bold"` | `"normal"` | The font weight to use |
| `underline` | `boolean` | `false` | Whether to show underline decoration |
| `lineHeight` | `"tight" \| "snug" \| "normal" \| "relaxed" \| "loose"` | `"normal"` | The line height to use |
| `variant` | `"primary" \| "secondary" \| "body"` | `"primary"` | The color variant to use |
| `className` | `string` | - | Additional CSS classes |
| `external` | `boolean` | `false` | Whether to open in new tab |

## Usage Examples

### Basic Usage
```tsx
// ✅ CORRECT - Use Link component
<Link href="/recipe/123">View Recipe</Link>

// ❌ INCORRECT - Using raw HTML tags
<a href="/recipe/123">View Recipe</a>
```

### With Underline
```tsx
<Link href="/favorites" underline>View All Favorites</Link>
```

### Custom Size and Weight
```tsx
<Link href="/category/italian" size="lg" weight="semibold">
  Italian Cuisine
</Link>
```

### Secondary Variant (for secondary actions)
```tsx
<Link href="/account" variant="secondary" underline>
  Account Settings
</Link>
```

### External Link
```tsx
<Link href="https://example.com" external>
  External Resource
</Link>
```

### Custom Line Height
```tsx
<Link href="/about" lineHeight="tight">
  About Us
</Link>
```

### With Custom Classes
```tsx
<Link href="/contact" className="text-center">
  Contact Us
</Link>
```

## Color Variants

- **Primary**: Uses `--color-link` with hover to `--color-link-hover`
- **Secondary**: Uses `--color-secondary` with hover to `--color-primary`
- **Body**: Uses `--color-text-body` with hover to `--color-link-hover`

## Design Tokens

The component uses the following design tokens:

- **Font Sizes**: `--font-size-xs` through `--font-size-6xl`
- **Font Weights**: 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Heights**: `--line-height-tight` through `--line-height-loose`
- **Colors**: `--color-link`, `--color-secondary`, `--color-text-body`
- **Font Family**: `--font-family-body`

## Accessibility

- Proper semantic HTML link elements
- Supports external links with `target="_blank"` and `rel="noopener noreferrer"`
- Uses design tokens for consistent styling
- Passes axe-core accessibility tests
- Smooth color transitions for hover states 
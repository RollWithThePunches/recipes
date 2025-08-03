# UI Components

**🔥 CRITICAL REQUIREMENT**: Always use these UI components instead of raw HTML tags for consistency, accessibility, and design token compliance.

## Available Components

### Text Components

#### `<Text>`
Use instead of raw `<p>`, `<span>`, or `<div>` for text content.

```tsx
import Text from "@/components/ui/text";

// ✅ CORRECT
<Text size="base" color="body" weight="light">Content</Text>

// ❌ INCORRECT
<p>Content</p>
```

**Props:**
- `size`: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
- `color`: "body" | "heading" | "on-dark" | "secondary" | "primary" | "success" | "warning" | "error" | "info"
- `weight`: "light" | "normal" | "medium" | "semibold" | "bold"
- `lineHeight`: "tight" | "snug" | "normal" | "relaxed" | "loose"
- `as`: "p" | "span" | "div"
- `className`: Additional CSS classes

### Heading Components

#### `<Heading>`
Use instead of raw `<h1>`, `<h2>`, `<h3>`, etc.

```tsx
import Heading from "@/components/ui/heading";

// ✅ CORRECT
<Heading as="h2" size="4xl" font="heading">Title</Heading>

// ❌ INCORRECT
<h2>Title</h2>
```

**Props:**
- `as`: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
- `size`: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
- `font`: "body" | "heading"
- `className`: Additional CSS classes
- `id`: Optional ID for accessibility

### Link Components

#### `<Link>`
Use instead of raw `<a>` tags.

```tsx
import Link from "@/components/ui/link";

// ✅ CORRECT
<Link href="/recipe/123" variant="primary" underline>View Recipe</Link>

// ❌ INCORRECT
<a href="/recipe/123">View Recipe</a>
```

**Props:**
- `href`: URL to navigate to
- `size`: Font size using design tokens
- `weight`: Font weight
- `underline`: Boolean for underline decoration
- `lineHeight`: Line height using design tokens
- `variant`: "primary" | "secondary" | "body"
- `external`: Boolean for external links
- `className`: Additional CSS classes

### Form Components

#### `<Button>`
Use instead of raw `<button>` tags.

```tsx
import Button from "@/components/ui/button";

// ✅ CORRECT
<Button variant="primary" size="lg">Submit</Button>

// ❌ INCORRECT
<button>Submit</button>
```

#### `<Input>`
Use instead of raw `<input>` tags.

```tsx
import Input from "@/components/ui/input";

// ✅ CORRECT
<Input type="text" placeholder="Search recipes..." />

// ❌ INCORRECT
<input type="text" placeholder="Search recipes..." />
```

#### `<Label>`
Use instead of raw `<label>` tags.

```tsx
import Label from "@/components/ui/label";

// ✅ CORRECT
<Label htmlFor="email">Email Address</Label>

// ❌ INCORRECT
<label htmlFor="email">Email Address</label>
```

### Layout Components

#### `<Card>`
Use for card layouts instead of custom div structures.

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

// ✅ CORRECT
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Interactive Components

#### `<Checkbox>`
Use instead of raw `<input type="checkbox">`.

```tsx
import Checkbox from "@/components/ui/checkbox";

// ✅ CORRECT
<Checkbox id="terms" />

// ❌ INCORRECT
<input type="checkbox" id="terms" />
```

#### `<Select>`
Use instead of raw `<select>` tags.

```tsx
import Select from "@/components/ui/select";

// ✅ CORRECT
<Select>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>

// ❌ INCORRECT
<select>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>
```

#### `<DropdownMenu>`
Use for dropdown menus instead of custom implementations.

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// ✅ CORRECT
<DropdownMenu>
  <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Import Pattern

Always import UI components at the top of your file:

```tsx
// ✅ CORRECT - Import UI components
import Text from "@/components/ui/text";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/link";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
```

## Label Typography Requirement

**IMPORTANT**: For labels, use inline styles for font family and size:

```tsx
// ✅ CORRECT - Labels use inline styles
<label style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-base)" }}>
  Email Address
</label>

// ❌ INCORRECT - Labels with Tailwind font classes
<label className="font-body text-base">Email Address</label>
```

## Design Token Compliance

All UI components automatically use design tokens for:
- Colors (e.g., `var(--color-primary)`, `var(--color-text-body)`)
- Typography (e.g., `var(--font-family-body)`, `var(--font-size-base)`)
- Spacing (e.g., `var(--spacing-md)`, `var(--spacing-lg)`)
- Line heights (e.g., `var(--line-height-normal)`, `var(--line-height-relaxed)`)

## Accessibility

All UI components are built with accessibility in mind:
- Proper semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## Testing

Each UI component has corresponding test files:
- `text.test.tsx`
- `heading.test.tsx`
- `link.test.tsx`
- `button.test.tsx`
- etc.

## Migration Guide

When updating existing code:

1. **Replace raw HTML tags** with UI components
2. **Update imports** to include UI components
3. **Convert inline styles** to component props
4. **Test accessibility** with keyboard navigation and screen readers
5. **Verify design token usage** in all styling

## Common Patterns

### Text with Custom Styling
```tsx
<Text 
  size="lg" 
  color="heading" 
  weight="semibold" 
  lineHeight="relaxed"
  className="mb-4"
>
  Large heading-colored text with custom weight and line height
</Text>
```

### Heading with ID for Accessibility
```tsx
<Heading as="h2" size="3xl" id="section-title">
  Section Title
</Heading>
```

### Link with External Indicator
```tsx
<Link href="https://example.com" external variant="secondary">
  External Resource
</Link>
```

### Form with Proper Labeling
```tsx
<Label htmlFor="email" style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-base)" }}>
  Email Address
</Label>
<Input id="email" type="email" placeholder="Enter your email" />
```

Remember: **Always use UI components instead of raw HTML tags for consistency, accessibility, and maintainability.** 
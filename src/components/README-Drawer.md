# Drawer Component

## Overview

The Drawer component is a mobile navigation drawer that slides in from the left side of the screen. It provides a comprehensive navigation menu with search functionality, menu items, and user authentication options.

## Features

### Design Implementation
- **Semi-transparent overlay**: Uses `rgba(0, 0, 0, 0.5)` background as specified in the Figma design
- **Design system compliance**: Uses design tokens from `tokens.css` and `tokens.ts`
- **Mobile-first responsive**: Optimized for mobile devices with appropriate touch targets
- **Visual hierarchy**: Proper typography using Lexend and Madimi One fonts

### Accessibility (WCAG 2.1 Compliant)
- **Keyboard navigation**: Full keyboard support with proper focus management
- **Screen reader support**: Comprehensive ARIA labels and landmarks
- **Focus management**: Automatically focuses close button when opened
- **Escape key handling**: Closes drawer when Escape key is pressed
- **Proper semantic HTML**: Uses appropriate roles and landmarks

### User Experience
- **Overlay click to close**: Clicking outside the drawer closes it
- **Body scroll prevention**: Prevents background scrolling when drawer is open
- **Smooth interactions**: CSS transitions for better user experience
- **Touch-friendly**: Appropriate button sizes and spacing for mobile devices

## Usage

### Basic Implementation

```tsx
import { useState } from 'react';
import Drawer from '@/components/Drawer';

function MyComponent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsDrawerOpen(true)}>
        Open Menu
      </button>
      
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
}
```

### Integration with Header

The Drawer is already integrated with the Header component:

```tsx
// Header.tsx automatically handles drawer state
import Header from '@/components/Header';

// The hamburger menu button in the header will open the drawer
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls whether the drawer is visible |
| `onClose` | `() => void` | Yes | Callback function called when drawer should close |
| `className` | `string` | No | Additional CSS classes for customization |

## Component Structure

```
Drawer
├── Overlay (semi-transparent background)
└── Drawer Panel
    ├── Header Section
    │   ├── Close Button
    │   ├── "Cooking" Title
    │   └── Search Bar
    ├── Navigation Menu
    │   ├── Meals
    │   ├── Ingredients
    │   ├── Culture
    │   └── Occasions
    └── Footer
        └── Login Button
```

## Design Tokens Used

- `--color-background-overlay`: Semi-transparent black overlay
- `--color-primary`: Primary red color for branding
- `--color-focus`: Focus ring color for accessibility
- `--font-family-heading`: Madimi One for the "Cooking" title
- `--font-family-body`: Lexend for all other text
- Various spacing tokens for consistent layout

## Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Escape**: Close the drawer
- **Enter/Space**: Activate buttons

### Screen Reader Support
- `role="dialog"` and `aria-modal="true"` for modal behavior
- `aria-labelledby` linking to the drawer title
- `aria-label` attributes for all interactive elements
- Proper navigation landmarks

### Focus Management
- Automatically focuses close button when opened
- Traps focus within the drawer when open
- Restores focus to triggering element when closed

## Technical Implementation

### State Management
- Uses React hooks for state management
- Integrates with parent components via props
- Handles side effects (body scroll, focus) with useEffect

### Event Handling
- Click outside to close
- Escape key to close
- Prevents event bubbling for drawer content clicks

### Styling
- CSS custom properties for design token integration
- Tailwind CSS for utility-first styling
- Responsive design with mobile-first approach

## Menu Item Customization

Currently, menu items log to console when clicked. To customize menu item behavior:

```tsx
// In Drawer.tsx, update the MenuItem onClick handlers:
<MenuItem onClick={() => navigateToMeals()}>
  Meals
</MenuItem>
```

## Testing

The component has been designed with testability in mind:
- All interactive elements have accessible labels
- State changes are predictable
- Side effects are contained and reversible
- Component can be easily mocked for testing

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers 
# Front-End Task List: Recipe Browser App

Based on: `front-end-prd.mdc` and `design-requirements-prd.mdc`

**📋 ACCESSIBILITY REQUIREMENTS**: All components must follow the comprehensive accessibility guidelines documented in the **"Accessibility Requirements and Guidelines"** section of `front-end-prd.mdc`. This includes specific patterns for dropdown menus, focus management, keyboard navigation, and WCAG 2.1 compliance.

## Relevant Files

### Core Setup
- `src/data/content.json` - Dynamic content source for all components and pages
- `src/styles/tokens.css` - Updated design tokens based on design requirements
- `src/lib/tokens.ts` - TypeScript tokens for component usage
- `src/components/ui/` - Shadcn UI components directory

### Components
- `src/components/RecipeCard.tsx` - Recipe card component with dynamic props
- `src/components/RecipeCard.test.tsx` - Unit tests for RecipeCard
- `src/components/SearchBar.tsx` - Search input component
- `src/components/SearchBar.test.tsx` - Unit tests for SearchBar
- `src/components/FilterPanel.tsx` - Filter component for cuisine/dietary preferences
- `src/components/FilterPanel.test.tsx` - Unit tests for FilterPanel
- `src/components/RecipeDetail.tsx` - Recipe detail view component
- `src/components/RecipeDetail.test.tsx` - Unit tests for RecipeDetail
- `src/components/CategoryCard.tsx` - Cuisine category browsing cards
- `src/components/CategoryCard.test.tsx` - Unit tests for CategoryCard
- `src/components/IngredientsList.tsx` - Formatted ingredients display component
- `src/components/IngredientsList.test.tsx` - Unit tests for IngredientsList
- `src/components/CookingSteps.tsx` - Step-by-step cooking instructions component
- `src/components/CookingSteps.test.tsx` - Unit tests for CookingSteps
- `src/components/Drawer.tsx` - Mobile navigation drawer component

### Patterns
- `src/components/patterns/HeroSection.tsx` - Hero banner pattern
- `src/components/patterns/RecipeGrid.tsx` - Recipe grid layout pattern
- `src/components/patterns/CategorySection.tsx` - Category browsing section pattern
- `src/components/patterns/SearchFilters.tsx` - Combined search and filter pattern

### Pages
- `src/app/page.tsx` - Homepage with recipe browsing
- `src/app/recipe/[id]/page.tsx` - Recipe detail page
- `src/app/search/page.tsx` - Search results page
- `src/app/category/[cuisine]/page.tsx` - Category-specific recipe listings

### Utilities & Types
- `src/types/recipe.ts` - TypeScript interfaces for recipe data
- `src/types/content.ts` - TypeScript interfaces for content.json structure
- `src/lib/recipeUtils.ts` - Recipe filtering and search utilities
- `src/lib/contentUtils.ts` - Content management utilities
- `src/hooks/useRecipeSearch.ts` - Custom hook for recipe search functionality
- `src/hooks/useRecipeFilter.ts` - Custom hook for recipe filtering

### ⚠️ CRITICAL REQUIREMENTS
- **🔥 IMPORTANT**: Use Shadcn components whenever possible for consistency and customization
- **🔥 IMPORTANT**: ALL styling must use design tokens in Tailwind classes (e.g., `bg-[var(--color-primary)]`) - NO hardcoded values
- **🔥 IMPORTANT**: Components must be dynamic with props from content.json
- **🔥 IMPORTANT**: Use Lucide React icons throughout the project for consistency - Import specific icons as needed: `import { IconName } from 'lucide-react'`
- **🔥 IMPORTANT**: All components must be accessible (WCAG 2.1 compliant) - Follow the detailed accessibility patterns documented in `front-end-prd.mdc`
- **🔥 IMPORTANT**: Implement proper focus management, keyboard navigation, and ARIA labeling as specified in the accessibility guidelines
- **🔥 IMPORTANT**: Use available UI components instead of raw HTML tags - See "Available UI Components" section below
- Mobile-first responsive design throughout
- Test with keyboard navigation and screen readers

### 📋 AVAILABLE UI COMPONENTS

**🔥 CRITICAL**: Always use these available UI components instead of raw HTML tags:

#### Text Components
- **`<Text>`** - Use instead of raw `<p>`, `<span>`, or `<div>` for text content
  - Supports: size, color, weight, lineHeight, as props
  - Example: `<Text size="base" color="body" weight="light">Content</Text>`
  - **NEVER use**: `<p>`, `<span>`, `<div>` for text content

#### Heading Components  
- **`<Heading>`** - Use instead of raw `<h1>`, `<h2>`, `<h3>`, etc.
  - Supports: as, size, font, className, id props
  - Example: `<Heading as="h2" size="4xl" font="heading">Title</Heading>`
  - **NEVER use**: `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` directly

#### Link Components
- **`<Link>`** - Use instead of raw `<a>` tags
  - Supports: href, size, weight, underline, variant, external props
  - Example: `<Link href="/recipe/123" variant="primary" underline>View Recipe</Link>`
  - **NEVER use**: `<a>` tags directly

#### Form Components
- **`<Button>`** - Use instead of raw `<button>` tags
  - Supports: variant, size, disabled, loading states
  - Example: `<Button variant="primary" size="lg">Submit</Button>`
  - **NEVER use**: `<button>` tags directly

- **`<Input>`** - Use instead of raw `<input>` tags
  - Supports: type, placeholder, disabled, error states
  - Example: `<Input type="text" placeholder="Search recipes..." />`
  - **NEVER use**: `<input>` tags directly

- **`<Label>`** - Use instead of raw `<label>` tags
  - Supports: htmlFor, className props
  - Example: `<Label htmlFor="email">Email Address</Label>`
  - **NEVER use**: `<label>` tags directly

#### Layout Components
- **`<Card>`** - Use for card layouts instead of custom div structures
  - Supports: CardHeader, CardContent, CardFooter subcomponents
  - Example: `<Card><CardHeader>Title</CardHeader><CardContent>Content</CardContent></Card>`

#### Interactive Components
- **`<Checkbox>`** - Use instead of raw `<input type="checkbox">`
- **`<Select>`** - Use instead of raw `<select>` tags
- **`<DropdownMenu>`** - Use for dropdown menus instead of custom implementations

#### Component Import Pattern
```tsx
// ✅ CORRECT - Import and use UI components
import Text from "@/components/ui/text";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/link";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

// ✅ CORRECT - Use components with proper props
<Text size="base" color="body">This is body text</Text>
<Heading as="h2" size="3xl">Section Title</Heading>
<Link href="/recipe/123" variant="primary">View Recipe</Link>

// ❌ INCORRECT - Using raw HTML tags
<p>This is body text</p>
<h2>Section Title</h2>
<a href="/recipe/123">View Recipe</a>
```

#### Label Typography Requirement
- **IMPORTANT**: For labels, use inline styles for font family and size:
  ```tsx
  // ✅ CORRECT - Labels use inline styles
  <label style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-base)" }}>
    Email Address
  </label>
  
  // ❌ INCORRECT - Labels with Tailwind font classes
  <label className="font-body text-base">Email Address</label>
  ```

## Tasks

- [x] 1.0 Setup and Foundation
  - [x] 1.1 Update design tokens in `tokens.css` based on design requirements (corrected secondary color #8B1300, button styles, ingredients background #FFF9E8)
  - [x] 1.2 Update TypeScript tokens file to match design requirements
  - [ ] 1.3 Create content.json structure with sample recipe data, categories, and UI content
  - [x] 1.4 Install and configure Shadcn UI components
  - [ ] 1.5 Create TypeScript interfaces for recipe and content data structures
  - [ ] 1.6 Verify Google Fonts (Lexend, Madimi One) are properly imported and applied
  - [ ] 1.7 **IMPORTANT**: Review all existing components to ensure Shadcn components are used wherever possible
  - [ ] 1.8 **IMPORTANT**: Audit all styling to replace hardcoded values with design tokens in Tailwind classes

- [ ] 2.0 Core Components Development
  - [ ] 2.1 Create RecipeCard component with dynamic props from content.json
    - [ ] 2.1.1 **IMPORTANT**: Use Shadcn Card component as base structure
    - [ ] 2.1.2 Implement card layout with recipe image, title, cuisine type, prep time
    - [ ] 2.1.3 **IMPORTANT**: Use Lucide React icons for any icons (Heart, Star, etc.)
    - [ ] 2.1.4 Add hover states using design tokens in Tailwind classes (e.g., `hover:bg-[var(--color-button-hover)]`)
    - [ ] 2.1.5 Ensure WCAG 2.1 compliance (proper alt text, keyboard focus, color contrast)
    - [ ] 2.1.6 **IMPORTANT**: Verify NO hardcoded colors - only design tokens in Tailwind classes
    - [ ] 2.1.7 Write comprehensive unit tests
  - [ ] 2.2 Create SearchBar component with ingredient search functionality
    - [ ] 2.2.1 **IMPORTANT**: Use Shadcn Input component as base
    - [ ] 2.2.2 Implement search input with proper ARIA labels
    - [ ] 2.2.3 **IMPORTANT**: Use Shadcn Button component for search button with Lucide React Search icon
    - [ ] 2.2.4 Apply focus styles using design tokens (e.g., `focus:ring-[var(--color-focus)]`)
    - [ ] 2.2.5 Ensure keyboard navigation works properly
    - [ ] 2.2.6 **IMPORTANT**: Verify all styling uses design tokens in Tailwind classes
    - [ ] 2.2.7 Write unit tests for search functionality
  - [ ] 2.3 Create FilterPanel component for cuisine and dietary filtering
    - [ ] 2.3.1 **IMPORTANT**: Use Shadcn Checkbox and Select components
    - [ ] 2.3.2 Implement filter checkboxes and dropdowns
    - [ ] 2.3.3 **IMPORTANT**: Use Shadcn Button component for clear filters functionality
    - [ ] 2.3.4 Ensure proper ARIA attributes for screen readers
    - [ ] 2.3.5 Apply design tokens for interactive states (e.g., `hover:bg-[var(--color-background-yellow)]`)
    - [ ] 2.3.6 **IMPORTANT**: Audit all styling for design token usage
    - [ ] 2.3.7 Write unit tests for filter logic
  - [ ] 2.4 Create CategoryCard component for cuisine browsing
    - [ ] 2.4.1 **IMPORTANT**: Use Shadcn Card component as base
    - [ ] 2.4.2 Design card layout with cuisine image and name
    - [ ] 2.4.3 **IMPORTANT**: Use Shadcn Badge component for recipe count
    - [ ] 2.4.4 Implement hover and focus states using design tokens
    - [ ] 2.4.5 Ensure accessibility with proper roles and labels
    - [ ] 2.4.6 **IMPORTANT**: Verify design token usage in all styles
    - [ ] 2.4.7 Write unit tests
  - [ ] 2.5 Create IngredientsList component with yellow background styling
    - [ ] 2.5.1 **IMPORTANT**: Consider using Shadcn components for list structure
    - [ ] 2.5.2 Format ingredients with quantities and measurements
    - [ ] 2.5.3 Apply background using design token: `bg-[var(--color-background-yellow)]`
    - [ ] 2.5.4 Add proper semantic HTML structure
    - [ ] 2.5.5 Ensure screen reader compatibility
    - [ ] 2.5.6 **IMPORTANT**: Verify all styling uses design tokens
    - [ ] 2.5.7 Write unit tests
  - [ ] 2.6 Create CookingSteps component with step-by-step layout
    - [ ] 2.6.1 **IMPORTANT**: Use Shadcn components for step numbering and layout
    - [ ] 2.6.2 Number each cooking step clearly
    - [ ] 2.6.3 Use large, readable typography with design tokens (e.g., `text-[var(--font-size-lg)]`)
    - [ ] 2.6.4 Add proper heading hierarchy
    - [ ] 2.6.5 Ensure keyboard navigation between steps
    - [ ] 2.6.6 **IMPORTANT**: Verify design token usage throughout
    - [ ] 2.6.7 Write unit tests

- [ ] 3.0 Pattern Development
  - [ ] 3.1 Create HeroSection pattern for homepage
    - [ ] 3.1.1 **IMPORTANT**: Use Shadcn components for layout structure
    - [ ] 3.1.2 Design hero layout with search prominence
    - [ ] 3.1.3 Add compelling headline and description from content.json
    - [ ] 3.1.4 Integrate SearchBar component (built with Shadcn)
    - [ ] 3.1.5 Ensure mobile-first responsive design
    - [ ] 3.1.6 Apply proper heading hierarchy (h1) with design tokens
    - [ ] 3.1.7 **IMPORTANT**: Audit all styling for design token usage
  - [ ] 3.2 Create RecipeGrid pattern for recipe listings
    - [ ] 3.2.1 **IMPORTANT**: Consider Shadcn components for grid structure
    - [ ] 3.2.2 Implement responsive grid layout using CSS Grid/Flexbox with design tokens
    - [ ] 3.2.3 Integrate RecipeCard components (built with Shadcn)
    - [ ] 3.2.4 Add loading states and empty states using Shadcn components
    - [ ] 3.2.5 Ensure keyboard navigation between cards
    - [ ] 3.2.6 Add proper ARIA landmarks
    - [ ] 3.2.7 **IMPORTANT**: Verify design token usage in all grid styling
  - [ ] 3.3 Create CategorySection pattern for homepage browsing
    - [ ] 3.3.1 **IMPORTANT**: Use Shadcn components for section structure
    - [ ] 3.3.2 Design section with category cards grid
    - [ ] 3.3.3 Add section heading from content.json with design tokens
    - [ ] 3.3.4 Implement CategoryCard grid layout (built with Shadcn)
    - [ ] 3.3.5 Ensure responsive behavior across breakpoints
    - [ ] 3.3.6 Add proper semantic structure
    - [ ] 3.3.7 **IMPORTANT**: Audit for design token usage
  - [ ] 3.4 Create SearchFilters pattern combining search and filters
    - [ ] 3.4.1 **IMPORTANT**: Use Shadcn components for layout
    - [ ] 3.4.2 Layout SearchBar and FilterPanel together (both using Shadcn)
    - [ ] 3.4.3 Add responsive behavior (collapse filters on mobile)
    - [ ] 3.4.4 Implement clear all functionality with Shadcn Button
    - [ ] 3.4.5 Ensure proper focus management
    - [ ] 3.4.6 Add ARIA live regions for filter updates
    - [ ] 3.4.7 **IMPORTANT**: Verify design token usage throughout

- [ ] 4.0 Page Development
  - [ ] 4.1 Build Homepage (src/app/page.tsx)
    - [ ] 4.1.1 Implement HeroSection pattern (with Shadcn components)
    - [ ] 4.1.2 Add CategorySection pattern for cuisine browsing (with Shadcn components)
    - [ ] 4.1.3 Include featured recipes section using RecipeGrid (with Shadcn components)
    - [ ] 4.1.4 **IMPORTANT**: Load all content from content.json dynamically
    - [ ] 4.1.5 Ensure proper page structure with landmarks
    - [ ] 4.1.6 Add skip-to-content link for accessibility
    - [ ] 4.1.7 Test mobile responsiveness thoroughly
    - [ ] 4.1.8 **IMPORTANT**: Verify all page styling uses design tokens
  - [ ] 4.2 Build Recipe Detail Page (src/app/recipe/[id]/page.tsx)
    - [ ] 4.2.1 **IMPORTANT**: Use Shadcn components for page layout
    - [ ] 4.2.2 Create layout with recipe title, image, and metadata
    - [ ] 4.2.3 Integrate IngredientsList component (using Shadcn components)
    - [ ] 4.2.4 Integrate CookingSteps component (using Shadcn components)
    - [ ] 4.2.5 Add breadcrumb navigation with Shadcn Breadcrumb component
    - [ ] 4.2.6 **IMPORTANT**: Implement dynamic data loading from content.json
    - [ ] 4.2.7 Ensure proper heading hierarchy (h1 for recipe title) with design tokens
    - [ ] 4.2.8 Add recipe stats (prep time, cook time, servings) using Shadcn components
    - [ ] 4.2.9 Test with screen readers
    - [ ] 4.2.10 **IMPORTANT**: Audit all styling for design token usage
  - [ ] 4.3 Build Search Results Page (src/app/search/page.tsx)
    - [ ] 4.3.1 **IMPORTANT**: Use Shadcn components for page structure
    - [ ] 4.3.2 Implement SearchFilters pattern (built with Shadcn)
    - [ ] 4.3.3 Add RecipeGrid pattern for results (built with Shadcn)
    - [ ] 4.3.4 Show search results count and query with design tokens
    - [ ] 4.3.5 Handle no results state using Shadcn components
    - [ ] 4.3.6 Implement pagination if needed with Shadcn Pagination component
    - [ ] 4.3.7 Add proper page title and meta description
    - [ ] 4.3.8 **IMPORTANT**: Ensure dynamic content from content.json
    - [ ] 4.3.9 Ensure all functionality works without JavaScript (progressive enhancement)
    - [ ] 4.3.10 **IMPORTANT**: Verify design token usage throughout
  - [ ] 4.4 Build Category Page (src/app/category/[cuisine]/page.tsx)
    - [ ] 4.4.1 **IMPORTANT**: Use Shadcn components for page layout
    - [ ] 4.4.2 Create category-specific recipe listings
    - [ ] 4.4.3 **IMPORTANT**: Add category description from content.json
    - [ ] 4.4.4 Implement RecipeGrid pattern (built with Shadcn)
    - [ ] 4.4.5 Add category-specific filtering options using Shadcn components
    - [ ] 4.4.6 Include breadcrumb navigation with Shadcn Breadcrumb component
    - [ ] 4.4.7 Ensure dynamic routing works properly
    - [ ] 4.4.8 **IMPORTANT**: Verify design token usage in all styling

- [ ] 5.0 Utility Development and Content Management
  - [ ] 5.1 Create recipe search and filtering utilities
    - [ ] 5.1.1 Implement ingredient-based search function
    - [ ] 5.1.2 Create cuisine filtering logic
    - [ ] 5.1.3 Add dietary preference filtering
    - [ ] 5.1.4 Implement meal type filtering
    - [ ] 5.1.5 Write comprehensive unit tests for all utilities
  - [ ] 5.2 Create custom hooks for recipe functionality
    - [ ] 5.2.1 Build useRecipeSearch hook with debouncing
    - [ ] 5.2.2 Create useRecipeFilter hook for managing filter states
    - [ ] 5.2.3 Add error handling and loading states
    - [ ] 5.2.4 Write unit tests for hooks
  - [ ] 5.3 Populate content.json with comprehensive recipe data
    - [ ] 5.3.1 Add 20+ sample recipes across different cuisines
    - [ ] 5.3.2 Include proper recipe metadata (times, difficulty, dietary info)
    - [ ] 5.3.3 **IMPORTANT**: Add UI content (headings, descriptions, labels) for dynamic components
    - [ ] 5.3.4 Ensure all content supports accessibility (alt text for images)

- [ ] 6.0 Testing and Quality Assurance
  - [ ] 6.1 Accessibility Testing (WCAG 2.1 Compliance) - **REFERENCE**: Follow the comprehensive testing checklist in `front-end-prd.mdc`
    - [ ] 6.1.1 Test with keyboard navigation only (Tab, Shift+Tab, Enter, Space, Escape, Arrow keys)
    - [ ] 6.1.2 Test with screen reader (VoiceOver/NVDA)
    - [ ] 6.1.3 Verify color contrast ratios meet AA standards (4.5:1 for normal text, 3:1 for large text)
    - [ ] 6.1.4 Ensure all interactive elements have focus indicators using design tokens
    - [ ] 6.1.5 Check semantic HTML structure and proper heading hierarchy
    - [ ] 6.1.6 Validate ARIA labels and landmarks
    - [ ] 6.1.7 **IMPORTANT**: Test dropdown menus for proper tab boundary handling (see AccountMenu example in `front-end-prd.mdc`)
    - [ ] 6.1.8 **IMPORTANT**: Verify auto-focus behavior for modals and dynamic content
    - [ ] 6.1.9 **IMPORTANT**: Test focus trapping and restoration patterns
    - [ ] 6.1.10 Validate minimum touch target sizes (44px × 44px minimum)
  - [ ] 6.2 Responsive Design Testing
    - [ ] 6.2.1 Test on mobile devices (320px - 640px)
    - [ ] 6.2.2 Test on tablet devices (641px - 1024px)
    - [ ] 6.2.3 Test on desktop (1025px+)
    - [ ] 6.2.4 Verify touch targets meet minimum size requirements
    - [ ] 6.2.5 Test horizontal scrolling issues
  - [ ] 6.3 Cross-browser Testing
    - [ ] 6.3.1 Test in Chrome, Firefox, Safari, Edge
    - [ ] 6.3.2 **IMPORTANT**: Verify design tokens work across browsers
    - [ ] 6.3.3 Test JavaScript functionality
    - [ ] 6.3.4 Verify font loading and fallbacks
  - [ ] 6.4 Performance Testing
    - [ ] 6.4.1 Measure page load times
    - [ ] 6.4.2 Optimize images and assets
    - [ ] 6.4.3 Test with slow network connections
    - [ ] 6.4.4 Verify lazy loading implementation

- [x] 7.0 Authentication and Login Routing System
  - [x] 7.1 Implement Login Routing Functionality
    - [x] 7.1.1 Update login page to accept `redirectTo` query parameter
    - [x] 7.1.2 Modify Header component to pass current pathname when navigating to login
    - [x] 7.1.3 Update Drawer component to include currentPath prop and pass redirect parameter
    - [x] 7.1.4 Update create-account page to handle redirectTo parameter
    - [x] 7.1.5 Update reset-password page to handle redirectTo parameter
    - [x] 7.1.6 Update cross-page links to preserve redirect parameters
    - [x] 7.1.7 Fix sign out functionality to stay on current page instead of redirecting to home
  - [x] 7.2 Authentication Flow Integration
    - [x] 7.2.1 Ensure AccountMenu component works with updated sign-in flow
    - [x] 7.2.2 Test redirect functionality across all authentication entry points
    - [x] 7.2.3 Verify URL encoding handles special characters correctly
    - [x] 7.2.4 Test fallback behavior when no redirect parameter is provided
    - [x] 7.2.5 Validate user experience across different page types (home, recipe, category)
  - [x] 7.3 Favorites Modal Implementation
    - [x] 7.3.1 Create FavoritesModal component following Figma design
    - [x] 7.3.2 Implement modal that appears when non-logged-in users try to favorite recipes
    - [x] 7.3.3 Add sign-in and create-account navigation with redirect back to recipe page
    - [x] 7.3.4 Integrate modal with RecipeClientPage component
    - [x] 7.3.5 Create useAuth hook for client-side authentication state
    - [x] 7.3.6 Ensure modal follows accessibility guidelines and design tokens
    - [x] 7.3.7 Write comprehensive unit tests for modal functionality

- [ ] 8.0 Final Review and Documentation
  - [ ] 8.1 Component Review
    - [ ] 8.1.1 **IMPORTANT**: Verify ALL components use Shadcn components wherever possible
    - [ ] 8.1.2 **IMPORTANT**: Verify ALL components use design tokens instead of hardcoded values
    - [ ] 8.1.3 **IMPORTANT**: Verify ALL labels use inline styles for font family and size: `style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-base)" }}`
    - [ ] 8.1.4 Ensure components match design requirements
    - [ ] 8.1.5 **IMPORTANT**: Confirm dynamic content loading from content.json
    - [ ] 8.1.6 Test component props and error handling
  - [ ] 8.2 Design Token Validation
    - [ ] 8.2.1 **IMPORTANT**: Confirm ALL colors use design tokens in Tailwind classes (e.g., `bg-[var(--color-primary)]`)
    - [ ] 8.2.2 **IMPORTANT**: Verify NO hardcoded hex values remain in codebase
    - [ ] 8.2.3 Confirm all colors use correct hex values from design requirements
    - [ ] 8.2.4 Verify spacing scale is consistently applied using tokens
    - [ ] 8.2.5 Check typography hierarchy uses correct fonts and sizes with tokens
    - [ ] 7.2.6 Ensure focus states use design token colors
    - [ ] 7.2.7 **IMPORTANT**: Run automated audit to detect any hardcoded values
  - [ ] 7.3 Shadcn Component Validation
    - [ ] 7.3.1 **IMPORTANT**: Audit all components to ensure Shadcn components are used wherever possible
    - [ ] 7.3.2 **IMPORTANT**: Verify consistent styling patterns across all Shadcn components
    - [ ] 7.3.3 Document any custom components that couldn't use Shadcn and justify why
    - [ ] 7.3.4 Ensure all Shadcn components are properly configured with design tokens
  - [ ] 7.4 Icon Validation
    - [ ] 7.4.1 **IMPORTANT**: Verify ALL icons use Lucide React - NO custom SVGs remain
    - [ ] 7.4.2 **IMPORTANT**: Ensure all icons use design tokens for colors (e.g., `color="var(--color-text-heading)"`)
    - [ ] 7.4.3 Verify proper icon sizing and consistency across components
    - [ ] 7.4.4 Check that interactive icons have proper hover and focus states
  - [ ] 7.5 Documentation Updates
    - [ ] 7.5.1 Update component documentation with props and usage examples
    - [ ] 7.5.2 **IMPORTANT**: Document content.json structure and how to add new content
    - [ ] 7.5.3 **IMPORTANT**: Ensure accessibility compliance documentation in `front-end-prd.mdc` is up to date with latest patterns
    - [ ] 7.5.4 **IMPORTANT**: Document design token usage guidelines and requirements
    - [ ] 7.5.5 **IMPORTANT**: Document Shadcn component usage patterns and customization guidelines
    - [ ] 7.5.6 **IMPORTANT**: Document Lucide React icon usage patterns and requirements
    - [ ] 7.5.7 **IMPORTANT**: Add any new accessibility patterns discovered during development to the requirements documentation
  - [ ] 7.6 Production Readiness
    - [ ] 7.6.1 Run full test suite and ensure 100% pass rate
    - [ ] 7.6.2 Verify build process works without errors
    - [ ] 7.6.3 Test production build performance
    - [ ] 7.6.4 Validate all links and navigation work correctly
    - [ ] 7.6.5 **IMPORTANT**: Final audit - no hardcoded values, all Shadcn components used, all Lucide React icons used, all content dynamic, all labels use inline font styles

## Content.json Structure Requirements

The content.json file should include:

```json
{
  "homepage": {
    "hero": {
      "title": "string",
      "subtitle": "string",
      "searchPlaceholder": "string"
    },
    "categories": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "image": "string",
        "recipeCount": "number"
      }
    ],
    "featuredRecipes": ["recipe-ids"]
  },
  "recipes": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "image": "string",
      "cuisine": "string",
      "mealType": "string",
      "prepTime": "number",
      "cookTime": "number",
      "servings": "number",
      "difficulty": "string",
      "dietary": ["array"],
      "ingredients": [
        {
          "item": "string",
          "quantity": "string",
          "unit": "string"
        }
      ],
      "steps": [
        {
          "stepNumber": "number",
          "instruction": "string"
        }
      ]
    }
  ],
  "ui": {
    "navigation": {
      "brand": "string",
      "menuItems": ["array"]
    },
    "buttons": {
      "login": "string",
      "search": "string",
      "clear": "string"
    },
    "labels": {
      "ingredients": "string",
      "instructions": "string",
      "prepTime": "string",
      "cookTime": "string"
    }
  }
}
```

## Design Token Requirements Checklist

- [x] Primary color: #FF3D4A - **MUST** be used as `bg-[var(--color-primary)]`
- [x] Secondary color: #8B1300 - **MUST** be used as `bg-[var(--color-secondary)]`
- [x] Background colors: #FFFFFF, #333333, #FFF9E8 - **MUST** use token variables
- [x] Gray color: #ccc - **MUST** be used as `var(--color-gray)` for card borders and general gray elements
- [x] Typography: Lexend (body), Madimi One (headings) - **MUST** use token variables
- [x] Spacing scale: 4px through 120px - **MUST** use `var(--spacing-*)` tokens
- [x] Font sizes: 0.625rem through 4rem - **MUST** use `var(--font-size-*)` tokens
- [x] Line heights: 100% through 200% - **MUST** use `var(--line-height-*)` tokens
- [x] Button styles: Primary (#FF3D4A), Secondary (#FFFFFF with #8B1300 border), Tertiary (transparent) - **MUST** use token variables
- [x] Focus indicators: #8B1300 - **MUST** use `focus:ring-[var(--color-focus)]`
- [x] Card borders: #ccc - **MUST** use `var(--card-border)` which references `var(--color-gray)`
- [x] Ingredients list background: #FFF9E8 - **MUST** use `bg-[var(--color-background-yellow)]`
- [x] Hover background: #f2f2f2 - **MUST** use `hover:bg-[var(--color-hover-background)]` for all buttons and interactive elements (except text-only anchors)

## 🚨 CRITICAL SUCCESS CRITERIA

### ✅ Before any component is considered complete:
1. **UI Components**: Must use available UI components instead of raw HTML tags (Text, Heading, Link, Button, Input, etc.)
2. **Shadcn Components**: Must use Shadcn components wherever possible
3. **Design Tokens**: Must use design tokens in Tailwind classes (e.g., `bg-[var(--color-primary)]`) - NO hardcoded values
4. **Dynamic Content**: Must load content from content.json
5. **Lucide React Icons**: Must use Lucide React icons for all icons - NO custom SVGs
6. **WCAG 2.1**: Must meet accessibility compliance following the patterns documented in `front-end-prd.mdc`
7. **Responsive**: Must work on all screen sizes
8. **Testing**: Must have comprehensive tests
9. **Label Typography**: Must use inline styles for font family and size on labels: `style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-base)" }}` - NO Tailwind font classes on labels

### 🔍 Review Checkpoints:
- After each component: Verify UI component usage (Text, Heading, Link, etc.), Shadcn usage, design token implementation, Lucide React icon usage, and label typography uses inline styles
- After each pattern: Verify no raw HTML tags remain, no hardcoded values remain, all icons use Lucide React, and labels use inline font styles
- After each page: Verify dynamic content loading, consistent icon usage, proper label typography, and UI component usage
- Before final: Run automated audit for raw HTML tags, hardcoded values, missing Shadcn components, custom SVG icons, and incorrect label font classes

```json
{
  "homepage": {
    "hero": {
      "title": "string",
      "subtitle": "string",
      "searchPlaceholder": "string"
    },
    "categories": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "image": "string",
        "recipeCount": "number"
      }
    ],
    "featuredRecipes": ["recipe-ids"]
  },
  "recipes": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "image": "string",
      "cuisine": "string",
      "mealType": "string",
      "prepTime": "number",
      "cookTime": "number",
      "servings": "number",
      "difficulty": "string",
      "dietary": ["array"],
      "ingredients": [
        {
          "item": "string",
          "quantity": "string",
          "unit": "string"
        }
      ],
      "steps": [
        {
          "stepNumber": "number",
          "instruction": "string"
        }
      ]
    }
  ],
  "ui": {
    "navigation": {
      "brand": "string",
      "menuItems": ["array"]
    },
    "buttons": {
      "login": "string",
      "search": "string",
      "clear": "string"
    },
    "labels": {
      "ingredients": "string",
      "instructions": "string",
      "prepTime": "string",
      "cookTime": "string"
    }
  }
}
``` 
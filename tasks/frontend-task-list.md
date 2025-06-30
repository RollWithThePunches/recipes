# Front-End Task List: Recipe Browser App

Based on: `front-end-prd.mdc` and `design-requirements-prd.mdc`

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

### Notes
- All components must be accessible (WCAG 2.1 compliant)
- Use design tokens in Tailwind classes instead of hardcoded values
- Components should be dynamic with props from content.json
- Mobile-first responsive design throughout
- Test with keyboard navigation and screen readers

## Tasks

- [ ] 1.0 Setup and Foundation
  - [ ] 1.1 Update design tokens in `tokens.css` based on design requirements (corrected secondary color #8B1300, button styles, ingredients background #FFF9E8)
  - [ ] 1.2 Update TypeScript tokens file to match design requirements
  - [ ] 1.3 Create content.json structure with sample recipe data, categories, and UI content
  - [ ] 1.4 Install and configure Shadcn UI components
  - [ ] 1.5 Create TypeScript interfaces for recipe and content data structures
  - [ ] 1.6 Verify Google Fonts (Lexend, Madimi One) are properly imported and applied

- [ ] 2.0 Core Components Development
  - [ ] 2.1 Create RecipeCard component with dynamic props from content.json
    - [ ] 2.1.1 Implement card layout with recipe image, title, cuisine type, prep time
    - [ ] 2.1.2 Add hover states using design tokens
    - [ ] 2.1.3 Ensure WCAG 2.1 compliance (proper alt text, keyboard focus, color contrast)
    - [ ] 2.1.4 Use Tailwind classes with design tokens (no hardcoded colors)
    - [ ] 2.1.5 Write comprehensive unit tests
  - [ ] 2.2 Create SearchBar component with ingredient search functionality
    - [ ] 2.2.1 Implement search input with proper ARIA labels
    - [ ] 2.2.2 Add clear button and search suggestions
    - [ ] 2.2.3 Apply focus styles using design tokens
    - [ ] 2.2.4 Ensure keyboard navigation works properly
    - [ ] 2.2.5 Write unit tests for search functionality
  - [ ] 2.3 Create FilterPanel component for cuisine and dietary filtering
    - [ ] 2.3.1 Implement filter checkboxes and dropdowns
    - [ ] 2.3.2 Add clear filters functionality
    - [ ] 2.3.3 Ensure proper ARIA attributes for screen readers
    - [ ] 2.3.4 Apply design tokens for interactive states
    - [ ] 2.3.5 Write unit tests for filter logic
  - [ ] 2.4 Create CategoryCard component for cuisine browsing
    - [ ] 2.4.1 Design card layout with cuisine image and name
    - [ ] 2.4.2 Add recipe count badge
    - [ ] 2.4.3 Implement hover and focus states
    - [ ] 2.4.4 Ensure accessibility with proper roles and labels
    - [ ] 2.4.5 Write unit tests
  - [ ] 2.5 Create IngredientsList component with yellow background styling
    - [ ] 2.5.1 Format ingredients with quantities and measurements
    - [ ] 2.5.2 Apply #FFF9E8 background color token
    - [ ] 2.5.3 Add proper semantic HTML structure
    - [ ] 2.5.4 Ensure screen reader compatibility
    - [ ] 2.5.5 Write unit tests
  - [ ] 2.6 Create CookingSteps component with step-by-step layout
    - [ ] 2.6.1 Number each cooking step clearly
    - [ ] 2.6.2 Use large, readable typography for mobile cooking
    - [ ] 2.6.3 Add proper heading hierarchy
    - [ ] 2.6.4 Ensure keyboard navigation between steps
    - [ ] 2.6.5 Write unit tests

- [ ] 3.0 Pattern Development
  - [ ] 3.1 Create HeroSection pattern for homepage
    - [ ] 3.1.1 Design hero layout with search prominence
    - [ ] 3.1.2 Add compelling headline and description from content.json
    - [ ] 3.1.3 Integrate SearchBar component
    - [ ] 3.1.4 Ensure mobile-first responsive design
    - [ ] 3.1.5 Apply proper heading hierarchy (h1)
  - [ ] 3.2 Create RecipeGrid pattern for recipe listings
    - [ ] 3.2.1 Implement responsive grid layout using CSS Grid/Flexbox
    - [ ] 3.2.2 Integrate RecipeCard components
    - [ ] 3.2.3 Add loading states and empty states
    - [ ] 3.2.4 Ensure keyboard navigation between cards
    - [ ] 3.2.5 Add proper ARIA landmarks
  - [ ] 3.3 Create CategorySection pattern for homepage browsing
    - [ ] 3.3.1 Design section with category cards grid
    - [ ] 3.3.2 Add section heading from content.json
    - [ ] 3.3.3 Implement CategoryCard grid layout
    - [ ] 3.3.4 Ensure responsive behavior across breakpoints
    - [ ] 3.3.5 Add proper semantic structure
  - [ ] 3.4 Create SearchFilters pattern combining search and filters
    - [ ] 3.4.1 Layout SearchBar and FilterPanel together
    - [ ] 3.4.2 Add responsive behavior (collapse filters on mobile)
    - [ ] 3.4.3 Implement clear all functionality
    - [ ] 3.4.4 Ensure proper focus management
    - [ ] 3.4.5 Add ARIA live regions for filter updates

- [ ] 4.0 Page Development
  - [ ] 4.1 Build Homepage (src/app/page.tsx)
    - [ ] 4.1.1 Implement HeroSection pattern
    - [ ] 4.1.2 Add CategorySection pattern for cuisine browsing
    - [ ] 4.1.3 Include featured recipes section using RecipeGrid
    - [ ] 4.1.4 Load all content from content.json dynamically
    - [ ] 4.1.5 Ensure proper page structure with landmarks
    - [ ] 4.1.6 Add skip-to-content link for accessibility
    - [ ] 4.1.7 Test mobile responsiveness thoroughly
  - [ ] 4.2 Build Recipe Detail Page (src/app/recipe/[id]/page.tsx)
    - [ ] 4.2.1 Create layout with recipe title, image, and metadata
    - [ ] 4.2.2 Integrate IngredientsList component
    - [ ] 4.2.3 Integrate CookingSteps component
    - [ ] 4.2.4 Add breadcrumb navigation
    - [ ] 4.2.5 Implement dynamic data loading from content.json
    - [ ] 4.2.6 Ensure proper heading hierarchy (h1 for recipe title)
    - [ ] 4.2.7 Add recipe stats (prep time, cook time, servings)
    - [ ] 4.2.8 Test with screen readers
  - [ ] 4.3 Build Search Results Page (src/app/search/page.tsx)
    - [ ] 4.3.1 Implement SearchFilters pattern
    - [ ] 4.3.2 Add RecipeGrid pattern for results
    - [ ] 4.3.3 Show search results count and query
    - [ ] 4.3.4 Handle no results state
    - [ ] 4.3.5 Implement pagination if needed
    - [ ] 4.3.6 Add proper page title and meta description
    - [ ] 4.3.7 Ensure all functionality works without JavaScript (progressive enhancement)
  - [ ] 4.4 Build Category Page (src/app/category/[cuisine]/page.tsx)
    - [ ] 4.4.1 Create category-specific recipe listings
    - [ ] 4.4.2 Add category description from content.json
    - [ ] 4.4.3 Implement RecipeGrid pattern
    - [ ] 4.4.4 Add category-specific filtering options
    - [ ] 4.4.5 Include breadcrumb navigation
    - [ ] 4.4.6 Ensure dynamic routing works properly

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
    - [ ] 5.3.3 Add UI content (headings, descriptions, labels)
    - [ ] 5.3.4 Ensure all content supports accessibility (alt text for images)

- [ ] 6.0 Testing and Quality Assurance
  - [ ] 6.1 Accessibility Testing (WCAG 2.1 Compliance)
    - [ ] 6.1.1 Test with keyboard navigation only
    - [ ] 6.1.2 Test with screen reader (VoiceOver/NVDA)
    - [ ] 6.1.3 Verify color contrast ratios meet AA standards
    - [ ] 6.1.4 Ensure all interactive elements have focus indicators
    - [ ] 6.1.5 Check semantic HTML structure
    - [ ] 6.1.6 Validate ARIA labels and landmarks
  - [ ] 6.2 Responsive Design Testing
    - [ ] 6.2.1 Test on mobile devices (320px - 640px)
    - [ ] 6.2.2 Test on tablet devices (641px - 1024px)
    - [ ] 6.2.3 Test on desktop (1025px+)
    - [ ] 6.2.4 Verify touch targets meet minimum size requirements
    - [ ] 6.2.5 Test horizontal scrolling issues
  - [ ] 6.3 Cross-browser Testing
    - [ ] 6.3.1 Test in Chrome, Firefox, Safari, Edge
    - [ ] 6.3.2 Verify design tokens work across browsers
    - [ ] 6.3.3 Test JavaScript functionality
    - [ ] 6.3.4 Verify font loading and fallbacks
  - [ ] 6.4 Performance Testing
    - [ ] 6.4.1 Measure page load times
    - [ ] 6.4.2 Optimize images and assets
    - [ ] 6.4.3 Test with slow network connections
    - [ ] 6.4.4 Verify lazy loading implementation

- [ ] 7.0 Final Review and Documentation
  - [ ] 7.1 Component Review
    - [ ] 7.1.1 Verify all components use design tokens instead of hardcoded values
    - [ ] 7.1.2 Ensure components match design requirements
    - [ ] 7.1.3 Confirm dynamic content loading from content.json
    - [ ] 7.1.4 Test component props and error handling
  - [ ] 7.2 Design Token Validation
    - [ ] 7.2.1 Confirm all colors use correct hex values from design requirements
    - [ ] 7.2.2 Verify spacing scale is consistently applied
    - [ ] 7.2.3 Check typography hierarchy uses correct fonts and sizes
    - [ ] 7.2.4 Ensure focus states use design token colors
  - [ ] 7.3 Documentation Updates
    - [ ] 7.3.1 Update component documentation with props and usage examples
    - [ ] 7.3.2 Document content.json structure and how to add new content
    - [ ] 7.3.3 Create accessibility compliance checklist
    - [ ] 7.3.4 Document design token usage guidelines
  - [ ] 7.4 Production Readiness
    - [ ] 7.4.1 Run full test suite and ensure 100% pass rate
    - [ ] 7.4.2 Verify build process works without errors
    - [ ] 7.4.3 Test production build performance
    - [ ] 7.4.4 Validate all links and navigation work correctly

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
  ]
}
```

## Design Token Requirements Checklist

- [ ] Primary color: #FF3D4A
- [ ] Secondary color: #8B1300 (corrected from original)
- [ ] Background colors: #FFFFFF, #333333, #FFF9E8
- [ ] Typography: Lexend (body), Madimi One (headings)
- [ ] Spacing scale: 4px through 120px
- [ ] Font sizes: 0.625rem through 4rem
- [ ] Line heights: 100% through 200%
- [ ] Button styles: Primary (#FF3D4A), Secondary (#FFFFFF with #8B1300 border), Tertiary (transparent)
- [ ] Focus indicators: #8B1300
- [ ] Ingredients list background: #FFF9E8 
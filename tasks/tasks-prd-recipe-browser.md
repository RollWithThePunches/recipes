# Task List: Recipe Browser App

Based on PRD: `prd-recipe-browser.md`

## Relevant Files

- `src/app/page.tsx` - Main homepage with recipe browsing interface and category navigation
- `src/app/recipe/[id]/page.tsx` - Individual recipe detail page with ingredients and cooking steps
- `src/app/search/page.tsx` - Search results page with filtering capabilities
- `src/components/RecipeCard.tsx` - Reusable recipe card component for list views
- `src/components/RecipeCard.test.tsx` - Unit tests for RecipeCard component
- `src/components/SearchBar.tsx` - Search input component with ingredient search functionality
- `src/components/SearchBar.test.tsx` - Unit tests for SearchBar component
- `src/components/FilterPanel.tsx` - Filter component for cuisine, meal type, and dietary preferences
- `src/components/FilterPanel.test.tsx` - Unit tests for FilterPanel component
- `src/components/RecipeDetail.tsx` - Component for displaying full recipe information
- `src/components/RecipeDetail.test.tsx` - Unit tests for RecipeDetail component
- `src/data/recipes.json` - Static recipe data with ingredients, steps, and metadata
- `src/lib/recipeUtils.ts` - Utility functions for recipe search, filtering, and data manipulation
- `src/lib/recipeUtils.test.ts` - Unit tests for recipe utility functions
- `src/types/recipe.ts` - TypeScript interfaces and types for recipe data structure

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration
- Mobile-first responsive design should be implemented throughout all components

## Tasks

- [ ] 1.0 Set up recipe data structure and initial recipe dataset
- [ ] 2.0 Create recipe browsing and listing interface with category navigation
- [ ] 3.0 Implement search functionality with ingredient-based search and filtering
- [ ] 4.0 Build individual recipe detail view with step-by-step instructions
- [ ] 5.0 Implement responsive design and mobile optimization across all components 
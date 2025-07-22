import { Recipe } from '@/types/recipe';

// Mock data for recipes until database is properly set up
const mockRecipes: Record<string, Recipe> = {
  'barbacoa-tacos': {
    id: '1',
    slug: 'barbacoa-tacos',
    title: 'Barbacoa Tacos',
    description: 'Slow-cooked beef tacos with authentic Mexican flavors',
    image: '/assets/fh-tacos-3784500610.jpg',
    cuisine: 'Mexican',
    mealType: 'main-dish',
    prepTime: 30,
    cookTime: 240,
    servings: 6,
    difficulty: 'Medium',
    dietary: ['gluten-free'],
    ingredients: [],
    steps: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'char-burgers': {
    id: '2',
    slug: 'char-burgers',
    title: 'Char Burgers',
    description: 'These feature a seared exterior with grill marks and smoky flavor',
    image: '/assets/burgers.jpg',
    cuisine: 'American',
    mealType: 'main-dish',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    dietary: [],
    ingredients: [],
    steps: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'lime-corn': {
    id: '3',
    slug: 'lime-corn',
    title: 'Lime Corn',
    description: 'Grill until charred, then brush with lime juice and sprinkle with chili powder',
    image: '/assets/corn.jpg',
    cuisine: 'Mexican',
    mealType: 'sides',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    dietary: ['vegan', 'gluten-free'],
    ingredients: [],
    steps: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'margaritas': {
    id: '4',
    slug: 'margaritas',
    title: 'Margaritas, anyone?',
    description: 'Fresh lime juice, tequila, and triple sec blended with ice creates the perfect margarita',
    image: '/assets/mixed-drinks.jpg',
    cuisine: 'Mexican',
    mealType: 'drinks',
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    dietary: ['vegan', 'gluten-free'],
    ingredients: [],
    steps: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'shake-mixin': {
    id: '5',
    slug: 'shake-mixin',
    title: 'Shake mixin\'',
    description: 'Blend ice cream, milk, and flavorings until smooth for creamy milkshakes',
    image: '/assets/sunday.jpg',
    cuisine: 'American',
    mealType: 'desserts',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    dietary: ['vegetarian'],
    ingredients: [],
    steps: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export async function getAllRecipes(): Promise<Recipe[]> {
  return Object.values(mockRecipes);
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  return mockRecipes[slug] || null;
}

export async function getRecipesByCuisine(cuisine: string): Promise<Recipe[]> {
  return Object.values(mockRecipes).filter(
    recipe => recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
  );
}

export async function getRecipesByMealType(mealType: string): Promise<Recipe[]> {
  return Object.values(mockRecipes).filter(
    recipe => recipe.mealType.toLowerCase() === mealType.toLowerCase()
  );
}

export async function getRecipesByCuisineAndMealType(
  cuisine: string, 
  mealType: string
): Promise<Recipe[]> {
  return Object.values(mockRecipes).filter(
    recipe => 
      recipe.cuisine.toLowerCase() === cuisine.toLowerCase() &&
      recipe.mealType.toLowerCase() === mealType.toLowerCase()
  );
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const searchTerm = query.toLowerCase();
  return Object.values(mockRecipes).filter(
    recipe =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.cuisine.toLowerCase().includes(searchTerm) ||
      recipe.mealType.toLowerCase().includes(searchTerm) ||
      recipe.dietary.some(diet => diet.toLowerCase().includes(searchTerm))
  );
}

export async function getRecipesByIds(ids: string[]): Promise<Recipe[]> {
  return ids.map(id => mockRecipes[id]).filter(Boolean);
}

export async function getFeaturedRecipes(limit: number = 4): Promise<Recipe[]> {
  return Object.values(mockRecipes).slice(0, limit);
} 
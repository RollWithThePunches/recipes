export interface Ingredient {
  item: string;
  quantity: string;
  unit: string;
}

export interface CookingStep {
  stepNumber: number;
  instruction: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  cuisine: string;
  mealType: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  dietary: string[];
  ingredients: Ingredient[];
  steps: CookingStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeCard {
  id: string;
  title: string;
  description: string;
  image: string;
  cuisine?: string;
  prepTime?: number;
  difficulty?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  recipeCount: number;
}

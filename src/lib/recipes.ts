import { prisma } from './db';
import { Recipe } from '@/types/recipe';

// Type assertion for Prisma client to include Recipe model
const prismaClient = prisma as any; // eslint-disable-line @typescript-eslint/no-explicit-any

// Helper function to map database recipe to application Recipe type
function mapDbRecipeToRecipe(dbRecipe: any): Recipe { // eslint-disable-line @typescript-eslint/no-explicit-any
  return {
    id: dbRecipe.id,
    slug: dbRecipe.slug,
    title: dbRecipe.title,
    description: dbRecipe.description,
    image: dbRecipe.image,
    cuisine: dbRecipe.cuisine,
    mealType: dbRecipe.mealType,
    prepTime: dbRecipe.prepTime,
    cookTime: dbRecipe.cookTime,
    servings: dbRecipe.servings,
    difficulty: dbRecipe.difficulty,
    dietary: dbRecipe.dietary,
    ingredients: dbRecipe.ingredients as unknown as Recipe['ingredients'],
    steps: dbRecipe.steps as unknown as Recipe['steps'],
    createdAt: dbRecipe.createdAt,
    updatedAt: dbRecipe.updatedAt,
  };
}

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const recipes = await prismaClient.recipe.findMany({
      orderBy: { title: 'asc' },
    });
    return recipes.map(mapDbRecipeToRecipe);
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    return [];
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const recipe = await prismaClient.recipe.findUnique({
      where: { slug },
    });
    return recipe ? mapDbRecipeToRecipe(recipe) : null;
  } catch (error) {
    console.error('Error fetching recipe by slug:', error);
    return null;
  }
}

export async function getRecipesByCuisine(cuisine: string): Promise<Recipe[]> {
  try {
    const recipes = await prismaClient.recipe.findMany({
      where: { cuisine: { equals: cuisine, mode: 'insensitive' } },
      orderBy: { title: 'asc' },
    });
    return recipes.map(mapDbRecipeToRecipe);
  } catch (error) {
    console.error('Error fetching recipes by cuisine:', error);
    return [];
  }
}

export async function getRecipesByMealType(mealType: string): Promise<Recipe[]> {
  try {
    const recipes = await prismaClient.recipe.findMany({
      where: { mealType: { equals: mealType, mode: 'insensitive' } },
      orderBy: { title: 'asc' },
    });
    return recipes.map(mapDbRecipeToRecipe);
  } catch (error) {
    console.error('Error fetching recipes by meal type:', error);
    return [];
  }
}

export async function getRecipesByCuisineAndMealType(
  cuisine: string, 
  mealType: string
): Promise<Recipe[]> {
  try {
    const recipes = await prismaClient.recipe.findMany({
      where: {
        cuisine: { equals: cuisine, mode: 'insensitive' },
        mealType: { equals: mealType, mode: 'insensitive' },
      },
      orderBy: { title: 'asc' },
    });
    return recipes.map(mapDbRecipeToRecipe);
  } catch (error) {
    console.error('Error fetching recipes by cuisine and meal type:', error);
    return [];
  }
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  try {
    const recipes = await prismaClient.recipe.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { cuisine: { contains: query, mode: 'insensitive' } },
          { mealType: { contains: query, mode: 'insensitive' } },
          { dietary: { has: query } },
        ],
      },
      orderBy: { title: 'asc' },
      take: 10,
    });
    return recipes.map(mapDbRecipeToRecipe);
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
}

export async function getRecipesByIds(ids: string[]): Promise<Recipe[]> {
  try {
    const recipes = await prismaClient.recipe.findMany({
      where: { slug: { in: ids } },
      orderBy: { title: 'asc' },
    });
    return recipes.map(mapDbRecipeToRecipe);
  } catch (error) {
    console.error('Error fetching recipes by IDs:', error);
    return [];
  }
}

export async function getFeaturedRecipes(limit: number = 4): Promise<Recipe[]> {
  try {
    const recipes = await prismaClient.recipe.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    return recipes.map(mapDbRecipeToRecipe);
  } catch (error) {
    console.error('Error fetching featured recipes:', error);
    return [];
  }
} 
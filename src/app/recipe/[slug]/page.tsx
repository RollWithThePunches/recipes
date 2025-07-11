import { notFound } from "next/navigation";
import contentData from "@/data/content.json";
import { ContentData } from "@/types/content";
import RecipeClientPage from "./RecipeClientPage";
import { BreadcrumbItem } from "@/components/Breadcrumb";

const content = contentData as ContentData;

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface TransformedRecipeData {
  id: string;
  title: string;
  description: string;
  rating: number;
  image: string;
  stats: {
    prepTime: string;
    cookTime: string;
    totalTime: string;
    servings: string;
  };
  ingredients: Array<{
    amount: string;
    item: string;
  }>;
  directions: Array<{
    stepNumber: number;
    instruction: string;
  }>;
  cuisine: string;
  difficulty: string;
  dietary: string[];
}

// Helper function to format time
function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} mins`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hr${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours} hr${hours > 1 ? 's' : ''} ${remainingMinutes} mins`;
    }
  }
}

// Helper function to get breadcrumb items based on cuisine
function getBreadcrumbItems(cuisine: string): BreadcrumbItem[] {
  const baseItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Recipes", href: "/recipes" }
  ];

  if (cuisine) {
    baseItems.push({ label: cuisine, href: `/category/${cuisine.toLowerCase()}` });
  }

  return baseItems;
}

export default async function RecipePage({ params }: RecipePageProps) {
  // Await the params since they're a Promise in Next.js 15
  const { slug } = await params;
  
  // Find the recipe in content.json
  const recipe = content.recipes.find(r => r.id === slug);

  if (!recipe) {
    notFound();
  }

  // Transform the recipe data to match the component expectations
  const recipeData: TransformedRecipeData = {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    rating: 4, // Default rating - could be added to content.json later
    image: recipe.image,
    stats: {
      prepTime: formatTime(recipe.prepTime),
      cookTime: formatTime(recipe.cookTime),
      totalTime: formatTime(recipe.prepTime + recipe.cookTime),
      servings: recipe.servings.toString()
    },
    ingredients: recipe.ingredients.map(ing => ({
      amount: `${ing.quantity} ${ing.unit}`.trim(),
      item: ing.item
    })),
    directions: recipe.steps.map(step => ({
      stepNumber: step.stepNumber,
      instruction: step.instruction
    })),
    cuisine: recipe.cuisine,
    difficulty: recipe.difficulty,
    dietary: recipe.dietary
  };

  const breadcrumbItems = getBreadcrumbItems(recipe.cuisine);

  return <RecipeClientPage recipeData={recipeData} breadcrumbItems={breadcrumbItems} />;
}

export type { TransformedRecipeData }; 
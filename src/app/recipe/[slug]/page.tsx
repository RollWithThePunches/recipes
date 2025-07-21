import { notFound } from "next/navigation";
import RecipeClientPage from "./RecipeClientPage";
import { BreadcrumbItem } from "@/components/Breadcrumb";
import { getRecipeBySlug } from "@/lib/recipes";

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface TransformedRecipeData {
  id: string;
  slug: string;
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
      return `${hours} hr${hours > 1 ? "s" : ""}`;
    } else {
      return `${hours} hr${hours > 1 ? "s" : ""} ${remainingMinutes} mins`;
    }
  }
}

// Helper function to get breadcrumb items based on cuisine, meal type, and recipe title
function getBreadcrumbItems(
  cuisine: string,
  mealType: string,
  recipeTitle: string,
): BreadcrumbItem[] {
  // Map internal mealType values to display names and URL paths
  const mealTypeDisplayNames: Record<string, string> = {
    dinner: "Main dish",
    appetizer: "Appetizers",
    side: "Sides",
    soup: "Soups",
    dessert: "Desserts",
    drink: "Drinks",
  };

  const mealTypeUrlPaths: Record<string, string> = {
    dinner: "main-dish",
    appetizer: "appetizers",
    side: "sides",
    soup: "soups",
    dessert: "desserts",
    drink: "drinks",
  };

  const baseItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  if (cuisine) {
    baseItems.push({
      label: cuisine,
      href: `/category/${cuisine.toLowerCase()}`,
    });
  }

  if (mealType) {
    const displayMealType = mealTypeDisplayNames[mealType] || mealType;
    const urlPath = mealTypeUrlPaths[mealType] || mealType;
    baseItems.push({
      label: displayMealType,
      href: `/category/${cuisine.toLowerCase()}/${urlPath}`,
    });
  }

  // Add recipe title as the final breadcrumb item
  baseItems.push({
    label: recipeTitle,
    isCurrentPage: true,
  });

  return baseItems;
}

export default async function RecipePage({ params }: RecipePageProps) {
  // Await the params since they're a Promise in Next.js 15
  const { slug } = await params;

  // Find the recipe in database
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  // Transform the recipe data to match the component expectations
  const recipeData: TransformedRecipeData = {
    id: recipe.id,
    slug: recipe.slug,
    title: recipe.title,
    description: recipe.description,
    rating: 4, // Default rating - could be added to content.json later
    image: recipe.image,
    stats: {
      prepTime: formatTime(recipe.prepTime),
      cookTime: formatTime(recipe.cookTime),
      totalTime: formatTime(recipe.prepTime + recipe.cookTime),
      servings: recipe.servings.toString(),
    },
    ingredients: recipe.ingredients.map((ing) => ({
      amount: `${ing.quantity} ${ing.unit}`.trim(),
      item: ing.item,
    })),
    directions: recipe.steps.map((step) => ({
      stepNumber: step.stepNumber,
      instruction: step.instruction,
    })),
    cuisine: recipe.cuisine,
    difficulty: recipe.difficulty,
    dietary: recipe.dietary,
  };

  const breadcrumbItems = getBreadcrumbItems(
    recipe.cuisine,
    recipe.mealType,
    recipe.title,
  );

  return (
    <RecipeClientPage
      recipeData={recipeData}
      breadcrumbItems={breadcrumbItems}
    />
  );
}

export type { TransformedRecipeData };

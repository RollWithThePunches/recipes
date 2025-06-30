import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/RecipeCard';

interface RecipeGridProps {
  recipes: string[];
  recipeData: Recipe[];
}

export default function RecipeGrid({ recipes, recipeData }: RecipeGridProps) {
  // Get the full recipe data for the provided recipe IDs
  const fullRecipes = recipes.map(recipeId => 
    recipeData.find(recipe => recipe.id === recipeId)
  ).filter(Boolean) as Recipe[];

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch w-full">
      {fullRecipes.map((recipe) => (
        <div 
          key={recipe.id}
          className="bg-white max-w-80 w-full md:w-80 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex"
        >
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
} 
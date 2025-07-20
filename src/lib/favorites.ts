export interface FavoriteRecipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cuisine?: string;
  mealType?: string;
  addedAt: string; // ISO date string
}

const FAVORITES_STORAGE_KEY = 'userFavorites';

/**
 * Get all favorite recipes from localStorage
 */
export function getFavorites(): FavoriteRecipe[] {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return [];
    
    const favorites = JSON.parse(stored);
    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
}

/**
 * Add a recipe to favorites
 */
export function addToFavorites(recipe: Omit<FavoriteRecipe, 'addedAt'>): boolean {
  try {
    const favorites = getFavorites();
    
    // Check if recipe is already in favorites
    const existingIndex = favorites.findIndex(fav => fav.id === recipe.id);
    if (existingIndex !== -1) {
      return false; // Already in favorites
    }
    
    // Add recipe with timestamp
    const newFavorite: FavoriteRecipe = {
      ...recipe,
      addedAt: new Date().toISOString()
    };
    
    favorites.push(newFavorite);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    
    return true;
  } catch (error) {
    console.error('Error adding recipe to favorites:', error);
    return false;
  }
}

/**
 * Remove a recipe from favorites
 */
export function removeFromFavorites(recipeId: string): boolean {
  try {
    const favorites = getFavorites();
    const filteredFavorites = favorites.filter(fav => fav.id !== recipeId);
    
    if (filteredFavorites.length === favorites.length) {
      return false; // Recipe wasn't in favorites
    }
    
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(filteredFavorites));
    return true;
  } catch (error) {
    console.error('Error removing recipe from favorites:', error);
    return false;
  }
}

/**
 * Check if a recipe is in favorites
 */
export function isFavorite(recipeId: string): boolean {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === recipeId);
  } catch (error) {
    console.error('Error checking if recipe is favorite:', error);
    return false;
  }
}

/**
 * Get favorites sorted by most recently added
 */
export function getFavoritesSorted(): FavoriteRecipe[] {
  const favorites = getFavorites();
  return favorites.sort((a, b) => 
    new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
}

/**
 * Clear all favorites
 */
export function clearFavorites(): void {
  try {
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing favorites:', error);
  }
} 
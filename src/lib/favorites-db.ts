export interface FavoriteRecipe {
  id: string;
  userId: string;
  recipeId: string;
  recipeTitle: string;
  recipeDescription: string;
  recipeImage: string;
  recipeCuisine?: string;
  addedAt: string;
}

/**
 * Get all favorite recipes from database for a user
 */
export async function getFavoritesFromDB(userId: string): Promise<FavoriteRecipe[]> {
  try {
    const response = await fetch(`/api/favorites?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch favorites: ${response.statusText}`);
    }
    
    const favorites = await response.json();
    return favorites;
  } catch (error) {
    console.error('Error fetching favorites from database:', error);
    return [];
  }
}

/**
 * Add a recipe to favorites in database
 */
export async function addToFavoritesDB(
  userId: string,
  recipe: {
    recipeId: string;
    recipeTitle: string;
    recipeDescription: string;
    recipeImage: string;
    recipeCuisine?: string;
  }
): Promise<boolean> {
  try {
    console.log('addToFavoritesDB - Starting with:', { userId, recipe });
    
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        ...recipe,
      }),
    });

    console.log('addToFavoritesDB - Response status:', response.status);
    console.log('addToFavoritesDB - Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('addToFavoritesDB - Error response:', errorText);
      
      if (response.status === 409) {
        // Recipe is already in favorites
        console.log('addToFavoritesDB - Recipe already in favorites');
        return false;
      }
      throw new Error(`Failed to add favorite: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('addToFavoritesDB - Success result:', result);
    return true;
  } catch (error) {
    console.error('addToFavoritesDB - Error adding favorite to database:', error);
    return false;
  }
}

/**
 * Remove a recipe from favorites in database
 */
export async function removeFromFavoritesDB(favoriteId: string, userId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/favorites/${favoriteId}?userId=${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to remove favorite: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error removing favorite from database:', error);
    return false;
  }
}

/**
 * Check if a recipe is favorited by user
 */
export async function isFavoriteInDB(userId: string, recipeId: string): Promise<boolean> {
  try {
    const favorites = await getFavoritesFromDB(userId);
    return favorites.some(fav => fav.recipeId === recipeId);
  } catch (error) {
    console.error('Error checking if recipe is favorited:', error);
    return false;
  }
}

/**
 * Get favorite ID for a recipe (for deletion)
 */
export async function getFavoriteId(userId: string, recipeId: string): Promise<string | null> {
  try {
    const favorites = await getFavoritesFromDB(userId);
    const favorite = favorites.find(fav => fav.recipeId === recipeId);
    return favorite ? favorite.id : null;
  } catch (error) {
    console.error('Error getting favorite ID:', error);
    return null;
  }
} 
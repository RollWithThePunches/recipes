import { useState, useEffect, useCallback } from 'react';
import { 
  getFavorites, 
  addToFavorites, 
  removeFromFavorites, 
  type FavoriteRecipe 
} from '@/lib/favorites';
import {
  getFavoritesFromDB,
  addToFavoritesDB,
  removeFromFavoritesDB,
  getFavoriteId
} from '@/lib/favorites-db';
import { useAuth } from './useAuth';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, userId } = useAuth();

  // Load favorites on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        
        if (isLoggedIn && userId) {
          // Load from database if logged in
          const dbFavorites = await getFavoritesFromDB(userId);
          const transformedFavorites: FavoriteRecipe[] = dbFavorites.map(fav => ({
            id: fav.recipeId,
            title: fav.recipeTitle,
            description: fav.recipeDescription,
            image: fav.recipeImage,
            cuisine: fav.recipeCuisine,
            addedAt: fav.addedAt
          }));
          setFavorites(transformedFavorites);
        } else {
          // Load from localStorage if not logged in
          const storedFavorites = getFavorites();
          setFavorites(storedFavorites);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        // Fallback to localStorage
        const storedFavorites = getFavorites();
        setFavorites(storedFavorites);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [isLoggedIn, userId]);

  // Add recipe to favorites
  const addFavorite = useCallback(async (recipe: Omit<FavoriteRecipe, 'addedAt'>) => {
    let success = false;
    
    if (isLoggedIn && userId) {
      // Add to database if logged in
      success = await addToFavoritesDB(userId, {
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        recipeDescription: recipe.description,
        recipeImage: recipe.image,
        recipeCuisine: recipe.cuisine
      });
    } else {
      // Add to localStorage if not logged in
      success = addToFavorites(recipe);
    }
    
    if (success) {
      setFavorites(prev => {
        const newFavorite: FavoriteRecipe = {
          ...recipe,
          addedAt: new Date().toISOString()
        };
        return [...prev, newFavorite];
      });
    }
    
    return success;
  }, [isLoggedIn, userId]);

  // Remove recipe from favorites
  const removeFavorite = useCallback(async (recipeId: string) => {
    let success = false;
    
    if (isLoggedIn && userId) {
      // Remove from database if logged in
      const favoriteId = await getFavoriteId(userId, recipeId);
      if (favoriteId) {
        success = await removeFromFavoritesDB(favoriteId, userId);
      }
    } else {
      // Remove from localStorage if not logged in
      success = removeFromFavorites(recipeId);
    }
    
    if (success) {
      setFavorites(prev => prev.filter(fav => fav.id !== recipeId));
    }
    
    return success;
  }, [isLoggedIn, userId]);

  // Toggle favorite status
  const toggleFavorite = useCallback(async (recipe: Omit<FavoriteRecipe, 'addedAt'>) => {
    const currentlyFavorite = favorites.some(fav => fav.id === recipe.id);
    
    if (currentlyFavorite) {
      return await removeFavorite(recipe.id);
    } else {
      return await addFavorite(recipe);
    }
  }, [favorites, addFavorite, removeFavorite]);

  // Check if a recipe is favorited
  const isFavorite = useCallback((recipeId: string) => {
    return favorites.some(fav => fav.id === recipeId);
  }, [favorites]);

  // Get favorites sorted by most recently added
  const getSortedFavorites = useCallback(() => {
    return [...favorites].sort((a, b) => 
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );
  }, [favorites]);

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getSortedFavorites
  };
} 
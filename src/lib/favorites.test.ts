import { 
  getFavorites, 
  addToFavorites, 
  removeFromFavorites, 
  isFavorite, 
  getFavoritesSorted,
  clearFavorites,
  type FavoriteRecipe 
} from './favorites';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Favorites Utilities', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe('getFavorites', () => {
    it('should return empty array when no favorites exist', () => {
      const favorites = getFavorites();
      expect(favorites).toEqual([]);
    });

    it('should return favorites from localStorage', () => {
      const mockFavorites: FavoriteRecipe[] = [
        {
          id: 'test-recipe',
          title: 'Test Recipe',
          description: 'A test recipe',
          image: '/test-image.jpg',
          addedAt: '2023-01-01T00:00:00.000Z'
        }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFavorites));
      
      const favorites = getFavorites();
      expect(favorites).toEqual(mockFavorites);
    });

    it('should handle invalid JSON gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      
      const favorites = getFavorites();
      expect(favorites).toEqual([]);
    });
  });

  describe('addToFavorites', () => {
    it('should add recipe to favorites', () => {
      const recipe = {
        id: 'new-recipe',
        title: 'New Recipe',
        description: 'A new recipe',
        image: '/new-image.jpg',
        cuisine: 'Italian'
      };

      const result = addToFavorites(recipe);
      
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'userFavorites',
        expect.stringContaining('new-recipe')
      );
    });

    it('should not add duplicate recipes', () => {
      const existingFavorites: FavoriteRecipe[] = [
        {
          id: 'existing-recipe',
          title: 'Existing Recipe',
          description: 'An existing recipe',
          image: '/existing-image.jpg',
          addedAt: '2023-01-01T00:00:00.000Z'
        }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingFavorites));
      
      const recipe = {
        id: 'existing-recipe',
        title: 'Existing Recipe',
        description: 'An existing recipe',
        image: '/existing-image.jpg'
      };

      const result = addToFavorites(recipe);
      
      expect(result).toBe(false);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe('removeFromFavorites', () => {
    it('should remove recipe from favorites', () => {
      const existingFavorites: FavoriteRecipe[] = [
        {
          id: 'recipe-to-remove',
          title: 'Recipe to Remove',
          description: 'A recipe to remove',
          image: '/remove-image.jpg',
          addedAt: '2023-01-01T00:00:00.000Z'
        }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingFavorites));
      
      const result = removeFromFavorites('recipe-to-remove');
      
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'userFavorites',
        '[]'
      );
    });

    it('should return false if recipe not found', () => {
      const result = removeFromFavorites('non-existent-recipe');
      
      expect(result).toBe(false);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe('isFavorite', () => {
    it('should return true if recipe is favorited', () => {
      const existingFavorites: FavoriteRecipe[] = [
        {
          id: 'favorited-recipe',
          title: 'Favorited Recipe',
          description: 'A favorited recipe',
          image: '/favorited-image.jpg',
          addedAt: '2023-01-01T00:00:00.000Z'
        }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingFavorites));
      
      const result = isFavorite('favorited-recipe');
      
      expect(result).toBe(true);
    });

    it('should return false if recipe is not favorited', () => {
      const result = isFavorite('non-favorited-recipe');
      
      expect(result).toBe(false);
    });
  });

  describe('getFavoritesSorted', () => {
    it('should return favorites sorted by most recently added', () => {
      const existingFavorites: FavoriteRecipe[] = [
        {
          id: 'old-recipe',
          title: 'Old Recipe',
          description: 'An old recipe',
          image: '/old-image.jpg',
          addedAt: '2023-01-01T00:00:00.000Z'
        },
        {
          id: 'new-recipe',
          title: 'New Recipe',
          description: 'A new recipe',
          image: '/new-image.jpg',
          addedAt: '2023-01-02T00:00:00.000Z'
        }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingFavorites));
      
      const sortedFavorites = getFavoritesSorted();
      
      expect(sortedFavorites[0].id).toBe('new-recipe');
      expect(sortedFavorites[1].id).toBe('old-recipe');
    });
  });

  describe('clearFavorites', () => {
    it('should clear all favorites', () => {
      clearFavorites();
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('userFavorites');
    });
  });
}); 
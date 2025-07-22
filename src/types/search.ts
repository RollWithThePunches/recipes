export interface SearchResult {
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
  type: 'recipe';
}

export interface SearchResponse {
  results: SearchResult[];
} 
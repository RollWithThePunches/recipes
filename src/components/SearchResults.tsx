"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Clock, Users, ChefHat } from "lucide-react";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";

interface SearchResult {
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

interface SearchResultsProps {
  query: string;
  isVisible: boolean;
  onResultClick: () => void;
}

export default function SearchResults({ query, isVisible, onResultClick }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim() || !isVisible) {
      setResults([]);
      return;
    }

    const searchRecipes = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Failed to search recipes');
        }
        
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError('Failed to search recipes');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(searchRecipes, 300);
    return () => clearTimeout(timeoutId);
  }, [query, isVisible]);

  const handleResultClick = (slug: string) => {
    onResultClick();
    router.push(`/recipe/${slug}`);
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (!isVisible || (!query.trim() && !isLoading)) {
    return null;
  }

  return (
    <div
      ref={resultsRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--color-border)] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
    >
      {isLoading && (
        <div className="p-4 text-center text-[var(--color-text-body)]">
          Searching...
        </div>
      )}

      {error && (
        <div className="p-4 text-center text-[var(--color-error)]">
          {error}
        </div>
      )}

      {!isLoading && !error && results.length === 0 && query.trim() && (
        <div className="p-4 text-center text-[var(--color-text-body)]">
          No recipes found for &ldquo;{query}&rdquo;
        </div>
      )}

      {!isLoading && !error && results.length > 0 && (
        <div className="py-2">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result.slug)}
              className="w-full px-4 py-3 text-left hover:bg-[var(--color-hover-background)] focus:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150"
            >
              <div className="flex items-start gap-3">
                {/* Recipe Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Recipe Details */}
                <div className="flex-1 min-w-0">
                  <Heading as="h3" size="sm" font="body" className="font-semibold mb-1 truncate">
                    {result.title}
                  </Heading>
                  
                  <Text size="xs" color="body" className="mb-2 line-clamp-2">
                    {result.description}
                  </Text>

                  {/* Recipe Meta */}
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(result.prepTime + result.cookTime)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{result.servings} servings</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <ChefHat className="w-3 h-3" />
                      <span>{result.difficulty}</span>
                    </div>
                  </div>

                  {/* Cuisine and Dietary Tags */}
                  <div className="flex items-center gap-2 mt-2">
                    <Text as="span" size="xs" color="on-dark" className="px-2 py-1 bg-[var(--color-secondary)] rounded-full">
                      {result.cuisine}
                    </Text>
                    {Array.isArray(result.dietary) && result.dietary.map((diet) => (
                      <Text
                        key={diet}
                        as="span"
                        size="xs"
                        color="on-dark"
                        className="px-2 py-1 bg-[var(--color-success)] rounded-full"
                      >
                        {diet}
                      </Text>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 
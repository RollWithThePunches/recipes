"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CheckboxFilter from "@/components/CheckboxFilter";
import FavoritesSearch from "@/components/FavoritesSearch";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const { favorites, removeFavorite, isLoading } = useFavorites();
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [cultureFilters, setCultureFilters] = useState<string[]>([]);
  const [dishFilters, setDishFilters] = useState<string[]>([]);

  // Redirect if not logged in (only after auth loading is complete)
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push("/login?redirectTo=/favorites");
    }
  }, [isLoggedIn, authLoading, router]);

  // Filter favorites based on search and filters
  const filteredFavorites = favorites.filter((favorite) => {
    const matchesSearch = searchQuery === "" || 
      favorite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      favorite.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCulture = cultureFilters.length === 0 || (favorite.cuisine && cultureFilters.includes(favorite.cuisine));
    const matchesDish = dishFilters.length === 0 || true; // Dish type filtering can be added later
    
    return matchesSearch && matchesCulture && matchesDish;
  });

  // Get unique cultures for filter dropdown
  const uniqueCultures = Array.from(new Set(favorites.map(fav => fav.cuisine)));

  // Create filter options
  const cultureOptions = uniqueCultures
    .filter((culture): culture is string => Boolean(culture))
    .map(culture => ({
      id: `culture-${culture}`,
      label: culture,
      value: culture
    }));

  // If no cultures found in favorites, provide some default options
  if (cultureOptions.length === 0) {
    cultureOptions.push(
      { id: "culture-mexican", label: "Mexican", value: "mexican" },
      { id: "culture-italian", label: "Italian", value: "italian" },
      { id: "culture-chinese", label: "Chinese", value: "chinese" },
      { id: "culture-indian", label: "Indian", value: "indian" },
      { id: "culture-japanese", label: "Japanese", value: "japanese" },
      { id: "culture-french", label: "French", value: "french" },
      { id: "culture-thai", label: "Thai", value: "thai" },
      { id: "culture-mediterranean", label: "Mediterranean", value: "mediterranean" }
    );
  }

  const dishOptions = [
    { id: "dish-main", label: "Main dishes", value: "main" },
    { id: "dish-appetizer", label: "Appetizers", value: "appetizer" },
    { id: "dish-dessert", label: "Desserts", value: "dessert" },
    { id: "dish-drink", label: "Drinks", value: "drink" }
  ];

  const handleRemoveFavorite = async (recipeId: string) => {
    await removeFavorite(recipeId);
  };

  // Show loading state while auth is being checked
  if (authLoading) {
    return (
      <div className="flex justify-center items-center w-full py-12">
        <Text color="body">Loading...</Text>
      </div>
    );
  }

  // Redirect if not logged in
  if (!isLoggedIn) {
    return null; // Will redirect
  }

  return (
    <div 
      className="flex flex-col gap-[var(--spacing-lg)] items-center justify-start relative w-full max-w-6xl mx-auto"
      style={{
        padding: "var(--spacing-3xl) var(--spacing-lg)",
      }}
    >
      {/* Page title container */}
      <Heading as="h1" size="4xl" font="heading" className="min-w-full relative text-left">
        Favorites
      </Heading>
      <div className="flex flex-col gap-4 items-start justify-start p-0 relative w-full">
        <Heading as="h2" size="2xl" font="body" className="font-medium relative text-left mb-[var(--spacing-sm)]">
          Filter by culture or dish
        </Heading>
        
        {/* Filter container */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-start p-0 relative w-full">
          {/* Culture type filter */}
          <CheckboxFilter
            title="Culture type"
            options={cultureOptions}
            selectedValues={cultureFilters}
            onSelectionChange={setCultureFilters}
            placeholder="Select cultures"
            className="flex-1"
          />

          {/* Dish type filter */}
          <CheckboxFilter
            title="Dish type"
            options={dishOptions}
            selectedValues={dishFilters}
            onSelectionChange={setDishFilters}
            placeholder="Select dish types"
            className="flex-1"
          />

          {/* Search input */}
          <div className="flex flex-row flex-1 items-center self-stretch">
            <div className="flex flex-col gap-2 grow h-full items-start justify-center">
              <label className="font-semibold relative text-[var(--color-text-heading)] text-left"
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-base)",
              }}
              >
                Search for a favorite
              </label>
              <FavoritesSearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="What are you looking for?"
                className="w-full h-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recipe cards container */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full py-12">
          <Text color="body">Loading favorites...</Text>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-12 gap-4">
          <Text size="lg" color="body">
            {searchQuery || cultureFilters.length > 0 || dishFilters.length > 0
              ? "No favorites match your filters" 
              : "You haven't added any favorites yet"}
          </Text>
          {searchQuery || cultureFilters.length > 0 || dishFilters.length > 0 ? (
            <Button 
              onClick={() => {
                setSearchQuery("");
                setCultureFilters([]);
                setDishFilters([]);
              }}
              className="bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-primary)]"
            >
              Clear filters
            </Button>
          ) : (
            <Link href="/">
              <Button className="bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-primary)]">
                Browse recipes
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-[var(--spacing-2xl)]">
          {filteredFavorites.map((favorite) => (
            <Card key={favorite.id} className="bg-[var(--color-background)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] group">
                  <div className="relative h-[200px]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center rounded-t-lg"
                      style={{
                        backgroundImage: `url('${favorite.image}')`,
                      }}
                    />
                    {/* Close button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFavorite(favorite.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-[var(--color-background)] border border-[var(--color-gray)] rounded-full hover:bg-[var(--color-hover-background)] transition-colors duration-150 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                      aria-label="Remove from favorites"
                    >
                      <X className="w-6 h-6 text-[var(--color-text-heading)]" />
                    </Button>
                  </div>
                  <CardContent className="flex flex-col gap-2 items-start justify-start p-[14px] text-left">
                    <Heading as="h3" size="base" font="body" className="font-semibold">
                      {favorite.title}
                    </Heading>
                    <Link 
                      href={`/recipe/${favorite.id}`}
                      className="font-['Lexend:Light',_sans-serif] font-light text-[var(--color-link)] underline hover:text-[var(--color-primary)] transition-colors duration-150"
                    >
                      Learn more
                    </Link>
                  </CardContent>
                </Card>
          ))}
        </div>
      )}
    </div>
  );
} 
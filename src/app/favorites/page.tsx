"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import CheckboxFilter from "@/components/CheckboxFilter";
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
    
    const matchesCulture = cultureFilters.length === 0 || cultureFilters.includes(favorite.cuisine);
    const matchesDish = dishFilters.length === 0 || true; // Dish type filtering can be added later
    
    return matchesSearch && matchesCulture && matchesDish;
  });

  // Get unique cultures for filter dropdown
  const uniqueCultures = Array.from(new Set(favorites.map(fav => fav.cuisine)));

  // Create filter options
  const cultureOptions = uniqueCultures.filter(Boolean).map(culture => ({
    id: `culture-${culture}`,
    label: culture,
    value: culture
  }));

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
        <p className="text-[var(--color-text-body)]">Loading...</p>
      </div>
    );
  }

  // Redirect if not logged in
  if (!isLoggedIn) {
    return null; // Will redirect
  }

  return (
    <div className="flex flex-col gap-12 items-center justify-start p-0 relative w-full max-w-6xl mx-auto">
      {/* Page title container */}
      <div className="flex flex-col gap-4 items-start justify-start p-0 relative w-full">
        <h1 
          className="font-['Madimi_One:Regular',_sans-serif] leading-[0] min-w-full relative text-[var(--color-text-heading)] text-[var(--font-size-4xl)] text-left"
          style={{ width: "min-content" }}
        >
          Favorites
        </h1>
        <h2 className="font-['Lexend:Medium',_sans-serif] font-medium leading-[0] relative text-[var(--color-text-heading)] text-[var(--font-size-2xl)] text-left">
          Filter by culture or dish
        </h2>
        
        {/* Filter container */}
        <div className="flex flex-row gap-8 items-center justify-start p-0 relative w-full">
          {/* Culture type filter */}
          <CheckboxFilter
            title="Culture type"
            options={cultureOptions}
            selectedValues={cultureFilters}
            onSelectionChange={setCultureFilters}
            placeholder="Select cultures"
          />

          {/* Dish type filter */}
          <CheckboxFilter
            title="Dish type"
            options={dishOptions}
            selectedValues={dishFilters}
            onSelectionChange={setDishFilters}
            placeholder="Select dish types"
          />

          {/* Search input */}
          <div className="flex flex-row grow items-center self-stretch">
            <div className="flex flex-col gap-2 grow h-full items-start justify-center">
              <label className="font-['Lexend:SemiBold',_sans-serif] font-semibold leading-[0] relative text-[var(--color-text-heading)] text-[var(--font-size-md)] text-left">
                Search for a favorite
              </label>
              <div className="flex flex-row gap-4 grow items-center justify-start px-2 py-1 relative rounded-lg w-full bg-[var(--color-background)] border border-[var(--color-text-heading)]">
                <Input
                  type="text"
                  placeholder="What are looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent text-[var(--color-text-heading)] text-[var(--font-size-md)] focus:ring-0 focus:outline-none"
                  style={{ fontFamily: "var(--font-family-body)" }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-[var(--color-text-heading)] hover:text-[var(--color-primary)] transition-colors duration-150"
                >
                  <Search className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe cards container */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full py-12">
          <p className="text-[var(--color-text-body)]">Loading favorites...</p>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-12 gap-4">
          <p className="text-[var(--color-text-body)] text-[var(--font-size-lg)]">
            {searchQuery || cultureFilters.length > 0 || dishFilters.length > 0
              ? "No favorites match your filters" 
              : "You haven't added any favorites yet"}
          </p>
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
        <div className="flex flex-col gap-6 items-start justify-start p-0 relative w-full">
          {/* Render favorites in rows of 3 */}
          {Array.from({ length: Math.ceil(filteredFavorites.length / 3) }, (_, rowIndex) => (
            <div key={rowIndex} className="flex flex-row gap-8 items-center justify-start p-0 relative w-full">
              {filteredFavorites.slice(rowIndex * 3, (rowIndex + 1) * 3).map((favorite) => (
                <Card key={favorite.id} className="bg-[var(--color-background)] max-w-80 w-80 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
                  <div className="relative h-[200px] w-80">
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
                      className="absolute top-2 right-2 w-8 h-8 bg-[var(--color-background)] border border-[var(--color-gray)] rounded-full hover:bg-[var(--color-hover-background)] transition-colors duration-150"
                      aria-label="Remove from favorites"
                    >
                      <X className="w-6 h-6 text-[var(--color-text-heading)]" />
                    </Button>
                  </div>
                  <CardContent className="flex flex-col gap-2 items-start justify-start p-[14px] text-left">
                    <h3 className="font-['Lexend:SemiBold',_sans-serif] font-semibold text-[var(--color-text-heading)] text-[var(--font-size-md)]">
                      {favorite.title}
                    </h3>
                    <Link 
                      href={`/recipe/${favorite.id}`}
                      className="font-['Lexend:Light',_sans-serif] font-light text-[var(--color-secondary)] text-[var(--font-size-sm)] underline hover:text-[var(--color-secondary)] transition-colors duration-150"
                    >
                      Learn more
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
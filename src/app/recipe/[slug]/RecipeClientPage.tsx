"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Heart, Share, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import RecipeRating from "@/components/RecipeRating";
import RecipeStats from "@/components/RecipeStats";
import IngredientsList from "@/components/IngredientsList";
import RecipeDirections from "@/components/RecipeDirections";
import FavoritesModal from "@/components/FavoritesModal";
import html2canvas from "html2canvas";
import { TransformedRecipeData } from "./page";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";

interface RecipeClientPageProps {
  recipeData: TransformedRecipeData;
  breadcrumbItems: BreadcrumbItem[];
}

export default function RecipeClientPage({
  recipeData,
  breadcrumbItems,
}: RecipeClientPageProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isLoggedIn } = useAuth();

  const handleFavoriteToggle = async () => {
    console.log('Heart button clicked - isLoggedIn:', isLoggedIn);
    console.log('localStorage isLoggedIn:', localStorage.getItem('isLoggedIn'));
    console.log('localStorage userId:', localStorage.getItem('userId'));
    
    // Check if user is logged in
    if (!isLoggedIn) {
      console.log('User not logged in, showing modal');
      setShowFavoritesModal(true);
      return;
    }

    const recipeForFavorites = {
      id: recipeData.slug, // Use slug for favorites
      title: recipeData.title,
      description: recipeData.description,
      image: recipeData.image,
      cuisine: recipeData.cuisine
    };
    
    const success = await toggleFavorite(recipeForFavorites);
    if (success) {
      console.log(
        `Recipe ${isFavorite(recipeData.id) ? "removed from" : "added to"} favorites:`,
        recipeData.title,
      );
    }
  };

  const handlePrintScreenshot = async () => {
    if (!pageRef.current) return;

    try {
      setIsCapturing(true);

      // Create canvas from the page content with improved settings to handle color issues
      const canvas = await html2canvas(pageRef.current, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: pageRef.current.scrollWidth,
        height: pageRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (element) => {
          // Skip elements that might cause color parsing issues
          return element.classList?.contains("skip-screenshot") || false;
        },
        onclone: (clonedDoc) => {
          // Convert any problematic CSS custom properties to standard values
          const elements = clonedDoc.querySelectorAll("*");
          elements.forEach((el) => {
            const style = (el as HTMLElement).style;
            if (style) {
              // Replace CSS custom properties with fallback values
              if (
                style.backgroundColor &&
                style.backgroundColor.includes("var(")
              ) {
                style.backgroundColor = "#fff9e8"; // fallback for yellow background
              }
              if (style.color && style.color.includes("var(")) {
                style.color = "#333333"; // fallback for text color
              }
            }
          });
        },
      });

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${recipeData.title.replace(/[^a-zA-Z0-9]/g, "-")}-recipe.png`;
            link.style.display = "none";

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            URL.revokeObjectURL(url);
          }
        },
        "image/png",
        1.0,
      );
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      // TODO: Show user-friendly error message
    } finally {
      setIsCapturing(false);
    }
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log("Share recipe:", recipeData.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div
      ref={pageRef}
      className="max-w-3xl mx-auto p-[var(--spacing-lg)] md:p-[var(--spacing-xl)]"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-3xl)",
        paddingTop: "var(--spacing-4xl)",
      }}
    >
      {/* Breadcrumb */}
      <div>
        <Breadcrumb items={breadcrumbItems} showHomeIcon={false} />
      </div>

      {/* Recipe Header */}
      <div>
        <h1 className="text-[var(--font-size-4xl)] font-bold text-[var(--color-text-heading)] mb-[var(--spacing-md)] font-[var(--font-family-heading)]">
          {recipeData.title}
        </h1>

        {/* Recipe Meta Information */}
        <div className="flex flex-wrap items-center gap-[var(--spacing-md)] mb-[var(--spacing-lg)] text-[var(--color-text-body)] text-[var(--font-size-sm)]">
          <span className="font-medium">Cuisine: {recipeData.cuisine}</span>
          <span className="font-medium">
            Difficulty: {recipeData.difficulty}
          </span>
          {recipeData.dietary.length > 0 && (
            <span className="font-medium">
              Dietary: {recipeData.dietary.join(", ")}
            </span>
          )}
        </div>

        {/* Rating and Actions */}
        <div className="flex items-center justify-between mb-[var(--spacing-lg)]">
          <RecipeRating rating={recipeData.rating} />
          <div className="flex items-center gap-[var(--spacing-sm)]">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteToggle}
              onKeyDown={(e) => handleKeyDown(e, handleFavoriteToggle)}
              aria-label={
                isFavorite(recipeData.id) ? "Remove from favorites" : "Add to favorites"
              }
              aria-pressed={isFavorite(recipeData.id)}
              className="hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150"
            >
              <Heart
                className={`w-5 h-5 transition-all duration-200 ${
                  isFavorite(recipeData.id)
                    ? "text-[var(--color-primary)] fill-[var(--color-primary)]"
                    : "text-[var(--color-primary)] hover:fill-[var(--color-primary)]"
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              onKeyDown={(e) => handleKeyDown(e, handleShare)}
              aria-label="Share recipe"
              className="hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150"
            >
              <Share className="w-5 h-5 text-[var(--color-text-heading)] hover:text-[var(--color-primary)] transition-colors duration-150" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrintScreenshot}
              onKeyDown={(e) => handleKeyDown(e, handlePrintScreenshot)}
              aria-label={
                isCapturing
                  ? "Capturing screenshot..."
                  : "Download recipe screenshot"
              }
              disabled={isCapturing}
              className="hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150 disabled:opacity-50"
            >
              <Printer
                className={`w-5 h-5 text-[var(--color-text-heading)] hover:text-[var(--color-primary)] transition-colors duration-150 ${
                  isCapturing ? "animate-pulse" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--color-text-body)] text-[var(--font-size-base)] leading-[var(--line-height-normal)] font-[var(--font-family-body)]">
          {recipeData.description}
        </p>
      </div>

      {/* Recipe Image */}
      <div>
        <div className="relative w-full h-[400px] overflow-hidden">
          <Image
            src={recipeData.image}
            alt={recipeData.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Recipe Stats and Ingredients */}
      <div
        className="p-[var(--spacing-xl)] flex flex-col"
        style={{ backgroundColor: "#fff9e8", gap: "var(--spacing-3xl)" }}
      >
        {/* Recipe Stats */}
        <RecipeStats
          prepTime={recipeData.stats.prepTime}
          cookTime={recipeData.stats.cookTime}
          totalTime={recipeData.stats.totalTime}
          servings={recipeData.stats.servings}
          className=""
        />

        {/* Ingredients */}
        <IngredientsList
          ingredients={recipeData.ingredients.map((ing) => ({
            amount: ing.amount,
            item: ing.item,
          }))}
          className=""
        />
      </div>

      {/* Directions */}
      <RecipeDirections steps={recipeData.directions} className="" />

      {/* Footer Actions */}
      <div className="flex items-center justify-center gap-[var(--spacing-lg)] pt-[var(--spacing-xl)] border-t border-gray-200">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFavoriteToggle}
          onKeyDown={(e) => handleKeyDown(e, handleFavoriteToggle)}
          aria-label={
            isFavorite(recipeData.id) ? "Remove from favorites" : "Add to favorites"
          }
          aria-pressed={isFavorite(recipeData.id)}
          className="hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150"
        >
          <Heart
            className={`w-6 h-6 transition-all duration-200 ${
              isFavorite(recipeData.id)
                ? "text-[var(--color-primary)] fill-[var(--color-primary)]"
                : "text-[var(--color-primary)] hover:fill-[var(--color-primary)]"
            }`}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrintScreenshot}
          onKeyDown={(e) => handleKeyDown(e, handlePrintScreenshot)}
          aria-label={
            isCapturing
              ? "Capturing screenshot..."
              : "Download recipe screenshot"
          }
          disabled={isCapturing}
          className="hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150 disabled:opacity-50"
        >
          <Printer
            className={`w-6 h-6 text-[var(--color-text-heading)] hover:text-[var(--color-primary)] transition-colors duration-150 ${
              isCapturing ? "animate-pulse" : ""
            }`}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          onKeyDown={(e) => handleKeyDown(e, handleShare)}
          aria-label="Share recipe"
          className="hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150"
        >
          <Share className="w-6 h-6 text-[var(--color-text-heading)] hover:text-[var(--color-primary)] transition-colors duration-150" />
        </Button>
      </div>

      {/* Favorites Modal */}
      <FavoritesModal 
        isOpen={showFavoritesModal} 
        onClose={() => setShowFavoritesModal(false)} 
      />
    </div>
  );
}

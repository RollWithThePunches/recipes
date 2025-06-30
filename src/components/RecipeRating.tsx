"use client";

import { Star } from "lucide-react";

interface RecipeRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export default function RecipeRating({ 
  rating, 
  maxRating = 5, 
  className = "" 
}: RecipeRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxRating }, (_, index) => {
        const isActive = index < rating;
        return (
          <Star
            key={index}
            className={`w-4 h-4 ${
              isActive 
                ? "fill-[var(--color-primary)] text-[var(--color-primary)]" 
                : "fill-none text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
} 
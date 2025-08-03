'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import Link from '@/components/ui/link';

interface UserRecipe {
  id: string;
  title: string;
  description: string;
  image: string;
  editAriaLabel: string;
}

interface UserRecipeCardProps {
  recipe: UserRecipe;
  onEdit?: (recipeId: string) => void;
}

export default function UserRecipeCard({ recipe, onEdit }: UserRecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(recipe.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEdit();
    }
  };

  return (
    <Card 
      className="bg-[var(--color-background)] max-w-80 w-80 p-0 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`View ${recipe.title} recipe`}
      onKeyDown={handleKeyDown}
    >
      {/* Recipe image with edit icon overlay */}
      <div className="w-80 h-[200px] relative">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat rounded-t-lg"
          style={{ backgroundImage: `url('${recipe.image}')` }}
          role="img"
          aria-label={recipe.title}
        />
        
        {/* Edit icon - visible on hover */}
        {isHovered && (
          <div className="absolute top-[9px] right-[23px]">
            <Button
              variant="outline"
              size="sm"
              className="bg-[var(--color-background)] p-[4px] rounded-[25px] border border-[var(--color-gray)] hover:bg-[var(--color-hover-background)] focus:ring-2 focus:ring-[var(--color-focus)] size-[34px]"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              aria-label={recipe.editAriaLabel}
            >
              <Edit 
                size={24} 
                color="var(--color-text-body)" 
                className="shrink-0"
              />
            </Button>
          </div>
        )}
      </div>

      {/* Recipe content */}
      <div className="flex flex-col gap-2 items-start p-[14px] text-left w-full">
        <Heading as="h3" size="base" font="body" className="font-semibold text-[var(--color-text-body)] w-full">
          {recipe.title}
        </Heading>
        <Link
          href={`/recipe/${recipe.id}`}
          variant="secondary"
          size="sm"
          weight="light"
          underline
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {recipe.description}
        </Link>
      </div>
    </Card>
  );
}
'use client';

import { RecipeFormData } from './CreateRecipeForm';
import Heading from '@/components/ui/heading';
import Text from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RecipePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: RecipeFormData;
}

export default function RecipePreviewModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData 
}: RecipePreviewModalProps) {
  if (!isOpen) return null;

  // Parse ingredients string into array
  const ingredients = formData.ingredients
    .split(',')
    .map(ingredient => ingredient.trim())
    .filter(ingredient => ingredient.length > 0);

  // Filter out empty directions
  const directions = formData.directions.filter(direction => direction.trim().length > 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-background)] rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-start p-6 border-b border-[var(--color-gray)] flex-shrink-0">
          <div className="space-y-1">
            <Heading as="h2" size="2xl" font="heading" className="text-[var(--color-text-heading)]">
              Recipe Preview
            </Heading>
            <Text size="base" color="body">
              Please review your recipe before submitting.
            </Text>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-2 h-auto"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Recipe Name */}
          <div className="space-y-2">
            <Text size="base" weight="semibold" color="body">
              Name
            </Text>
            <Text size="base" color="body">
              {formData.recipeName || 'No name provided'}
            </Text>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Text size="base" weight="semibold" color="body">
              Description
            </Text>
            <Text size="base" color="body">
              {formData.shortDescription || 'No description provided'}
            </Text>
          </div>

          {/* Food Category */}
          <div className="space-y-2">
            <Text size="base" weight="semibold" color="body">
              Food category
            </Text>
            <Text size="base" color="body">
              {formData.foodCategory ? formData.foodCategory.charAt(0).toUpperCase() + formData.foodCategory.slice(1) : 'No category selected'}
            </Text>
          </div>

          {/* Cuisine */}
          <div className="space-y-2">
            <Text size="base" weight="semibold" color="body">
              Cuisine
            </Text>
            <Text size="base" color="body">
              {formData.cuisine ? formData.cuisine.charAt(0).toUpperCase() + formData.cuisine.slice(1) : 'No cuisine selected'}
            </Text>
          </div>

          {/* Dietary */}
          <div className="space-y-2">
            <Text size="base" weight="semibold" color="body">
              Dietary
            </Text>
            <Text size="base" color="body">
              {formData.dietary ? formData.dietary.charAt(0).toUpperCase() + formData.dietary.slice(1) : 'No dietary preference selected'}
            </Text>
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            <Text size="base" weight="semibold" color="body">
              Ingredients
            </Text>
            {ingredients.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {ingredients.map((ingredient, index) => (
                  <li 
                    key={index} 
                    className="text-[var(--color-text-body)]"
                    style={{ 
                      fontFamily: "var(--font-family-body)", 
                      fontSize: "var(--font-size-base)" 
                    }}
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            ) : (
              <Text size="base" color="body">
                No ingredients provided
              </Text>
            )}
          </div>

          {/* Directions */}
          <div className="space-y-2">
            <Text size="base" weight="semibold" color="body">
              Directions
            </Text>
            {directions.length > 0 ? (
              <ol className="list-decimal list-inside space-y-1">
                {directions.map((direction, index) => (
                  <li 
                    key={index} 
                    className="text-[var(--color-text-body)]"
                    style={{ 
                      fontFamily: "var(--font-family-body)", 
                      fontSize: "var(--font-size-base)" 
                    }}
                  >
                    {direction}
                  </li>
                ))}
              </ol>
            ) : (
              <Text size="base" color="body">
                No directions provided
              </Text>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-4 p-6 border-t border-[var(--color-gray)] flex-shrink-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-[var(--color-background)] border border-[var(--color-secondary)] font-semibold text-[var(--color-secondary)]"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            className="bg-[var(--color-primary)] font-semibold text-[var(--color-text-on-dark)]"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
} 
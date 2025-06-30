"use client";

interface Ingredient {
  amount: string;
  item: string;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
  className?: string;
}

export default function IngredientsList({ 
  ingredients, 
  className = "" 
}: IngredientsListProps) {
  return (
    <div className={`${className}`}>
      <h2 className="text-[var(--font-size-2xl)] font-bold text-[var(--color-text-heading)] mb-[var(--spacing-lg)] font-[var(--font-family-heading)]">
        Ingredients
      </h2>
      <ul className="space-y-[var(--spacing-sm)] list-none">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex text-[var(--color-text-body)] text-[var(--font-size-base)] leading-[var(--line-height-normal)]">
            <span className="text-[var(--color-primary)] mr-[var(--spacing-sm)] font-bold">•</span>
            <span>
              {ingredient.amount} {ingredient.item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
} 
"use client";

import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";

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
  className = "",
}: IngredientsListProps) {
  return (
    <div className={`${className}`}>
      <Heading as="h2" size="xl" font="heading" className="font-bold mb-[var(--spacing-lg)]">
        Ingredients
      </Heading>
      <ul className="space-y-[var(--spacing-sm)] list-none">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="flex text-[var(--color-text-body)] text-[var(--font-size-base)] leading-[var(--line-height-normal)]"
          >
            <Text as="span" size="base" color="primary" weight="bold" className="mr-[var(--spacing-sm)]">
              •
            </Text>
            <Text as="span" size="base" color="body">
              {ingredient.amount} {ingredient.item}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

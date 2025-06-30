import Image from "next/image";
import { Heart, Share, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import RecipeRating from "@/components/RecipeRating";
import RecipeStats from "@/components/RecipeStats";
import IngredientsList from "@/components/IngredientsList";
import RecipeDirections from "@/components/RecipeDirections";

// This would typically come from a database or API
const recipeData = {
  id: "barbacoa-tacos",
  title: "Barbacoa Tacos",
  description: "These barbacoa tacos are packed with smoky shredded beef that's perfectly tender. Spices like cumin complement the chiles, while oregano and bay leaves add an earthy sweetness to this recipe.",
  rating: 4,
  image: "/assets/fh-tacos-3784500610.jpg", // Taco image from Unsplash
  stats: {
    prepTime: "45 mins",
    cookTime: "2 hrs",
    totalTime: "2 hrs 45 mins",
    servings: "6"
  },
  ingredients: [
    { amount: "2 ripe plum tomatoes", item: "" },
    { amount: "1 small white onion, quartered", item: "" },
    { amount: "2 cloves garlic, peeled", item: "" },
    { amount: "4 chipotle peppers in adobo sauce", item: "" },
    { amount: "3 teaspoons kosher salt", item: "" },
    { amount: "1 ½ teaspoons chili powder", item: "" },
    { amount: "1 teaspoon ground cumin", item: "" },
    { amount: "½ teaspoon freshly ground black pepper", item: "" },
    { amount: "3 pounds chuck roast, cut into 6-equal sized cubes", item: "" },
    { amount: "2 tablespoons olive oil", item: "" },
    { amount: "1 cup water", item: "" },
    { amount: "1 tablespoon light brown sugar", item: "" },
    { amount: "2 teaspoons dried oregano", item: "" },
    { amount: "3 fresh bay leaves", item: "" },
    { amount: "1 tablespoon lime juice", item: "" },
    { amount: "corn tortillas, warmed", item: "" },
    { amount: "2 ripe avocados, peeled, pitted and sliced", item: "" },
    { amount: "½ bunch radishes, thinly sliced", item: "" },
    { amount: "2 tablespoons chopped fresh cilantro, or to taste", item: "" }
  ],
  directions: [
    {
      stepNumber: 1,
      instruction: "In a large cast iron skillet over medium-high, arrange whole tomatoes, onions (cut side down), and garlic in the dry skillet in a single layer, working in batches if needed. Cook, turning occasionally, until charred on all sides, about 6 minutes for the garlic and about 12 minutes for the onions and tomatoes."
    },
    {
      stepNumber: 2,
      instruction: "Transfer charred vegetables to a blender and add chipotle peppers. Process until smooth, about 1 minute."
    },
    {
      stepNumber: 3,
      instruction: "Stir salt, chili powder, cumin, and black pepper together in a small bowl; season beef evenly with salt mixture."
    },
    {
      stepNumber: 4,
      instruction: "Heat oil in a Dutch oven over medium-high heat. Add beef in batches and cook, turning occasionally, until browned on all sides, about 5 minutes per side. Transfer browned beef to a large plate."
    },
    {
      stepNumber: 5,
      instruction: "Pour water into the Dutch oven and scrape up any browned bits from the bottom of the pan. Stir in onion-tomato mixture, brown sugar, oregano, and bay leaves. Reduce heat to medium-low and bring to a simmer."
    },
    {
      stepNumber: 6,
      instruction: "Nestle beef back into pot and cover. Cook, stirring and re-nestling beef occasionally (about every 20 to 30 minutes), until beef is tender and pulls easily apart with a fork, 1 hour and 45 minutes to 2 hours and 15 minutes. Remove bay leaves and discard."
    },
    {
      stepNumber: 7,
      instruction: "Remove beef from Dutch oven, place on cutting board; shred beef using 2 forks."
    },
    {
      stepNumber: 8,
      instruction: "Return beef to the Dutch oven, add lime juice, and stir to combine."
    },
    {
      stepNumber: 9,
      instruction: "Serve in corn tortillas with avocado, radishes, and cilantro."
    }
  ]
};

export default function RecipePage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Mexican", href: "/category/mexican" },
    { label: "Main dish", href: "/category/main-dish" },
    { label: "Tacos", href: "/category/tacos" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-[var(--spacing-lg)] md:p-[var(--spacing-xl)]">
      {/* Breadcrumb */}
      <div className="mb-[var(--spacing-lg)]">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Recipe Header */}
      <div className="mb-[var(--spacing-xl)]">
        <h1 className="text-[var(--font-size-4xl)] font-bold text-[var(--color-text-heading)] mb-[var(--spacing-md)] font-[var(--font-family-heading)]">
          {recipeData.title}
        </h1>
        
        {/* Rating and Actions */}
        <div className="flex items-center justify-between mb-[var(--spacing-lg)]">
          <RecipeRating rating={recipeData.rating} />
          <div className="flex items-center gap-[var(--spacing-sm)]">
            <Button variant="ghost" size="icon" aria-label="Save to favorites">
              <Heart className="w-5 h-5 text-[var(--color-primary)]" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Share recipe">
              <Share className="w-5 h-5 text-[var(--color-text-heading)]" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Print recipe">
              <Printer className="w-5 h-5 text-[var(--color-text-heading)]" />
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--color-text-body)] text-[var(--font-size-base)] leading-[var(--line-height-normal)] font-[var(--font-family-body)] mb-[var(--spacing-xl)]">
          {recipeData.description}
        </p>
      </div>

      {/* Recipe Image */}
      <div className="mb-[var(--spacing-xl)]">
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
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
      <div style={{ backgroundColor: 'var(--color-background-yellow)' }} className="mb-[var(--spacing-xl)] p-[var(--spacing-xl)] gap-[var(--spacing-xl)] flex flex-col">
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
          ingredients={recipeData.ingredients.map(ing => ({
            amount: ing.amount,
            item: ing.item
          }))}
          className=""
        />
      </div>

      {/* Directions */}
      <RecipeDirections 
        steps={recipeData.directions}
        className="mb-[var(--spacing-xl)]"
      />

      {/* Footer Actions */}
      <div className="flex items-center justify-center gap-[var(--spacing-lg)] pt-[var(--spacing-xl)] border-t border-gray-200">
        <Button variant="ghost" size="icon" aria-label="Save to favorites">
          <Heart className="w-6 h-6 text-[var(--color-primary)]" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Print recipe">
          <Printer className="w-6 h-6 text-[var(--color-text-heading)]" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Share recipe">
          <Share className="w-6 h-6 text-[var(--color-text-heading)]" />
        </Button>
      </div>
    </div>
  );
} 
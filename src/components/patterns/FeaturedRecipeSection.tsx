import { Recipe } from "@/types/recipe";

interface FeaturedRecipeSectionProps {
  recipe: Recipe;
  imagePosition?: "left" | "right";
}

export default function FeaturedRecipeSection({
  recipe,
  imagePosition = "left",
}: FeaturedRecipeSectionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start w-full">
      {/* Image - always first on mobile, positioned based on imagePosition on desktop */}
      <div
        className={`w-full md:flex-1 bg-cover bg-center bg-no-repeat h-[250px] md:h-[294px] ${
          imagePosition === "right"
            ? "order-1 md:order-2"
            : "order-1 md:order-1"
        }`}
        style={{ backgroundImage: `url('${recipe.image}')` }}
        role="img"
        aria-label={recipe.title}
      />

      {/* Content - always second on mobile, positioned based on imagePosition on desktop */}
      <div
        className={`flex-1 flex flex-col gap-4 text-left ${
          imagePosition === "right"
            ? "order-2 md:order-1"
            : "order-2 md:order-2"
        }`}
      >
        <h3
          className="text-3xl md:text-4xl text-[var(--color-text-heading)]"
          style={{
            fontFamily: "var(--font-family-heading)",
            fontSize: "var(--font-size-4xl)",
          }}
        >
          {recipe.title}
        </h3>
        <p
          className="text-base text-black"
          style={{
            fontFamily: "var(--font-family-body)",
            fontWeight: "300",
            lineHeight: "var(--line-height-normal)",
          }}
        >
          {recipe.description}
        </p>
        <a
          href={`/recipe/${recipe.id}`}
          className="text-base text-[var(--color-secondary)] underline hover:text-[var(--color-primary)] transition-colors"
          style={{
            fontFamily: "var(--font-family-body)",
            fontWeight: "300",
            lineHeight: "var(--line-height-normal)",
          }}
        >
          Learn more
        </a>
      </div>
    </div>
  );
}

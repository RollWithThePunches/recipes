import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="flex flex-col items-start p-0 w-full h-full">
      {/* Recipe image */}
      <div className="w-full relative">
        <div
          className="w-full h-[203px] bg-cover bg-center bg-no-repeat rounded-t-lg"
          style={{ backgroundImage: `url('${recipe.image}')` }}
          role="img"
          aria-label={recipe.title}
        />
      </div>

      {/* Recipe content */}
      <div className="w-full flex-1 flex flex-col">
        <div className="flex flex-col gap-2 items-start p-[14px] text-left w-full h-full">
          <h3
            className="text-base text-black font-semibold w-full"
            style={{
              fontFamily: "var(--font-family-body)",
              fontWeight: "600",
              fontSize: "var(--font-size-base)",
            }}
          >
            {recipe.title}
          </h3>
          <p
            className="text-base text-black font-light w-full flex-1"
            style={{
              fontFamily: "var(--font-family-body)",
              fontWeight: "300",
              fontSize: "var(--font-size-base)",
              lineHeight: "var(--line-height-normal)",
            }}
          >
            {recipe.description}
          </p>
          <a
            href={`/recipe/${recipe.id}`}
            className="text-sm text-[var(--color-secondary)] underline hover:text-[var(--color-primary)] transition-colors mt-auto"
            style={{
              fontFamily: "var(--font-family-body)",
              fontWeight: "300",
              fontSize: "var(--font-size-sm)",
              lineHeight: "var(--line-height-normal)",
            }}
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}

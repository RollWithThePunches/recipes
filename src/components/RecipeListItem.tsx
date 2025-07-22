import { RecipeCard } from "@/types/recipe";

interface RecipeListItemProps {
  recipe: RecipeCard;
}

export default function RecipeListItem({ recipe }: RecipeListItemProps) {
  return (
    <li className="w-full">
      <a
        href={`/recipe/${recipe.slug}`}
        className="flex flex-row gap-2 items-start w-full hover:bg-[var(--color-hover-background)] p-2 rounded-md transition-colors group"
        aria-label={`View recipe for ${recipe.title}`}
      >
        {/* Recipe image */}
        <div className="shrink-0">
          <div
            className="w-[106px] h-[80px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${recipe.image}')`,
              maskImage:
                "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA2IiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTA2IDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDYiIGhlaWdodD0iODAiIHJ4PSI0IiBmaWxsPSIjRDlEOUQ5Ii8+PC9zdmc+)",
              maskSize: "cover",
              maskRepeat: "no-repeat",
            }}
            role="img"
            aria-label={recipe.title}
          />
        </div>

        {/* Recipe content */}
        <div className="flex-1 flex flex-col gap-1 text-left text-black text-base">
          <h3
            className="font-semibold group-hover:text-[var(--color-primary)] transition-colors"
            style={{
              fontFamily: "var(--font-family-body)",
              fontWeight: "600",
              fontSize: "var(--font-size-base)",
              lineHeight: "normal",
            }}
          >
            {recipe.title}
          </h3>
          <p
            className="font-light"
            style={{
              fontFamily: "var(--font-family-body)",
              fontWeight: "300",
              fontSize: "var(--font-size-base)",
              lineHeight: "normal",
            }}
          >
            {recipe.description}
          </p>
        </div>
      </a>
    </li>
  );
}

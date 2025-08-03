import { RecipeCard } from "@/types/recipe";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/link";
import Text from "@/components/ui/text";

interface RecipeListItemProps {
  recipe: RecipeCard;
}

export default function RecipeListItem({ recipe }: RecipeListItemProps) {
  return (
    <li className="w-full">
      <Link
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
          <Heading as="h3" size="base" font="body" className="font-semibold group-hover:text-[var(--color-primary)] transition-colors">
            {recipe.title}
          </Heading>
          <Text
            size="base"
            color="body"
            weight="light"
            lineHeight="normal"
          >
            {recipe.description}
          </Text>
        </div>
      </Link>
    </li>
  );
}

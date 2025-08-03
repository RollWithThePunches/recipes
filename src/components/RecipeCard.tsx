import { Recipe } from "@/types/recipe";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/link";
import Text from "@/components/ui/text";

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
          <Heading as="h3" size="base" font="body" className="text-black font-semibold w-full">
            {recipe.title}
          </Heading>
          <Text
            size="base"
            color="body"
            weight="light"
            lineHeight="normal"
            className="w-full flex-1"
          >
            {recipe.description}
          </Text>
          <Link
            href={`/recipe/${recipe.slug}`}
            variant="secondary"
            size="sm"
            weight="light"
            underline
            className="mt-auto"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Recipe } from "@/types/recipe";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/link";
import Text from "@/components/ui/text";

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
        <Heading as="h3" size="4xl" font="heading" className="text-3xl md:text-4xl">
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
        <Link
          href={`/recipe/${recipe.slug}`}
          variant="secondary"
          size="base"
          weight="light"
          underline
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}

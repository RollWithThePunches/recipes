import {
  HeroSection as HeroSectionType,
  SummerRecipesSection,
} from "@/types/content";
import RecipeListItem from "@/components/RecipeListItem";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/link";
import Text from "@/components/ui/text";

interface HeroSectionProps {
  hero: HeroSectionType;
  summerRecipes: SummerRecipesSection;
}

export default function HeroSection({ hero, summerRecipes }: HeroSectionProps) {
  return (
    <div className="px-4sm:px-6 lg:px-0">
      <div className="flex flex-col gap-10 items-center w-full max-w-[1024px] mx-auto">
        {/* Main hero content */}
        <div className="flex flex-col md:flex-row gap-6 items-start w-full">
          {/* Left side - Feature article */}
          <div className="flex flex-col gap-4 w-full md:flex-1 md:h-[494px] items-end">
            {/* Hero image */}
            <div
              className="w-full h-[250px] md:h-auto md:flex-1 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${hero.image}')` }}
              role="img"
              aria-label={hero.title}
            />

            {/* Hero content */}
            <div className="flex flex-col gap-2 text-left w-full">
              <Heading
                as="h1"
                size="4xl"
                font="heading"
                id="hero-heading"
                className="text-3xl md:text-4xl"
              >
                {hero.title}
              </Heading>
              <Text
                size="base"
                color="body"
                weight="light"
                lineHeight="normal"
                className="text-sm md:text-base"
              >
                {hero.subtitle}
              </Text>
              <Link
                href="#popular-heading"
                variant="secondary"
                size="base"
                weight="light"
                underline
              >
                {hero.learnMoreText}
              </Link>
            </div>
          </div>

          {/* Right side - Summer recipes list */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            <Heading
              as="h2"
              size="3xl"
              font="heading"
              className="text-2xl md:text-[32px] leading-none"
            >
              {summerRecipes.title}
            </Heading>

            {/* Recipe list items */}
            <ul className="flex flex-col gap-4 md:gap-6 w-full list-none p-0 m-0">
              {summerRecipes.recipes.map((recipe) => (
                <RecipeListItem key={recipe.id} recipe={{ ...recipe, slug: recipe.id }} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  HeroSection as HeroSectionType,
  SummerRecipesSection,
} from "@/types/content";
import RecipeListItem from "@/components/RecipeListItem";

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
              <h1
                id="hero-heading"
                className="text-3xl md:text-4xl text-[var(--color-text-heading)]"
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "var(--font-size-4xl)",
                }}
              >
                {hero.title}
              </h1>
              <p
                className="text-sm md:text-base text-black"
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontWeight: "300",
                  lineHeight: "var(--line-height-normal)",
                }}
              >
                {hero.subtitle}
              </p>
              <a
                href="#popular-heading"
                className="text-sm md:text-base text-[var(--color-secondary)] underline hover:text-[var(--color-primary)] transition-colors"
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontWeight: "300",
                  lineHeight: "var(--line-height-normal)",
                }}
              >
                {hero.learnMoreText}
              </a>
            </div>
          </div>

          {/* Right side - Summer recipes list */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            <h2
              className="text-2xl md:text-[32px] text-[var(--color-text-heading)] leading-none"
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "var(--font-size-3xl)",
              }}
            >
              {summerRecipes.title}
            </h2>

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

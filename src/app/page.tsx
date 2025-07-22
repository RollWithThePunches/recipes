import { Suspense } from "react";
import contentData from "@/data/content.json";
import HeroSection from "@/components/patterns/HeroSection";
import RecipeGrid from "@/components/patterns/RecipeGrid";
import FeaturedRecipeSection from "@/components/patterns/FeaturedRecipeSection";
import { ContentData } from "@/types/content";
import { getRecipesByIds } from "@/lib/recipes";

// Cast the imported JSON to our content type
const content = contentData as ContentData;

export default async function HomePage() {
  // Fetch recipes from database
  const featuredSlugs = content.homepage.featuredRecipes.slice(0, 3);
  const featuredRecipesRaw = await getRecipesByIds(featuredSlugs);
  // Sort recipeData to match the order of slugs in featuredSlugs
  const featuredRecipes = featuredSlugs
    .map((slug) => featuredRecipesRaw.find((r) => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const barbacoaRecipe = await getRecipesByIds(["barbacoa-tacos"]);

  return (
    <div className="bg-white">
      {/* Main Content */}
      <div
        className="w-full"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4xl)",
        }}
      >
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading"
          style={{ paddingTop: "var(--spacing-4xl)" }}
        >
          <HeroSection
            hero={content.homepage.hero}
            summerRecipes={content.homepage.sections.summerRecipes}
          />
        </section>

        {/* Popular Now Section with yellow background */}
        <section
          aria-labelledby="popular-heading"
          className=""
          style={{
            backgroundColor: "var(--color-background-yellow)",
            paddingTop: "var(--spacing-xl)",
            paddingBottom: "var(--spacing-xl)",
          }}
        >
          <div className="w-full max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-0">
            <div className="flex flex-col gap-6">
              <h2
                id="popular-heading"
                className="text-4xl text-[var(--color-text-heading)]"
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "var(--font-size-4xl)",
                }}
              >
                {content.homepage.sections.popularNow.title}
              </h2>

              <Suspense fallback={<div>Loading popular recipes...</div>}>
                <RecipeGrid
                  recipes={featuredSlugs}
                  recipeData={featuredRecipes}
                />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Featured Recipe Sections */}
        <section
          aria-labelledby="featured-heading"
          className=""
          style={{
            paddingBottom: "var(--spacing-2xl)",
            paddingLeft: "var(--spacing-md)",
            paddingRight: "var(--spacing-md)",
          }}
        >
          <div className="max-w-[1024px] mx-auto space-y-10">
            {/* First featured recipe (left image) */}
            <FeaturedRecipeSection
              recipe={barbacoaRecipe[0]}
              imagePosition="left"
            />

            {/* Second featured recipe (right image) */}
            <FeaturedRecipeSection
              recipe={barbacoaRecipe[0]}
              imagePosition="right"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

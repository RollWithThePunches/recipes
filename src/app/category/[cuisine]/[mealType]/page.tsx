import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import contentData from "@/data/content.json";
import { ContentData } from "@/types/content";
import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import RecipeCard from "@/components/RecipeCard";

// Cast the imported JSON to our content type
const content = contentData as ContentData;

interface SubcategoryPageProps {
  params: Promise<{
    cuisine: string;
    mealType: string;
  }>;
}

export default async function SubcategoryPage({
  params,
}: SubcategoryPageProps) {
  // Await the params since they're a Promise in Next.js 15
  const { cuisine, mealType } = await params;

  // Get category data
  const categoryData = content.categories[cuisine];

  if (!categoryData) {
    notFound();
  }

  // Get subcategory data
  const subcategoryData = categoryData.subcategories[mealType];

  if (!subcategoryData) {
    notFound();
  }

  // Get recipes for this subcategory
  const subcategoryRecipes = content.recipes.filter((recipe) =>
    subcategoryData.recipes.includes(recipe.id),
  );

  // Create breadcrumbs
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: categoryData.name, href: `/category/${cuisine}` },
    { label: subcategoryData.name, isCurrentPage: true },
  ];

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      {/* Main Content */}
      <div className="w-full">
        {/* Page Container */}
        <div
          className="w-full max-w-[1024px] mx-auto"
          style={{
            paddingLeft: "var(--spacing-md)",
            paddingRight: "var(--spacing-md)",
            paddingTop: "var(--spacing-4xl)",
            paddingBottom: "var(--spacing-3xl)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4xl)",
          }}
        >
          <div className="flex flex-col gap-12">
            {/* Page Title Container */}
            <div className="flex flex-col gap-4 items-start w-full">
              {/* Breadcrumb Navigation */}
              <Breadcrumb items={breadcrumbItems} showHomeIcon={false} />

              {/* Page Title */}
              <h1
                className="text-left text-[var(--color-text-heading)] w-full"
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "var(--font-size-5xl)",
                  lineHeight: "var(--line-height-tight)",
                }}
              >
                {subcategoryData.name}
              </h1>

              {/* Description */}
              <p
                className="text-left text-[var(--color-text-body)] w-full"
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-xl)",
                  lineHeight: "var(--line-height-normal)",
                }}
              >
                {subcategoryData.description}
              </p>
            </div>

            {/* Recipe Cards Section */}
            <section aria-labelledby="recipes-heading">
              <h2 id="recipes-heading" className="sr-only">
                {subcategoryData.name} Recipes
              </h2>

              {subcategoryRecipes.length > 0 ? (
                <Suspense fallback={<div>Loading recipes...</div>}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {subcategoryRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="bg-[var(--color-card-background)] rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden hover:shadow-lg transition-shadow duration-200"
                      >
                        <RecipeCard recipe={recipe} />
                      </div>
                    ))}
                  </div>
                </Suspense>
              ) : (
                <div
                  className="text-center"
                  style={{
                    paddingTop: "var(--spacing-3xl)",
                    paddingBottom: "var(--spacing-3xl)",
                  }}
                >
                  <p className="text-[var(--color-text-body)] text-lg mb-4">
                    No recipes found for {subcategoryData.name.toLowerCase()} in{" "}
                    {categoryData.name.toLowerCase()} cuisine.
                  </p>
                  <Link
                    href={`/category/${cuisine}`}
                    className="text-[var(--color-link)] hover:text-[var(--color-link-hover)] underline decoration-solid underline-offset-2"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "var(--font-size-base)",
                    }}
                  >
                    View All {categoryData.name} Recipes
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // Generate static params for existing category/subcategory combinations
  const params = [];

  for (const [cuisineId, category] of Object.entries(content.categories)) {
    for (const subcategoryId of Object.keys(category.subcategories)) {
      params.push({
        cuisine: cuisineId,
        mealType: subcategoryId,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { cuisine, mealType } = await params;
  const categoryData = content.categories[cuisine];
  const subcategoryData = categoryData?.subcategories[mealType];

  if (!categoryData || !subcategoryData) {
    return {
      title: "Subcategory Not Found",
    };
  }

  return {
    title: `${subcategoryData.name} - ${categoryData.name} Recipes | ${content.ui.navigation.brand}`,
    description: subcategoryData.description,
  };
}

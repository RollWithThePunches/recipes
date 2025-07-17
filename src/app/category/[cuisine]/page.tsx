import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import contentData from '@/data/content.json';
import { ContentData } from '@/types/content';
import { Recipe } from '@/types/recipe';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';
import RecipeCard from '@/components/RecipeCard';
import { Button } from '@/components/ui/button';

// Cast the imported JSON to our content type
const content = contentData as ContentData;

interface CategoryPageProps {
  params: {
    cuisine: string;
  };
  searchParams: {
    type?: string;
  };
}

// Featured Recipe Component
interface FeaturedRecipeProps {
  recipe: Recipe;
}

function FeaturedRecipe({ recipe }: FeaturedRecipeProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
      {/* Recipe Image */}
      <div className="w-full lg:w-[512px] h-[294px] flex-shrink-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg"
          style={{ backgroundImage: `url('${recipe.image}')` }}
          role="img"
          aria-label={recipe.title}
        />
      </div>
      
      {/* Recipe Content */}
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <h2 
          className="text-[var(--color-text-heading)]"
          style={{ 
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'var(--font-size-4xl)',
            lineHeight: 'var(--line-height-tight)'
          }}
        >
          {recipe.title}
        </h2>
        
        <p 
          className="text-[var(--color-text-body)] leading-6"
          style={{ 
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-base)',
            fontWeight: '300'
          }}
        >
          {recipe.description}
        </p>
        
        <Link 
          href={`/recipe/${recipe.id}`}
          className="text-[var(--color-link)] hover:text-[var(--color-link-hover)] underline decoration-solid underline-offset-2 text-sm font-light"
          style={{ 
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-sm)'
          }}
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}

// Category Navigation Component
interface CategoryNavigationProps {
  title: string;
  mealTypes: Array<{ id: string; name: string; href: string }>;
  currentType?: string;
}

function CategoryNavigation({ title, mealTypes, currentType }: CategoryNavigationProps) {
  return (
    <div 
      className="w-full bg-[var(--color-background-yellow)]"
      style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-lg)' }}
      role="navigation"
      aria-label="Category meal types"
    >
      <div className="w-full max-w-[1024px] mx-auto" style={{ paddingLeft: 'var(--spacing-md)', paddingRight: 'var(--spacing-md)', paddingTop: 'var(--spacing-3xl)', paddingBottom: 'var(--spacing-3xl)' }}>
        <div className="flex flex-col gap-6 items-center">
          <h2 
            className="text-center text-[var(--color-text-heading)]"
            style={{ 
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-3xl)',
              lineHeight: 'var(--line-height-tight)'
            }}
          >
            {title}
          </h2>
          
          <nav className="flex flex-wrap gap-6 items-center justify-center">
            {mealTypes.map((mealType) => (
              <Link
                key={mealType.id}
                href={mealType.href}
                className={`text-[var(--color-link)] hover:text-[var(--color-link-hover)] underline decoration-solid underline-offset-2 text-center ${
                  currentType === mealType.id ? 'font-semibold' : ''
                }`}
                style={{ 
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-base)'
                }}
                aria-current={currentType === mealType.id ? 'page' : undefined}
              >
                {mealType.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { cuisine } = await params;
  const { type } = await searchParams;
  
  // Get category data
  const categoryData = content.categories[cuisine];
  
  if (!categoryData) {
    notFound();
  }
  
  // Get featured recipe
  const featuredRecipe = content.recipes.find(recipe => recipe.id === categoryData.featuredRecipe);
  
  if (!featuredRecipe) {
    notFound();
  }
  
  // Get explore section recipes
  const exploreRecipes = content.recipes.filter(recipe => 
    categoryData.exploreSection.recipes.includes(recipe.id)
  );
  
  // Filter recipes by meal type if specified
  const filteredRecipes = type 
    ? exploreRecipes.filter(recipe => recipe.mealType === type)
    : exploreRecipes;
  
  // Create breadcrumbs
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: categoryData.name, isCurrentPage: true }
  ];
  
  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      {/* Main Content */}
      <div className="w-full">
        {/* Page Container */}
        <div className="w-full max-w-[1024px] mx-auto" style={{ paddingLeft: 'var(--spacing-md)', paddingRight: 'var(--spacing-md)', paddingTop: 'var(--spacing-3xl)', paddingBottom: 'var(--spacing-3xl)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4xl)' }}>
          <div className="flex flex-col gap-12">
            
            {/* Breadcrumb Navigation */}
            <Breadcrumb items={breadcrumbItems} showHomeIcon={false} />
            
            {/* Page Title Container */}
            <div className="flex flex-col gap-8 items-center w-full">
              {/* Page Title */}
              <h1 
                className="text-center text-[var(--color-text-heading)] w-full"
                style={{ 
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-5xl)',
                  lineHeight: 'var(--line-height-tight)'
                }}
              >
                {categoryData.name}
              </h1>
              
              {/* Category Navigation */}
              <CategoryNavigation 
                title={categoryData.navigation.title}
                mealTypes={categoryData.navigation.mealTypes}
                currentType={type}
              />
            </div>
            
            {/* Featured Recipe Section */}
            <section aria-labelledby="featured-recipe-heading">
              <h2 id="featured-recipe-heading" className="sr-only">
                Featured Recipe
              </h2>
              <FeaturedRecipe recipe={featuredRecipe} />
            </section>
            
            {/* Explore Section */}
            <section aria-labelledby="explore-heading">
              <div className="flex flex-col gap-6 w-full">
                <h2 
                  id="explore-heading"
                  className="text-left text-[var(--color-text-heading)] w-full"
                  style={{ 
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'var(--font-size-4xl)',
                    lineHeight: 'var(--line-height-tight)'
                  }}
                >
                  {categoryData.exploreSection.title}
                </h2>
                
                {/* Recipe Grid */}
                <Suspense fallback={<div>Loading recipes...</div>}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {filteredRecipes.map((recipe) => (
                      <div 
                        key={recipe.id}
                        className="bg-[var(--color-card-background)] rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden hover:shadow-lg transition-shadow duration-200"
                      >
                        <RecipeCard recipe={recipe} />
                      </div>
                    ))}
                  </div>
                </Suspense>
                
                {filteredRecipes.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-[var(--color-text-body)] text-lg">
                      No recipes found for {type ? `${type} in ` : ''}{categoryData.name.toLowerCase()} cuisine.
                    </p>
                    {type && (
                      <Button asChild className="mt-4">
                        <Link href={`/category/${cuisine}`}>
                          View All {categoryData.name} Recipes
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // Generate static params for existing categories
  return Object.keys(content.categories).map((cuisine) => ({
    cuisine,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { cuisine } = await params;
  const categoryData = content.categories[cuisine];
  
  if (!categoryData) {
    return {
      title: 'Category Not Found',
    };
  }
  
  return {
    title: `${categoryData.name} Recipes | ${content.ui.navigation.brand}`,
    description: categoryData.description,
  };
} 
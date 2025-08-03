'use client';

import { useRouter } from 'next/navigation';
import UserRecipeCard from '@/components/UserRecipeCard';
import CreateRecipeCard from '@/components/CreateRecipeCard';
import Heading from '@/components/ui/heading';
import Text from '@/components/ui/text';

interface UserRecipe {
  id: string;
  title: string;
  description: string;
  image: string;
  editAriaLabel: string;
}

interface CreateRecipePageContent {
  title: string;
  description: string;
  createCard: {
    title: string;
    ariaLabel: string;
  };
  userRecipes: UserRecipe[];
}

interface CreateRecipePageClientProps {
  pageContent: CreateRecipePageContent;
}

export default function CreateRecipePageClient({ pageContent }: CreateRecipePageClientProps) {
  const router = useRouter();

  const handleEditRecipe = (recipeId: string) => {
    // TODO: Navigate to edit recipe page
    console.log('Edit recipe:', recipeId);
  };

  const handleCreateRecipe = () => {
    // Navigate to create new recipe form
    router.push('/create-recipe/new');
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <div className="max-w-[1024px] mx-auto px-4 py-12">
        {/* Page title and description */}
        <div className="flex flex-col gap-4 mb-12">
          <Heading as="h1" size="5xl" font="heading" className="text-[var(--color-text-heading)] w-full">
            {pageContent.title}
          </Heading>
          <Text 
            size="lg"
            color="body"
            className="w-full"
          >
            {pageContent.description}
          </Text>
        </div>

        {/* Recipe cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* User recipes */}
          {pageContent.userRecipes.map((recipe) => (
            <div key={recipe.id} className="flex justify-center">
              <UserRecipeCard 
                recipe={recipe} 
                onEdit={handleEditRecipe}
              />
            </div>
          ))}

          {/* Create recipe card */}
          <div className="flex justify-center">
            <CreateRecipeCard
              title={pageContent.createCard.title}
              ariaLabel={pageContent.createCard.ariaLabel}
              onClick={handleCreateRecipe}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
import { Metadata } from 'next';
import CreateRecipePageClient from '@/components/CreateRecipePageClient';
import content from '@/data/content.json';

export const metadata: Metadata = {
  title: 'Your Recipes - Cooking',
  description: 'Create and manage your own recipes. Upload ingredients, directions, and images.',
};

export default function CreateRecipePage() {
  const pageContent = content.account.createRecipePage;

  return <CreateRecipePageClient pageContent={pageContent} />;
}
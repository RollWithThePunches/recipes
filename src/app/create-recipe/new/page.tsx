import { Metadata } from 'next';
import CreateRecipeForm from '@/components/CreateRecipeForm';
import content from '@/data/content.json';

export const metadata: Metadata = {
  title: 'Create a Recipe - Cooking',
  description: 'Create your own recipe by entering ingredients, directions, and uploading images.',
};

export default function CreateRecipeFormPage() {
  const formContent = content.createRecipeForm;

  return <CreateRecipeForm formContent={formContent} />;
}
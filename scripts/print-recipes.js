const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function printRecipes() {
  try {
    const recipes = await prisma.recipe.findMany();
    if (recipes.length === 0) {
      console.log('No recipes found in the database.');
      return;
    }
    for (const recipe of recipes) {
      console.log('---');
      console.log('Slug:', recipe.slug);
      console.log('Title:', recipe.title);
      console.log('Ingredients:', recipe.ingredients);
      console.log('Steps:', recipe.steps);
    }
  } catch (error) {
    console.error('Error printing recipes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

printRecipes(); 
#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function populateRecipes() {
  try {
    console.log('🚀 Starting recipe population...\n');

    // Read the recipes JSON file
    const recipesPath = path.join(process.cwd(), 'src', 'data', 'recipes.json');
    const recipesData = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

    console.log(`📖 Found ${recipesData.length} recipes to import\n`);

    // Clear existing recipes (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing recipes...');
    await prisma.recipe.deleteMany({});
    console.log('✅ Existing recipes cleared\n');

    // Import each recipe
    for (const recipe of recipesData) {
      console.log(`📝 Importing: ${recipe.title}`);
      
      await prisma.recipe.create({
        data: {
          slug: recipe.id,
          title: recipe.title,
          description: recipe.description,
          image: recipe.image,
          cuisine: recipe.cuisine,
          mealType: recipe.mealType,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          dietary: recipe.dietary,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
        },
      });
      
      console.log(`✅ Imported: ${recipe.title}`);
    }

    console.log(`\n🎉 Successfully imported ${recipesData.length} recipes!`);
    
    // Verify the import
    const count = await prisma.recipe.count();
    console.log(`📊 Total recipes in database: ${count}`);

  } catch (error) {
    console.error('❌ Error populating recipes:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the population script
populateRecipes()
  .then(() => {
    console.log('\n✅ Recipe population completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Recipe population failed:', error);
    process.exit(1);
  }); 
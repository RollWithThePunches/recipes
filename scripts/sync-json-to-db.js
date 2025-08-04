#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Use local schema
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
});

// Read JSON files
const recipesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/recipes.json'), 'utf8'));
const contentData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/content.json'), 'utf8'));

async function syncJsonToDatabase() {
  try {
    console.log('🔄 Syncing JSON files to database...\n');
    
    let updatedCount = 0;
    let createdCount = 0;
    
    // Update recipes from recipes.json
    for (const recipe of recipesData) {
      console.log(`📝 Processing recipe: ${recipe.title}`);
      
      const result = await prisma.recipe.upsert({
        where: { slug: recipe.id },
        update: {
          title: recipe.title,
          description: recipe.description,
          image: recipe.image,
          cuisine: recipe.cuisine,
          mealType: recipe.mealType,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          dietary: JSON.stringify(recipe.dietary || []),
          ingredients: JSON.stringify(recipe.ingredients || []),
          steps: JSON.stringify(recipe.steps || [])
        },
        create: {
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
          dietary: JSON.stringify(recipe.dietary || []),
          ingredients: JSON.stringify(recipe.ingredients || []),
          steps: JSON.stringify(recipe.steps || [])
        }
      });
      
      // Check if it was created or updated
      const existing = await prisma.recipe.findUnique({
        where: { slug: recipe.id }
      });
      
      if (existing) {
        updatedCount++;
      } else {
        createdCount++;
      }
    }
    
    console.log('\n✅ Database synced successfully!');
    console.log(`📊 Updated: ${updatedCount} recipes`);
    console.log(`📊 Created: ${createdCount} recipes`);
    console.log(`📊 Total processed: ${recipesData.length} recipes`);
    
    // Note about content.json
    console.log('\n📝 Note: content.json changes are used for UI text and don\'t need database syncing.');
    console.log('   They are loaded directly by the application.');
    
  } catch (error) {
    console.error('❌ Error syncing to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncJsonToDatabase();

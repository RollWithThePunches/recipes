#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');

// Local database (SQLite)
const localPrisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
});

// Heroku database (PostgreSQL)
const herokuPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function syncToHeroku() {
  try {
    console.log('🔄 Syncing local data to Heroku database...\n');

    // Check if we have the Heroku DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL environment variable not found!');
      console.log('💡 Make sure you have access to the Heroku database URL');
      process.exit(1);
    }

    // Get all recipes from local database
    console.log('📥 Fetching recipes from local database...');
    const localRecipes = await localPrisma.recipe.findMany();
    console.log(`✅ Found ${localRecipes.length} recipes locally\n`);

    // Get all users from local database
    console.log('👥 Fetching users from local database...');
    const localUsers = await localPrisma.user.findMany();
    console.log(`✅ Found ${localUsers.length} users locally\n`);

    // Sync recipes to Heroku
    console.log('📤 Syncing recipes to Heroku...');
    for (const recipe of localRecipes) {
      const existingRecipe = await herokuPrisma.recipe.findUnique({
        where: { slug: recipe.slug }
      });

      if (existingRecipe) {
        console.log(`⏭️  Recipe "${recipe.title}" already exists on Heroku, skipping...`);
      } else {
        // Convert SQLite data format to PostgreSQL format
        const herokuRecipe = {
          ...recipe,
          dietary: JSON.parse(recipe.dietary), // Convert string back to array
          ingredients: JSON.parse(recipe.ingredients), // Convert string back to JSON
          steps: JSON.parse(recipe.steps) // Convert string back to JSON
        };

        await herokuPrisma.recipe.create({
          data: herokuRecipe
        });
        console.log(`✅ Synced recipe: ${recipe.title}`);
      }
    }

    // Sync users to Heroku (skip if they already exist)
    console.log('\n👥 Syncing users to Heroku...');
    for (const user of localUsers) {
      const existingUser = await herokuPrisma.user.findUnique({
        where: { email: user.email }
      });

      if (existingUser) {
        console.log(`⏭️  User "${user.email}" already exists on Heroku, skipping...`);
      } else {
        await herokuPrisma.user.create({
          data: user
        });
        console.log(`✅ Synced user: ${user.email}`);
      }
    }

    console.log('\n🎉 Database sync completed successfully!');
    console.log(`📊 Recipes synced: ${localRecipes.length}`);
    console.log(`👥 Users synced: ${localUsers.length}`);

  } catch (error) {
    console.error('❌ Error syncing to Heroku:', error);
    throw error;
  } finally {
    await localPrisma.$disconnect();
    await herokuPrisma.$disconnect();
  }
}

syncToHeroku(); 
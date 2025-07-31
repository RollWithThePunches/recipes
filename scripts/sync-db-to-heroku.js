#!/usr/bin/env node

const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');

// Local database (SQLite)
const localPrisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
});

async function syncToHeroku() {
  try {
    console.log('🔄 Syncing local data to Heroku database...\n');

    // Get all recipes from local database
    console.log('📥 Fetching recipes from local database...');
    const localRecipes = await localPrisma.recipe.findMany();
    console.log(`✅ Found ${localRecipes.length} recipes locally\n`);

    // Get all users from local database
    console.log('👥 Fetching users from local database...');
    const localUsers = await localPrisma.user.findMany();
    console.log(`✅ Found ${localUsers.length} users locally\n`);

    // Sync recipes to Heroku using Heroku CLI
    console.log('📤 Syncing recipes to Heroku...');
    for (const recipe of localRecipes) {
      console.log(`  → Syncing: ${recipe.title}`);
      
      // Parse JSON fields for PostgreSQL
      const ingredients = typeof recipe.ingredients === 'string' ? recipe.ingredients : JSON.stringify(recipe.ingredients);
      const steps = typeof recipe.steps === 'string' ? recipe.steps : JSON.stringify(recipe.steps);
      const dietary = typeof recipe.dietary === 'string' ? `{${recipe.dietary}}` : `{${recipe.dietary.join(',')}}`;
      
      // Create SQL command to upsert recipe
      const sql = `
        INSERT INTO recipes (id, slug, title, description, image, cuisine, "mealType", "prepTime", "cookTime", servings, difficulty, dietary, ingredients, steps, "createdAt", "updatedAt")
        VALUES ('${recipe.id}', '${recipe.slug}', '${recipe.title.replace(/'/g, "''")}', '${recipe.description.replace(/'/g, "''")}', '${recipe.image}', '${recipe.cuisine}', '${recipe.mealType}', ${recipe.prepTime}, ${recipe.cookTime}, ${recipe.servings}, '${recipe.difficulty}', '${dietary}', '${ingredients.replace(/'/g, "''")}', '${steps.replace(/'/g, "''")}', '${recipe.createdAt.toISOString()}', '${recipe.updatedAt.toISOString()}')
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          image = EXCLUDED.image,
          cuisine = EXCLUDED.cuisine,
          "mealType" = EXCLUDED."mealType",
          "prepTime" = EXCLUDED."prepTime",
          "cookTime" = EXCLUDED."cookTime",
          servings = EXCLUDED.servings,
          difficulty = EXCLUDED.difficulty,
          dietary = EXCLUDED.dietary,
          ingredients = EXCLUDED.ingredients,
          steps = EXCLUDED.steps,
          "updatedAt" = EXCLUDED."updatedAt";
      `;
      
      try {
        execSync(`heroku pg:psql --app cooking-recipes -c "${sql}"`, { stdio: 'pipe' });
      } catch (error) {
        console.log(`    ⚠️  Failed to sync ${recipe.title}: ${error.message}`);
      }
    }
    console.log(`✅ Synced ${localRecipes.length} recipes\n`);

    // Sync users to Heroku
    console.log('👥 Syncing users to Heroku...');
    for (const user of localUsers) {
      console.log(`  → Syncing: ${user.username}`);
      
      // Create SQL command to upsert user
      const sql = `
        INSERT INTO users (id, email, username, "firstName", "lastName", password, "createdAt", "updatedAt", avatar, bio, "isActive")
        VALUES ('${user.id}', '${user.email}', '${user.username}', '${user.firstName || ''}', '${user.lastName || ''}', '${user.password}', '${user.createdAt.toISOString()}', '${user.updatedAt.toISOString()}', ${user.avatar ? `'${user.avatar}'` : 'NULL'}, ${user.bio ? `'${user.bio.replace(/'/g, "''")}'` : 'NULL'}, ${user.isActive})
        ON CONFLICT (email) DO UPDATE SET
          username = EXCLUDED.username,
          "firstName" = EXCLUDED."firstName",
          "lastName" = EXCLUDED."lastName",
          "updatedAt" = EXCLUDED."updatedAt",
          avatar = EXCLUDED.avatar,
          bio = EXCLUDED.bio,
          "isActive" = EXCLUDED."isActive";
      `;
      
      try {
        execSync(`heroku pg:psql --app cooking-recipes -c "${sql}"`, { stdio: 'pipe' });
      } catch (error) {
        console.log(`    ⚠️  Failed to sync ${user.username}: ${error.message}`);
      }
    }
    console.log(`✅ Synced ${localUsers.length} users\n`);

    console.log('🎉 Database sync completed successfully!');
    console.log('📍 You can verify the data at: https://cooking-recipes-405057a9ee39.herokuapp.com/');

  } catch (error) {
    console.error('❌ Error syncing to Heroku:', error);
    process.exit(1);
  } finally {
    await localPrisma.$disconnect();
  }
}

syncToHeroku(); 
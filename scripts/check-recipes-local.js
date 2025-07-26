#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

// Use local schema
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
});

async function checkLocalRecipes() {
  try {
    console.log('🔍 Checking recipes in local database...\n');
    
    const recipes = await prisma.recipe.findMany({
      select: {
        slug: true,
        title: true,
        dietary: true
      }
    });
    
    if (recipes.length === 0) {
      console.log('❌ No recipes found in local database');
    } else {
      console.log(`✅ Found ${recipes.length} recipe(s) in local database:\n`);
      recipes.forEach((recipe, index) => {
        console.log(`--- Recipe ${index + 1} ---`);
        console.log(`Slug: ${recipe.slug}`);
        console.log(`Title: ${recipe.title}`);
        console.log(`Dietary: "${recipe.dietary}" (type: ${typeof recipe.dietary})`);
        
        // Try to parse as JSON
        try {
          const parsed = JSON.parse(recipe.dietary);
          console.log(`Parsed: ${JSON.stringify(parsed)} (type: ${typeof parsed})`);
        } catch (e) {
          console.log(`Parse error: ${e.message}`);
        }
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking local recipes:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkLocalRecipes(); 
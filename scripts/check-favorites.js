#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkFavorites() {
  try {
    console.log('🔍 Checking favorites in database...');
    
    const favorites = await prisma.favorite.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
    
    if (favorites.length === 0) {
      console.log('❌ No favorites found in database');
    } else {
      console.log(`✅ Found ${favorites.length} favorite(s) in database:`);
      favorites.forEach((favorite, index) => {
        console.log(`\n--- Favorite ${index + 1} ---`);
        console.log(`ID: ${favorite.id}`);
        console.log(`User: ${favorite.user.firstName} ${favorite.user.lastName} (${favorite.user.username})`);
        console.log(`Recipe ID: ${favorite.recipeId}`);
        console.log(`Recipe Title: ${favorite.recipeTitle}`);
        console.log(`Added: ${favorite.addedAt}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking favorites:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkFavorites(); 
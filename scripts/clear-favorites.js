#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearFavorites() {
  try {
    console.log('🗑️  Clearing all favorites from database...');
    
    const result = await prisma.favorite.deleteMany({});
    
    console.log(`✅ Cleared ${result.count} favorites from database`);
    
  } catch (error) {
    console.error('❌ Error clearing favorites:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
clearFavorites()
  .then(() => {
    console.log('\n✅ Favorites cleared successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed to clear favorites:', error);
    process.exit(1);
  }); 
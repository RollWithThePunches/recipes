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

async function updateRecipe() {
  try {
    console.log('🔄 Updating recipe in database...');
    
    const updatedRecipe = await prisma.recipe.update({
      where: { slug: 'barbacoa-tacos' },
      data: {
        title: 'Burritos', // Your updated title
        description: 'These barbacoa tacos are packed with smoky shredded beef that\'s perfectly tender. Spices like cumin complement the chiles, while oregano and bay leaves add an earthiness to this recipe.',
      }
    });
    
    console.log('✅ Recipe updated successfully!');
    console.log('📝 New title:', updatedRecipe.title);
    
  } catch (error) {
    console.error('❌ Error updating recipe:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateRecipe(); 
#!/usr/bin/env node

/**
 * Check Users Script
 * 
 * This script checks what users exist in the database and tests authentication
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('🔍 Checking users in database...');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true
      }
    });
    
    if (users.length === 0) {
      console.log('❌ No users found in database');
      console.log('💡 You may need to create a test user first');
    } else {
      console.log(`✅ Found ${users.length} user(s) in database:`);
      users.forEach((user, index) => {
        console.log(`\n--- User ${index + 1} ---`);
        console.log(`ID: ${user.id}`);
        console.log(`Email: ${user.email}`);
        console.log(`Username: ${user.username}`);
        console.log(`Name: ${user.firstName} ${user.lastName}`);
        console.log(`Active: ${user.isActive}`);
        console.log(`Created: ${user.createdAt}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers(); 
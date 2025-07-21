#!/usr/bin/env node

/**
 * Check Users Script
 * 
 * This script checks what users exist in the database and tests authentication
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking users in database...\n');

  try {
    // Check if we can connect to the database
    await prisma.$connect();
    console.log('✅ Database connection successful\n');

    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
        // Don't select password for security
      }
    });

    console.log(`📊 Found ${users.length} users in database:\n`);

    if (users.length === 0) {
      console.log('❌ No users found in database');
      console.log('💡 Create a user first by visiting: http://localhost:3000/create-account');
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Username: ${user.username}`);
        console.log(`   Active: ${user.isActive ? 'Yes' : 'No'}`);
        console.log(`   Created: ${user.createdAt.toLocaleDateString()}`);
        console.log('');
      });
    }

    // Test authentication if users exist
    if (users.length > 0) {
      console.log('🧪 Testing authentication...\n');
      
      // Get the first user with password for testing
      const testUser = await prisma.user.findFirst({
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
          isActive: true,
        }
      });

      if (testUser) {
        console.log(`Testing authentication for: ${testUser.username}`);
        
        // Test with correct username
        const authUser = await prisma.user.findFirst({
          where: {
            OR: [
              { username: testUser.username },
              { email: testUser.username }
            ],
            isActive: true
          }
        });

        if (authUser) {
          console.log('✅ User found in database');
          console.log('✅ User is active');
        } else {
          console.log('❌ User not found or inactive');
        }
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('DATABASE_URL')) {
      console.log('\n💡 Make sure your DATABASE_URL is set in .env.local');
    } else if (error.message.includes('connection')) {
      console.log('\n💡 Check your database connection');
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error); 
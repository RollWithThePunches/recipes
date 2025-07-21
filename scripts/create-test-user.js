#!/usr/bin/env node

/**
 * Create Test User Script
 * 
 * This script creates a test user for development purposes
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  const testUsers = [
    {
      email: 'john@example.com',
      username: 'john_doe',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123'
    },
    {
      email: 'jane@example.com',
      username: 'jane_smith',
      firstName: 'Jane',
      lastName: 'Smith',
      password: 'password123'
    }
  ];

  console.log('🔧 Creating test users...\n');

  try {
    await prisma.$connect();
    console.log('✅ Database connection successful\n');

    for (const userData of testUsers) {
      try {
        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: userData.email },
              { username: userData.username }
            ]
          }
        });

        if (existingUser) {
          console.log(`⚠️  User ${userData.username} already exists`);
          continue;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 12);

        // Create user
        const user = await prisma.user.create({
          data: {
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: hashedPassword,
          },
          select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          }
        });

        console.log(`✅ Created user: ${user.firstName} ${user.lastName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Username: ${user.username}`);
        console.log(`   Password: ${userData.password}`);
        console.log('');

      } catch (error) {
        console.error(`❌ Failed to create user ${userData.username}:`, error.message);
      }
    }

    console.log('🎉 Test user creation completed!');
    console.log('\n📋 You can now login with any of these accounts:');
    console.log('   - Username: john_doe, Password: password123');
    console.log('   - Username: jane_smith, Password: password123');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser().catch(console.error); 
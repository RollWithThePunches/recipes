#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function setupLocalDatabase() {
  try {
    console.log('🔧 Setting up local SQLite database for development...\n');

    // Check if .env.local exists, if not create it
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envLocalPath)) {
      console.log('📝 Creating .env.local file...');
      const envContent = `# Local Development Environment
NODE_ENV=development
DATABASE_URL="file:./prisma/dev.db"

# Staging credentials (for testing staging features)
STAGING_USERNAME=TorontoHermit
STAGING_PASSWORD=2hip2Bsquare
`;
      fs.writeFileSync(envLocalPath, envContent);
      console.log('✅ .env.local created\n');
    } else {
      console.log('✅ .env.local already exists\n');
    }

    // Generate Prisma client with local schema
    console.log('🔧 Generating Prisma client for local development...');
    execSync('npx prisma generate --schema=./prisma/schema.local.prisma', { stdio: 'inherit' });
    console.log('✅ Prisma client generated\n');

    // Push local schema to create database
    console.log('🗄️  Creating local SQLite database...');
    execSync('npx prisma db push --schema=./prisma/schema.local.prisma', { stdio: 'inherit' });
    console.log('✅ Local database created\n');

    // Seed the database
    console.log('🌱 Seeding local database...');
    execSync('node scripts/seed-recipes-local.js', { stdio: 'inherit' });
    console.log('✅ Database seeded\n');

    // Create test user
    console.log('👤 Creating test user...');
    execSync('node scripts/create-test-user-local.js', { stdio: 'inherit' });
    console.log('✅ Test user created\n');

    console.log('🎉 Local development environment is ready!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Visit: http://localhost:3000');
    console.log('3. Login with: testuser / password123');
    console.log('\n💡 To switch back to production database:');
    console.log('   - Use: npm run db:prod');
    console.log('   - Or: npm run db:local (for local development)');

  } catch (error) {
    console.error('❌ Error setting up local database:', error);
    process.exit(1);
  }
}

setupLocalDatabase(); 
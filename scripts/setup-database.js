#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up database for Recipe Browser App...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('Please create a .env.local file with your DATABASE_URL.');
  console.log('Example:');
  console.log('DATABASE_URL="postgresql://username:password@host:port/database"');
  console.log('');
  process.exit(1);
}

// Check if DATABASE_URL is set
const envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('DATABASE_URL=')) {
  console.log('❌ DATABASE_URL not found in .env.local!');
  console.log('Please add your DATABASE_URL to the .env.local file.');
  console.log('');
  process.exit(1);
}

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install prisma @prisma/client bcryptjs', { stdio: 'inherit' });
  execSync('npm install -D @types/bcryptjs', { stdio: 'inherit' });
  
  console.log('\n🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('\n🗄️  Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  console.log('\n✅ Database setup complete!');
  console.log('\nNext steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Test user registration: http://localhost:3000/create-account');
  console.log('3. Test user login: http://localhost:3000/login');
  console.log('\nUseful commands:');
  console.log('- npm run db:studio (open database GUI)');
  console.log('- npm run db:push (update database schema)');
  console.log('- npm run db:reset (reset database - ⚠️ deletes all data)');
  
} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.log('\nTroubleshooting:');
  console.log('1. Check your DATABASE_URL is correct');
  console.log('2. Ensure your database is accessible');
  console.log('3. Try running commands manually:');
  console.log('   npm install prisma @prisma/client bcryptjs');
  console.log('   npx prisma generate');
  console.log('   npx prisma db push');
  process.exit(1);
} 
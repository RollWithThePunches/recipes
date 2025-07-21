#!/usr/bin/env node

/**
 * Database and Application Setup Verification Script
 * 
 * This script verifies that:
 * 1. Environment variables are configured
 * 2. Database connection is working
 * 3. Prisma client is generated
 * 4. Database schema is up to date
 * 5. Sample data is available
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('🔍 Verifying Recipe Browser App Setup...\n');

  // Colors for output
  const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
  };

  function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  function logSuccess(message) {
    log(`✅ ${message}`, 'green');
  }

  function logError(message) {
    log(`❌ ${message}`, 'red');
  }

  function logWarning(message) {
    log(`⚠️  ${message}`, 'yellow');
  }

  function logInfo(message) {
    log(`ℹ️  ${message}`, 'blue');
  }

// Check 1: Environment Variables
logInfo('Checking environment variables...');
try {
  const dotenv = await import('dotenv');
  dotenv.config({ path: '.env.local' });
  
  if (!process.env.DATABASE_URL) {
    logError('DATABASE_URL not found in .env.local');
    process.exit(1);
  }
  
  logSuccess('Environment variables configured');
} catch {
  logError('Could not load .env.local file');
  process.exit(1);
}

  // Check 2: Prisma Client
  logInfo('Checking Prisma client...');
  try {
    const prismaClientPath = path.join(__dirname, '../node_modules/.prisma/client/index.js');
    if (!fs.existsSync(prismaClientPath)) {
      logWarning('Prisma client not found, generating...');
      execSync('npx prisma generate', { stdio: 'inherit' });
    }
    logSuccess('Prisma client ready');
  } catch {
    logError('Failed to generate Prisma client');
    process.exit(1);
  }

  // Check 3: Database Connection
  logInfo('Testing database connection...');
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    // Test connection
    await prisma.$connect();
    logSuccess('Database connection successful');
    
    // Check if tables exist
    const tableCount = await prisma.$queryRaw`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'recipes', 'favorites')
    `;
    
    if (tableCount[0].count === 3) {
      logSuccess('All database tables exist');
    } else {
      logWarning('Some database tables missing, run: npm run db:setup');
    }
    
    await prisma.$disconnect();
  } catch (error) {
    logError(`Database connection failed: ${error.message}`);
    logInfo('Make sure your DATABASE_URL is correct and database is accessible');
    process.exit(1);
  }

// Check 4: Sample Data
logInfo('Checking sample data...');
try {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  const recipeCount = await prisma.recipe.count();
  
  if (recipeCount > 0) {
    logSuccess(`${recipeCount} recipes found in database`);
  } else {
    logWarning('No recipes found, run: npm run db:populate-recipes');
  }
  
  await prisma.$disconnect();
} catch {
  logError('Failed to check sample data');
}

// Check 5: Build Status
logInfo('Checking build status...');
try {
  const nextBuildPath = path.join(__dirname, '../.next');
  if (fs.existsSync(nextBuildPath)) {
    logSuccess('Next.js build cache exists');
  } else {
    logInfo('No build cache found (this is normal for first run)');
  }
} catch {
  logWarning('Could not check build status');
}

// Check 6: Dependencies
logInfo('Checking dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['@prisma/client', 'prisma', 'next', 'react'];
  
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]);
  
  if (missingDeps.length === 0) {
    logSuccess('All required dependencies installed');
  } else {
    logError(`Missing dependencies: ${missingDeps.join(', ')}`);
    logInfo('Run: npm install');
  }
} catch {
  logError('Could not check dependencies');
}

console.log('\n' + '='.repeat(50));
log('🎉 Setup Verification Complete!', 'bold');

console.log('\n📋 Next Steps:');
logInfo('1. Start development server: npm run dev');
logInfo('2. Open database GUI: npm run db:studio');
logInfo('3. Run tests: npm test');

console.log('\n📚 Documentation:');
logInfo('- README.md - Complete project documentation');
logInfo('- DATABASE_SETUP.md - Database management guide');
logInfo('- COMMANDS.md - Quick commands reference');

console.log('\n🚨 If you see any warnings above, please address them before proceeding.');
}

// Run the verification
main().catch(console.error); 
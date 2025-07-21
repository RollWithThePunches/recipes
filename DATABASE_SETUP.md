# Database Setup and Management Guide

This guide covers everything you need to know about setting up, managing, and working with the database for the Recipe Browser App.

## 🗄️ Database Overview

The application uses **PostgreSQL** with **Prisma ORM** for database management. The database is hosted on **Heroku** in production and can be run locally for development.

### Database Models

#### User Model
```prisma
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  username  String     @unique
  firstName String
  lastName  String
  password  String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  avatar    String?
  bio       String?
  isActive  Boolean    @default(true)
  favorites Favorite[]

  @@map("users")
}
```

#### Recipe Model
```prisma
model Recipe {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String
  image       String
  cuisine     String
  mealType    String
  prepTime    Int
  cookTime    Int
  servings    Int
  difficulty  String
  dietary     String[]
  ingredients Json
  steps       Json
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("recipes")
}
```

#### Favorite Model
```prisma
model Favorite {
  id                String   @id @default(cuid())
  userId            String
  recipeId          String
  recipeTitle       String
  recipeDescription String
  recipeImage       String
  recipeCuisine     String?
  addedAt           DateTime @default(now())
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, recipeId])
  @@map("favorites")
}
```

## 🚀 Initial Setup

### 1. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database URL (replace with your actual database URL)
DATABASE_URL="postgresql://username:password@host:port/database"

# Environment
NODE_ENV=development
```

### 2. Database Setup Commands

```bash
# Install dependencies (if not already done)
npm install

# Set up database schema and generate Prisma client
npm run db:setup

# Populate database with sample recipes
npm run db:populate-recipes
```

### 3. Verify Setup

```bash
# Check database connection
npm run db:studio

# Run tests to verify everything works
npm test
```

## 📋 Database Commands Reference

### Core Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run db:setup` | Complete initial setup | First-time setup |
| `npm run db:push` | Push schema changes | After schema modifications |
| `npm run db:studio` | Open database GUI | View/edit data manually |
| `npm run db:reset` | Reset entire database | ⚠️ Development only |
| `npm run db:populate-recipes` | Import recipes from JSON | Add sample data |
| `npm run db:generate` | Generate Prisma client | After schema changes |

### Advanced Commands

```bash
# Generate Prisma client manually
npx prisma generate

# Push schema with force reset (⚠️ deletes all data)
npx prisma db push --force-reset

# Create a new migration
npx prisma migrate dev --name migration_name

# Deploy migrations to production
npx prisma migrate deploy

# Reset Prisma client cache
rm -rf node_modules/.prisma && npx prisma generate
```

## 🔄 Database Operations

### Adding New Recipes

#### Method 1: Via JSON File
1. Add recipes to `src/data/recipes.json`
2. Run population script:
   ```bash
   npm run db:populate-recipes
   ```

#### Method 2: Via Prisma Studio
1. Open database GUI:
   ```bash
   npm run db:studio
   ```
2. Navigate to Recipes table
3. Add new records manually

#### Method 3: Via API
Create a new API endpoint or use existing ones to add recipes programmatically.

### Recipe Data Structure

```json
{
  "id": "unique-slug",
  "title": "Recipe Title",
  "description": "Recipe description",
  "image": "/assets/image.jpg",
  "cuisine": "Mexican",
  "mealType": "dinner",
  "prepTime": 30,
  "cookTime": 60,
  "servings": 4,
  "difficulty": "medium",
  "dietary": ["vegetarian", "gluten-free"],
  "ingredients": [
    {
      "item": "ingredient name",
      "quantity": "2",
      "unit": "cups"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Step description"
    }
  ]
}
```

### Managing Users

Users are created through the registration API. To add a test user:

1. Use the registration form at `/create-account`
2. Or create directly via Prisma Studio
3. Or use the API endpoint: `POST /api/auth/register`

### Managing Favorites

Favorites are managed through the application interface or API:

- **Add favorite**: `POST /api/favorites`
- **Remove favorite**: `DELETE /api/favorites/[id]`
- **Get user favorites**: `GET /api/favorites?userId=[id]`

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Prisma Client Not Found
```bash
# Error: Prisma Client could not locate the Query Engine
npx prisma generate
rm -rf node_modules/.prisma
npm install
```

#### 2. Database Connection Issues
```bash
# Check if DATABASE_URL is correct
echo $DATABASE_URL

# Test connection
npx prisma db push

# Reset if needed
npm run db:reset
```

#### 3. Schema Sync Issues
```bash
# Force reset schema
npx prisma db push --force-reset

# Regenerate client
npx prisma generate

# Repopulate data
npm run db:populate-recipes
```

#### 4. Binary Target Issues (macOS)
If you see binary target errors, ensure your `prisma/schema.prisma` includes:

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "darwin", "darwin-arm64"]
}
```

### Database Reset Procedures

#### Complete Reset (Development Only)
```bash
# ⚠️ This will delete ALL data
npm run db:reset
npm run db:populate-recipes
```

#### Partial Reset
```bash
# Reset only recipes
npx prisma db push --force-reset
npm run db:populate-recipes

# Reset only users/favorites (keep recipes)
# Use Prisma Studio to delete specific tables
```

## 📊 Database Monitoring

### Using Prisma Studio

```bash
npm run db:studio
```

Prisma Studio provides:
- Visual database browser
- Data editing capabilities
- Query execution
- Schema visualization

### Database Queries

#### Check Recipe Count
```sql
SELECT COUNT(*) FROM recipes;
```

#### Check User Favorites
```sql
SELECT u.username, COUNT(f.id) as favorite_count
FROM users u
LEFT JOIN favorites f ON u.id = f.userId
GROUP BY u.id, u.username;
```

#### Search Recipes
```sql
SELECT * FROM recipes 
WHERE title ILIKE '%search_term%' 
   OR description ILIKE '%search_term%';
```

## 🚀 Production Deployment

### Heroku Setup

1. **Create Heroku App**:
   ```bash
   heroku create your-app-name
   ```

2. **Add PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set NODE_ENV=production
   ```

4. **Deploy and Setup Database**:
   ```bash
   git push heroku main
   heroku run npm run db:push
   heroku run npm run db:populate-recipes
   ```

### Database Backup

#### Backup
```bash
# Local backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Heroku backup
heroku pg:backups:capture
heroku pg:backups:download
```

#### Restore
```bash
# Local restore
psql $DATABASE_URL < backup.sql

# Heroku restore
heroku pg:backups:restore b001 DATABASE_URL
```

## 📈 Performance Optimization

### Indexing
Consider adding indexes for frequently queried fields:

```sql
-- Add indexes for better performance
CREATE INDEX idx_recipes_cuisine ON recipes(cuisine);
CREATE INDEX idx_recipes_meal_type ON recipes(meal_type);
CREATE INDEX idx_favorites_user_id ON favorites(userId);
```

### Query Optimization
- Use Prisma's `select` to limit returned fields
- Implement pagination for large datasets
- Use database indexes for search queries

## 🔒 Security Considerations

### Database Security
- Use environment variables for sensitive data
- Implement proper user authentication
- Use parameterized queries (Prisma handles this)
- Regular security updates

### Data Validation
- Validate all input data
- Use Prisma's built-in validation
- Implement proper error handling

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Heroku PostgreSQL](https://devcenter.heroku.com/categories/heroku-postgres)
- [Database Design Best Practices](https://www.postgresql.org/docs/current/ddl.html) 
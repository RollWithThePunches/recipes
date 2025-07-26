# Local Development Setup

This guide will help you set up a local development environment with a SQLite database for faster development and testing.

## 🚀 Quick Start

### 1. Set up Local Database
```bash
# Set up local SQLite database with sample data
npm run db:local
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Test the Application
- Visit: http://localhost:3000
- Login with: `testuser` / `password123`

## 📁 Database Management

### Local Development (SQLite)
- **Database**: `prisma/dev.db` (SQLite file)
- **Schema**: `prisma/schema.local.prisma`
- **Environment**: `.env.local`

### Production/Staging (PostgreSQL)
- **Database**: Heroku PostgreSQL
- **Schema**: `prisma/schema.prisma`
- **Environment**: Heroku environment variables

## 🔧 Available Scripts

### Database Setup
```bash
# Set up local development environment
npm run db:local

# Seed local database with recipes and users
npm run db:seed-local

# Sync local data to Heroku (when ready to deploy)
npm run db:sync-to-heroku
```

### Database Management
```bash
# Check users in database
npm run db:check-users

# Check favorites in database
npm run db:check-favorites

# Clear all favorites
npm run db:clear-favorites
```

### Deployment
```bash
# Deploy to Heroku staging
npm run deploy

# Deploy with confirmation message
npm run deploy:staging
```

## 🔄 Development Workflow

### 1. Local Development
```bash
# Make changes to code
# Test locally with SQLite database
npm run dev

# Test all functionality
# Fix any issues
```

### 2. When Feature is Complete
```bash
# Commit changes
git add .
git commit -m "Complete feature: [description]"

# Deploy only when ready
npm run deploy
```

### 3. Database Changes
If you need to update the database schema:
```bash
# Update schema files
# Test locally first
npm run db:local

# When ready, deploy schema changes
npm run deploy
```

## 🗄️ Database Differences

### Local (SQLite)
- **Ingredients**: Stored as JSON string
- **Steps**: Stored as JSON string
- **Dietary**: Stored as string
- **File**: `prisma/dev.db`

### Production (PostgreSQL)
- **Ingredients**: Stored as JSON
- **Steps**: Stored as JSON
- **Dietary**: Stored as string array
- **Host**: Heroku PostgreSQL

## 🔐 Environment Variables

### Local Development (.env.local)
```env
NODE_ENV=development
DATABASE_URL="file:./prisma/dev.db"
STAGING_USERNAME=TorontoHermit
STAGING_PASSWORD=2hip2Bsquare
```

### Production (Heroku)
- `DATABASE_URL`: Set by Heroku
- `STAGING_USERNAME`: Set by Heroku
- `STAGING_PASSWORD`: Set by Heroku

## 🧪 Testing

### Test Users
- **Username**: `testuser`
- **Password**: `password123`
- **Email**: `test@example.com`

### Test Recipes
- Barbacoa Tacos (`barbacoa-tacos`)
- Char Burgers (`char-burgers`)
- Mexican Street Corn (`lime-corn`)
- Classic Margaritas (`margaritas`)

## 🚨 Important Notes

### 1. Never Deploy Local Database
- Local SQLite database is for development only
- Heroku uses its own PostgreSQL database
- Data is not automatically synced

### 2. Database Sync
- Use `npm run db:sync-to-heroku` to copy local data to Heroku
- Only sync when you want to update production data
- Be careful not to overwrite production data

### 3. Schema Changes
- Update both `schema.prisma` and `schema.local.prisma`
- Test schema changes locally first
- Deploy schema changes carefully

## 🆘 Troubleshooting

### Local Database Issues
```bash
# Reset local database
rm prisma/dev.db
npm run db:local
```

### Heroku Database Issues
```bash
# Check Heroku database status
heroku pg:info

# Reset Heroku database (⚠️ DESTRUCTIVE)
heroku pg:reset DATABASE_URL
```

### Connection Issues
```bash
# Check if local database exists
ls -la prisma/dev.db

# Regenerate Prisma client
npm run db:generate
```

## 📋 Deployment Checklist

Before deploying to Heroku:
- [ ] Feature works locally
- [ ] All tests pass
- [ ] No console errors
- [ ] Database schema is compatible
- [ ] Environment variables are set
- [ ] User has confirmed deployment

## 🎯 Best Practices

1. **Always test locally first**
2. **Use feature branches for development**
3. **Batch related changes together**
4. **Only deploy when feature is complete**
5. **Keep local and production schemas in sync**
6. **Backup important data before major changes**

---

**Happy coding! 🚀** 
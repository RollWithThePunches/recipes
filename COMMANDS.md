# Quick Commands Reference

This is a quick reference guide for all available commands in the Recipe Browser App.

## 🚀 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🗄️ Database Commands

| Command | Description |
|---------|-------------|
| `npm run db:setup` | Complete initial database setup |
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:reset` | Reset database (⚠️ deletes all data) |
| `npm run db:populate-recipes` | Import recipes from JSON to database |
| `npm run db:generate` | Generate Prisma client |

## 🧪 Testing Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:a11y` | Run accessibility tests |
| `npm run test:nvda` | Run NVDA-specific tests |

## 🎨 Figma Integration Commands

| Command | Description |
|---------|-------------|
| `npm run figma:sync` | Sync Figma design tokens |
| `npm run figma:tokens` | Generate CSS tokens from Figma |
| `npm run figma:assets` | Download assets from Figma |

## 🔧 Utility Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run postinstall` | Generate Prisma client after install |

## 📋 Common Workflows

### First-Time Setup
```bash
npm install
npm run db:setup
npm run db:populate-recipes
npm run dev
```

### After Schema Changes
```bash
npm run db:push
npm run db:generate
npm run build
```

### Reset Everything (Development)
```bash
npm run db:reset
npm run db:populate-recipes
npm run dev
```

### Production Deployment
```bash
npm run build
npm run start
```

### Database Troubleshooting
```bash
# If Prisma client issues
npm run db:generate
rm -rf node_modules/.prisma
npm install

# If database connection issues
npm run db:push

# If schema sync issues
npm run db:reset
npm run db:populate-recipes
```

## 🚨 Important Notes

- **Database Reset**: `npm run db:reset` will delete ALL data. Use only in development.
- **Environment**: Ensure `.env.local` is configured with `DATABASE_URL`
- **Prisma Studio**: Use `npm run db:studio` to view/edit database data visually
- **Build**: Always run `npm run build` after database schema changes

## 🔍 Debugging Commands

```bash
# Check database connection
npx prisma db push

# View database schema
npx prisma format

# Check Prisma client status
npx prisma generate --schema=./prisma/schema.prisma

# Reset Next.js cache
rm -rf .next
npm run build
```

## 📊 Monitoring Commands

```bash
# Open database GUI
npm run db:studio

# Check database size (PostgreSQL)
psql $DATABASE_URL -c "SELECT pg_size_pretty(pg_database_size(current_database()));"

# Check table row counts
psql $DATABASE_URL -c "SELECT 'recipes' as table_name, COUNT(*) as count FROM recipes UNION ALL SELECT 'users', COUNT(*) FROM users UNION ALL SELECT 'favorites', COUNT(*) FROM favorites;"
``` 
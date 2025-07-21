# Recipe Browser App

A modern recipe browsing application built with Next.js, featuring user authentication, recipe management, favorites, and search functionality.

## 🚀 Features

- **Recipe Browsing**: Browse recipes by cuisine and meal type
- **User Authentication**: Sign up, login, and account management
- **Favorites System**: Save and manage your favorite recipes
- **Search Functionality**: Search recipes by title, description, and cuisine
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, CSS Custom Properties
- **Database**: PostgreSQL (Heroku)
- **ORM**: Prisma
- **Authentication**: Custom auth system with bcrypt
- **Testing**: Jest, React Testing Library

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database (local or hosted)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd recipes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

### 4. Database Setup

```bash
# Set up the database schema and generate Prisma client
npm run db:setup

# Populate the database with sample recipes
npm run db:populate-recipes
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗄️ Database Management

### Database Schema

The application uses PostgreSQL with the following main models:

- **User**: User accounts and authentication
- **Recipe**: Recipe data with ingredients, steps, and metadata
- **Favorite**: User's favorite recipes

### Database Commands

| Command | Description |
|---------|-------------|
| `npm run db:setup` | Initial database setup (schema, client generation) |
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:reset` | Reset database (⚠️ deletes all data) |
| `npm run db:populate-recipes` | Import recipes from JSON to database |
| `npm run db:generate` | Generate Prisma client |

### Database Operations

#### Adding New Recipes

1. **Via JSON**: Add recipes to `src/data/recipes.json` and run:
   ```bash
   npm run db:populate-recipes
   ```

2. **Via Database**: Use Prisma Studio:
   ```bash
   npm run db:studio
   ```

#### Backup and Restore

```bash
# Backup database (requires pg_dump)
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run accessibility tests
npm run test:a11y

# Run NVDA-specific tests
npm run test:nvda
```

### Test Structure

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API endpoint and database operation tests
- **Accessibility Tests**: Screen reader and keyboard navigation tests

## 🎨 Development

### Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes
│   ├── account/        # User account pages
│   ├── category/       # Recipe category pages
│   ├── recipe/         # Recipe detail pages
│   └── ...
├── components/         # React components
│   ├── ui/            # Base UI components
│   └── patterns/      # Page pattern components
├── lib/               # Utility functions and services
├── types/             # TypeScript type definitions
└── data/              # Static data files
```

### Key Files

- `prisma/schema.prisma` - Database schema definition
- `src/lib/recipes.ts` - Recipe database operations
- `src/lib/favorites-db.ts` - Favorites database operations
- `src/lib/auth.ts` - Authentication utilities

### Adding New Features

1. **Database Changes**: Update `prisma/schema.prisma` and run `npm run db:push`
2. **API Routes**: Add new routes in `src/app/api/`
3. **Components**: Create reusable components in `src/components/`
4. **Types**: Define TypeScript types in `src/types/`

## 🚀 Deployment

### Heroku Deployment

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

4. **Deploy**:
   ```bash
   git push heroku main
   ```

5. **Run Database Migrations**:
   ```bash
   heroku run npm run db:push
   heroku run npm run db:populate-recipes
   ```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

## 🔧 Troubleshooting

### Common Issues

1. **Prisma Client Issues**:
   ```bash
   npx prisma generate
   rm -rf node_modules/.prisma
   npm install
   ```

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` in `.env.local`
   - Check database accessibility
   - Run `npm run db:push` to sync schema

3. **Build Errors**:
   ```bash
   rm -rf .next
   npm run build
   ```

### Database Reset

If you need to completely reset the database:

```bash
npm run db:reset
npm run db:populate-recipes
```

## 📚 API Documentation

### Recipe Endpoints

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/[slug]` - Get recipe by slug
- `GET /api/recipes/search?q=query` - Search recipes

### Favorites Endpoints

- `GET /api/favorites?userId=id` - Get user favorites
- `POST /api/favorites` - Add recipe to favorites
- `DELETE /api/favorites/[id]` - Remove recipe from favorites

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/reset-password` - Password reset

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section above
- Review the API documentation
- Open an issue on GitHub

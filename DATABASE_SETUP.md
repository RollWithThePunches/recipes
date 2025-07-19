# Database Setup Guide for Recipe Browser App

This guide will help you set up a PostgreSQL database with Heroku and configure user authentication for your recipe browser application.

## Prerequisites

- Node.js installed (version 18 or higher)
- Heroku CLI installed
- Git repository set up

## Step 1: Install Dependencies

First, install the required packages for database and authentication:

```bash
npm install prisma @prisma/client bcryptjs
npm install -D @types/bcryptjs
```

## Step 2: Set Up Heroku Postgres

### Option A: Using Heroku CLI

1. **Login to Heroku:**
   ```bash
   heroku login
   ```

2. **Create a new Heroku app (if you don't have one):**
   ```bash
   heroku create your-recipe-app-name
   ```

3. **Add PostgreSQL addon:**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Get your database URL:**
   ```bash
   heroku config:get DATABASE_URL
   ```

### Option B: Using Heroku Dashboard

1. Go to [Heroku Dashboard](https://dashboard.heroku.com/)
2. Create a new app or select an existing one
3. Go to the "Resources" tab
4. Click "Find more add-ons" and search for "Heroku Postgres"
5. Select "Heroku Postgres" and choose a plan (Mini is good for development)
6. Copy the DATABASE_URL from the config vars

## Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Optional: Add other environment variables
NODE_ENV=development
```

**Important:** Replace the DATABASE_URL with the actual URL from Heroku.

## Step 4: Initialize Prisma

1. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

2. **Run database migrations:**
   ```bash
   npx prisma db push
   ```

3. **Optional: Open Prisma Studio to view your database:**
   ```bash
   npx prisma studio
   ```

## Step 5: Test the Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test user registration:**
   - Go to `http://localhost:3000/create-account`
   - Fill out the form and submit
   - Check that the user is created in the database

3. **Test user login:**
   - Go to `http://localhost:3000/login`
   - Use the credentials from the registration
   - Verify that login works

## Step 6: Deploy to Heroku

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add database and authentication"
   ```

2. **Deploy to Heroku:**
   ```bash
   git push heroku main
   ```

3. **Run migrations on production:**
   ```bash
   heroku run npx prisma db push
   ```

## Database Schema

The application uses the following database schema:

### Users Table
- `id`: Unique identifier (CUID)
- `email`: User's email address (unique)
- `username`: User's username (unique)
- `firstName`: User's first name
- `lastName`: User's last name
- `password`: Hashed password
- `avatar`: Optional profile picture URL
- `bio`: Optional user bio
- `isActive`: Whether the account is active
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

## API Endpoints

### Authentication Endpoints

1. **POST /api/auth/register**
   - Creates a new user account
   - Body: `{ email, username, firstName, lastName, password, confirmPassword }`

2. **POST /api/auth/login**
   - Authenticates user login
   - Body: `{ username, password }`

3. **POST /api/auth/reset-password**
   - Resets user password
   - Body: `{ username, currentPassword, newPassword, confirmNewPassword }`

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with 12 salt rounds
- **Input Validation**: Comprehensive validation for all user inputs
- **Error Handling**: Proper error messages without exposing sensitive information
- **Unique Constraints**: Email and username must be unique
- **Account Status**: Users can be deactivated if needed

## Troubleshooting

### Common Issues

1. **"Cannot find module '@prisma/client'"**
   - Run `npx prisma generate` to generate the client

2. **"Database connection failed"**
   - Check your DATABASE_URL in `.env.local`
   - Ensure the database is accessible

3. **"Migration failed"**
   - Run `npx prisma db push --force-reset` to reset the database (⚠️ This will delete all data)

4. **"User already exists"**
   - The email or username is already taken
   - Use a different email or username

### Development Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Reset database (⚠️ Deletes all data)
npx prisma db push --force-reset
```

## Next Steps

After setting up the database, you can:

1. **Add session management** using NextAuth.js or a similar library
2. **Implement user profiles** with additional fields
3. **Add recipe favorites** functionality
4. **Create user-generated content** features
5. **Add email verification** for new accounts

## Support

If you encounter any issues:

1. Check the Prisma documentation: https://www.prisma.io/docs
2. Check the Heroku Postgres documentation: https://devcenter.heroku.com/categories/heroku-postgres
3. Review the error logs in your terminal or Heroku dashboard 
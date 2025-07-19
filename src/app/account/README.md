# Account Page

## Overview
The Account page is a comprehensive user dashboard that provides access to account management features, favorite recipes, and user-specific content.

## Features

### 1. Side Navigation
- **Account information**: User profile and account details
- **Your recipes**: User-created recipes
- **Favorites**: User's favorite recipes
- **Security and privacy**: Account security settings
- **Help and support**: Support resources

### 2. Welcome Section
- Personalized welcome message with user's name
- Quick action buttons for common tasks

### 3. Most Used Section
- Quick access buttons for frequently used features:
  - Account information
  - Change login
  - Security settings

### 4. Your Favorites Section
- Displays user's favorite recipes in card format
- "View all" link to see complete favorites list
- Recipe cards with images and titles

### 5. Your Recipes Section
- "Create a recipe" card with plus icon
- Placeholder for user-created recipes

## Technical Implementation

### Components Used
- **Shadcn UI Components**: Button, Card, CardContent
- **Lucide React Icons**: Plus, User, Heart, BookOpen, Shield, HelpCircle
- **Design Tokens**: All styling uses CSS custom properties from `tokens.css`

### Accessibility Features
- Proper heading hierarchy (h1, h2, h3)
- ARIA labels for navigation sections
- Focus management with design token colors
- Keyboard navigation support
- Screen reader compatible structure

### Responsive Design
- Mobile-first approach
- Flexible layout that adapts to different screen sizes
- Proper spacing using design tokens

### Content Management
- Dynamic content loaded from `content.json`
- TypeScript interfaces for type safety
- Structured data for favorites, quick actions, and navigation

## File Structure
```
src/app/account/
├── page.tsx          # Main account page component
├── page.test.tsx     # Unit tests
└── README.md         # This documentation
```

## Integration
- Connected to login flow (redirects to `/account` after successful login)
- Uses existing Header and Footer components
- Follows project's design system and accessibility guidelines

## Future Enhancements
- User authentication state management
- Real-time data updates
- Recipe creation functionality
- Account settings forms
- Profile image upload
- Recipe sharing features 
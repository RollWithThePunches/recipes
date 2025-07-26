#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

// Use local schema
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
});

const recipes = [
  {
    slug: "barbacoa-tacos",
    title: "Barbacoa Tacos",
    description: "These barbacoa tacos are packed with smoky shredded beef that's perfectly tender.",
    image: "/assets/fh-tacos-3784500610.jpg",
    cuisine: "Mexican",
    mealType: "dinner",
    prepTime: 30,
    cookTime: 180,
    servings: 6,
    difficulty: "Medium",
    dietary: JSON.stringify(["Gluten-Free"]),
    ingredients: JSON.stringify([
      { item: 'beef chuck roast', unit: 'lbs', quantity: '3' },
      { item: 'chipotle chiles in adobo', unit: 'chiles', quantity: '3' },
      { item: 'white onion', unit: 'large', quantity: '1' },
      { item: 'garlic cloves', unit: 'cloves', quantity: '4' },
      { item: 'ground cumin', unit: 'tsp', quantity: '2' },
      { item: 'dried oregano', unit: 'tsp', quantity: '1' },
      { item: 'bay leaves', unit: 'leaves', quantity: '2' },
      { item: 'beef broth', unit: 'cup', quantity: '1' },
      { item: 'lime juice', unit: 'tbsp', quantity: '2' },
      { item: 'corn tortillas', unit: 'tortillas', quantity: '12' },
      { item: 'white onion, diced', unit: 'cup', quantity: '1/2' },
      { item: 'fresh cilantro', unit: 'cup', quantity: '1/4' }
    ]),
    steps: JSON.stringify([
      {
        stepNumber: 1,
        instruction: 'Season the beef chuck roast with salt and pepper. Heat a large Dutch oven over medium-high heat and sear the roast on all sides until browned, about 8 minutes total.'
      },
      {
        stepNumber: 2,
        instruction: 'Add the chipotle chiles, onion, garlic, cumin, oregano, bay leaves, and beef broth to the pot. Bring to a simmer.'
      },
      {
        stepNumber: 3,
        instruction: 'Cover and transfer to a 325°F oven. Cook for 3 hours or until the meat shreds easily with a fork.'
      },
      {
        stepNumber: 4,
        instruction: 'Remove the meat from the pot and shred using two forks. Strain the cooking liquid and return 1/2 cup to the shredded meat along with lime juice.'
      },
      {
        stepNumber: 5,
        instruction: 'Warm the tortillas and serve the barbacoa with diced onion, cilantro, and additional lime wedges.'
      }
    ])
  },
  {
    slug: "char-burgers",
    title: "Char Burgers",
    description: "These feature a seared exterior with grill marks and smoky flavor.",
    image: "/assets/burgers.jpg",
    cuisine: "American",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    dietary: JSON.stringify([]),
    ingredients: JSON.stringify([
      { item: 'ground beef (80/20)', unit: 'lbs', quantity: '1.5' },
      { item: 'salt', unit: 'tsp', quantity: '1' },
      { item: 'black pepper', unit: 'tsp', quantity: '1/2' },
      { item: 'hamburger buns', unit: 'buns', quantity: '4' },
      { item: 'cheese slices', unit: 'slices', quantity: '4' }
    ]),
    steps: JSON.stringify([
      {
        stepNumber: 1,
        instruction: 'Preheat grill to medium-high heat. Form ground beef into 4 patties, season with salt and pepper.'
      },
      {
        stepNumber: 2,
        instruction: 'Grill patties for 4-5 minutes per side for medium doneness, creating nice grill marks.'
      },
      {
        stepNumber: 3,
        instruction: 'Add cheese in the last minute of cooking. Toast buns on the grill briefly.'
      },
      {
        stepNumber: 4,
        instruction: 'Serve immediately on toasted buns with your favorite toppings.'
      }
    ])
  },
  {
    slug: "lime-corn",
    title: "Mexican Street Corn (Elote)",
    description: "Grill until charred, then brush with lime juice and sprinkle with chili powder.",
    image: "/assets/corn.jpg",
    cuisine: "Mexican",
    mealType: "side",
    prepTime: 10,
    cookTime: 12,
    servings: 4,
    difficulty: "Easy",
    dietary: JSON.stringify(["Vegetarian"]),
    ingredients: JSON.stringify([
      { item: 'corn on the cob', unit: 'ears', quantity: '4' },
      { item: 'mayonnaise', unit: 'cup', quantity: '1/4' },
      { item: 'lime juice', unit: 'tbsp', quantity: '2' },
      { item: 'chili powder', unit: 'tsp', quantity: '1' },
      { item: 'cotija cheese', unit: 'cup', quantity: '1/4' }
    ]),
    steps: JSON.stringify([
      {
        stepNumber: 1,
        instruction: 'Preheat grill to medium-high heat. Husk the corn and remove silk.'
      },
      {
        stepNumber: 2,
        instruction: 'Grill corn, turning occasionally, until charred all over, about 10-12 minutes.'
      },
      {
        stepNumber: 3,
        instruction: 'Brush grilled corn with mayonnaise, then sprinkle with lime juice, chili powder, and cotija cheese.'
      },
      {
        stepNumber: 4,
        instruction: 'Serve immediately with lime wedges.'
      }
    ])
  },
  {
    slug: "margaritas",
    title: "Classic Margaritas",
    description: "Fresh lime juice, tequila, and triple sec blended with ice creates the perfect margarita.",
    image: "/assets/mixed-drinks.jpg",
    cuisine: "Mexican",
    mealType: "drink",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    dietary: JSON.stringify(["Vegan"]),
    ingredients: JSON.stringify([
      { item: 'silver tequila', unit: 'oz', quantity: '4' },
      { item: 'fresh lime juice', unit: 'oz', quantity: '2' },
      { item: 'triple sec', unit: 'oz', quantity: '1' },
      { item: 'agave syrup', unit: 'tsp', quantity: '1' },
      { item: 'coarse salt', unit: '', quantity: 'for rimming' },
      { item: 'ice', unit: 'cup', quantity: '1' }
    ]),
    steps: JSON.stringify([
      {
        stepNumber: 1,
        instruction: 'Rim glasses with lime juice and coarse salt. Fill with ice.'
      },
      {
        stepNumber: 2,
        instruction: 'In a cocktail shaker, combine tequila, lime juice, triple sec, and agave syrup with ice.'
      },
      {
        stepNumber: 3,
        instruction: 'Shake vigorously for 15 seconds until well chilled.'
      },
      {
        stepNumber: 4,
        instruction: 'Strain into prepared glasses and garnish with lime wheels.'
      }
    ])
  }
];

async function seedLocalRecipes() {
  try {
    console.log('🌱 Seeding local database with recipes...\n');

    for (const recipe of recipes) {
      const existingRecipe = await prisma.recipe.findUnique({
        where: { slug: recipe.slug }
      });

      if (existingRecipe) {
        console.log(`⏭️  Recipe "${recipe.title}" already exists, skipping...`);
      } else {
        await prisma.recipe.create({
          data: recipe
        });
        console.log(`✅ Added recipe: ${recipe.title}`);
      }
    }

    console.log('\n🎉 Local database seeding completed!');
    console.log(`📊 Total recipes in database: ${await prisma.recipe.count()}`);

  } catch (error) {
    console.error('❌ Error seeding recipes:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedLocalRecipes(); 
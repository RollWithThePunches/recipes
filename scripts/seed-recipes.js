const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleRecipes = [
  {
    slug: 'barbacoa-tacos',
    title: 'Barbacoa Tacos',
    description: "These barbacoa tacos are packed with smoky shredded beef that's perfectly tender. Spices like cumin complement the chiles, while oregano and bay leaves add an earthiness to this recipe.",
    image: '/assets/fh-tacos-3784500610.jpg',
    cuisine: 'Mexican',
    mealType: 'main-dish',
    prepTime: 30,
    cookTime: 240,
    servings: 6,
    difficulty: 'Medium',
    dietary: ['gluten-free'],
    ingredients: [
      { name: 'Beef chuck roast', amount: '3 lbs', unit: 'pounds' },
      { name: 'Corn tortillas', amount: '12', unit: 'pieces' },
      { name: 'Onion', amount: '1', unit: 'large' },
      { name: 'Cilantro', amount: '1/2 cup', unit: 'chopped' },
      { name: 'Lime', amount: '2', unit: 'pieces' },
      { name: 'Chipotle peppers', amount: '2', unit: 'pieces' },
      { name: 'Garlic', amount: '4', unit: 'cloves' },
      { name: 'Cumin', amount: '1 tbsp', unit: 'tablespoon' },
      { name: 'Oregano', amount: '1 tbsp', unit: 'tablespoon' },
      { name: 'Bay leaves', amount: '2', unit: 'pieces' }
    ],
    steps: [
      'Season the beef with salt and pepper',
      'Sear the beef on all sides in a large pot',
      'Add onions, garlic, chipotle peppers, and spices',
      'Cover with water and bring to a boil',
      'Reduce heat and simmer for 4 hours until tender',
      'Shred the beef and serve on warm tortillas',
      'Top with cilantro, onion, and lime juice'
    ]
  },
  {
    slug: 'char-burgers',
    title: 'Char Burgers',
    description: 'These feature a seared exterior with grill marks and smoky flavor',
    image: '/assets/burgers.jpg',
    cuisine: 'American',
    mealType: 'main-dish',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    dietary: [],
    ingredients: [
      { name: 'Ground beef', amount: '1 lb', unit: 'pound' },
      { name: 'Hamburger buns', amount: '4', unit: 'pieces' },
      { name: 'Cheese slices', amount: '4', unit: 'pieces' },
      { name: 'Lettuce', amount: '4', unit: 'leaves' },
      { name: 'Tomato', amount: '1', unit: 'large' },
      { name: 'Onion', amount: '1/2', unit: 'medium' },
      { name: 'Salt', amount: '1 tsp', unit: 'teaspoon' },
      { name: 'Black pepper', amount: '1/2 tsp', unit: 'teaspoon' },
      { name: 'Worcestershire sauce', amount: '1 tbsp', unit: 'tablespoon' }
    ],
    steps: [
      'Mix ground beef with salt, pepper, and Worcestershire sauce',
      'Form into 4 equal patties',
      'Preheat grill to high heat',
      'Grill patties for 4-5 minutes per side',
      'Add cheese during the last minute of cooking',
      'Toast the buns on the grill',
      'Assemble burgers with lettuce, tomato, and onion'
    ]
  },
  {
    slug: 'lime-corn',
    title: 'Lime Corn',
    description: 'Grill until charred, then brush with lime juice and sprinkle with chili powder',
    image: '/assets/corn.jpg',
    cuisine: 'Mexican',
    mealType: 'sides',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    dietary: ['vegan', 'gluten-free'],
    ingredients: [
      { name: 'Corn on the cob', amount: '4', unit: 'ears' },
      { name: 'Lime', amount: '2', unit: 'pieces' },
      { name: 'Chili powder', amount: '1 tbsp', unit: 'tablespoon' },
      { name: 'Salt', amount: '1 tsp', unit: 'teaspoon' },
      { name: 'Butter', amount: '2 tbsp', unit: 'tablespoons' },
      { name: 'Cilantro', amount: '1/4 cup', unit: 'chopped' }
    ],
    steps: [
      'Preheat grill to medium-high heat',
      'Remove husks and silk from corn',
      'Brush corn with melted butter',
      'Grill corn for 15-20 minutes, turning occasionally',
      'Remove from grill and brush with lime juice',
      'Sprinkle with chili powder, salt, and cilantro',
      'Serve immediately while hot'
    ]
  },
  {
    slug: 'margaritas',
    title: 'Margaritas, anyone?',
    description: 'Fresh lime juice, tequila, and triple sec blended with ice creates the perfect margarita',
    image: '/assets/mixed-drinks.jpg',
    cuisine: 'Mexican',
    mealType: 'drinks',
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    dietary: ['vegan', 'gluten-free'],
    ingredients: [
      { name: 'Tequila', amount: '3 oz', unit: 'ounces' },
      { name: 'Triple sec', amount: '2 oz', unit: 'ounces' },
      { name: 'Fresh lime juice', amount: '2 oz', unit: 'ounces' },
      { name: 'Ice', amount: '2 cups', unit: 'cups' },
      { name: 'Lime wedges', amount: '2', unit: 'pieces' },
      { name: 'Coarse salt', amount: '1 tbsp', unit: 'tablespoon' }
    ],
    steps: [
      'Rim glasses with lime and dip in coarse salt',
      'Fill blender with ice',
      'Add tequila, triple sec, and lime juice',
      'Blend until smooth and slushy',
      'Pour into prepared glasses',
      'Garnish with lime wedges',
      'Serve immediately'
    ]
  },
  {
    slug: 'shake-mixin',
    title: 'Shake mixin\'',
    description: 'Blend ice cream, milk, and flavorings until smooth for creamy milkshakes',
    image: '/assets/sunday.jpg',
    cuisine: 'American',
    mealType: 'desserts',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    dietary: ['vegetarian'],
    ingredients: [
      { name: 'Vanilla ice cream', amount: '2 cups', unit: 'cups' },
      { name: 'Milk', amount: '1/2 cup', unit: 'cup' },
      { name: 'Chocolate syrup', amount: '2 tbsp', unit: 'tablespoons' },
      { name: 'Whipped cream', amount: '1/4 cup', unit: 'cup' },
      { name: 'Cherry', amount: '2', unit: 'pieces' },
      { name: 'Sprinkles', amount: '1 tbsp', unit: 'tablespoon' }
    ],
    steps: [
      'Let ice cream soften for 5 minutes',
      'Add ice cream, milk, and chocolate syrup to blender',
      'Blend until smooth and creamy',
      'Pour into tall glasses',
      'Top with whipped cream',
      'Garnish with cherries and sprinkles',
      'Serve with straws'
    ]
  }
];

async function seedRecipes() {
  try {
    console.log('🌱 Seeding recipes...');
    
    for (const recipe of sampleRecipes) {
      const existingRecipe = await prisma.recipe.findUnique({
        where: { slug: recipe.slug }
      });
      
      if (existingRecipe) {
        console.log(`✅ Recipe "${recipe.title}" already exists, skipping...`);
        continue;
      }
      
      await prisma.recipe.create({
        data: recipe
      });
      
      console.log(`✅ Created recipe: ${recipe.title}`);
    }
    
    console.log('🎉 All recipes seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding recipes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRecipes(); 
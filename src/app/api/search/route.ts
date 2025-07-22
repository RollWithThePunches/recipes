import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim().toLowerCase();

    // For now, return mock data since the Recipe model might not be properly set up
    // TODO: Replace with actual database search once Recipe model is confirmed
    const mockResults = [
      {
        id: '1',
        slug: 'barbacoa-tacos',
        title: 'Barbacoa Tacos',
        description: 'Slow-cooked beef tacos with authentic Mexican flavors',
        image: '/assets/fh-tacos-3784500610.jpg',
        cuisine: 'Mexican',
        mealType: 'main-dish',
        prepTime: 30,
        cookTime: 240,
        servings: 6,
        difficulty: 'Medium',
        dietary: ['gluten-free'],
        type: 'recipe' as const,
      },
      {
        id: '2',
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
        type: 'recipe' as const,
      },
      {
        id: '3',
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
        type: 'recipe' as const,
      },
    ].filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.cuisine.toLowerCase().includes(searchTerm) ||
      recipe.mealType.toLowerCase().includes(searchTerm) ||
      recipe.dietary.some(diet => diet.toLowerCase().includes(searchTerm))
    );

    return NextResponse.json({ results: mockResults });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search recipes' },
      { status: 500 }
    );
  }
} 
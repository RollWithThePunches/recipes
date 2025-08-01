import { NextRequest, NextResponse } from 'next/server';
import { searchRecipes } from '@/lib/recipes';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    console.log('🔍 Search API called with query:', query);

    if (!query || query.trim().length === 0) {
      console.log('❌ Empty query, returning empty results');
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim();
    console.log('🔍 Searching for term:', searchTerm);

    // Use the searchRecipes function from lib/recipes.ts
    const recipes = await searchRecipes(searchTerm);
    console.log('🔍 Found recipes:', recipes.length);

    // Transform the results to include a type field
    const results = recipes.map(recipe => ({
      id: recipe.id,
      slug: recipe.slug,
      title: recipe.title,
      description: recipe.description,
      image: recipe.image,
      cuisine: recipe.cuisine,
      mealType: recipe.mealType,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      dietary: recipe.dietary,
      type: 'recipe' as const,
    }));

    console.log('🔍 Returning results:', results.length);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('❌ Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search recipes' },
      { status: 500 }
    );
  }
} 
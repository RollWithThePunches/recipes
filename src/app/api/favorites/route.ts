import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/favorites - Get user's favorites
export async function GET(request: NextRequest) {
  try {
    // Get user ID from query parameters (in a real app, this would come from session/auth)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user's favorites from database
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        addedAt: 'desc',
      },
    });

    return NextResponse.json(favorites, { status: 200 });

  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/favorites - Add a recipe to favorites
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, recipeId, recipeTitle, recipeDescription, recipeImage, recipeCuisine } = body;

    console.log('POST /api/favorites - Request body:', { userId, recipeId, recipeTitle, recipeDescription, recipeImage, recipeCuisine });

    // Validate required fields
    if (!userId || !recipeId || !recipeTitle || !recipeDescription || !recipeImage) {
      console.log('POST /api/favorites - Missing required fields:', { userId, recipeId, recipeTitle, recipeDescription, recipeImage });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.log('POST /api/favorites - User not found:', userId);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('POST /api/favorites - User found:', user.username);

    // Check if recipe is already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId: userId,
          recipeId: recipeId,
        },
      },
    });

    if (existingFavorite) {
      console.log('POST /api/favorites - Recipe already favorited:', { userId, recipeId });
      return NextResponse.json(
        { error: 'Recipe is already in favorites' },
        { status: 409 }
      );
    }

    // Add recipe to favorites
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        recipeId,
        recipeTitle,
        recipeDescription,
        recipeImage,
        recipeCuisine,
      },
    });

    console.log('POST /api/favorites - Favorite created successfully:', favorite.id);

    return NextResponse.json(favorite, { status: 201 });

  } catch (error) {
    console.error('POST /api/favorites - Error adding favorite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
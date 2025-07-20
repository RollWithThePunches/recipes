import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// DELETE /api/favorites/[id] - Remove a recipe from favorites
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if the favorite exists and belongs to the user
    const favorite = await prisma.favorite.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!favorite) {
      return NextResponse.json(
        { error: 'Favorite not found' },
        { status: 404 }
      );
    }

    // Delete the favorite
    await prisma.favorite.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: 'Favorite removed successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
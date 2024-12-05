import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { type NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    const shortUrl = await prisma.shortUrl.findUnique({
      where: { code },
    });

    if (!shortUrl) {
      return NextResponse.json(
        { error: 'URL not found' },
        { status: 404 }
      );
    }

    if (shortUrl.expiresAt && shortUrl.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'URL has expired' },
        { status: 410 }
      );
    }

    await prisma.shortUrl.update({
      where: { code },
      data: { clicks: { increment: 1 } },
    });

    return NextResponse.redirect(shortUrl.url);
  } catch (error) {
    console.error('Error retrieving URL:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

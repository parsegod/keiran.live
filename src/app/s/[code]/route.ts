import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { type NextRequest } from 'next/server';

async function updateAnalytics(shortUrlId: number, request: NextRequest) {
  const referrer = request.headers.get('referer') || 'direct';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const country = request.headers.get('x-vercel-ip-country') || 'unknown';

  await Promise.all([
    prisma.clickReferrer.upsert({
      where: {
        shortUrlId_referrer: { shortUrlId, referrer },
      },
      create: {
        shortUrlId,
        referrer,
        count: 1,
      },
      update: {
        count: { increment: 1 },
      },
    }),
    prisma.clickUserAgent.upsert({
      where: {
        shortUrlId_userAgent: { shortUrlId, userAgent },
      },
      create: {
        shortUrlId,
        userAgent,
        count: 1,
      },
      update: {
        count: { increment: 1 },
      },
    }),
    prisma.clickLocation.upsert({
      where: {
        shortUrlId_country: { shortUrlId, country },
      },
      create: {
        shortUrlId,
        country,
        count: 1,
      },
      update: {
        count: { increment: 1 },
      },
    }),
  ]);
}

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

    updateAnalytics(shortUrl.id, request).catch(console.error);

    return NextResponse.redirect(shortUrl.url);
  } catch (error) {
    console.error('Error retrieving URL:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

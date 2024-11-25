import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { type NextRequest } from 'next/server';

async function updateAnalytics(shortUrlId: number, request: NextRequest) {
  const referrer = request.headers.get('referer') || 'direct';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  // You could add a proper geo-location service here
  const country = request.headers.get('x-vercel-ip-country') || 'unknown';

  // Update analytics in parallel
  await Promise.all([
    // Update referrer
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
    // Update user agent
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
    // Update location
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
  { params }: { params: { code: string } }
) {
  try {
    const code = await params.code;

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

    // Check if URL has expired
    if (shortUrl.expiresAt && shortUrl.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'URL has expired' },
        { status: 410 }
      );
    }

    // Update click count
    await prisma.shortUrl.update({
      where: { code },
      data: { clicks: { increment: 1 } },
    });

    // Update analytics asynchronously
    updateAnalytics(shortUrl.id, request).catch(console.error);

    return NextResponse.redirect(shortUrl.url, { status: 307 });
  } catch (error) {
    console.error('Error retrieving URL:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

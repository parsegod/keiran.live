import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { type NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = await params.code;

  try {
    const shortUrl = await prisma.shortUrl.findUnique({
      where: { code },
      include: {
        referrers: {
          orderBy: { count: 'desc' },
          take: 10,
        },
        userAgents: {
          orderBy: { count: 'desc' },
          take: 10,
        },
        locations: {
          orderBy: { count: 'desc' },
          take: 10,
        },
      },
    });

    if (!shortUrl) {
      return NextResponse.json(
        { error: 'URL not found' },
        { status: 404 }
      );
    }

    // Format the response
    const analytics = {
      url: shortUrl.url,
      code: shortUrl.code,
      totalClicks: shortUrl.clicks,
      createdAt: shortUrl.createdAt,
      expiresAt: shortUrl.expiresAt,
      lastClickedAt: shortUrl.lastClickedAt,
      isCustom: shortUrl.isCustom,
      topReferrers: shortUrl.referrers.map(ref => ({
        referrer: ref.referrer,
        count: ref.count,
      })),
      topUserAgents: shortUrl.userAgents.map(ua => ({
        userAgent: ua.userAgent,
        count: ua.count,
      })),
      topLocations: shortUrl.locations.map(loc => ({
        country: loc.country,
        count: loc.count,
      })),
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error retrieving analytics:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

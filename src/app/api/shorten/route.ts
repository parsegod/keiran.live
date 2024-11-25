import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { type NextRequest } from 'next/server';
import { sanitizeUrl } from '@/lib/url-utils';

const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const CODE_LENGTH = 6;

function generateCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
    code += CHARACTERS[randomIndex];
  }
  return code;
}

async function generateUniqueCode(): Promise<string> {
  let code = generateCode();
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const exists = await prisma.shortUrl.findUnique({
      where: { code },
    });
    
    if (!exists) {
      return code;
    }
    
    code = generateCode();
    attempts++;
  }

  throw new Error('Failed to generate unique code');
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate and sanitize URL
    let sanitizedUrl: string;
    try {
      sanitizedUrl = sanitizeUrl(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }

    // Generate unique code
    const code = await generateUniqueCode();

    // Create short URL
    const shortUrl = await prisma.shortUrl.create({
      data: {
        code,
        url: sanitizedUrl,
        clicks: 0,
      },
    });

    return NextResponse.json({
      shortUrl: `https://keiran.live/s/${shortUrl.code}`,
      code: shortUrl.code,
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

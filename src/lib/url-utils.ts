import { prisma } from './prisma';

const MAX_REQUESTS_PER_HOUR = 50;
const CUSTOM_CODE_REGEX = /^[a-zA-Z0-9_-]{1,12}$/;

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: Date;
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const now = new Date();
  const resetAt = new Date(now);
  resetAt.setHours(resetAt.getHours() + 1);
  resetAt.setMinutes(0, 0, 0);

  // Clean up old rate limits
  await prisma.rateLimit.deleteMany({
    where: {
      resetAt: {
        lt: now,
      },
    },
  });

  // Get or create rate limit
  const rateLimit = await prisma.rateLimit.upsert({
    where: { ip },
    create: {
      ip,
      count: 1,
      resetAt,
    },
    update: {
      count: {
        increment: 1,
      },
    },
  });

  return {
    success: rateLimit.count <= MAX_REQUESTS_PER_HOUR,
    remaining: Math.max(0, MAX_REQUESTS_PER_HOUR - rateLimit.count),
    resetAt: rateLimit.resetAt,
  };
}

export function validateCustomCode(code: string): boolean {
  return CUSTOM_CODE_REGEX.test(code);
}

export function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Ensure protocol is either http or https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('Invalid protocol');
    }
    return urlObj.toString();
  } catch {
    throw new Error('Invalid URL');
  }
}

export function getExpirationDate(days?: number): Date | null {
  if (!days) return null;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export async function isCodeAvailable(code: string): Promise<boolean> {
  const existingUrl = await prisma.shortUrl.findFirst({
    where: {
      code,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    },
  });
  return !existingUrl;
}

export async function cleanupExpiredUrls(): Promise<void> {
  await prisma.shortUrl.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}

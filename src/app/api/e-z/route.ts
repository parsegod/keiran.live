import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import LocalCache from '@/lib/cache';

const execAsync = promisify(exec);
const goProgram = path.join(process.cwd(), 'src', 'app', 'api', 'go', 'e-z', 'main');
const cache = LocalCache.getInstance();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function fetchUserData(username: string): Promise<any> {
  try {
    const cachedData = cache.get(username);
    if (cachedData && (Date.now() - cachedData.timestamp < CACHE_TTL)) {
      return cachedData.data;
    }

    const { stdout } = await execAsync(`"${goProgram}" ${username}`);
    const userData = JSON.parse(stdout);
    
    if (!userData.error) {
      cache.set(username, { data: userData, timestamp: Date.now() });
    }
    
    return userData;
  } catch (error) {
    console.error('Go Error:', error);
    throw new Error('Failed to fetch user data');
  }
}

function validateUsername(username: string): boolean {
  return !!username && !/[^\w\-.]/.test(username);
}

function extractUsername(input: string): string {
  if (input.startsWith('https://e-z.bio/')) {
    const match = input.match(/https:\/\/e-z\.bio\/([^\/]+)/);
    if (!match) throw new Error('Invalid e-z.bio URL');
    return match[1];
  }
  return input.replace(/^@/, '').trim();
}

async function handleRequest(input: string): Promise<NextResponse> {
  try {
    const username = extractUsername(input);
    if (!validateUsername(username)) {
      return NextResponse.json({ error: 'Invalid username format' }, { status: 400 });
    }

    const userData = await fetchUserData(username);
    if (userData.error) {
      return NextResponse.json({ error: userData.error }, { status: 404 });
    }

    const headers = new Headers();
    const cachedData = cache.get(username);
    headers.set('X-Cache-Status', cachedData && (Date.now() - cachedData.timestamp < CACHE_TTL) ? 'HIT' : 'MISS');
    
    return NextResponse.json(userData, { 
      headers,
      status: 200 
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const username = request.nextUrl.searchParams.get('username');
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }
  return handleRequest(username);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { input } = await request.json();
    if (!input) {
      return NextResponse.json({ error: 'Username or URL is required' }, { status: 400 });
    }
    return handleRequest(input);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

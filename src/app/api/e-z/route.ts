import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const match = url.match(/https:\/\/e-z\.bio\/([^\/]+)/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid e-z.bio URL' }, { status: 400 });
    }

    const username = match[1];
    
    const scriptPath = path.join(process.cwd(), 'src', 'app', 'api', 'python', 'e-z.py');
    
    const result = await new Promise((resolve, reject) => {
      const process = spawn('python', [scriptPath, username]);
      let output = '';
      let error = '';

      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.stderr.on('data', (data) => {
        error += data.toString();
      });

      process.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(error || 'Failed to execute Python script'));
          return;
        }
        try {
          resolve(JSON.parse(output));
        } catch {
          reject(new Error('Invalid JSON output from Python script'));
        }
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error getting user data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname.replace('/api', ''); // Remove /api prefix
  const backendUrl = `http://localhost:4000${path}${url.search}`;

  console.log('Proxying GET request to:', backendUrl);
  console.log('Request headers:', Object.fromEntries(req.headers));

  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        ...Object.fromEntries(req.headers), // Forward all headers, including cookies
        'Host': 'localhost:4000', // Ensure backend recognizes the host
      },
      credentials: 'include', // Include cookies
    });

    console.log('Backend response status:', response.status);
    console.log('Backend response headers:', Object.fromEntries(response.headers));

    const data = await response.json();
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.set('Access-Control-Allow-Credentials', 'true');

    return NextResponse.json(data, { status: response.status, headers });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}

// Handle POST requests (for login, etc.)
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname.replace('/api', '');
  const backendUrl = `http://localhost:4000${path}${url.search}`;

  console.log('Proxying POST request to:', backendUrl);
  console.log('Request headers:', Object.fromEntries(req.headers));

  try {
    const body = await req.json();
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        ...Object.fromEntries(req.headers), // Forward all headers, including cookies
        'Host': 'localhost:4000',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status);
    console.log('Backend response headers:', Object.fromEntries(response.headers));

    const data = await response.json();
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.set('Access-Control-Allow-Credentials', 'true');

    return NextResponse.json(data, { status: response.status, headers });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}
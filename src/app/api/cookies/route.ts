import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // Use query parameter to specify token type

  console.log('API: Requested token type:', type);

  if (type === 'auth') {
    const token = cookieStore.get('auth_token')?.value || null;
    console.log('API: auth_token:', token);
    return NextResponse.json({ token });
  }

  if (type === 'admin') {
    const token = cookieStore.get('admin_token')?.value || null;
    console.log('API: admin_token:', token);
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: 'Invalid token type' }, { status: 400 });
}
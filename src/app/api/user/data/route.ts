import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Example protected data
//   return NextResponse.json({
//     message: 'Welcome back!',
//     email: user.email,
//     name: user.name,
//   });
}

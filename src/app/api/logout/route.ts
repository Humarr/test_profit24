import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const cookie = serialize('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0), // Expire Immediately
  });

  const response = NextResponse.json({ message: 'Logged out' });
  response.headers.set('Set-Cookie', cookie);
  return response;
}

// import { NextResponse } from 'next/server';

// export async function POST() {
//   // Clear the auth_token cookie
//   const response = NextResponse.json({ message: 'Logged out' });
//   response.cookies.set('auth_token', '', {
//     httpOnly: true,
//     path: '/',
//     expires: new Date(0), // Expire immediately
//   });

//   return response;
// }

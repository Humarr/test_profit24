import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const adminToken = req.cookies.get('admin_token')?.value;
  const url = req.nextUrl.clone();

  if (!adminToken) {
    url.pathname = '/admin/login'; // redirect to your admin login page
    return NextResponse.redirect(url);
  }

  try {
    const payload = jwt.verify(adminToken, process.env.JWT_SECRET!) as { role: string };
    console.log("payload in admin middleware: ", payload)
    if (payload.role !== 'admin') {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  } catch  {
    console.error('Admin token verification failed:');
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

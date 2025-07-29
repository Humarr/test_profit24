import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value

  console.log("token in middleware: ", token)
  const isProtected = req.nextUrl.pathname.startsWith('/dashboard')

  console.log("isProtected in middleware: ", isProtected)
  console.log("req.nextUrl.pathname in middleware: ", req.nextUrl.pathname)
  if (isProtected && !token) {
    console.log("redirecting to login in middleware")
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return NextResponse.next()
}

// Specify the paths to protect
export const config = {
  matcher: ['/dashboard/:path*'],
}

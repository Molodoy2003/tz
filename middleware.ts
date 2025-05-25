import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isAuth =
    req.cookies.has('next-auth.session-token') ||
    req.nextUrl.pathname === '/login'

  if (!isAuth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

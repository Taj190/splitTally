import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const publicPaths = ['/', '/login'];

  const isPublicPath = publicPaths.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isPublicPath || token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: '/((?!_next|favicon.ico).*)', 
};

import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/authUtils';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathWithQuery = `${pathname}${request.nextUrl.search}`;
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  const user = session?.user;

  const isAuth = isAuthRoute(pathname);
  const routerOwner = getRouteOwner(pathname);
  if (isAuth && user && pathname !== '/verify-email' && pathname !== '/reset-password') {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(user?.role as UserRole), request.url)
    );
  }
  if (routerOwner === null) {
    return NextResponse.next();
  }
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathWithQuery);
    return NextResponse.redirect(loginUrl);
  }
  if (routerOwner === 'SUPER_ADMIN' || routerOwner === 'USER') {
    if (routerOwner !== user?.role) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(user?.role as UserRole), request.url)
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
  ],
};

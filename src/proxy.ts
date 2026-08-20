import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/authUtils';

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const pathWithQuery = `${pathname}${search}`;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;

  const isAuth = isAuthRoute(pathname);
  const routeOwner = getRouteOwner(pathname);

  // Logged-in users shouldn't access login/register/etc.
  // Except routes needed for account verification/reset.
  if (isAuth && user && pathname !== '/verify-email' && pathname !== '/reset-password') {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(user.role as UserRole), request.url)
    );
  }

  // Public route
  if (routeOwner === null) {
    return NextResponse.next();
  }

  // Protected route + not logged in
  if (!user) {
    const loginUrl = new URL('/login', request.url);

    loginUrl.searchParams.set('redirect', pathWithQuery);

    return NextResponse.redirect(loginUrl);
  }

  // Admin routes
  if (routeOwner === 'ADMIN') {
    const isAdmin = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';

    if (!isAdmin) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(user.role as UserRole), request.url)
      );
    }
  }

  // User/patient routes
  if (routeOwner === 'USER') {
    if (user.role !== 'USER') {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(user.role as UserRole), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|\\.well-known).*)',
  ],
};

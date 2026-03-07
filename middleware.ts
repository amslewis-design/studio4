import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/admin'];

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Keep a single canonical URL per locale for the services hub.
  // - Spanish canonical: /es/servicios
  // - English canonical: /en/services
  if (pathname === '/es/services') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/es/servicios';
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (pathname === '/en/servicios') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/en/services';
    return NextResponse.redirect(redirectUrl, 308);
  }

  // First apply the internationalization middleware
  const intlResponse = intlMiddleware(request);

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));

  if (isProtectedRoute) {
    // Check for Supabase session token in cookies
    const authToken = request.cookies.get('sb-auth-token');

    // If no auth token and trying to access protected route, note that
    // server-side components will verify and redirect to login if needed
    if (!authToken) {
      // Token missing - server-side auth check will handle redirect
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

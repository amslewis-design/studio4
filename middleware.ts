import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/admin'];

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
});

export function middleware(request: NextRequest) {
  // First apply the internationalization middleware
  const intlResponse = intlMiddleware(request);

  // Check if the path is a protected route
  const pathname = request.nextUrl.pathname;
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

import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'pt'];
const defaultLocale = 'en';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // We only intercept the root to provide location-based redirection
  // when no language preference is already stored in cookies.
  if (pathname === '/' && !request.cookies.has('NEXT_LOCALE')) {
    const country = request.headers.get('x-vercel-ip-country');
    const ptCountries = ['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST'];
    
    if (ptCountries.includes(country || '')) {
      // To nudge next-intl toward Portuguese for these locations, 
      // we can simulate a preferred language header if none matches.
      const requestClone = new NextRequest(request.url, {
        headers: new Headers(request.headers)
      });
      requestClone.headers.set('accept-language', 'pt,en;q=0.5');
      return intlMiddleware(requestClone);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Next.js internals (_next/*)
  // - Static assets with extensions (e.g., favicon.ico, images, robots.txt)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

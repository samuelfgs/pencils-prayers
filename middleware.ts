import createMiddleware from 'next-intl/middleware';
import { updateSession } from './lib/supabase/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'pt'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export default async function middleware(request: NextRequest) {
  // First, run the next-intl middleware to handle locale redirection and response creation
  const response = intlMiddleware(request);
  
  // Then, update the session with Supabase, passing the response from next-intl
  return await updateSession(request, response);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt|en)/:path*']
};

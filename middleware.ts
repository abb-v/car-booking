import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/config/i18n';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Redirect to default locale if no locale matches
  localePrefix: 'as-needed'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en)/:path*']
};
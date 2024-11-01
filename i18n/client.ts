import { createI18nClient } from 'next-intl/client';
 
export const { useMessages, useFormatter, useLocale, useTimeZone } =
  createI18nClient({
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }
      }
    }
  });
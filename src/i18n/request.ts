import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'pt'] as const;

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !(locales as readonly string[]).includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

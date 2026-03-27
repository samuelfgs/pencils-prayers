'use client';

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const tFooter = useTranslations('Footer');
  const tNavbar = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalizedPath = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const isActive = (path: string) => {
    if (!pathname) return false;
    // Handle home page exactly, others by prefix
    if (path === `/${locale}`) return pathname === `/${locale}`;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className="w-full pt-6 pb-6 bg-[#FDFCFB]">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Brand Identity */}
        <div className="relative w-full mb-8">
          <div className="text-center group">
            <Link href={`/${locale}`} className="inline-block">
              <h1 className="sr-only">Pencils & Prayers</h1>
              <Image
                src="/logo-photoroom.png"
                alt="Pencils & Prayers Logo"
                width={260}
                height={160}
                priority
                className="mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </Link>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-[1px] w-8 bg-primary/20" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-sans font-medium">
                {tFooter('tagline')}
              </p>
              <div className="h-[1px] w-8 bg-primary/20" />
            </div>
          </div>

          <div className="absolute top-2 right-0 flex justify-end">
            <div className="flex gap-4 text-xl">
               <Link
                 href={getLocalizedPath('en')}
                 className={`${locale === 'en' ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-100'} transition-all duration-300`}
                 title="English"
               >
                 🇺🇸
               </Link>
               <Link
                 href={getLocalizedPath('pt')}
                 className={`${locale === 'pt' ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-100'} transition-all duration-300`}
                 title="Português"
               >
                 🇧🇷
               </Link>
            </div>
          </div>
        </div>

        {/* Navigation - Soft and Rounded */}
        <nav className="flex justify-center items-center gap-8 md:gap-12 py-3 px-10 bg-white/50 border border-primary/10 rounded-full shadow-sm text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">
          <Link 
            href={`/${locale}`} 
            className={`transition-colors ${isActive(`/${locale}`) ? 'text-secondary' : 'hover:text-secondary'}`}
          >
            {tNavbar('home')}
          </Link>
          <Link 
            href={`/${locale}/contact`} 
            className={`transition-colors ${isActive(`/${locale}/contact`) ? 'text-secondary' : 'hover:text-secondary'}`}
          >
            {tNavbar('contact')}
          </Link>
        </nav>
      </div>
    </header>
  );
}

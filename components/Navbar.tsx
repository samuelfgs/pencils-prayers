'use client';

import Link from "next/link";
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

  return (
    <header className="w-full pt-10 pb-6 bg-[#FDFCFB]">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Language Switcher - Flags */}
        <div className="w-full flex justify-end mb-6">
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
        
        {/* Brand Identity */}
        <div className="text-center mb-10 group">
          <Link href={`/${locale}`} className="inline-block">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-foreground/90 transition-transform duration-500 group-hover:scale-[1.02]">
              Pencils <span className="font-script text-secondary italic font-light lowercase">&</span> Prayers
            </h1>
          </Link>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-[1px] w-8 bg-primary/20" />
            <p className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-sans font-medium">
              {tFooter('tagline')}
            </p>
            <div className="h-[1px] w-8 bg-primary/20" />
          </div>
        </div>

        {/* Navigation - Soft and Rounded */}
        <nav className="flex justify-center items-center gap-8 md:gap-12 py-3 px-10 bg-white/50 border border-primary/10 rounded-full shadow-sm text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">{tNavbar('home')}</Link>
          <Link href={`/${locale}/about`} className="hover:text-primary transition-colors">{tNavbar('about')}</Link>
          <Link href={`/${locale}/contact`} className="hover:text-primary transition-colors">{tNavbar('contact')}</Link>
        </nav>
      </div>
    </header>
  );
}

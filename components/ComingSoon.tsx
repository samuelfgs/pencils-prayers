'use client';

import { useTranslations, useLocale } from "next-intl";
import NewsletterSignup from "./NewsletterSignup";
import { Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function ComingSoon() {
  const t = useTranslations('ComingSoon');
  const tFooter = useTranslations('Footer');
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalizedPath = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#2C2C2C] selection:bg-primary/10">
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 pt-20 pb-20 flex flex-col items-center text-center">
        {/* Language Switcher - Back to Flags */}
        <div className="flex gap-4 text-2xl mb-12 animate-in fade-in duration-700">
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

        {/* Brand Identity */}
        <div className="mb-10 animate-in fade-in duration-1000">
          <h1 className="sr-only">Pencils & Prayers</h1>
          <Image
            src="/logo-photoroom.png"
            alt="Pencils & Prayers Logo"
            width={260}
            height={160}
            priority
            className="mx-auto"
          />
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-[1px] w-6 bg-primary/20" />
            <p className="text-[12px] uppercase tracking-[0.4em] text-primary/60 font-sans font-medium">
              {tFooter('tagline')}
            </p>
            <div className="h-[1px] w-6 bg-primary/20" />
          </div>
        </div>

        <div className="space-y-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          <h2 className="text-2xl md:text-4xl font-serif italic text-secondary leading-tight">
            {t('title')}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed font-sans max-w-lg mx-auto italic">
            {t('subtitle')}
          </p>
          
          <div className="pt-2">
            <a 
              href="https://www.instagram.com/pencilsandprayers/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-secondary hover:text-secondary/80 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              {t('instagram')}
            </a>
          </div>
        </div>

        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <div className="h-[1px] w-full bg-primary/5 mb-10" />
          <NewsletterSignup />
        </div>

        {/* Footer info for Coming Soon */}
        <div className="mt-12 space-y-3 opacity-60">
          <p className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground/50">
            © 2026 Pencils & Prayers
          </p>
          <p className="text-[8px] uppercase tracking-[0.1em] text-muted-foreground/30 max-w-xs mx-auto italic font-serif">
            {tFooter('verse')}
          </p>
        </div>
      </main>
    </div>
  );
}

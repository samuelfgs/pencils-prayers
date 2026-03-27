'use client';

import { trackDownload } from "@/app/actions/interactions";
import Navbar from "@/components/Navbar";
import NewsletterSignup from "@/components/NewsletterSignup";
import Image from "next/image";
import { Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

const homeContent = {
  en: {
    category: "Featured",
    title: "Easter Advent",
    intro:
      "A gentle collection created to help families walk toward Easter with intention. These pages invite you into daily reflection, simple rhythms, and Christ-centered moments that keep the hope of the resurrection close at hand.",
    buttons: [
      { href: "/easter-advent.pdf", label: "Download Full PDF", assetKey: "easter-advent" },
      { href: "/easter-advent-en.pdf", label: "Download English Version", assetKey: "easter-advent-en" },
      { href: "/easter-advent-pt.pdf", label: "Download Portuguese Version", assetKey: "easter-advent-pt" },
    ],
  },
  pt: {
    category: "Destaque",
    title: "Advento de Páscoa",
    intro:
      "Uma coleção delicada para ajudar as famílias a caminharem até a Páscoa com intencionalidade. Estas páginas convidam você para reflexões diárias, ritmos simples e momentos centrados em Cristo, mantendo viva a esperança da ressurreição.",
    buttons: [
      { href: "/easter-advent-en.pdf", label: "Baixar Versão em Inglês", assetKey: "easter-advent-en" },
      { href: "/easter-advent-pt.pdf", label: "Baixar Versão em Português", assetKey: "easter-advent-pt" },
      { href: "/easter-advent.pdf", label: "Baixar PDF Completo", assetKey: "easter-advent" },
    ],
  },
} as const;

export default function Home() {
  const tFooter = useTranslations('Footer');
  const locale = useLocale() as keyof typeof homeContent;
  const content = homeContent[locale] ?? homeContent.en;
  const [isPending, startTransition] = useTransition();

  const handleDownload = (href: string, assetKey: string) => {
    startTransition(async () => {
      await trackDownload(assetKey);

      const link = document.createElement("a");
      link.href = href;
      link.download = "";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#2C2C2C]">
      <Navbar />

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
        <article className="group animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                {content.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-8 max-w-xl">
              {content.title}
            </h1>

            <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-10 shadow-sm w-full">
              <Image
                src="/easter.png"
                alt={content.title}
                width={1200}
                height={750}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="px-2 flex flex-col items-center">
              <p className="text-lg text-muted-foreground leading-relaxed font-sans mb-10 italic max-w-xl">
                {content.intro}
              </p>

              <div className="w-full flex flex-col gap-4 max-w-md mb-10">
                {content.buttons.map((button) => (
                  <button
                    key={button.href}
                    type="button"
                    onClick={() => handleDownload(button.href, button.assetKey)}
                    disabled={isPending}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-secondary/20 bg-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-secondary hover:text-white"
                  >
                    <Download className="h-4 w-4 shrink-0" />
                    <span>{button.label}</span>
                  </button>
                ))}
              </div>

              <div className="w-full flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/60 mb-6">
                  {locale === 'en' ? 'By Bruna & Vitoria' : 'Por Bruna & Vitória'}
                </span>
                <div className="w-full border-t border-primary/10" />
              </div>
            </div>
          </div>
        </article>

        <div className="mt-12">
          <NewsletterSignup />
        </div>

        <footer className="text-center py-12 border-t border-primary/10">
          <p className="font-script text-3xl text-secondary mb-6">
            {tFooter('with_love', { names: locale === 'en' ? 'Bruna & Vitoria' : 'Bruna & Vitória' })}
          </p>
          <div className="flex justify-center gap-6 mb-10 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
            <a href="https://www.instagram.com/pencilsandprayers/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors text-secondary">@pencilsandprayers</a>
            <span className="opacity-20">|</span>
            <a href="https://www.instagram.com/brufpmachado/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Bruna</a>
            <a href="https://www.instagram.com/vifpereira/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Vitoria</a>
          </div>
          <div className="space-y-4">
            <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/60">
              © 2026 Pencils & Prayers
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 max-w-xs mx-auto italic font-serif">
              {tFooter('verse')}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

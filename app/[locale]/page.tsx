'use client';

import { trackDownload } from "@/app/actions/interactions";
import Navbar from "@/components/Navbar";
import NewsletterSignup from "@/components/NewsletterSignup";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

const latestPosts = {
  en: [
    {
      id: "easter-memory-game-2026",
      category: "Creativity",
      title: "Easter Memory Game",
      excerpt:
        "A playful printable to help children learn through play while opening space for meaningful Easter conversations at home, at church, or in your homeschool rhythm.",
      image: "/easter-memory-game-cover.png",
      imageAlt: "Printable Easter memory game cards",
      buttons: [
        { href: "/easter-memory-game.pdf", label: "Download Printable PDF", assetKey: "easter-memory-game" },
      ],
    },
    {
      id: "easter-2026",
      category: "Faith",
      title: "Easter Advent",
      excerpt:
        "A week dedicated to hope, learning, and communion. A precious time to gather the family and honor the greatest act of love and redemption in history: Jesus' sacrifice for each one of us.",
      image: "/easter-timeline-cover.jpeg",
      imageAlt: "Easter Advent cover",
      buttons: [
        { href: "/easter-advent.pdf", label: "Download Full PDF", assetKey: "easter-advent" },
        { href: "/easter-advent-en.pdf", label: "Download English Version", assetKey: "easter-advent-en" },
        { href: "/easter-advent-pt.pdf", label: "Download Portuguese Version", assetKey: "easter-advent-pt" },
      ],
    },
  ],
  pt: [
    {
      id: "easter-memory-game-2026",
      category: "Criatividade",
      title: "Jogo da Memória de Páscoa",
      excerpt:
        "Um material leve e divertido para ajudar as crianças a aprender brincando, enquanto a família conversa sobre o verdadeiro significado da Páscoa.",
      image: "/easter-memory-game-cover.png",
      imageAlt: "Cartas do jogo da memória de Páscoa para imprimir",
      buttons: [
        { href: "/easter-memory-game.pdf", label: "Baixar PDF para Imprimir", assetKey: "easter-memory-game" },
      ],
    },
    {
      id: "easter-2026",
      category: "Fé",
      title: "Advento de Páscoa",
      excerpt:
        "Uma semana dedicada à esperança, ao aprendizado e à comunhão. Um tempo precioso para reunir a família e honrar o maior ato de amor e redenção da história: a entrega de Jesus por cada um de nós.",
      image: "/easter-timeline-cover.jpeg",
      imageAlt: "Capa do Advento de Páscoa",
      buttons: [
        { href: "/easter-advent.pdf", label: "Baixar PDF Completo", assetKey: "easter-advent" },
        { href: "/easter-advent-en.pdf", label: "Baixar Versão em Inglês", assetKey: "easter-advent-en" },
        { href: "/easter-advent-pt.pdf", label: "Baixar Versão em Português", assetKey: "easter-advent-pt" },
      ],
    },
  ],
} as const;

export default function Home() {
  const tFooter = useTranslations('Footer');
  const tPosts = useTranslations('Posts');
  const locale = useLocale() as keyof typeof latestPosts;
  const posts = latestPosts[locale] ?? latestPosts.en;
  const [isPending, startTransition] = useTransition();

  const handleDownload = (href: string, assetKey: string) => {
    startTransition(async () => {
      await trackDownload(assetKey);
      window.open(href, "_blank", "noopener,noreferrer");
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#2C2C2C]">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 md:px-8">
        <section className="max-w-5xl mx-auto space-y-10">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-[2.5rem] border border-primary/10 bg-white/80 shadow-sm transition-transform duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDuration: `${700 + index * 150}ms` }}
            >
              <div className="grid md:grid-cols-[1.15fr_0.85fr]">
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="mb-5 inline-flex w-fit items-center rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
                    {post.category}
                  </span>
                  <h1 className="font-script text-4xl md:text-6xl leading-[0.95] text-secondary mb-5">
                    {post.title}
                  </h1>
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8 max-w-xl italic">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-col items-start gap-6">
                    <div className="flex w-full max-w-md flex-col gap-3">
                      {post.buttons.map((button) => (
                        <button
                          key={button.href}
                          type="button"
                          onClick={() => handleDownload(button.href, button.assetKey)}
                          disabled={isPending}
                          className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-secondary/20 bg-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-secondary hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <Download className="h-4 w-4 shrink-0" />
                          <span>{button.label}</span>
                        </button>
                      ))}
                    </div>
                    <Link
                      href={`/${locale}/posts/${post.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-secondary/20 bg-secondary px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-secondary/90"
                    >
                      {tPosts('read_more')}
                    </Link>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/60">
                      {locale === 'en' ? 'By Bruna & Vitoria' : 'Por Bruna & Vitória'}
                    </span>
                  </div>
                </div>

                <div className="relative min-h-[280px] bg-[#F7F1EA]">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          ))}
        </section>

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

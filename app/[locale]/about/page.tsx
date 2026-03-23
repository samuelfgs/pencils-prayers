import Navbar from "@/components/Navbar";
import { useTranslations, useLocale } from "next-intl";

export default function About() {
  const t = useTranslations('About');
  const tFooter = useTranslations('Footer');
  const locale = useLocale();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#2C2C2C]">
      <Navbar />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-20">
        <header className="text-center mb-24">
          <span className="font-script text-4xl text-secondary mb-4 block">{t('story')}</span>
          <h1 className="text-5xl md:text-7xl font-serif text-foreground/90 mb-8 tracking-tight">{t('title')}</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start mb-32">
          {/* Bruna */}
          <section className="flex flex-col gap-8 group">
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] shadow-sm transition-transform duration-700 group-hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" 
                alt="Bruna" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="px-4">
              <h2 className="text-3xl font-serif text-foreground/90 mb-4 italic">Bruna</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base font-sans">
                {t('bruna_bio')}
              </p>
              <p className="text-secondary/80 leading-relaxed italic font-serif text-lg border-l-2 border-secondary/20 pl-6 py-2 mb-8">
                {t('bruna_extra')}
              </p>
              <a 
                href="https://www.instagram.com/brufpmachado/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary hover:text-secondary/70 transition-colors inline-flex items-center gap-2 border-b border-secondary/20 pb-1"
              >
                {t('follow_instagram', { name: 'Bruna' })}
              </a>
            </div>
          </section>

          {/* Vitoria */}
          <section className="flex flex-col gap-8 md:mt-32 group">
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] shadow-sm transition-transform duration-700 group-hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1544717302-425aa69a4039?auto=format&fit=crop&q=80&w=800" 
                alt="Vitoria" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="px-4">
              <h2 className="text-3xl font-serif text-foreground/90 mb-4 italic">Vitoria</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base font-sans">
                {t('vitoria_bio')}
              </p>
              <p className="text-secondary/80 leading-relaxed italic font-serif text-lg border-l-2 border-secondary/20 pl-6 py-2 mb-8">
                {t('vitoria_extra')}
              </p>
              <a 
                href="https://www.instagram.com/vifpereira/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary hover:text-secondary/70 transition-colors inline-flex items-center gap-2 border-b border-secondary/20 pb-1"
              >
                {t('follow_instagram', { name: 'Vitoria' })}
              </a>
            </div>
          </section>
        </div>

        <section className="bg-white/50 border border-primary/10 rounded-[3rem] py-20 px-10 text-center max-w-4xl mx-auto shadow-sm">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground/90 mb-8 tracking-tight">{t('vision_title')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-sans mb-10 max-w-2xl mx-auto">
            {t('vision_text')}
          </p>
          <div className="font-script text-4xl text-secondary italic">
            {t('sign_off', { names: 'B & V' })}
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-border/40 py-24 text-center mt-24">
        <div className="flex justify-center gap-8 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
          <a href="https://www.instagram.com/pencilsandprayers/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors text-secondary">@pencilsandprayers</a>
          <span className="opacity-20">|</span>
          <a href="https://www.instagram.com/brufpmachado/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Bruna</a>
          <a href="https://www.instagram.com/vifpereira/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Vitoria</a>
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 mb-3">
          © 2026 Pencils & Prayers
        </p>
        <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 font-medium">
          {tFooter('tagline')}
        </p>
      </footer>
    </div>
  );
}

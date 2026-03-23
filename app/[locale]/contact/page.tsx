import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { Send } from "lucide-react";

export default function Contact() {
  const t = useTranslations('Contact');
  const tFooter = useTranslations('Footer');
  const locale = useLocale();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#2C2C2C]">
      <Navbar />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 md:py-20">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-foreground/90 mb-8 tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground leading-relaxed text-sm max-w-md mx-auto font-sans italic">
            {t('intro')}
          </p>
        </header>

        <section className="bg-white/50 border border-primary/10 p-10 md:p-16 rounded-[3rem] shadow-sm">
          <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60 ml-1">{t('label_name')}</label>
                <input 
                  id="name"
                  type="text" 
                  placeholder={t('placeholder_name')} 
                  className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-full focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 font-sans transition-all placeholder:text-muted-foreground/30"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60 ml-1">{t('label_email')}</label>
                <input 
                  id="email"
                  type="email" 
                  placeholder={t('placeholder_email')} 
                  className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-full focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 font-sans transition-all placeholder:text-muted-foreground/30"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60 ml-1">{t('label_message')}</label>
              <textarea 
                id="message"
                rows={4}
                placeholder={t('placeholder_message')} 
                className="w-full px-6 py-4 bg-white/50 border border-primary/10 rounded-[2rem] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 font-sans transition-all resize-none placeholder:text-muted-foreground/30 leading-relaxed"
              />
            </div>

            <Button className="w-full rounded-full py-6 bg-primary hover:bg-primary/90 text-white h-auto group transition-all">
              <Send className="w-3.5 h-3.5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {t('btn_send')}
            </Button>
          </form>
        </section>

        <section className="mt-32 text-center">
          <h3 className="text-xl font-serif text-foreground/80 mb-10 tracking-tight">{t('other_ways')}</h3>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40">
            <a href="https://www.instagram.com/pencilsandprayers/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300 text-secondary">@pencilsandprayers</a>
            <a href="https://www.instagram.com/brufpmachado/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">Instagram (Bruna)</a>
            <a href="https://www.instagram.com/vifpereira/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">Instagram (Vitoria)</a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">Pinterest</a>
            <a href="mailto:hello@pencilsandprayers.com" className="hover:text-foreground transition-colors duration-300">Email</a>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-border/40 py-24 text-center mt-auto">
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

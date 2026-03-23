import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Bookmark } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { ArticleActionsWrapper, ActionsSkeleton } from "@/components/ArticleActionsWrapper";
import { CommentsWrapper, CommentsSkeleton } from "@/components/CommentsWrapper";
import { Suspense } from "react";
import { cookies } from 'next/headers';

export default async function PostPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  if (id !== 'easter-2026') {
    notFound();
  }

  const cookieStore = await cookies();
  const currentSessionId = cookieStore.get("guest_session_id")?.value || null;

  // To use translations in a server component, we fetch messages
  const messages = await getMessages();
  // @ts-ignore
  const tPosts = (key: string) => messages?.Posts?.[key] || key;
  // @ts-ignore
  const tFooter = (key: string) => messages?.Footer?.[key] || key;
  // @ts-ignore
  const tNewsletter = (key: string) => messages?.Newsletter?.[key] || key;

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#2C2C2C]">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Article Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              {tPosts("category_faith")}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif leading-[1.1] mb-10 max-w-2xl mx-auto tracking-tight">
            {tPosts("easter_title")}
          </h1>

          <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-12">
            <span className="font-bold text-foreground/60">
              {tPosts("easter_author")}
            </span>
            <span className="w-1 h-1 bg-primary/20 rounded-full" />
            <span>
              {locale === "en" ? "March 23, 2026" : "23 de Março, 2026"}
            </span>
            <span className="w-1 h-1 bg-primary/20 rounded-full" />
            <span>{locale === "en" ? "8 min read" : "8 min de leitura"}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-[3rem] mb-20 shadow-sm">
          <img
            src="/easter.png"
            alt={tPosts("easter_title")}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Article Content */}
        <article className="max-w-2xl mx-auto">
          <p className="text-2xl md:text-3xl font-serif leading-relaxed italic mb-16 text-secondary text-center">
            "{tPosts("easter_excerpt")}"
          </p>

          <div className="prose prose-lg md:prose-xl font-serif leading-relaxed text-[#2C2C2C] space-y-10 prose-p:text-foreground/90 prose-headings:font-serif prose-headings:text-foreground/90">
            <p className="first-letter:text-8xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-secondary">
              {locale === "en"
                ? "Easter in our home isn't just about the morning basket; it's about the journey to the empty tomb. As we prepare our hearts for the resurrection, we find that the simplest rhythms often carry the deepest meaning. For children, abstract theological concepts are best understood through tangible, sensory experiences."
                : "A Páscoa em nossa casa não é apenas sobre a cesta matinal; é sobre a jornada até o túmulo vazio. Enquanto preparamos nossos corações para a ressurreição, descobrimos que os ritmos mais simples costumam carregar o significado mais profundo. Para as crianças, conceitos teológicos abstratos são melhor compreendidos através de experiências sensoriais tangíveis."}
            </p>

            <h3 className="text-3xl mt-16 mb-8 italic">
              {locale === "en"
                ? "The Resurrection Garden"
                : "O Jardim da Ressurreição"}
            </h3>

            <p>
              {locale === "en"
                ? "This year, we've focused on activities that bring the story of Jesus to life for our children. The most impactful has been building our own Resurrection Garden. Using a shallow terracotta dish, potting soil, some grass seed, and a small overturned pot to represent the tomb, we created a miniature scene."
                : "Este ano, focamos em atividades que dão vida à história de Jesus para nossos filhos. A mais impactante tem sido construir nosso próprio Jardim da Ressurreição. Usando um prato raso de terracota, terra vegetal, algumas sementes de grama e um pequeno vaso virado para representar o túmulo, criamos uma cena em miniatura."}
            </p>

            <div className="bg-white/50 border border-primary/10 rounded-[2rem] p-10 my-16 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary/30" />
              <h4 className="font-script text-3xl text-secondary mb-6">
                {locale === "en" ? "A Mother's Prayer" : "A Oração de uma Mãe"}
              </h4>
              <p className="font-serif text-xl leading-relaxed text-foreground/80 italic">
                {locale === "en"
                  ? '"Lord, as we look toward the cross and the empty tomb, help us to see Your glory in the small hands that reach for the sunrise and the quiet hearts that seek Your truth. Amen."'
                  : '"Senhor, enquanto olhamos para a cruz e o túmulo vazio, ajuda-nos a ver a Tua glória nas pequenas mãos que buscam o nascer do sol e nos corações quietos que buscam a Tua verdade. Amém."'}
              </p>
            </div>

            <h3 className="text-3xl mt-16 mb-8 italic">
              {locale === "en"
                ? "Watercoloring the Way of the Cross"
                : "Pintando a Via Sacra em Aquarela"}
            </h3>

            <p>
              {locale === "en"
                ? "Art is a powerful tool for meditation. By painting the stages of Holy Week, our children learned to slow down and reflect on the sacrifice. We focused less on perfect technique and more on the emotion of the story—the darkness of Friday giving way to the brilliant, explosive light of Sunday morning."
                : "A arte é uma ferramenta poderosa para meditação. Ao pintar as etapas da Semana Santa, nossos filhos aprenderam a desacelerar e refletir sobre o sacrifício. Focamos menos na técnica perfeita e mais na emoção da história — a escuridão da sexta-feira dando lugar à luz brilhante e explosiva da manhã de domingo."}
            </p>
          </div>

          <Suspense fallback={<ActionsSkeleton />}>
            <ArticleActionsWrapper postId={id} />
          </Suspense>

          <Suspense fallback={<CommentsSkeleton />}>
            <CommentsWrapper postId={id} currentSessionId={currentSessionId} />
          </Suspense>
        </article>

        {/* Newsletter Signup Integration */}
        <section className="mt-32 bg-white/50 border border-primary/10 rounded-[3rem] p-10 md:p-16 text-center mb-24 shadow-sm">
          <span className="font-script text-3xl text-secondary mb-4 block">
            {tNewsletter("join_community")}
          </span>
          <h3 className="text-3xl font-serif mb-6">{tNewsletter("title")}</h3>
          <p className="text-sm text-muted-foreground mb-10 max-w-md mx-auto">
            {tNewsletter("text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder={tNewsletter("placeholder")}
              className="flex-1 px-6 py-4 rounded-full bg-white border border-primary/10 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
            />
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto">
              {tNewsletter("btn")}
            </Button>
          </div>
        </section>

        {/* Editorial Note */}
        <footer className="text-center py-12 border-t border-primary/10">
          <p className="font-script text-3xl text-secondary mb-6">
            {locale === "en"
              ? "With love, Bruna & Vitoria"
              : "Com carinho, Bruna & Vitória"}
          </p>
          <div className="flex justify-center gap-6 mb-10 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
            <a
              href="https://www.instagram.com/pencilsandprayers/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors text-secondary"
            >
              @pencilsandprayers
            </a>
            <span className="opacity-20">|</span>
            <a
              href="https://www.instagram.com/brufpmachado/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Bruna
            </a>
            <a
              href="https://www.instagram.com/vifpereira/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Vitoria
            </a>
          </div>
          <div className="space-y-4">
            <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/60">
              © 2026 Pencils & Prayers
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 max-w-xs mx-auto italic font-serif">
              {locale === "en"
                ? '"Direct your children onto the right path, and when they are older, they will not leave it."'
                : '"Educa a criança no caminho em que deve andar; e até quando envelhecer não se desviará dele."'}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

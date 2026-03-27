import Navbar from "@/components/Navbar";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Download } from "lucide-react";

import { ArticleActionsWrapper, ActionsSkeleton } from "@/components/ArticleActionsWrapper";
import { CommentsWrapper, CommentsSkeleton } from "@/components/CommentsWrapper";
import { Suspense } from "react";
import { cookies } from 'next/headers';

import NewsletterSignup from "@/components/NewsletterSignup";

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

  const tPosts = await getTranslations('Posts');
  const content = locale === "en" ? {
    date: "March 27, 2026",
    readTime: "6 min read",
    lead: "A week dedicated to hope, learning, and communion. A precious time to gather the family and honor the greatest act of love and redemption in history: Jesus' sacrifice for each one of us.",
    paragraphs: [
      "A week dedicated to hope, learning, and communion. A precious time to gather the family and honor the greatest act of love and redemption in history: Jesus' sacrifice for each one of us.",
      "Who doesn't love celebrating Christmas? It is such a cozy and meaningful season. We prepare ourselves, decorate the house, make plans for dinner and Christmas morning, prepare gift lists, and so on.",
      "I love it. In fact, I listen to Christmas songs all year long. It is truly special because it is the time when we symbolically celebrate the birth of Christ. Every year since my children were born, we have practiced Advent together, and it is always a memorable moment.",
      "But have you ever stopped to think that we celebrate the birth of Jesus so intentionally, yet we do not always do the same for His Resurrection? It was the fulfillment of His purpose here on earth. Without His birth, His sinless life, His obedience, His sacrifice on the cross, and His victory in rising again, you and I would have no hope. The resurrection is essential because it validates the work of Christ.",
      "In John 11:25-26, we read: 'Jesus said to her, I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live, and everyone who lives and believes in me shall never die.'",
      "I believe Easter should be celebrated intentionally with our children. Romans 3:23 says that all have sinned and fall short of the glory of God. All includes children. And how will they believe and understand if they do not hear about it?",
      "With that in mind, we created the material 'Holy Week - Timeline' in a simple and concise format. It will not take more than 15 minutes of your day, but the Word planted in your home will certainly carry eternal weight.",
      "This advent includes eight days, from Palm Sunday to Easter Sunday. Each day brings a short study and an activity suggestion to do with your children or with the whole family. I am sure it will be a precious time."
    ],
    signOff: "In Christ's love,",
    verse: "\"Direct your children onto the right path, and when they are older, they will not leave it.\""
  } : {
    date: "27 de Março de 2026",
    readTime: "6 min de leitura",
    lead: "Uma semana dedicada à esperança, ao aprendizado e à comunhão. Um tempo precioso para reunir a família e honrar o maior ato de amor e redenção da história: a entrega de Jesus por cada um de nós.",
    paragraphs: [
      "Uma semana dedicada à esperança, ao aprendizado e à comunhão. Um tempo precioso para reunir a família e honrar o maior ato de amor e redenção da história: a entrega de Jesus por cada um de nós.",
      "Quem não ama comemorar o Natal? É uma estação muito gostosa e aconchegante. Nós nos preparamos, arrumamos a casa, fazemos planos para o jantar e para a manhã de Natal, preparamos a lista de presentes e por aí vai, não é mesmo?",
      "Eu amo! Na verdade, ouço músicas de Natal o ano todo (rsrs). É realmente especial, pois é a data em que celebramos simbolicamente o nascimento de Cristo. Todos os anos, desde que meus filhos nasceram, fazemos o Advento de Natal e é sempre um momento marcante.",
      "Mas você já parou para pensar que comemoramos o nascimento de Jesus com tanto afinco, mas nem sempre fazemos o mesmo com a sua Ressurreição? Ela foi a consumação do Seu propósito aqui na Terra. Sem o Seu nascimento, Sua vida sem pecado, Sua obediência, Seu sacrifício na cruz e Sua vitória ao ressuscitar, eu e você não teríamos esperança. A ressurreição é fundamental porque valida a obra de Cristo!",
      "Em João 11:25-26, lemos: 'Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá; e todo aquele que vive, e crê em mim, nunca morrerá.'",
      "Creio que a Páscoa deve ser celebrada intencionalmente com nossas crianças. Romanos 3:23 afirma que 'todos pecaram e estão destituídos da glória de Deus'. 'Todos' inclui as crianças. E como elas crerão e entenderão se não ouvirem a respeito?",
      "Pensando nisso, criamos de forma resumida o material 'Semana Santa - Linha do Tempo'. Ele é bem simples e não tomará mais que 15 minutos do seu dia, mas certamente a palavra semeada terá um peso eterno.",
      "Este advento compreende oito dias, do Domingo de Ramos ao Domingo de Páscoa. Cada dia traz um pequeno estudo e uma sugestão de atividade para fazer com os filhos ou com a família toda. Tenho certeza de que será um tempo precioso!"
    ],
    signOff: "No amor de Cristo,",
    verse: "\"Educa a criança no caminho em que deve andar; e até quando envelhecer não se desviará dele.\""
  };
  const downloadButtons = locale === "en"
    ? [
        { href: "/easter-advent.pdf", label: "Download Full PDF" },
        { href: "/easter-advent-en.pdf", label: "Download English Version" },
        { href: "/easter-advent-pt.pdf", label: "Download Portuguese Version" },
      ]
    : [
        { href: "/easter-advent.pdf", label: "Baixar PDF Completo" },
        { href: "/easter-advent-en.pdf", label: "Baixar Versão em Inglês" },
        { href: "/easter-advent-pt.pdf", label: "Baixar Versão em Português" },
      ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#2C2C2C]">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-16 md:px-8 md:py-24">
        {/* Article Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              {tPosts("category_faith")}
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-script leading-[0.95] mb-10 max-w-2xl mx-auto text-secondary">
            {tPosts("easter_title")}
          </h1>

          <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-12">
            <span className="font-bold text-foreground/60">
              {tPosts("easter_author")}
            </span>
            <span className="w-1 h-1 bg-primary/20 rounded-full" />
            <span>{content.date}</span>
            <span className="w-1 h-1 bg-primary/20 rounded-full" />
            <span>{content.readTime}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-[3rem] mb-20 shadow-sm">
          <Image
            src="/easter-timeline-cover.jpeg"
            alt={tPosts("easter_title")}
            width={1200}
            height={675}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto">
          <div className="prose prose-lg md:prose-xl font-serif leading-relaxed text-[#2C2C2C] space-y-10 prose-p:text-foreground/90 prose-headings:font-serif prose-headings:text-foreground/90">
            <p className="first-letter:text-8xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-secondary">
              {content.paragraphs[0]}
            </p>

            <p>{content.paragraphs[1]}</p>
            <p>{content.paragraphs[2]}</p>

            <div className="grid gap-6 my-16 md:grid-cols-2 not-prose">
              <div className="overflow-hidden rounded-[2rem] shadow-sm bg-white">
                <Image
                  src="/easter-timeline-story.jpeg"
                  alt={locale === "en" ? "Holy Week materials with Easter storybook and coloring page" : "Materiais da Semana Santa com livro e página para colorir"}
                  width={1200}
                  height={1600}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="overflow-hidden rounded-[2rem] shadow-sm bg-white">
                <Image
                  src="/easter-timeline-activity.jpeg"
                  alt={locale === "en" ? "Holy Week timeline cards and activity sheet" : "Cartões da linha do tempo da Semana Santa e folha de atividades"}
                  width={1200}
                  height={1600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <p>{content.paragraphs[3]}</p>

            <div className="bg-white/50 border border-primary/10 rounded-[2rem] p-10 my-16 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary/30" />
              <h4 className="font-script text-3xl text-secondary mb-6">
                {locale === "en" ? "The Hope We Teach" : "A Esperança que Ensinamos"}
              </h4>
              <p className="font-serif text-xl leading-relaxed text-foreground/80 italic">
                {content.paragraphs[4]}
              </p>
            </div>

            <p>{content.paragraphs[5]}</p>

            <div className="overflow-hidden rounded-[2rem] shadow-sm bg-white my-16 not-prose">
              <Image
                src="/easter-timeline-cross.jpeg"
                alt={locale === "en" ? "Bible, illustrated crucifixion page, and Holy Week cards" : "Bíblia, ilustração da crucificação e cartões da Semana Santa"}
                width={1200}
                height={1600}
                className="object-cover w-full h-full"
              />
            </div>

            <p>{content.paragraphs[6]}</p>
            <p>{content.paragraphs[7]}</p>
          </div>

          <div className="w-full flex flex-col gap-4 max-w-md mx-auto my-14">
            {downloadButtons.map((button) => (
              <a
                key={button.href}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-secondary/20 bg-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-secondary hover:text-white not-prose"
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>{button.label}</span>
              </a>
            ))}
          </div>

          <Suspense fallback={<ActionsSkeleton />}>
            <ArticleActionsWrapper postId={id} />
          </Suspense>

          <Suspense fallback={<CommentsSkeleton />}>
            <CommentsWrapper postId={id} currentSessionId={currentSessionId} />
          </Suspense>
        </article>

        <div className="mt-20 pt-16 border-t border-primary/10">
          <NewsletterSignup />
        </div>

        {/* Editorial Note */}
        <footer className="mt-16 border-t border-primary/10 pt-12 pb-12 text-center">
          <p className="font-script text-3xl text-secondary mb-6">
            {content.signOff}<br />
            {locale === "en" ? "Bruna & Vitoria" : "Bruna & Vitória"}
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
              {content.verse}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

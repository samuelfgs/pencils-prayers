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

const postContent = {
  "easter-2026": {
    categoryKey: "category_faith",
    titleKey: "easter_title",
    authorKey: "easter_author",
    image: "/easter-timeline-cover.jpeg",
    imageAlt: {
      en: "Easter Advent cover",
      pt: "Capa do Advento de Páscoa",
    },
    extraImages: [
      {
        type: "grid" as const,
        items: [
          {
            src: "/easter-timeline-story.jpeg",
            alt: {
              en: "Holy Week materials with Easter storybook and coloring page",
              pt: "Materiais da Semana Santa com livro e página para colorir",
            },
          },
          {
            src: "/easter-timeline-activity.jpeg",
            alt: {
              en: "Holy Week timeline cards and activity sheet",
              pt: "Cartões da linha do tempo da Semana Santa e folha de atividades",
            },
          },
        ],
      },
      {
        type: "single" as const,
        src: "/easter-timeline-cross.jpeg",
        alt: {
          en: "Bible, illustrated crucifixion page, and Holy Week cards",
          pt: "Bíblia, ilustração da crucificação e cartões da Semana Santa",
        },
      },
    ],
    downloadButtons: {
      en: [
        { href: "/easter-advent.pdf", label: "Download Full PDF" },
        { href: "/easter-advent-en.pdf", label: "Download English Version" },
        { href: "/easter-advent-pt.pdf", label: "Download Portuguese Version" },
      ],
      pt: [
        { href: "/easter-advent.pdf", label: "Baixar PDF Completo" },
        { href: "/easter-advent-en.pdf", label: "Baixar Versão em Inglês" },
        { href: "/easter-advent-pt.pdf", label: "Baixar Versão em Português" },
      ],
    },
    content: {
      en: {
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
        verse: "\"Direct your children onto the right path, and when they are older, they will not leave it.\"",
        quoteTitle: "The Hope We Teach",
      },
      pt: {
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
          "Este material compreende oito dias, do Domingo de Ramos ao Domingo de Páscoa. Cada dia traz um pequeno estudo e uma sugestão de atividade para fazer com os filhos ou com a família toda. Tenho certeza de que será um tempo precioso!"
        ],
        signOff: "No amor de Cristo,",
        verse: "\"Educa a criança no caminho em que deve andar; e até quando envelhecer não se desviará dele.\"",
        quoteTitle: "A Esperança que Ensinamos",
      },
    },
  },
  "easter-memory-game-2026": {
    categoryKey: "category_creativity",
    title: {
      en: "Easter Memory Game",
      pt: "Jogo da Memória de Páscoa",
    },
    author: {
      en: "Bruna & Vitoria",
      pt: "Bruna & Vitoria",
    },
    image: "/easter-memory-game-cover.png",
    imageAlt: {
      en: "Printable Easter memory game",
      pt: "Jogo da memória de Páscoa para imprimir",
    },
    extraImages: [],
    downloadButtons: {
      en: [{ href: "/easter-memory-game.pdf", label: "Download Printable PDF" }],
      pt: [{ href: "/easter-memory-game.pdf", label: "Baixar PDF para Imprimir" }],
    },
    content: {
      en: {
        date: "April 3, 2026",
        readTime: "3 min read",
        lead: "A playful Easter activity can become a gentle doorway into meaningful conversations about Jesus, attention, memory, and time together as a family.",
        paragraphs: [
          "A playful Easter activity can become a gentle doorway into meaningful conversations about Jesus, attention, memory, and time together as a family.",
          "This Easter memory game was created for simple moments at home, in homeschool rhythms, or during church activities with little ones. While the children match the cards, we can talk about the symbols, the story of Easter, and the hope we have in Christ.",
          "Memory games are wonderful because they develop concentration, visual perception, and patience in a very natural way. They also invite us to slow down and enjoy learning together without needing a complicated setup.",
          "You can print the cards on regular paper or cardstock, cut them out, and keep them in a small envelope or box so the activity is always ready. If you want, laminate the pieces for repeated use during the season.",
          "One sweet way to use this material is to invite the children to name what they see each time they turn over a card. That opens space for questions, storytelling, and short reflections that make the experience more intentional.",
          "Our suggestion is to keep the game light and joyful. You can play in pairs, create a family challenge, or leave a few cards available for independent quiet time.",
          "I hope this game brings sweet family moments to your home this Easter."
        ],
        signOff: "With love,",
        verse: "\"Direct your children onto the right path, and when they are older, they will not leave it.\"",
        quoteTitle: "Ideas for Using It",
        quoteText:
          "Print, cut, and play while naming each image aloud. Short moments like these often become the ones children remember most.",
      },
      pt: {
        date: "3 de Abril de 2026",
        readTime: "3 min de leitura",
        lead: "Uma atividade lúdica de Páscoa pode se tornar uma porta de entrada delicada para conversas significativas sobre Jesus, atenção, memória e tempo em família.",
        paragraphs: [
          "Uma atividade lúdica de Páscoa pode se tornar uma porta de entrada delicada para conversas significativas sobre Jesus, atenção, memória e tempo em família.",
          "Este jogo da memória de Páscoa foi criado para momentos simples em casa, na rotina de homeschool ou até em atividades com as crianças na igreja. Enquanto elas encontram os pares, podemos conversar sobre os símbolos, a história da Páscoa e a esperança que temos em Cristo.",
          "Jogos da memória são maravilhosos porque desenvolvem concentração, percepção visual e paciência de forma muito natural. Eles também nos convidam a desacelerar e aproveitar o aprendizado juntos sem exigir uma preparação complicada.",
          "Você pode imprimir as cartas em papel comum ou papel mais firme, recortar e guardar em um envelope ou caixinha para deixar a atividade sempre pronta. Se quiser, vale também plastificar as peças para usar várias vezes durante a temporada.",
          "Uma forma bonita de usar este material é convidar as crianças a nomearem o que veem sempre que virarem uma carta. Isso abre espaço para perguntas, narrativa e pequenas reflexões que tornam a experiência mais intencional.",
          "Nossa sugestão é manter a brincadeira leve e alegre. Vocês podem jogar em duplas, criar um desafio em família ou deixar algumas cartas disponíveis para um momento calmo de autonomia.",
          "Espero que esse jogo renda bons momentos em família nesta Páscoa."
        ],
        signOff: "Com carinho,",
        verse: "\"Educa a criança no caminho em que deve andar; e até quando envelhecer não se desviará dele.\"",
        quoteTitle: "Ideias de Uso",
        quoteText:
          "Imprima, recorte e brinque nomeando cada imagem em voz alta. Momentos curtos assim costumam se tornar os que as crianças mais guardam no coração.",
      },
    },
  },
} as const;

export default async function PostPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const post = postContent[id as keyof typeof postContent];
  const currentLocale = locale === "pt" ? "pt" : "en";

  if (!post) {
    notFound();
  }

  const cookieStore = await cookies();
  const currentSessionId = cookieStore.get("guest_session_id")?.value || null;

  const tPosts = await getTranslations('Posts');
  const content = post.content[currentLocale];
  const downloadButtons = post.downloadButtons[currentLocale];
  const title = "titleKey" in post ? tPosts(post.titleKey) : post.title[currentLocale];
  const author = "authorKey" in post ? tPosts(post.authorKey) : post.author[currentLocale];
  const firstExtraImage = post.extraImages[0];
  const secondExtraImage = post.extraImages[1];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#2C2C2C]">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-16 md:px-8 md:py-24">
        {/* Article Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              {tPosts(post.categoryKey)}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-script leading-[0.95] mb-8 max-w-xl mx-auto text-secondary">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-10">
            <span className="font-bold text-foreground/60">
              {author}
            </span>
            <span className="w-1 h-1 bg-primary/20 rounded-full" />
            <span>{content.date}</span>
            <span className="w-1 h-1 bg-primary/20 rounded-full" />
            <span>{content.readTime}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-[3rem] mb-16 shadow-sm">
          <Image
            src={post.image}
            alt={post.imageAlt[currentLocale]}
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

            {content.paragraphs.slice(1, 3).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {firstExtraImage && firstExtraImage.type === "grid" && (
              <div className="grid gap-6 my-16 md:grid-cols-2 not-prose">
                {firstExtraImage.items.map((item) => (
                  <div key={item.src} className="overflow-hidden rounded-[2rem] shadow-sm bg-white">
                    <Image
                      src={item.src}
                      alt={item.alt[currentLocale]}
                      width={1200}
                      height={1600}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}

            {content.paragraphs[3] && <p>{content.paragraphs[3]}</p>}

            <div className="bg-white/50 border border-primary/10 rounded-[2rem] p-10 my-16 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary/30" />
              <h4 className="font-script text-3xl text-secondary mb-6">
                {content.quoteTitle}
              </h4>
              <p className="font-serif text-xl leading-relaxed text-foreground/80 italic">
                {"quoteText" in content ? content.quoteText : content.paragraphs[4]}
              </p>
            </div>

            {content.paragraphs.slice(5, 6).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {secondExtraImage && secondExtraImage.type === "single" && (
              <div className="overflow-hidden rounded-[2rem] shadow-sm bg-white my-16 not-prose">
                <Image
                  src={secondExtraImage.src}
                  alt={secondExtraImage.alt[currentLocale]}
                  width={1200}
                  height={1600}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            {content.paragraphs.slice(6).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
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

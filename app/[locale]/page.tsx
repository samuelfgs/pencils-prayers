'use client';

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Heart, Share2, Bookmark } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  const tPosts = useTranslations('Posts');
  const tFooter = useTranslations('Footer');
  const locale = useLocale();

  const posts = [
    {
      id: "welcome",
      title: tPosts('welcome_title'),
      excerpt: tPosts('welcome_excerpt'),
      author: tPosts('welcome_author'),
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200",
      category: tPosts('welcome_category'),
      likes: 124,
      isAbout: true
    },
    {
      id: "easter-2026",
      title: tPosts('easter_title'),
      excerpt: tPosts('easter_excerpt'),
      author: tPosts('easter_author'),
      image: "/easter.png",
      category: tPosts('category_faith'),
      likes: 89,
      readingTime: locale === 'en' ? "8 min read" : "8 min de leitura"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#2C2C2C]">
      <Navbar />

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-24">
          {posts.map((post, index) => (
            <article key={`${post.id}-${index}`} className="group animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <Link href={post.id === 'welcome' ? `/${locale}/about` : `/${locale}/posts/${post.id}`}>
                  <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8 hover:text-primary transition-colors duration-500">
                    {post.title}
                  </h2>
                </Link>

                <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-10 shadow-sm transition-transform duration-700 group-hover:scale-[1.01] group-hover:shadow-md">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="px-2">
                  <p className="text-lg text-muted-foreground leading-relaxed font-sans mb-8 italic">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-primary/10">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/60">{tPosts('author', { name: post.author })}</span>
                        {post.readingTime && <span className="text-[9px] uppercase tracking-widest text-muted-foreground/50">{post.readingTime}</span>}
                      </div>
                    </div>
                    
                    <div className="flex gap-6 text-muted-foreground/40">
                       <button className="hover:text-secondary transition-colors"><Heart className="w-5 h-5" /></button>
                       <button className="hover:text-secondary transition-colors"><Bookmark className="w-5 h-5" /></button>
                       <button className="hover:text-secondary transition-colors"><Share2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <NewsletterSignup />

        {/* Editorial Note */}
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

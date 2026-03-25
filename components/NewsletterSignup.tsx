"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function NewsletterSignup() {
  const tNewsletter = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) return;

    startTransition(async () => {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setMessage(result.message || "Thank you for joining!");
        setEmail("");
      } else {
        setError(result.error || "Something went wrong.");
      }
    });
  };

  return (
    <section className="bg-white/50 border border-primary/10 rounded-[3rem] p-8 md:p-12 text-center shadow-sm">
      <span className="font-script text-3xl text-secondary mb-4 block">
        {tNewsletter("join_community")}
      </span>
      <h3 className="text-3xl font-serif mb-6">{tNewsletter("title")}</h3>
      <p className="text-sm text-muted-foreground mb-10 max-w-md mx-auto">
        {tNewsletter("text")}
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
        <div className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={tNewsletter("placeholder")}
            className="w-full px-6 py-4 rounded-full bg-white border border-primary/10 text-sm text-center focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-muted-foreground/40"
            required
            disabled={isPending}
          />
          <Button 
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto transition-all disabled:opacity-50"
          >
            {isPending ? "..." : tNewsletter("btn")}
          </Button>
        </div>

        {message && (
          <p className="text-sm text-secondary font-medium animate-in fade-in slide-in-from-top-1 duration-300">
            {message}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1 duration-300">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}

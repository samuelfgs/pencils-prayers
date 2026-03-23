"use client";

import { useState, useTransition } from "react";
import { Heart, Share2 } from "lucide-react";
import { useLocale } from "next-intl";
import { toggleLike } from "@/app/actions/interactions";

export default function ArticleActions({
  initialLikes,
  initialIsLiked,
  postId,
}: {
  initialLikes: number;
  initialIsLiked: boolean;
  postId: string;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const handleLike = () => {
    // Optimistic update
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1));

    // Persist to DB via Server Action
    startTransition(async () => {
      const result = await toggleLike(postId);
      // If the DB call fails, we revert the optimistic update
      if (!result.success) {
        setIsLiked(!newLikedState);
        setLikes((prev) => (!newLikedState ? prev + 1 : prev - 1));
      }
    });
  };

  return (
    <div className="mt-24 pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex gap-8">
        <button
          onClick={handleLike}
          disabled={isPending}
          className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors group ${isLiked ? "text-secondary" : "text-muted-foreground/60 hover:text-secondary"} disabled:opacity-70`}
        >
          <Heart
            className={`w-5 h-5 transition-all ${isLiked ? "fill-secondary text-secondary scale-110" : "group-hover:fill-secondary/20"}`}
          />
          <span>
            {/* {likes} {locale === "en" ? "Likes" : "Curtidas"} */}
          </span>
        </button>
        <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 hover:text-secondary transition-colors">
          <Share2 className="w-5 h-5" />
          <span>{locale === "en" ? "Share" : "Compartilhar"}</span>
        </button>
      </div>
    </div>
  );
}

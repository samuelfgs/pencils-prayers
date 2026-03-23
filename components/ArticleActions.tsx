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
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
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

  const handleShare = async () => {
    if (isSharing) return;

    const shareData = {
      title: "Pencils & Prayers",
      text:
        locale === "en"
          ? "Check out this article on Pencils & Prayers!"
          : "Confira este artigo no Pencils & Prayers!",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      setIsSharing(true);
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
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
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 hover:text-secondary transition-colors disabled:opacity-50"
        >
          <Share2 className={`w-5 h-5 ${copied ? "text-secondary" : ""}`} />
          <span className={copied ? "text-secondary" : ""}>
            {copied
              ? locale === "en"
                ? "Copied!"
                : "Copiado!"
              : locale === "en"
                ? "Share"
                : "Compartilhar"}
          </span>
        </button>
      </div>
    </div>
  );
}

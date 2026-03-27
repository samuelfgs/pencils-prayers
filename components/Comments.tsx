"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { addComment, deleteComment } from "@/app/actions/interactions";
import { Trash2 } from "lucide-react";

type CommentType = {
  id: string;
  guestName: string;
  content: string;
  sessionId?: string;
  createdAt: Date;
};

export default function Comments({
  postId,
  initialComments,
  currentSessionId: initialSessionId,
}: {
  postId: string;
  initialComments: {
    id: string;
    guestName: string | null;
    content: string;
    sessionId: string | null;
    createdAt: Date;
  }[];
  currentSessionId: string | null;
}) {
  const locale = useLocale();
  const [comments, setComments] = useState<CommentType[]>(
    initialComments.map((c) => ({
      ...c,
      guestName: c.guestName || "Anonymous",
      sessionId: c.sessionId || undefined,
    }))
  );
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(
    initialSessionId
  );
  const [isPosting, setIsPosting] = useState(false);
  const [isPending, startTransition] = useTransition();

  // If new comments come from the server (e.g. after a revalidation), update our state
  useEffect(() => {
    if (initialComments) {
      setComments(
        initialComments.map((c) => ({
          ...c,
          guestName: c.guestName || "Anonymous",
          sessionId: c.sessionId || undefined,
        }))
      );
    }
  }, [initialComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setError(null);
    setIsPosting(true);

    startTransition(async () => {
      try {
        const result = await addComment(postId, name, content);

        if (result.success && result.comment) {
          setComments((prev) => [result.comment as CommentType, ...prev]);
          if (result.comment.sessionId && !currentSessionId) {
            setCurrentSessionId(result.comment.sessionId);
          }
          setContent("");
        } else {
          console.error(result.error);
          setError(
            result.error ||
              (locale === "en"
                ? "Failed to post comment"
                : "Falha ao publicar comentário")
          );
        }
      } finally {
        setIsPosting(false);
      }
    });
  };

  const handleDelete = (commentId: string, commentSessionId: string) => {
    // Optimistic UI update
    const previousComments = [...comments];
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    setError(null);

    // Background server action
    startTransition(async () => {
      const result = await deleteComment(commentId, commentSessionId);
      if (!result.success) {
        setError(result.error || "Failed to delete comment");
        // Revert optimistic update
        setComments(previousComments);
      }
    });
  };

  return (
    <section className="mt-20 pt-16">
      <h3 className="text-3xl font-serif mb-12 text-foreground/90">
        {locale === "en" ? "Join the Conversation" : "Junte-se à Conversa"}
      </h3>

      <form onSubmit={handleSubmit} className="mb-16">
        <div className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest animate-in fade-in zoom-in-95 duration-300">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 ml-2"
            >
              {locale === "en" ? "Your Name" : "Seu Nome"}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={locale === "en" ? "Jane Doe" : "Maria Silva"}
              className="w-full md:w-1/2 px-6 py-4 bg-white/50 border border-primary/10 rounded-full focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 font-sans transition-all placeholder:text-muted-foreground/40"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="comment"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 ml-2"
            >
              {locale === "en" ? "Comment" : "Comentário"}
            </label>
            <textarea
              id="comment"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                locale === "en"
                  ? "Share your thoughts or how you celebrate..."
                  : "Compartilhe seus pensamentos ou como você celebra..."
              }
              className="w-full px-6 py-4 bg-white/50 border border-primary/10 rounded-[2rem] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 font-sans transition-all resize-none placeholder:text-muted-foreground/40 leading-relaxed"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPosting}
              className="rounded-full bg-[#2C2C2C] hover:bg-[#4A4A4A] text-white px-8 py-6 h-auto transition-all disabled:opacity-50"
            >
              {isPosting
                ? locale === "en"
                  ? "Posting..."
                  : "Publicando..."
                : locale === "en"
                  ? "Post Comment"
                  : "Publicar Comentário"}
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-12">
        {comments.length === 0 ? (
          <p className="text-muted-foreground italic font-serif">
            {locale === "en"
              ? "Be the first to share your thoughts."
              : "Seja o primeiro a compartilhar seus pensamentos."}
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 group relative"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary font-serif text-xl uppercase">
                {comment.guestName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-sm text-foreground/90">
                    {comment.guestName}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
                    {new Date(comment.createdAt).toLocaleDateString(
                      locale === "en" ? "en-US" : "pt-BR",
                      { month: "short", day: "numeric" }
                    )}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>

              {/* Delete Button (Only shows if session matches) */}
              {comment.sessionId && currentSessionId === comment.sessionId && (
                <button
                  onClick={() => handleDelete(comment.id, comment.sessionId!)}
                  className="absolute top-0 right-0 p-2 text-muted-foreground/30 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title={
                    locale === "en"
                      ? "Delete your comment"
                      : "Excluir seu comentário"
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

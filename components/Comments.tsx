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
    <section className="mt-10 border-t border-primary/10 pt-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground/55">
            {locale === "en" ? "Comments" : "Comentários"}
          </p>
          <div className="space-y-2">
            <h3 className="text-3xl font-serif text-foreground/90">
              {locale === "en" ? "Join the Conversation" : "Junte-se à Conversa"}
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              {locale === "en"
                ? "Share a memory, a reflection, or the way your family marks this season."
                : "Compartilhe uma lembrança, uma reflexão ou como sua família vive este tempo."}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-3 self-start rounded-full border border-primary/10 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground/60">
          <span className="h-2 w-2 rounded-full bg-secondary/60" />
          <span>
            {comments.length} {locale === "en" ? (comments.length === 1 ? "Comment" : "Comments") : comments.length === 1 ? "Comentário" : "Comentários"}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        <div className="rounded-[2rem] border border-primary/10 bg-white/55 p-6 shadow-sm md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="rounded-[1.5rem] border border-red-100 bg-red-50 px-5 py-4 text-xs font-bold uppercase tracking-widest text-red-600 animate-in fade-in zoom-in-95 duration-300">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60"
                  >
                    {locale === "en" ? "Your Name" : "Seu Nome"}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={locale === "en" ? "Jane Doe" : "Maria Silva"}
                    className="w-full md:max-w-sm rounded-full border border-primary/10 bg-white px-6 py-4 font-sans transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/5"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="comment"
                    className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60"
                  >
                    {locale === "en" ? "Comment" : "Comentário"}
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={
                      locale === "en"
                        ? "Share your thoughts or how you celebrate..."
                        : "Compartilhe seus pensamentos ou como você celebra..."
                    }
                    className="min-h-[152px] w-full resize-none rounded-[1.75rem] border border-primary/10 bg-white px-6 py-5 font-sans leading-relaxed transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/5"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isPosting || isPending}
                  className="h-auto rounded-full bg-[#2C2C2C] px-8 py-4 text-white transition-all hover:bg-[#4A4A4A] disabled:opacity-50"
                >
                  {isPosting || isPending
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
        </div>

        {comments.length > 0 && (
          <div className="rounded-[2rem] border border-primary/10 bg-white/35 p-6 md:p-8">
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="group relative flex gap-4 rounded-[1.5rem] border border-primary/8 bg-white/80 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10 font-serif text-xl uppercase text-secondary">
                    {comment.guestName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1 pr-8">
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-sm font-bold text-foreground/90">
                        {comment.guestName}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
                        {new Date(comment.createdAt).toLocaleDateString(
                          locale === "en" ? "en-US" : "pt-BR",
                          { month: "short", day: "numeric" }
                        )}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                      {comment.content}
                    </p>
                  </div>

                  {comment.sessionId && currentSessionId === comment.sessionId && (
                    <button
                      onClick={() => handleDelete(comment.id, comment.sessionId!)}
                      className="absolute right-4 top-4 p-2 text-muted-foreground/30 transition-colors hover:text-red-500 focus:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      title={
                        locale === "en"
                          ? "Delete your comment"
                          : "Excluir seu comentário"
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

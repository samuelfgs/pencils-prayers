import { getComments } from "@/app/actions/interactions";
import Comments from "./Comments";

export async function CommentsWrapper({ postId, currentSessionId }: { postId: string, currentSessionId: string | null }) {
  const comments = await getComments(postId);
  
  return (
    <Comments 
      postId={postId} 
      initialComments={comments} 
      currentSessionId={currentSessionId} 
    />
  );
}

export function CommentsSkeleton() {
  return (
    <section className="mt-10 animate-pulse border-t border-primary/10 pt-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="h-3 w-24 rounded-full bg-primary/10" />
          <div className="h-8 w-64 rounded-full bg-primary/10" />
          <div className="h-4 w-80 max-w-full rounded-full bg-primary/5" />
        </div>
        <div className="h-9 w-28 rounded-full bg-primary/10" />
      </div>

      <div className="space-y-8">
        <div className="rounded-[2rem] border border-primary/10 bg-white/55 p-6 shadow-sm md:p-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-5">
              <div className="space-y-2">
                <div className="h-3 w-20 rounded-full bg-primary/10" />
                <div className="h-12 w-full md:max-w-sm rounded-full bg-primary/5" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 rounded-full bg-primary/10" />
                <div className="h-40 w-full rounded-[1.75rem] bg-primary/5" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-48 rounded-full bg-primary/5" />
              <div className="h-12 w-40 rounded-full bg-primary/10" />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-primary/10 bg-white/35 p-6 md:p-8">
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex gap-4 rounded-[1.5rem] border border-primary/8 bg-white/80 p-5"
              >
                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-primary/10" />
                <div className="flex-1 space-y-3 py-1">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-32 rounded-full bg-primary/10" />
                    <div className="h-3 w-16 rounded-full bg-primary/5" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded-full bg-primary/5" />
                    <div className="h-3 w-5/6 rounded-full bg-primary/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

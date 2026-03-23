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
    <section className="mt-20 pt-16 border-t border-primary/10 animate-pulse">
      <div className="h-8 w-64 bg-primary/10 rounded-full mb-12" />
      
      {/* Form Skeleton */}
      <div className="mb-16 space-y-6">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-primary/10 rounded-full" />
          <div className="h-12 w-full md:w-1/2 bg-primary/5 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 bg-primary/10 rounded-full" />
          <div className="h-32 w-full bg-primary/5 rounded-[2rem]" />
        </div>
        <div className="flex justify-end">
          <div className="h-12 w-40 bg-primary/10 rounded-full" />
        </div>
      </div>

      {/* Comment List Skeleton */}
      <div className="space-y-12">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0" />
            <div className="flex-1 space-y-4 py-1">
              <div className="flex items-center gap-3">
                <div className="h-4 w-32 bg-primary/10 rounded-full" />
                <div className="h-3 w-16 bg-primary/5 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-primary/5 rounded-full w-full" />
                <div className="h-3 bg-primary/5 rounded-full w-5/6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

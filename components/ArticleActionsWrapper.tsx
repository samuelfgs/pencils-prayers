import { getLikeStatus } from "@/app/actions/interactions";
import ArticleActions from "./ArticleActions";

export async function ArticleActionsWrapper({ postId }: { postId: string }) {
  const likeData = await getLikeStatus(postId);
  const initialLikes = likeData.likes > 0 ? likeData.likes : 0; // Fallback
  
  return (
    <ArticleActions 
      postId={postId} 
      initialLikes={initialLikes} 
      initialIsLiked={likeData.isLiked} 
    />
  );
}

export function ActionsSkeleton() {
  return (
    <div className="mt-24 pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-8 animate-pulse">
      <div className="flex gap-8">
        <div className="h-6 w-24 bg-primary/10 rounded-full" />
        <div className="h-6 w-24 bg-primary/10 rounded-full" />
      </div>
    </div>
  );
}

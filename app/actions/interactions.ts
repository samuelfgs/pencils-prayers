"use server";

import { db } from "@/lib/db";
import { comments, downloads, likes, posts, profiles } from "@/lib/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

/**
 * Retrieves session data. 
 * @param createIfMissing If true, sets a new cookie (only valid in Server Actions).
 */
async function getSessionData(createIfMissing: boolean = false) {
  const cookieStore = await cookies();
  const headersList = await headers();

  // Extract IP from common headers
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const ip = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : realIp || "unknown-ip";

  let sessionId = cookieStore.get("guest_session_id")?.value;

  if (!sessionId && createIfMissing) {
    // Only set the cookie if we are in a context that allows it (Server Action)
    sessionId = `${ip}-${uuidv4()}`;
    cookieStore.set("guest_session_id", sessionId, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
  }
  
  return { sessionId: sessionId || null, ip };
}

// Find post by slug
async function getPostBySlug(slug: string) {
  try {
    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);
    return post;
  } catch (e) {
    console.error("[Graceful DB Fallback] getPostBySlug failed");
    return null;
  }
}

async function ensurePostExists(slug: string, title: string = "Mock Post") {
  try {
    const existing = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);
    if (existing.length > 0) return existing[0].id;

    // Create a mock profile to satisfy foreign key
    const authorId = uuidv4();
    await db
      .insert(profiles)
      .values({
        id: authorId,
        name: "System Admin",
      })
      .onConflictDoNothing();

    // Create the post
    const postId = uuidv4();
    await db.insert(posts).values({
      id: postId,
      authorId,
      title,
      slug,
      content: "Auto-generated for interactions.",
    });

    return postId;
  } catch (e) {
    console.warn(
      "[Graceful DB Fallback] ensurePostExists failed - returning null."
    );
    return null;
  }
}

export async function getComments(postSlug: string) {
  try {
    const post = await getPostBySlug(postSlug);
    if (!post) return [];

    return await db
      .select()
      .from(comments)
      .where(eq(comments.postId, post.id))
      .orderBy(desc(comments.createdAt));
  } catch (error) {
    console.error("[Graceful DB Fallback] Failed to fetch comments:", error);
    return [];
  }
}

export async function addComment(
  postSlug: string,
  guestName: string,
  content: string
) {
  try {
    // We can safely create a session here because this is a Server Action
    const { sessionId } = await getSessionData(true);
    const postId = await ensurePostExists(postSlug);

    if (!postId) throw new Error("Post could not be found or created (Database unavailable).");

    const [newComment] = await db
      .insert(comments)
      .values({
        postId,
        guestName,
        content,
        sessionId,
      })
      .returning();

    revalidatePath(`/[locale]/posts/${postSlug}`, "page");

    return {
      success: true,
      comment: newComment,
    };
  } catch (error) {
    console.error("Failed to add comment:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to add comment" };
  }
}

export async function deleteComment(
  commentId: string,
  commentSessionId: string
) {
  try {
    const { sessionId } = await getSessionData(false);

    // Authorization check: Only allow deletion if the current session matches the comment's session
    if (sessionId !== commentSessionId) {
      return { success: false, error: "Unauthorized" };
    }

    await db.delete(comments).where(eq(comments.id, commentId));
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return { success: false, error: "Failed to delete comment" };
  }
}

export async function getLikeStatus(postSlug: string) {
  try {
    // Read-only check for session
    const { sessionId } = await getSessionData(false);
    const post = await getPostBySlug(postSlug);
    if (!post) return { likes: 0, isLiked: false };

    const allLikes = await db
      .select()
      .from(likes)
      .where(eq(likes.postId, post.id));

    const isLiked = sessionId ? allLikes.some((like) => like.sessionId === sessionId) : false;

    return { likes: allLikes.length, isLiked };
  } catch (error) {
    console.error("[Graceful DB Fallback] Failed to fetch likes:", error);
    return { likes: 0, isLiked: false };
  }
}

export async function toggleLike(postSlug: string) {
  try {
    // Create session if missing during action
    const { sessionId } = await getSessionData(true);
    const postId = await ensurePostExists(postSlug);
    if (!postId) throw new Error("Post could not be found or created (Database unavailable).");

    const [existingLike] = await db
      .select()
      .from(likes)
      .where(and(eq(likes.postId, postId), eq(likes.sessionId, sessionId)))
      .limit(1);

    let isLiked = false;

    if (existingLike) {
      // Unlike
      await db.delete(likes).where(eq(likes.id, existingLike.id));
      isLiked = false;
    } else {
      // Like
      await db.insert(likes).values({
        postId: postId,
        sessionId,
      });
      isLiked = true;
    }

    revalidatePath(`/[locale]/posts/${postSlug}`, "page");
    return { success: true, liked: isLiked };
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to toggle like",
    };
  }
}

export async function getDownloadCount(assetKey: string) {
  try {
    const [result] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(downloads)
      .where(eq(downloads.assetKey, assetKey));

    return result?.count ?? 0;
  } catch (error) {
    console.error("[Graceful DB Fallback] Failed to fetch downloads:", error);
    return 0;
  }
}

export async function trackDownload(assetKey: string) {
  try {
    const { sessionId } = await getSessionData(true);

    await db.insert(downloads).values({
      assetKey,
      sessionId,
    });

    return {
      success: true,
      downloads: await getDownloadCount(assetKey),
    };
  } catch (error) {
    console.error("Failed to track download:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to track download",
    };
  }
}

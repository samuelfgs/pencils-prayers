"use server";

import { db } from "@/lib/db";
import { comments, likes, posts } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

// Helper to get or create a guest session ID and retrieve IP
async function getSessionData() {
  const cookieStore = await cookies();
  const headersList = await headers();

  // Extract IP from common headers
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const ip = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : realIp || "unknown-ip";

  let sessionId = cookieStore.get("guest_session_id")?.value;

  if (!sessionId) {
    // We combine IP and a UUID for a more robust session identifier
    sessionId = `${ip}-${uuidv4()}`;
    cookieStore.set("guest_session_id", sessionId, {
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return { sessionId, ip };
}

// Find post by slug
async function getPostBySlug(slug: string) {
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);
  return post;
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
    console.error("Failed to fetch comments:", error);
    throw error; // Let the caller handle it
  }
}

export async function addComment(
  postSlug: string,
  guestName: string,
  content: string
) {
  try {
    const { sessionId } = await getSessionData();
    const post = await getPostBySlug(postSlug);

    if (!post) throw new Error(`Post not found: ${postSlug}`);

    const [newComment] = await db
      .insert(comments)
      .values({
        postId: post.id,
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
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to add comment. Please check your database connection.",
    };
  }
}

export async function deleteComment(
  commentId: string,
  commentSessionId: string
) {
  try {
    const { sessionId } = await getSessionData();

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
    const { sessionId } = await getSessionData();
    const post = await getPostBySlug(postSlug);
    if (!post) return { likes: 0, isLiked: false };

    const allLikes = await db
      .select()
      .from(likes)
      .where(eq(likes.postId, post.id));

    const isLiked = allLikes.some((like) => like.sessionId === sessionId);

    return { likes: allLikes.length, isLiked };
  } catch (error) {
    console.error("Failed to fetch likes:", error);
    return { likes: 0, isLiked: false };
  }
}

export async function toggleLike(postSlug: string) {
  try {
    const { sessionId } = await getSessionData();
    const post = await getPostBySlug(postSlug);
    if (!post) throw new Error(`Post not found: ${postSlug}`);

    const [existingLike] = await db
      .select()
      .from(likes)
      .where(and(eq(likes.postId, post.id), eq(likes.sessionId, sessionId)))
      .limit(1);

    let isLiked = false;

    if (existingLike) {
      // Unlike
      await db.delete(likes).where(eq(likes.id, existingLike.id));
      isLiked = false;
    } else {
      // Like
      await db.insert(likes).values({
        postId: post.id,
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

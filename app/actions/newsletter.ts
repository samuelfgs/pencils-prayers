"use server";

import { db } from "@/lib/db";
import { newsletterSubscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function subscribeToNewsletter(email: string) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }

    // Check if already subscribed
    const existing = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      return { success: true, message: "You are already part of our community!" };
    }

    await db.insert(newsletterSubscriptions).values({
      email: email.toLowerCase(),
    });

    return { success: true, message: "Welcome to the community!" };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
  integer,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // Match auth.users id
  name: varchar("name", { length: 255 }).notNull(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  role: varchar("role", { length: 50 }).default("user"), // 'admin', 'user'
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  authorId: uuid("author_id").references(() => profiles.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  mainImageUrl: text("main_image_url"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  authorIdIdx: index("idx_posts_author_id").on(table.authorId),
  slugIdx: index("idx_posts_slug").on(table.slug),
}));

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id").references(() => posts.id).notNull(),
  userId: uuid("user_id").references(() => profiles.id), // Nullable for guests
  guestName: varchar("guest_name", { length: 255 }), // Added for guest names
  sessionId: varchar("session_id", { length: 255 }), // Track session for guest comments
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  postIdIdx: index("idx_comments_post_id").on(table.postId),
  userIdIdx: index("idx_comments_user_id").on(table.userId),
}));

export const likes = pgTable("likes", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id").references(() => posts.id).notNull(),
  userId: uuid("user_id").references(() => profiles.id), // Nullable for guests
  sessionId: varchar("session_id", { length: 255 }), // Track guest likes
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  postIdIdx: index("idx_likes_post_id").on(table.postId),
  userIdIdx: index("idx_likes_user_id").on(table.userId),
  // Updated to allow unique likes per session OR user
  uniqueLikeSession: index("idx_likes_session_unique").on(table.postId, table.sessionId),
}));

export const downloads = pgTable("downloads", {
  id: uuid("id").defaultRandom().primaryKey(),
  assetKey: varchar("asset_key", { length: 255 }).notNull(),
  sessionId: varchar("session_id", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  assetKeyIdx: index("idx_downloads_asset_key").on(table.assetKey),
  sessionIdIdx: index("idx_downloads_session_id").on(table.sessionId),
}));

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
export type Like = typeof likes.$inferSelect;
export type NewLike = typeof likes.$inferInsert;
export type Download = typeof downloads.$inferSelect;
export type NewDownload = typeof downloads.$inferInsert;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type NewNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;

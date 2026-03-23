require('dotenv').config({ path: './.env.local' });
const { db } = require('../lib/db');
const { posts, profiles } = require('../lib/db/schema');
const { v4: uuidv4 } = require('uuid');

async function seed() {
  try {
    console.log("Seeding database...");

    // 1. Create a profile for the authors
    const authorId = uuidv4();
    await db.insert(profiles).values({
      id: authorId,
      name: "Bruna & Vitoria",
      bio: "Two moms, one mission: educating with grace and faith.",
      role: "admin"
    }).onConflictDoNothing();

    console.log("Profile created/verified.");

    // 2. Create the Easter post
    await db.insert(posts).values({
      id: uuidv4(),
      authorId: authorId,
      title: "The Empty Tomb: A Heart-Rooted Easter for Little Hands",
      slug: "easter-2026",
      excerpt: "Focusing on the true meaning of the season with simple family traditions and creative activities that point back to Christ.",
      content: "Full content here...",
      mainImageUrl: "/easter.png",
      publishedAt: new Date()
    }).onConflictDoNothing();

    console.log("Easter post seeded.");

    // 3. Create the Welcome post
    await db.insert(posts).values({
      id: uuidv4(),
      authorId: authorId,
      title: "Welcome to Pencils & Prayers",
      slug: "welcome",
      excerpt: "A bright space for moms to find creative homeschool inspiration and rooted Christian encouragement.",
      content: "Full content here...",
      mainImageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200",
      publishedAt: new Date()
    }).onConflictDoNothing();

    console.log("Welcome post seeded.");
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();

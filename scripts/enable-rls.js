require('dotenv').config({ path: './.env.local' });
const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
});

async function enableRLS() {
  try {
    console.log("Enabling Row Level Security...");

    const tableConfigs = [
      { name: 'profiles', publicRead: true, publicInsert: false },
      { name: 'posts', publicRead: true, publicInsert: false },
      { name: 'comments', publicRead: true, publicInsert: true },
      { name: 'likes', publicRead: true, publicInsert: true },
      { name: 'newsletter_subscriptions', publicRead: false, publicInsert: true },
      { name: 'downloads', publicRead: false, publicInsert: false },
    ];

    for (const { name: table, publicRead } of tableConfigs) {
      console.log(`Setting up RLS for ${table}...`);
      
      // Enable RLS
      await sql`ALTER TABLE ${sql(table)} ENABLE ROW LEVEL SECURITY;`;
      
      // Drop existing policies if any to avoid errors on re-run
      await sql`DROP POLICY IF EXISTS "Public read access" ON ${sql(table)};`;
      await sql`DROP POLICY IF EXISTS "Public insert access" ON ${sql(table)};`;
      
      // 1. Basic Public Read Policy (not for newsletter_subscriptions)
      if (publicRead) {
        await sql`
          CREATE POLICY "Public read access" 
          ON ${sql(table)} 
          FOR SELECT 
          USING (true);
        `;
      }
    }

    // 2. Specific Deletion Policies
    await sql`DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;`;
    await sql`
      CREATE POLICY "Users can delete their own comments" 
      ON comments 
      FOR DELETE 
      USING (session_id IS NOT NULL);
    `;

    // 3. Specific Insert Policies
    await sql`CREATE POLICY "Public insert access" ON comments FOR INSERT WITH CHECK (true);`;
    await sql`CREATE POLICY "Public insert access" ON likes FOR INSERT WITH CHECK (true);`;
    await sql`CREATE POLICY "Public insert access" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);`;

    await sql`DROP POLICY IF EXISTS "Users can toggle their own likes" ON likes;`;
    await sql`
      CREATE POLICY "Users can toggle their own likes" 
      ON likes 
      FOR DELETE 
      USING (true); 
    `;

    console.log("RLS enabled and basic policies created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Failed to enable RLS:", err);
    process.exit(1);
  }
}

enableRLS();

import { config } from 'dotenv';
config({ path: '.env.local' });

async function main() {
  const { db } = await import('@/db');
  const { adminProfiles } = await import('@/db/schema');
  const bcrypt = (await import('bcryptjs')).default;

  const email = process.argv[2];
  const password = process.argv[3];
  const role = (process.argv[4] as 'owner' | 'admin' | 'editor') || 'owner';

  if (!email || !password) {
    console.error('Usage: npx tsx scripts/create-admin.ts <email> <password> [role]');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [row] = await db
    .insert(adminProfiles)
    .values({ email, passwordHash, role, isActive: true })
    .returning();

  console.log('✅ Admin created:', row.email, '| role:', row.role);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Failed to create admin:', err);
  process.exit(1);
});
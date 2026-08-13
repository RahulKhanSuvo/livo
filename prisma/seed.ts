import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { seedTaxonomy } from './seed-taxonomy';

async function main() {
  await seedTaxonomy();

  const adminExists = await prisma.user.findFirst({
    where: {
      role: 'ADMIN',
    },
  });

  if (adminExists) {
    console.log('✅ Admin already exists');
    return;
  }

  const result = await auth.api.signUpEmail({
    body: {
      name: 'Administrator',
      email: 'admin@livo.com',
      password: 'Admin@123456',
      rememberMe: false,
      role: 'ADMIN',
    },
  });

  await prisma.user.update({
    where: {
      id: result.user.id,
    },
    data: {
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin created');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

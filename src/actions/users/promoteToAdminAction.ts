'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Role } from '@/generated/prisma/enums';

const schema = z.object({
  email: z.string().email(),
});

export const promoteToAdminAction = createSafeAction(schema, async ({ email }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return { ok: false as const, message: 'You must be signed in.' };
  }

  const me = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (me?.role !== Role.SUPER_ADMIN) {
    return { ok: false as const, message: 'Only a super admin can assign admins.' };
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
    select: { id: true, name: true, role: true },
  });

  if (!user) {
    return { ok: false as const, message: 'No user found with that email.' };
  }

  if (user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) {
    return { ok: false as const, message: 'This user is already an admin.' };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { role: Role.ADMIN },
  });

  revalidatePath('/admin/users/admins');

  return { ok: true as const, message: `${user.name} is now an admin.` };
});

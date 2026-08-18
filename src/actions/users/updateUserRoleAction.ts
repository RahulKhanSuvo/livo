'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Role } from '@/generated/prisma/enums';

const schema = z.object({
  userId: z.string().min(1),
  role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']),
});

export const updateUserRoleAction = createSafeAction(schema, async ({ userId, role }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return { ok: false as const, message: 'You must be signed in.' };
  }

  const me = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (me?.role !== Role.SUPER_ADMIN) {
    return { ok: false as const, message: 'Only a super admin can manage roles.' };
  }

  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!target) {
    return { ok: false as const, message: 'User not found.' };
  }

  // Prevent removing the last remaining super admin.
  if (role !== Role.SUPER_ADMIN && target.role === Role.SUPER_ADMIN) {
    const superAdminCount = await prisma.user.count({
      where: { role: Role.SUPER_ADMIN },
    });
    if (superAdminCount <= 1) {
      return { ok: false as const, message: 'Cannot remove the last super admin.' };
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath('/admin/users/admins');

  return { ok: true as const, message: 'Role updated successfully.' };
});

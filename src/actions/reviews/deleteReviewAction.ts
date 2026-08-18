'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({ id: z.string().min(1) });

export const deleteReviewAction = createSafeAction(schema, async ({ id }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return { ok: false as const, message: 'You must be signed in.' };
  }

  const review = await prisma.review.findUnique({ where: { id }, select: { id: true } });
  if (!review) {
    return { ok: false as const, message: 'Review not found.' };
  }

  await prisma.review.delete({ where: { id } });

  revalidatePath('/admin/reviews');

  return { ok: true as const, message: 'Review deleted.' };
});

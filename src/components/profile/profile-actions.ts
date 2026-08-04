'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type ProfileResult = { success: true; message?: string } | { success: false; error: string };

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export async function updateProfileAction(values: { name: string }): Promise<ProfileResult> {
  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  try {
    await auth.api.updateUser({
      body: { name: parsed.data.name },
      headers: await headers(),
    });
  } catch {
    return { success: false, error: 'Could not update your profile' };
  }

  return { success: true, message: 'Profile updated' };
}

export async function changePasswordAction(values: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<ProfileResult> {
  const parsed = passwordSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  try {
    await auth.api.changePassword({
      body: {
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
        revokeOtherSessions: true,
      },
      headers: await headers(),
    });
  } catch {
    return { success: false, error: 'Current password is incorrect' };
  }

  return { success: true, message: 'Password changed' };
}

export async function signOutAction() {
  try {
    await auth.api.signOut({ headers: await headers() });
  } finally {
    redirect('/login');
  }
}

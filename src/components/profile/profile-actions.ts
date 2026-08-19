'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { uploadFileToCloudinary } from '@/lib/cloudinary';

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

export async function updateProfileImageAction(formData: FormData): Promise<ProfileResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { success: false, error: 'You must be signed in' };
  }

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: 'No image provided' };
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: 'Only JPG, PNG, WEBP or GIF images are allowed' };
  }

  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { success: false, error: 'Image must be under 5MB' };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadFileToCloudinary(buffer, file.name);

    if (!result?.secure_url) {
      return { success: false, error: 'Upload failed, please try again' };
    }

    await auth.api.updateUser({
      body: { image: result.secure_url },
      headers: await headers(),
    });
  } catch {
    return { success: false, error: 'Could not update your profile photo' };
  }

  return { success: true, message: 'Profile photo updated' };
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

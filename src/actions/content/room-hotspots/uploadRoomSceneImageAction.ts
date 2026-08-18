'use server';

import { requireAdmin } from '@/lib/permissions/require-admin';
import prisma from '@/lib/prisma';
import { uploadFileToCloudinary } from '@/lib/cloudinary';

export async function uploadRoomSceneImageAction(formData: FormData): Promise<{ url: string }> {
  await requireAdmin();

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    throw new Error('No image file provided');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadFileToCloudinary(buffer, file.name);

  if (!result?.secure_url) {
    throw new Error('Failed to upload image');
  }

  await prisma.roomScene.upsert({
    where: { id: 'global' },
    update: { imageUrl: result.secure_url },
    create: { id: 'global', imageUrl: result.secure_url },
  });

  return { url: result.secure_url };
}

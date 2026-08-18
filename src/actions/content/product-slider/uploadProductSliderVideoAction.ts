'use server';

import { requireAdmin } from '@/lib/permissions/require-admin';
import { uploadFileToCloudinary } from '@/lib/cloudinary';

export async function uploadProductSliderVideoAction(formData: FormData): Promise<{ url: string }> {
  await requireAdmin();

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    throw new Error('No video file provided');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadFileToCloudinary(buffer, file.name);

  if (!result?.secure_url) {
    throw new Error('Failed to upload video');
  }

  return { url: result.secure_url };
}

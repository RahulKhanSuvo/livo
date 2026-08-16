import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadFileToCloudinary = async (
  buffer: Buffer,
  fileName: string
): Promise<UploadApiResponse> => {
  if (!buffer || !fileName) {
    throw new Error('File buffer and file name are required for upload');
  }

  // Safe filename parsing
  const ext = path.extname(fileName).toLowerCase();
  const extensionWithoutDot = ext.replace('.', '');
  const parsedName = path.parse(fileName).name;

  const fileNameSanitized = parsedName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');

  const uniqueName = `${Math.random().toString(36).substring(2)}-${Date.now()}-${fileNameSanitized}`;
  const folderCategory = extensionWithoutDot === 'pdf' ? 'pdfs' : 'images';
  const targetFolder = `livo-ecommerce/${folderCategory}`;

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto',
          folder: targetFolder,
          public_id: uniqueName,
        },
        (error, result) => {
          console.log(error);
          if (error) {
            return reject(new Error('Failed to upload file to Cloudinary'));
          }
          resolve(result as UploadApiResponse);
        }
      )
      .end(buffer);
  });
};

export const deleteFileFromCloudinary = async (url: string): Promise<boolean> => {
  try {
    const regex = /\/v\d+\/(.+?)(?:\.([a-zA-Z0-9]+))?$/;
    const match = url.match(regex);

    if (!match || !match[1]) return false;

    const publicId = match[1];
    const extension = match[2]?.toLowerCase();
    const resourceType = extension === 'pdf' ? 'raw' : 'image';

    let result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    // Fallback if Cloudinary auto-classified a raw file as image
    if (result.result !== 'ok' && resourceType === 'raw') {
      result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
      });
    }

    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    throw new Error('Failed to delete file from Cloudinary');
  }
};

export const cloudinaryUpload = cloudinary;

'use server';

import prisma from '@/lib/prisma';
import { uploadFileToCloudinary } from '@/lib/cloudinary';
import { createSafeAction } from '@/lib/createSafeAction';
import { productValidationSchema } from './productValidation';
import { revalidatePath } from 'next/cache';

export const createProduct = createSafeAction(productValidationSchema, async (validatedData) => {
  // 1. Process variants and upload image files to Cloudinary concurrently
  const variantsData = await Promise.all(
    validatedData.variants.map(async (v) => {
      const rawImagesPayload = [];
      let sortOrder = 0;
      if (Array.isArray(v.images)) {
        for (const item of v.images) {
          let galleryUrl = '';
          if (typeof item === 'string') {
            galleryUrl = item;
          } else if (item instanceof File) {
            const buffer = Buffer.from(await item.arrayBuffer());
            const uploadRes = await uploadFileToCloudinary(buffer, item.name);
            galleryUrl = uploadRes.secure_url;
          }

          if (galleryUrl) {
            rawImagesPayload.push({
              imageUrl: galleryUrl,
              sortOrder: sortOrder++,
            });
          }
        }
      }

      return {
        colorHex: v.colorHex || null,
        stock: Number(v.stock),
        images: {
          create: rawImagesPayload,
        },
      };
    })
  );

  // 2. Save Product and Variants to Prisma DB
  const product = await prisma.product.create({
    data: {
      productTypeId: validatedData.productTypeId,
      name: validatedData.name,
      price: validatedData.price,
      description: validatedData.description,
      brandId: validatedData.brandId,
      salePrice: validatedData.salePrice || 0,
      materialId: validatedData.materialId,
      width: validatedData.width ? Number(validatedData.width) : 0,
      height: validatedData.height ? Number(validatedData.height) : 0,
      depth: validatedData.depth ? Number(validatedData.depth) : 0,
      weightKg: validatedData.weightKg ? Number(validatedData.weightKg) : 0,
      assemblyRequired: Boolean(validatedData.assemblyRequired),
      variants: {
        create: variantsData,
      },
    },
    include: {
      variants: {
        include: {
          images: true,
        },
      },
    },
  });

  revalidatePath('/admin/catalog/products');

  return product;
});

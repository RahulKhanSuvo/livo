'use server';
import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { uploadFileToCloudinary, deleteFileFromCloudinary } from '@/lib/cloudinary';
import { productValidationSchema } from './productValidation';

export const updateProduct = createSafeAction(
  productValidationSchema,
  async (validatedData) => {
    if (!validatedData.id) {
      throw new Error('Product ID is required for update');
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: validatedData.id },
      include: { variants: { include: { images: true } } },
    });

    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const newVariantIds = validatedData.variants.map((v) => v.id).filter(Boolean);
    const variantsToDelete = existingProduct.variants.filter((v) => !newVariantIds.includes(v.id));

    const variantsData = await Promise.all(
      validatedData.variants.map(async (v) => {
        const rawImagesPayload: { imageUrl: string; sortOrder: number }[] = [];
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
            } else if (typeof item === 'object' && item.imageUrl) {
              galleryUrl = item.imageUrl;
            }

            if (galleryUrl) {
              rawImagesPayload.push({
                imageUrl: galleryUrl,
                sortOrder: sortOrder++,
              });
            }
          }
        }

        if (v.id) {
          const existingVariant = existingProduct.variants.find((ev) => ev.id === v.id);
          if (existingVariant) {
            const newImageUrls = rawImagesPayload.map((img) => img.imageUrl);
            const imagesToDelete = existingVariant.images.filter(
              (img) => !newImageUrls.includes(img.imageUrl)
            );

            for (const img of imagesToDelete) {
              await deleteFileFromCloudinary(img.imageUrl).catch(() => {});
            }
          }
        }

        return {
          id: v.id || `new-${Math.random().toString(36).substr(2, 9)}`,
          isNew: !v.id,
          colorHex: v.colorHex || null,
          sku: v.sku,
          price: Number(v.price),
          salePrice: v.salePrice ? Number(v.salePrice) : null,
          stock: Number(v.stock),
          images: {
            deleteMany: {},
            create: rawImagesPayload,
          },
        };
      })
    );

    for (const variant of variantsToDelete) {
      for (const img of variant.images) {
        await deleteFileFromCloudinary(img.imageUrl).catch(() => {});
      }
    }

    if (variantsToDelete.length > 0) {
      await prisma.productVariant.deleteMany({
        where: { id: { in: variantsToDelete.map((v) => v.id) } },
      });
    }

    return await prisma.product.update({
      where: { id: validatedData.id },
      data: {
        productTypeId: validatedData.productTypeId,
        name: validatedData.name,
        slug: validatedData.slug,
        description: validatedData.description || null,
        brand: validatedData.brand || null,
        material: validatedData.material || null,
        finish: validatedData.finish || null,
        width: validatedData.width ? Number(validatedData.width) : null,
        height: validatedData.height ? Number(validatedData.height) : null,
        depth: validatedData.depth ? Number(validatedData.depth) : null,
        weightKg: validatedData.weightKg ? Number(validatedData.weightKg) : null,
        assemblyRequired: Boolean(validatedData.assemblyRequired),
        variants: {
          upsert: variantsData.map((v) => ({
            where: { id: v.isNew ? 'missing_id' : v.id },
            create: {
              colorHex: v.colorHex,
              sku: v.sku,
              price: v.price,
              salePrice: v.salePrice,
              stock: v.stock,
              images: v.images,
            },
            update: {
              colorHex: v.colorHex,
              sku: v.sku,
              price: v.price,
              salePrice: v.salePrice,
              stock: v.stock,
              images: v.images,
            },
          })),
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
  },
  {
    successMessage: 'Product updated successfully',
  }
);

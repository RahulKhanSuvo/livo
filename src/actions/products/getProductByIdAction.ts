'use server';
import prisma from '@/lib/prisma';
import { createSafeAction } from '@/lib/createSafeAction';

export const getProductByIdAction = createSafeAction(
  null,
  async (id: string) => {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: {
          include: {
            images: true,
          },
        },
        material: true,
        brand: true,
        productType: {
          include: {
            subCategory: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  },
  { successMessage: 'Product fetched successfully' }
);

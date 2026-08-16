'use server';
import prisma from '@/lib/prisma';
import { createSafeAction } from '@/lib/createSafeAction';

const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: {
        include: {
          images: true,
        },
      },
    },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

export const getProductByIdAction = createSafeAction<
  string,
  Awaited<ReturnType<typeof getProductById>>
>(null, getProductById, { successMessage: 'Product fetched successfully' });

'use server';
import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { productValidationSchema } from './productValidation';

export const updateProduct = createSafeAction(
  productValidationSchema,
  async ({ id, ...productData }) => {
    const isProductExist = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!isProductExist) {
      throw new Error('Product not found');
    }

    console.log(productData);
    return productData;
  },
  {
    successMessage: 'Product updated successfully',
  }
);

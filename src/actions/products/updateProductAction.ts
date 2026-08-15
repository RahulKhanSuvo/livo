import { createSafeAction } from '@/lib/createSafeAction';
import { productValidationSchema } from './productValidation';
import prisma from '@/lib/prisma';

export const updateProductAction = createSafeAction(
  productValidationSchema,
  async (data, context: { id: string }) => {
    const id = context?.id;

    if (!id) {
      throw new Error('Product ID is required');
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingProduct) {
      throw new Error('Product not found');
    }

    return;
  },
  { successMessage: 'Product updated successfully' }
);

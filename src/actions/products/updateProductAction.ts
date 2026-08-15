'use server';
import { createSafeAction } from '@/lib/createSafeAction';
import { productValidationSchema } from './productValidation';

export const updateProduct = createSafeAction(
  productValidationSchema,
  async ({ id, ...productData }) => {
    console.log(productData);
    return productData;
  },
  {
    successMessage: 'Product updated successfully',
  }
);

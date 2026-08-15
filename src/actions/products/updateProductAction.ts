import prisma from '@/lib/prisma';
import { createSafeAction } from '@/lib/createSafeAction';
import { productValidationSchema } from './productValidation';

export const updateProduct = createSafeAction(
  productValidationSchema,
  async ({ id, ...productData }) => {
    const product = await prisma.product.update({
      where: { id },
      data: {
        productTypeId: productData.productTypeId,
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        brand: productData.brand,
        material: productData.material,
        finish: productData.finish,
        width: productData.width,
        height: productData.height,
        depth: productData.depth,
        weightKg: productData.weightKg,
        assemblyRequired: productData.assemblyRequired,
      },
    });

    return product;
  },
  {
    successMessage: 'Product updated successfully',
  }
);

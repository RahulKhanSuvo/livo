'use server';
import prisma from '@/lib/prisma';

export async function getProductByIdAction(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
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
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error('Error in getProductByIdAction:', error);
    throw error;
  }
}

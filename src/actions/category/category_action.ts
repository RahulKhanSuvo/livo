'use server';

import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/permissions/require-admin';

export async function getProductType() {
  await requireAdmin();
  try {
    const response = await prisma.productType.findMany({
      include: {
        subCategory: {
          include: {
            category: true,
          },
        },
      },
    });
    return response;
  } catch (error) {
    console.error('Error: error message', error);
    throw error;
  }
}

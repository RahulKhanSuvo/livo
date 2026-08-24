'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

export async function getRelatedProductsAction({
  id,
  categoryId,
  productTypeId,
}: {
  id: string;
  categoryId?: string | null;
  productTypeId?: string | null;
}) {
  const conditions: Prisma.ProductWhereInput[] = [];

  if (categoryId) {
    conditions.push({ productType: { subCategory: { categoryId } } });
  }
  if (productTypeId) {
    conditions.push({ productTypeId });
  }

  const where: Prisma.ProductWhereInput = {
    id: { not: id },
    status: 'ACTIVE',
    ...(conditions.length > 0 ? { OR: conditions } : {}),
  };

  const products = await prisma.product.findMany({
    where,
    take: 8,
    orderBy: { createdAt: 'desc' },
    include: {
      variants: { include: { images: true } },
      brand: { select: { id: true, name: true } },
      productType: { include: { subCategory: { include: { category: true } } } },
    },
  });

  return JSON.parse(JSON.stringify(products));
}

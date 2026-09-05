import prisma from '@/lib/prisma';
import type { ProductResult } from '@/types/ai-assistant';

interface SearchProductsArgs {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}

export async function searchProductsTool(args: SearchProductsArgs): Promise<ProductResult[]> {
  const { query, category, minPrice, maxPrice, limit = 6 } = args;

  const whereConditions: object[] = [{ status: 'ACTIVE' }];

  if (query) {
    whereConditions.push({
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { productType: { name: { contains: query, mode: 'insensitive' } } },
      ],
    });
  }

  if (category) {
    whereConditions.push({
      productType: {
        subCategory: {
          category: {
            name: { contains: category, mode: 'insensitive' },
          },
        },
      },
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceFilter: { gte?: number; lte?: number } = {};
    if (minPrice !== undefined) priceFilter.gte = minPrice;
    if (maxPrice !== undefined) priceFilter.lte = maxPrice;
    whereConditions.push({ price: priceFilter });
  }

  const products = await prisma.product.findMany({
    where: { AND: whereConditions },
    take: Math.min(limit, 12),
    orderBy: [{ soldCount: 'desc' }, { createdAt: 'desc' }],
    include: {
      variants: {
        include: {
          images: { take: 1 },
        },
        take: 1,
      },
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

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    salePrice: p.salePrice,
    imageUrl: p.variants[0]?.images[0]?.imageUrl ?? null,
    slug: p.id,
  }));
}

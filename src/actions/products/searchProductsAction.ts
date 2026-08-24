'use server';

import prisma from '@/lib/prisma';

export interface SearchProductResult {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  href: string;
}

export interface SearchCategoryResult {
  id: string;
  name: string;
  href: string;
}

export interface SearchActionResult {
  success: boolean;
  products: SearchProductResult[];
  categories: SearchCategoryResult[];
  error?: string;
}

export async function searchProductsAction(query: string): Promise<SearchActionResult> {
  try {
    const trimmed = query.trim();
    if (!trimmed) {
      return {
        success: true,
        products: [],
        categories: [],
      };
    }

    const [products, subCategories] = await Promise.all([
      prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: trimmed, mode: 'insensitive' } },
            { description: { contains: trimmed, mode: 'insensitive' } },
            { brand: { name: { contains: trimmed, mode: 'insensitive' } } },
            { material: { name: { contains: trimmed, mode: 'insensitive' } } },
          ],
        },
        take: 8,
        include: {
          brand: {
            select: { name: true },
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
          variants: {
            take: 1,
            include: {
              images: {
                take: 1,
                orderBy: { sortOrder: 'asc' },
              },
            },
          },
        },
      }),

      prisma.subCategory.findMany({
        where: {
          OR: [
            { name: { contains: trimmed, mode: 'insensitive' } },
            { category: { name: { contains: trimmed, mode: 'insensitive' } } },
          ],
        },
        take: 5,
        include: {
          category: true,
        },
      }),
    ]);

    const formattedProducts: SearchProductResult[] = products.map((p) => {
      const firstImage = p.variants[0]?.images[0]?.imageUrl || '';

      return {
        id: p.id,
        name: p.name,
        brand: p.brand?.name || 'LIVO',
        price: `${p.price.toLocaleString('en-BD')} BDT`,
        image: firstImage,
        href: `/product/${p.id}`,
      };
    });

    const formattedCategories: SearchCategoryResult[] = subCategories.map((sc) => ({
      id: sc.id,
      name: `${sc.category.name} > ${sc.name}`,
      href: `/shop/${sc.category.slug}/${sc.slug}`,
    }));

    return {
      success: true,
      products: formattedProducts,
      categories: formattedCategories,
    };
  } catch (error) {
    console.error('Error in searchProductsAction:', error);
    return {
      success: false,
      products: [],
      categories: [],
      error: 'Failed to search products',
    };
  }
}

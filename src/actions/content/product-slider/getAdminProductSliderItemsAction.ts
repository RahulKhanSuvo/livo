'use server';

import { requireAdmin } from '@/lib/permissions/require-admin';
import prisma from '@/lib/prisma';
import type { AdminProductSliderItem, ProductSliderProduct } from './product-slider.type';

export async function getAdminProductSliderItemsAction(): Promise<AdminProductSliderItem[]> {
  await requireAdmin();

  const items = await prisma.productSliderItem.findMany({
    orderBy: { order: 'asc' },
  });

  const productIds = items.map((i) => i.productId);

  const products = productIds.length
    ? await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: {
          id: true,
          name: true,
          price: true,
          brand: { select: { name: true } },
          variants: {
            select: { images: { select: { imageUrl: true }, take: 1 } },
            take: 1,
          },
          productType: {
            select: {
              subCategory: {
                select: { slug: true, category: { select: { slug: true } } },
              },
            },
          },
        },
      })
    : [];

  const productMap = new Map(products.map((p) => [p.id, p]));

  return items.map((item) => {
    const p = productMap.get(item.productId);
    let product: ProductSliderProduct | null = null;

    if (p) {
      const categorySlug = p.productType?.subCategory?.category?.slug;
      const subCategorySlug = p.productType?.subCategory?.slug;
      product = {
        id: p.id,
        name: p.name,
        price: Number(p.price),
        brand: p.brand?.name ?? null,
        image: p.variants[0]?.images[0]?.imageUrl ?? null,
        href:
          categorySlug && subCategorySlug
            ? `/shop/${categorySlug}/${subCategorySlug}/${p.id}`
            : '#',
      };
    }

    return {
      id: item.id,
      productId: item.productId,
      mediaUrl: item.mediaUrl,
      order: item.order,
      isActive: item.isActive,
      product,
    };
  });
}

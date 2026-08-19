'use server';

import prisma from '@/lib/prisma';
import type { ProductSliderProduct, PublicProductSliderItem } from './product-slider.type';

function buildHref(productId: string) {
  return `/product/${productId}`;
}

export async function getProductSliderItemsAction(): Promise<PublicProductSliderItem[]> {
  const items = await prisma.productSliderItem.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  if (items.length === 0) return [];

  const productIds = items.map((i) => i.productId);

  const products = await prisma.product.findMany({
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
    },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));
  const result: PublicProductSliderItem[] = [];

  for (const item of items) {
    const p = productMap.get(item.productId);
    if (!p) continue;

    const href = buildHref(p.id);

    const product: ProductSliderProduct = {
      id: p.id,
      name: p.name,
      price: Number(p.price),
      brand: p.brand?.name ?? null,
      image: p.variants[0]?.images[0]?.imageUrl ?? null,
      href,
    };

    result.push({
      id: item.id,
      mediaUrl: item.mediaUrl,
      product,
    });
  }

  return result;
}

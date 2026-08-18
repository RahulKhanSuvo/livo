'use server';

import prisma from '@/lib/prisma';
import type { PublicRoomHotspot, RoomHotspotProduct } from './room-hotspots.type';

function buildHref(
  categorySlug: string | undefined,
  subCategorySlug: string | undefined,
  productId: string
) {
  if (!categorySlug || !subCategorySlug) return null;
  return `/shop/${categorySlug}/${subCategorySlug}/${productId}`;
}

export async function getRoomHotspotsAction(): Promise<PublicRoomHotspot[]> {
  const hotspots = await prisma.roomHotspot.findMany({
    where: { isActive: true, productId: { not: null } },
    orderBy: { createdAt: 'asc' },
  });

  if (hotspots.length === 0) return [];

  const productIds = hotspots.map((h) => h.productId as string);

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
      productType: {
        select: {
          subCategory: {
            select: { slug: true, category: { select: { slug: true } } },
          },
        },
      },
    },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));
  const result: PublicRoomHotspot[] = [];

  for (const h of hotspots) {
    const p = productMap.get(h.productId as string);
    if (!p) continue;

    const categorySlug = p.productType?.subCategory?.category?.slug;
    const subCategorySlug = p.productType?.subCategory?.slug;
    const href = buildHref(categorySlug, subCategorySlug, p.id);
    if (!href) continue;

    const product: RoomHotspotProduct = {
      id: p.id,
      name: p.name,
      price: Number(p.price),
      brand: p.brand?.name ?? null,
      image: p.variants[0]?.images[0]?.imageUrl ?? null,
      href,
    };

    result.push({
      id: h.id,
      x: h.x,
      y: h.y,
      cardPosition: (h.cardPosition as PublicRoomHotspot['cardPosition']) ?? null,
      product,
    });
  }

  return result;
}

'use server';

import { requireAdmin } from '@/lib/permissions/require-admin';
import prisma from '@/lib/prisma';
import type { AdminRoomHotspot, RoomHotspotProduct } from './room-hotspots.type';

export async function getAdminRoomHotspotsAction(): Promise<AdminRoomHotspot[]> {
  await requireAdmin();

  const hotspots = await prisma.roomHotspot.findMany({
    orderBy: { createdAt: 'asc' },
  });

  const productIds = hotspots.map((h) => h.productId).filter((id): id is string => Boolean(id));

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

  return hotspots.map((h) => {
    const p = h.productId ? productMap.get(h.productId) : undefined;
    let product: RoomHotspotProduct | null = null;

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
      id: h.id,
      x: h.x,
      y: h.y,
      cardPosition: (h.cardPosition as AdminRoomHotspot['cardPosition']) ?? null,
      productId: h.productId ?? null,
      isActive: h.isActive,
      product,
    };
  });
}

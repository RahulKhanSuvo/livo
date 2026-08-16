'use server';

import { ProfileOrder } from '@/components/profile/profile.data';
import prisma from '@/lib/prisma';

export async function getOrders(userId: string): Promise<ProfileOrder[]> {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        items: {
          include: {
            product: { select: { name: true, id: true } },
            productVariant: {
              include: {
                images: { orderBy: { sortOrder: 'asc' }, take: 1 },
              },
            },
          },
        },
      },
    });

    return orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      total: order.total.toNumber(),
      createdAt: order.createdAt.toISOString(),
      itemCount: order.items.reduce((sum: number, item) => sum + item.quantity, 0),
      items: order.items.map((item) => ({
        id: item.id,
        name: item.product.name,
        slug: item.product.id,
        image: item.productVariant.images[0]?.imageUrl ?? null,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toNumber(),
      })),
    }));
  } catch {
    return [];
  }
}

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { ProfileShell } from '@/components/profile/profile-shell';
import type { ProfileOrder } from '@/components/profile/profile.data';

async function getOrders(userId: string): Promise<ProfileOrder[]> {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        items: {
          include: {
            product: { select: { name: true, slug: true } },
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
      itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
      items: order.items.map((item) => ({
        id: item.id,
        name: item.product.name,
        slug: item.product.slug,
        image: item.productVariant.images[0]?.imageUrl ?? null,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toNumber(),
      })),
    }));
  } catch {
    return [];
  }
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/login');
  }

  const user = session.user;
  const orders = await getOrders(user.id);

  return (
    <ProfileShell
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      }}
      orders={orders}
    />
  );
}

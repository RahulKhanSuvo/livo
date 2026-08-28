'use server';

import prisma from '@/lib/prisma';

export async function exportOrdersAction() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, email: true } },
      items: true,
    },
  });

  const headers = [
    'Order ID',
    'Order Number',
    'Customer Name',
    'Customer Email',
    'Status',
    'Payment Status',
    'Total Amount',
    'Item Count',
    'Created At',
  ];

  const rows = orders.map((order) => [
    order.id,
    order.orderNumber,
    `"${(order.user?.name ?? order.fullName ?? 'Guest').replace(/"/g, '""')}"`,
    `"${(order.user?.email ?? order.email ?? '').replace(/"/g, '""')}"`,
    order.status,
    order.paymentStatus,
    order.total.toString(),
    order.items.reduce((sum, item) => sum + item.quantity, 0).toString(),
    order.createdAt.toISOString(),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  return {
    filename: `orders_export_${new Date().toISOString().slice(0, 10)}.csv`,
    csvContent,
  };
}

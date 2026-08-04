import { OrdersPage } from '@/components/admin/orders/orders-page';

export default async function OrdersRoute({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  return <OrdersPage status={status ?? 'ALL'} />;
}

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getOrders } from '../_action';
import { OrdersSection } from '@/components/profile/sections/orders-section';

export default async function OrdersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const orders = await getOrders(session.user.id);

  return <OrdersSection orders={orders} />;
}

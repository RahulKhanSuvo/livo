import { OrdersEmptyState } from './orders-empty-state';
import { OrderCard } from './order-card';
import type { ProfileOrder } from '../profile.data';

export function OrdersSection({ orders }: { orders: ProfileOrder[] }) {
  if (orders.length === 0) {
    return <OrdersEmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-serif text-3xl tracking-tight text-[#161512]">
          Your orders
          <span className="text-[#d98e63]">.</span>
        </h2>
        <span className="text-sm text-[#4c4a45]/55">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

import { OrderRow } from '@/actions/order/getAllOrdersAction';

type OrderMetaRowProps = {
  order: OrderRow;
};

export function OrderMetaRow({ order }: OrderMetaRowProps) {
  const formattedDate = new Date(order.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="grid grid-cols-12 border-b border-dashed border-gray-200 dark:border-zinc-800 px-4 py-3 text-xs bg-gray-50/40 dark:bg-zinc-900/30 gap-y-2">
      <div className="col-span-6 flex items-center gap-3">
        <div className="flex w-full justify-between gap-4 sm:gap-8">
          <span className="text-gray-500 dark:text-zinc-400">
            Customer:{' '}
            <span className="font-semibold text-gray-900 dark:text-zinc-100">
              {order.customer || 'Guest'}
            </span>
          </span>

          <span className="text-gray-500 dark:text-zinc-400">
            Date of Order{' '}
            <span className="font-semibold text-gray-900 dark:text-zinc-100">{formattedDate}</span>
          </span>
        </div>
      </div>

      <div className="col-span-6 flex justify-end">
        <span className="text-gray-500 dark:text-zinc-400 font-normal">
          Order ID:{' '}
          <span className="font-semibold text-gray-900 dark:text-zinc-100 font-mono">
            {order.orderNumber || order.id}
          </span>
        </span>
      </div>
    </div>
  );
}

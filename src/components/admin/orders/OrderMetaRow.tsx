import { OrderRow } from '@/actions/order/getAllOrdersAction';
import { Checkbox } from '@/components/ui/checkbox';

type OrderMetaRowProps = {
  order: OrderRow;
  isSelected?: boolean;
  onSelectChange?: (checked: boolean) => void;
};

export function OrderMetaRow({ order, isSelected, onSelectChange }: OrderMetaRowProps) {
  const formattedDate = new Date(order.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="flex flex-wrap items-center justify-between border-b border-dashed border-gray-200 dark:border-zinc-800 px-4 py-3 text-xs bg-gray-50/40 dark:bg-zinc-900/30 gap-y-2">
      <div className="flex items-center gap-4 sm:gap-8">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectChange?.(!!checked)}
          aria-label={`Select order ${order.orderNumber || order.id}`}
        />

        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
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

      <span className="text-gray-500 dark:text-zinc-400 font-normal">
        Order ID:{' '}
        <span className="font-semibold text-gray-900 dark:text-zinc-100 font-mono">
          {order.orderNumber || order.id}
        </span>
      </span>
    </div>
  );
}

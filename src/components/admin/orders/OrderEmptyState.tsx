'use client';

export function OrderEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">No orders found.</p>
    </div>
  );
}

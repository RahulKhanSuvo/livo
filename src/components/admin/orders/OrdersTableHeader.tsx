'use client';

export function OrdersTableHeader() {
  return (
    <div className="grid grid-cols-12 items-center bg-[#f8fafb] px-6 py-3 rounded border-b">
      <div className="col-span-5 flex items-center gap-3">
        <span>Product</span>
      </div>
      <div className="col-span-2">Price</div>
      <div className="col-span-2">Payment</div>
      <div className="col-span-2">Status</div>
      <div className="col-span-1 text-right pr-2">Action</div>
    </div>
  );
}

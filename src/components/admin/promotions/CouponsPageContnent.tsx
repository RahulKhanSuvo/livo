'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '@/components/shared/data-table';
import { useServerPagination } from '@/hooks/useServerPagination';
import { getCouponsAction } from '@/actions/coupon/getCouponsAction';
import { deleteCouponAction } from '@/actions/coupon/deleteCouponAction';
import { updateCouponAction } from '@/actions/coupon/updateCouponAction';
import { couponColumns } from './columns';
import { CouponFormModal } from './coupon-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { toast } from 'sonner';
import type { CouponRow } from '@/actions/coupon/coupon.validation';

export default function CouponsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<CouponRow | null>(null);
  const [deleting, setDeleting] = useState<CouponRow | null>(null);

  const { paginationState, handlePaginationChange, isPending } = useServerPagination({
    searchParams,
    defaultPage: 1,
    defaultLimit: 10,
  });

  const currentPage = paginationState.pageIndex + 1;
  const currentLimit = paginationState.pageSize;
  const search = searchParams.get('search') ?? '';

  const applyParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(window.location.search);
      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      params.set('page', '1');
      router.replace(`/admin/promotions/coupons?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      applyParams({ search: searchInput });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput, applyParams]);

  const { data: result, isFetching } = useQuery({
    queryKey: ['coupons', currentPage, currentLimit, search],
    queryFn: () => getCouponsAction({ page: currentPage, limit: currentLimit, search }),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['coupons'] });

  async function handleToggle(c: CouponRow) {
    const res = await updateCouponAction({ id: c.id, active: !c.active });
    if (res.success) {
      toast.success(c.active ? 'Coupon deactivated' : 'Coupon activated');
      invalidate();
    } else {
      toast.error(res.message || 'Failed to update coupon');
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    const res = await deleteCouponAction({ id: deleting.id });
    if (res.success) {
      toast.success('Coupon deleted');
      invalidate();
    } else {
      toast.error(res.message || 'Failed to delete coupon');
    }
    setDeleting(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm">
          <HugeiconsIcon
            icon={Search01Icon}
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search coupons..."
            className="h-9 rounded-full pl-9"
          />
        </div>
        <Button
          className="ml-auto gap-1.5"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
          New coupon
        </Button>
      </div>

      <DataTable
        isPending={isPending || isFetching}
        pagination={{
          state: paginationState,
          onPaginationChange: handlePaginationChange,
          totalRows: result?.data?.total || 0,
        }}
        columns={couponColumns({
          onEdit: (c) => {
            setEditing(c);
            setFormOpen(true);
          },
          onDelete: setDeleting,
          onToggle: handleToggle,
        })}
        data={result?.data?.coupons || []}
        tableKey="coupon-table"
        emptyMessage="No coupons found."
      />

      {formOpen && (
        <CouponFormModal
          coupon={editing}
          open={formOpen}
          onOpenChange={setFormOpen}
          onSaved={invalidate}
        />
      )}

      <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete coupon</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-foreground">{deleting?.code}</span>? This cannot be
            undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

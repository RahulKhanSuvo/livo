'use client';

import * as React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlusSignIcon,
  PencilEdit02Icon,
  Delete01Icon,
  Upload01Icon,
  Video01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from '@hugeicons/core-free-icons';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PageHeader } from '@/components/admin/ui/page-header';
import { ProductPicker } from '@/components/admin/content/room-hotspots/ProductPicker';

import {
  getAdminProductSliderItemsAction,
  upsertProductSliderItemAction,
  deleteProductSliderItemAction,
  uploadProductSliderVideoAction,
} from '@/actions/content/product-slider';
import type { AdminProductSliderItem } from '@/actions/content/product-slider/product-slider.type';

const SLIDES_KEY = ['admin-product-slider'] as const;

interface FormState {
  id?: string;
  productId: string | null;
  productName: string;
  mediaUrl: string;
  order: number;
  isActive: boolean;
}

const emptyForm: FormState = {
  productId: null,
  productName: '',
  mediaUrl: '',
  order: 0,
  isActive: true,
};

export function ProductSliderManager() {
  const queryClient = useQueryClient();
  const videoFileRef = React.useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [uploading, setUploading] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [reordering, setReordering] = React.useState(false);

  const slidesQuery = useQuery({
    queryKey: SLIDES_KEY,
    queryFn: getAdminProductSliderItemsAction,
  });

  const slides = slidesQuery.data ?? [];
  const ordered = [...slides].sort((a, b) => a.order - b.order);

  const resetForm = () => {
    setForm(emptyForm);
  };

  const openAdd = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (item: AdminProductSliderItem) => {
    setForm({
      id: item.id,
      productId: item.productId,
      productName: item.product?.name ?? '',
      mediaUrl: item.mediaUrl,
      order: item.order,
      isActive: item.isActive,
    });
    setDialogOpen(true);
  };

  const onVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await uploadProductSliderVideoAction(fd);
      setForm((f) => ({ ...f, mediaUrl: res.url }));
      toast.success('Video uploaded');
    } catch {
      toast.error('Upload failed, please try again');
    } finally {
      setUploading(false);
    }
  };

  const canSave = Boolean(form.productId && form.mediaUrl) && !uploading;

  const handleSave = async () => {
    if (!form.productId || !form.mediaUrl) return;
    const res = await upsertProductSliderItemAction({
      id: form.id,
      productId: form.productId,
      mediaUrl: form.mediaUrl,
      order: form.order,
      isActive: form.isActive,
    });
    if (res.success === false) {
      toast.error(res.message ?? 'Could not save slide');
      return;
    }
    toast.success(form.id ? 'Slide updated' : 'Slide added');
    queryClient.invalidateQueries({ queryKey: SLIDES_KEY });
    setDialogOpen(false);
    resetForm();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await deleteProductSliderItemAction({ id: deleteId });
    if (res.success === false) {
      toast.error(res.message ?? 'Could not delete slide');
    } else {
      toast.success('Slide deleted');
    }
    queryClient.invalidateQueries({ queryKey: SLIDES_KEY });
    setDeleteId(null);
  };

  const reorder = async (id: string, dir: 'up' | 'down') => {
    const idx = ordered.findIndex((s) => s.id === id);
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= ordered.length) return;
    const a = ordered[idx];
    const b = ordered[swapIdx];
    setReordering(true);
    try {
      await Promise.all([
        upsertProductSliderItemAction({
          id: a.id,
          productId: a.productId,
          mediaUrl: a.mediaUrl,
          order: b.order,
          isActive: a.isActive,
        }),
        upsertProductSliderItemAction({
          id: b.id,
          productId: b.productId,
          mediaUrl: b.mediaUrl,
          order: a.order,
          isActive: b.isActive,
        }),
      ]);
      queryClient.invalidateQueries({ queryKey: SLIDES_KEY });
    } catch {
      toast.error('Could not reorder');
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Slider"
        description="Curate the homepage Inspiration slider. Each slide pairs an inspiration video with a linked product card."
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {slidesQuery.isLoading
            ? 'Loading…'
            : `${slides.length} slide${slides.length === 1 ? '' : 's'}`}
        </p>
        <Button type="button" onClick={openAdd}>
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
          Add slide
        </Button>
      </div>

      {slidesQuery.isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden p-0">
              <Skeleton className="aspect-video w-full rounded-none" />
              <div className="space-y-2 p-3">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </Card>
          ))}
        </div>
      ) : slides.length === 0 ? (
        <div className="rounded-sm border border-dashed p-10 text-center">
          <HugeiconsIcon
            icon={Video01Icon}
            size={28}
            className="mx-auto mb-3 text-muted-foreground"
          />
          <p className="text-sm font-medium">No slides yet</p>
          <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
            Add your first inspiration slide to feature it on the homepage.
          </p>
          <Button type="button" className="mt-4" onClick={openAdd}>
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add slide
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((item, idx) => (
            <Card key={item.id} className="flex flex-col overflow-hidden p-0">
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                <video
                  src={item.mediaUrl}
                  className="h-full w-full object-cover"
                  muted
                  preload="metadata"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
                  <HugeiconsIcon icon={Video01Icon} size={20} className="text-white" />
                </div>
                <Badge
                  variant={item.isActive ? 'default' : 'secondary'}
                  className="absolute right-2 top-2"
                >
                  {item.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <span className="absolute left-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  #{item.order}
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-3 p-3">
                <div>
                  <p className="truncate text-sm font-medium">
                    {item.product?.name ?? (
                      <span className="text-muted-foreground">Unknown product</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.product?.brand ?? '—'}</p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={reordering || idx === 0}
                      onClick={() => reorder(item.id, 'up')}
                      aria-label="Move up"
                    >
                      <HugeiconsIcon icon={ArrowUp01Icon} size={16} />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={reordering || idx === ordered.length - 1}
                      onClick={() => reorder(item.id, 'down')}
                      aria-label="Move down"
                    >
                      <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(item)}
                    >
                      <HugeiconsIcon icon={PencilEdit02Icon} size={14} />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(item.id)}
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) resetForm();
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? 'Edit slide' : 'New slide'}</DialogTitle>
            <DialogDescription>Pair an inspiration video with a linked product.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Product</Label>
              <ProductPicker
                value={form.productId}
                displayName={form.productName}
                onSelect={(id, name) =>
                  setForm((f) => ({ ...f, productId: id, productName: name }))
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label>Inspiration video</Label>
              <div className="flex items-center gap-3">
                <input
                  ref={videoFileRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={onVideoChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => videoFileRef.current?.click()}
                  disabled={uploading}
                >
                  <HugeiconsIcon icon={Upload01Icon} size={16} />
                  {uploading ? 'Uploading…' : form.mediaUrl ? 'Replace video' : 'Upload video'}
                </Button>
                {form.mediaUrl && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <HugeiconsIcon icon={Video01Icon} size={14} />
                    Video uploaded
                  </span>
                )}
              </div>
              {form.mediaUrl && (
                <video
                  src={form.mediaUrl}
                  className="mt-2 h-28 w-auto rounded border"
                  muted
                  controls
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                />
              </div>
              <div className="flex items-end gap-2">
                <input
                  id="active"
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  className="size-4"
                />
                <Label htmlFor="active" className="cursor-pointer">
                  Active (visible on homepage)
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} disabled={!canSave}>
              {uploading ? 'Saving…' : 'Save slide'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete slide</DialogTitle>
            <DialogDescription>
              This will permanently remove the slide from the homepage. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductSliderManager;

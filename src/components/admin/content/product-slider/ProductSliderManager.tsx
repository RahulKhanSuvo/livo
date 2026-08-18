'use client';

import * as React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlusSignIcon,
  PencilEdit02Icon,
  Delete01Icon,
  Upload01Icon,
  Video01Icon,
} from '@hugeicons/core-free-icons';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/admin/ui/page-header';
import { ProductPicker } from '@/components/admin/content/room-hotspots/ProductPicker';

import {
  getAdminProductSliderItemsAction,
  upsertProductSliderItemAction,
  deleteProductSliderItemAction,
  uploadProductSliderVideoAction,
} from '@/actions/content/product-slider';
import type { AdminProductSliderItem } from '@/actions/content/product-slider/product-slider.type';
import type { UpsertProductSliderItemInput } from '@/actions/content/product-slider/product-slider.validation';

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
  const [formOpen, setFormOpen] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [uploading, setUploading] = React.useState(false);

  const slidesQuery = useQuery({
    queryKey: SLIDES_KEY,
    queryFn: getAdminProductSliderItemsAction,
  });

  const slides = slidesQuery.data ?? [];

  const upsertMutation = useMutation({
    mutationFn: (input: UpsertProductSliderItemInput) => upsertProductSliderItemAction(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLIDES_KEY });
      setFormOpen(false);
      setForm(emptyForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProductSliderItemAction({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLIDES_KEY });
    },
  });

  const openAdd = () => {
    setForm(emptyForm);
    setFormOpen(true);
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
    setFormOpen(true);
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
    } finally {
      setUploading(false);
    }
  };

  const canSave = Boolean(form.productId && form.mediaUrl) && !upsertMutation.isPending;

  const save = () => {
    if (!form.productId || !form.mediaUrl) return;
    upsertMutation.mutate({
      id: form.id,
      productId: form.productId,
      mediaUrl: form.mediaUrl,
      order: form.order,
      isActive: form.isActive,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Slider"
        description="Curate the homepage Inspiration slider. Each slide pairs an inspiration video with a linked product card."
      />

      <div className="flex justify-end">
        <Button type="button" onClick={openAdd}>
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
          Add slide
        </Button>
      </div>

      {formOpen && (
        <Card className="space-y-4 p-5">
          <h3 className="text-sm font-medium">{form.id ? 'Edit slide' : 'New slide'}</h3>

          <div className="space-y-1.5">
            <Label>Product</Label>
            <ProductPicker
              value={form.productId}
              displayName={form.productName}
              onSelect={(id, name) => setForm((f) => ({ ...f, productId: id, productName: name }))}
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
                className="mt-2 h-24 w-auto rounded border"
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

          <div className="flex items-center gap-2 pt-2">
            <Button type="button" onClick={save} disabled={!canSave}>
              {upsertMutation.isPending ? 'Saving…' : 'Save slide'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setFormOpen(false);
                setForm(emptyForm);
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {slides.length === 0 && !slidesQuery.isLoading && (
          <p className="rounded-md border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
            No slides yet. Add your first inspiration slide above.
          </p>
        )}

        {slides.map((item) => (
          <Card key={item.id} className="flex items-center gap-4 p-3">
            <video
              src={item.mediaUrl}
              className="h-16 w-24 shrink-0 rounded border object-cover"
              muted
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {item.product?.name ?? (
                  <span className="text-muted-foreground">Unknown product</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.product?.brand ?? '—'} · Order {item.order} ·{' '}
                {item.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => openEdit(item)}>
                <HugeiconsIcon icon={PencilEdit02Icon} size={14} />
                Edit
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(item.id)}
              >
                <HugeiconsIcon icon={Delete01Icon} size={14} />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductSliderManager;

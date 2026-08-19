'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlusSignIcon,
  ChevronRightIcon,
  EditIcon,
  Delete02Icon,
  EyeIcon,
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  productValidationSchema,
  ProductValidationType,
} from '@/actions/products/productValidation';
import { type VariantForm } from './types';
import { ProductIdentityForm } from '@/components/admin/catalog/products/ProductIdentityForm';
import { ProductDimensionsForm } from '@/components/admin/catalog/products/ProductDimensionsForm';
import { ProductClassificationForm } from '@/components/admin/catalog/products/ProductClassificationForm';
import { ProductVariantsForm } from '@/components/admin/catalog/products/ProductVariantsForm';
import { useQuery } from '@tanstack/react-query';
import { getClassificationHierarchyAction } from '@/actions/category/category_action';
import { createProduct } from '@/actions/products/addNewProduct';
import { updateProduct } from '@/actions/products/updateProductAction';
import { getAllBrandAction } from '@/actions/brand/getAllBrand';
import { getAllMaterialAction } from '@/actions/material/getAllMaterial';
import { updateProductStatusAction } from '@/actions/products/updateProductStatusAction';
import { toast } from 'sonner';
import { ProductDeleteModal } from '@/components/admin/catalog/products/product-delete-modal';
import type { ProductStatus } from '@/generated/prisma/client';

const defaultValues = {
  productTypeId: '',
  name: '',
  description: '',
  brandId: '',
  materialId: '',
  price: undefined,
  salePrice: undefined,
  width: undefined,
  height: undefined,
  depth: undefined,
  weightKg: undefined,
  assemblyRequired: false,
  variants: [{ colorHex: '', stock: undefined, images: [] }],
} as unknown as ProductValidationType;

const emptyVariant = { colorHex: '', stock: undefined, images: [] } as unknown as VariantForm;

interface NewProductFormProps {
  mode?: 'create' | 'edit';
  initialData?: Partial<ProductValidationType> & { id?: string };
  initialStatus?: ProductStatus;
}

export default function NewProductForm({
  mode = 'create',
  initialData,
  initialStatus,
}: NewProductFormProps) {
  const router = useRouter();
  const productId = initialData?.id;

  const [status, setStatus] = useState<ProductStatus>(initialStatus ?? 'ACTIVE');
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: categoryHierarchy } = useQuery({
    queryKey: ['category'],
    queryFn: () => getClassificationHierarchyAction(),
  });

  const { data: materialHierarchy } = useQuery({
    queryKey: ['material'],
    queryFn: () => getAllMaterialAction(),
  });

  const { data: brandHierarchy } = useQuery({
    queryKey: ['brand'],
    queryFn: () => getAllBrandAction(),
  });

  const initialVariants = initialData?.variants;
  const variants =
    initialVariants && initialVariants.length > 0
      ? initialVariants
      : [{ colorHex: '', stock: undefined, images: [] }];

  const formValues = {
    ...defaultValues,
    ...initialData,
    variants,
  } as ProductValidationType;

  const form = useForm({
    validators: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: productValidationSchema as any,
    },
    defaultValues: formValues,
    onSubmit: async ({ value }) => {
      let res;
      if (mode === 'create') {
        res = await createProduct(value);
      } else {
        res = await updateProduct({ id: initialData?.id, ...value });
      }

      if (res?.success) {
        toast.success(res.message);
        router.push('/admin/catalog/products');
      } else {
        toast.error(res?.message || 'Something went wrong');
      }
    },
  });

  const handleStatusToggle = async (next: ProductStatus) => {
    if (mode !== 'edit' || !productId) return;
    try {
      const res = await updateProductStatusAction({ id: productId, status: next });
      if (res?.success) {
        setStatus(next);
        toast.success(next === 'ACTIVE' ? 'Product activated' : 'Product moved to draft');
      } else {
        toast.error(res?.message ?? 'Could not update status');
      }
    } catch {
      toast.error('Could not update status');
    }
  };

  const isEdit = mode === 'edit';

  return (
    <div className="w-full">
      {/* Editor body */}
      <div className="w-full px-4 pb-28 pt-6 sm:px-6 lg:px-8">
        <form
          id="product-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div className="mb-8">
            <nav className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link
                href="/admin/catalog/products"
                className="transition-colors hover:text-foreground"
              >
                Products
              </Link>
              <HugeiconsIcon icon={ChevronRightIcon} size={14} />
              <span className="font-medium text-foreground">{isEdit ? 'Edit' : 'New'}</span>
            </nav>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
              {isEdit ? 'Edit product' : 'Add product'}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {isEdit
                ? 'Refine the details, media and availability for this product.'
                : 'Build a new product and place it in your catalogue.'}
            </p>
          </div>

          {/* Meta row: status */}
          {isEdit ? (
            <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-sm bg-card px-4 py-3 shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/[0.06]">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'
                  )}
                />
                <span className="text-sm font-medium text-foreground">
                  {status === 'ACTIVE' ? 'Active' : 'Draft'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {status === 'ACTIVE' ? 'Visible in your store' : 'Hidden from customers'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 rounded-sm bg-background p-1 ring-1 ring-foreground/10">
                {(['ACTIVE', 'DEACTIVATED'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStatusToggle(s)}
                    className={cn(
                      'rounded-[3px] px-3 py-1.5 text-xs font-medium transition-colors',
                      status === s
                        ? 'bg-muted text-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {s === 'ACTIVE' ? 'Active' : 'Draft'}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="mb-10 text-sm text-muted-foreground">
              This product will be published when you create it.
            </p>
          )}

          {/* Sections */}
          <div className="space-y-5">
            <ProductIdentityForm
              brands={brandHierarchy?.data ?? []}
              materials={materialHierarchy?.data ?? []}
              form={form}
            />
            <ProductClassificationForm categories={categoryHierarchy?.data ?? []} form={form} />
            <ProductDimensionsForm form={form} />
            <ProductVariantsForm form={form} emptyVariant={emptyVariant} />
          </div>
        </form>
      </div>

      {/* Sticky bottom action bar */}
      <div className="sticky bottom-0 z-20 border-t border-border bg-card/85 backdrop-blur">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting, state.errorMap] as const}
          >
            {([canSubmit, isSubmitting, errorMap]) => (
              <>
                <span className="hidden text-xs text-destructive md:block">
                  {errorMap && errorMap.onChange
                    ? typeof errorMap.onChange === 'string'
                      ? errorMap.onChange
                      : 'Please fix the errors below'
                    : ''}
                </span>
                <div className="flex w-full items-center justify-end gap-2">
                  {isEdit && (
                    <>
                      <Button type="button" variant="outline" size="sm" asChild>
                        <Link href={`/products/${productId}`} target="_blank">
                          <HugeiconsIcon icon={EyeIcon} size={14} />
                          Preview
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/5"
                        onClick={() => setDeleteOpen(true)}
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={14} />
                        Delete
                      </Button>
                    </>
                  )}
                  <Button type="button" variant="ghost" size="sm" asChild>
                    <Link href="/admin/catalog/products">Cancel</Link>
                  </Button>
                  <Button
                    type="submit"
                    form="product-form"
                    disabled={!canSubmit || isSubmitting}
                    className="gap-1.5"
                  >
                    <HugeiconsIcon icon={isEdit ? EditIcon : PlusSignIcon} size={16} />
                    {isSubmitting
                      ? isEdit
                        ? 'Saving…'
                        : 'Creating…'
                      : isEdit
                        ? 'Save changes'
                        : 'Create product'}
                  </Button>
                </div>
              </>
            )}
          </form.Subscribe>
        </div>
      </div>

      {isEdit && (
        <ProductDeleteModal
          productId={productId ?? null}
          productName={initialData?.name ?? ''}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onDeleted={() => router.push('/admin/catalog/products')}
        />
      )}
    </div>
  );
}

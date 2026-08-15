'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Updated import
import { useForm } from '@tanstack/react-form';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, ChevronRightIcon, EditIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import {
  productValidationSchema,
  ProductValidationType,
} from '@/actions/products/productValidation';
import { ProductIdentityForm } from '@/components/admin/catalog/products/ProductIdentityForm';
import { ProductDimensionsForm } from '@/components/admin/catalog/products/ProductDimensionsForm';
import { ProductClassificationForm } from '@/components/admin/catalog/products/ProductClassificationForm';
import { ProductVariantsForm } from '@/components/admin/catalog/products/ProductVariantsForm';
import { emptyVariant } from '@/components/admin/catalog/products/types';
import { useQuery } from '@tanstack/react-query';
import { getClassificationHierarchyAction } from '@/actions/category/category_action';
import { createProduct } from '@/actions/products/addNewProduct';
// import { updateProduct } from '@/actions/products/updateProduct'; // Add your update action here
import { toast } from 'sonner';

const defaultValues: ProductValidationType = {
  productTypeId: '',
  name: '',
  slug: '',
  description: '',
  brand: '',
  material: '',
  finish: '',
  width: 0,
  height: 0,
  depth: 0,
  weightKg: 0,
  assemblyRequired: false,
  variants: [emptyVariant],
};

interface NewProductFormProps {
  mode?: 'create' | 'edit';
  initialData?: Partial<ProductValidationType> & { id?: string };
}

export default function NewProductForm({ mode = 'create', initialData }: NewProductFormProps) {
  const router = useRouter();

  const { data: categoryHierarchy } = useQuery({
    queryKey: ['category'],
    queryFn: () => getClassificationHierarchyAction(),
  });

  // Merge initial values if in edit mode
  const formValues: ProductValidationType = {
    ...defaultValues,
    ...initialData,
    variants: initialData?.variants?.length ? initialData.variants : [emptyVariant],
  };

  const form = useForm({
    validators: {
      onChange: (value) => productValidationSchema.safeParse(value),
      onChangeAsync: (value) => productValidationSchema.safeParseAsync(value),
    },
    defaultValues: formValues,
    onSubmit: async ({ value }) => {
      console.log('Submitting Product Data:', value);

      let res;
      if (mode === 'create') {
        res = await createProduct(value);
      } else {
        // Handle edit action (pass product ID along with updated values)
        // res = await updateProduct(initialData?.id!, value);
      }

      console.log('Product response:', res);
      if (res?.success) {
        toast.success(res.message);
        router.push('/admin/catalog/products');
      } else {
        toast.error(res?.message || 'Something went wrong');
      }
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="flex gap-2 items-center text-sm">
        <Link href="/admin/catalog/products">
          <p className="text-muted-foreground">Catalog</p>
        </Link>
        <HugeiconsIcon icon={ChevronRightIcon} size={16} />
        <Link href="/admin/catalog/products">
          <p>Products</p>
        </Link>
        <HugeiconsIcon icon={ChevronRightIcon} size={16} />
        <p>{mode === 'create' ? 'Add Product' : 'Edit Product'}</p>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {mode === 'create' ? 'Add Product' : 'Edit Product'}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === 'create'
              ? 'Fill in the details below to create a new product in your catalogue.'
              : 'Fill in the details below to edit the product in your catalogue.'}
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="flex flex-col gap-6"
      >
        <ProductIdentityForm mode={mode} form={form} />
        <ProductDimensionsForm mode={mode} form={form} />
        <ProductClassificationForm categories={categoryHierarchy ?? []} form={form} />
        <ProductVariantsForm mode={mode} form={form} emptyVariant={emptyVariant} />

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/catalog/products">Cancel</Link>
          </Button>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting} className="gap-1.5">
                <HugeiconsIcon icon={mode === 'create' ? PlusSignIcon : EditIcon} size={16} />
                {isSubmitting
                  ? mode === 'create'
                    ? 'Creating...'
                    : 'Updating...'
                  : mode === 'create'
                    ? 'Create product'
                    : 'Update product'}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}

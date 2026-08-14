'use client';

import Link from 'next/link';
import { useForm } from '@tanstack/react-form';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, ArrowLeft01Icon } from '@hugeicons/core-free-icons';
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

const defaultValues: ProductValidationType = {
  productTypeId: '',
  name: '',
  slug: '',
  description: '',
  brand: '',
  material: '',
  finish: '',
  width: undefined,
  height: undefined,
  depth: undefined,
  weightKg: undefined,
  assemblyRequired: false,
  variants: [emptyVariant],
};

export default function NewProductPage() {
  const form = useForm({
    defaultValues,
    validators: {
      onChange: productValidationSchema,
    },
    onSubmit: async ({ value }) => {
      console.log('Submitting Product Data:', value);
    },
  });

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/catalog/products">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
          </Link>
        </Button>
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Add product
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the details below to create a new product in your catalogue.
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
        <ProductIdentityForm form={form} />
        <ProductDimensionsForm form={form} />
        <ProductClassificationForm categories={[]} form={form} />
        <ProductVariantsForm form={form} emptyVariant={emptyVariant} />

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/catalog/products">Cancel</Link>
          </Button>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting} className="gap-1.5">
                <HugeiconsIcon icon={PlusSignIcon} size={16} />
                {isSubmitting ? 'Creating...' : 'Create product'}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}

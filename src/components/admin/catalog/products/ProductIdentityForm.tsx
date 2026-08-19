'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { type ProductForm } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';
import { FieldError } from '@/components/ui/field';
import { Brand, Material } from '@/generated/prisma/client';
import { SearchableCreateCombobox } from '@/components/shared/SearchableCreateCombobox';
import { createMaterialAction } from '@/actions/material/createMaterialAction';
import { createBrandAction } from '@/actions/brand/createBrandAction';
import { useQueryClient } from '@tanstack/react-query';
import { FormSection } from './FormSection';
interface ProductIdentityFormProps {
  form: ProductForm;
  brands: Brand[];
  materials: Material[];
}

export function ProductIdentityForm({ brands, form, materials }: ProductIdentityFormProps) {
  const queryClient = useQueryClient();
  return (
    <FormSection
      title="Identity"
      description="The name, description, brand and pricing customers will see."
    >
      <div className="space-y-4">
        <form.Field name="name">
          {(field: AnyFieldApi) => (
            <div className="space-y-1.5">
              <Label htmlFor="product-name">Product name *</Label>
              <Input
                id="product-name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. Mello Lounge Sofa"
                autoComplete="off"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive">
                  {field.state.meta.errors[0]?.message ?? String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="description">
          {(field: AnyFieldApi) => (
            <div className="space-y-1.5">
              <Label htmlFor="product-description">Description</Label>
              <Textarea
                id="product-description"
                rows={3}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="A short note on form, function and feeling."
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive">
                  {field.state.meta.errors[0]?.message ?? String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field name="brandId">
            {(field: AnyFieldApi) => (
              <div className="space-y-1.5">
                <Label htmlFor="product-brand">Brand</Label>

                <SearchableCreateCombobox
                  items={brands}
                  value={field.state.value ?? ''}
                  onChange={field.handleChange}
                  getItemId={(brand) => brand.id}
                  getItemLabel={(brand) => brand.name}
                  onCreate={async (name) => {
                    const result = await createBrandAction({ name });

                    if (!result.success || !result.data) {
                      throw new Error(result.message ?? 'Failed to create brand');
                    }
                    await queryClient.invalidateQueries({
                      queryKey: ['brand'],
                    });
                    return result.data;
                  }}
                  placeholder="Select brand..."
                  searchPlaceholder="Search or create brand..."
                  emptyMessage="No brand found."
                  createMessage={(name) => `Create brand "${name}"`}
                />

                {field.state.meta.errors.length > 0 && (
                  <FieldError>
                    {field.state.meta.errors[0]?.message ?? String(field.state.meta.errors[0])}
                  </FieldError>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="materialId">
            {(field: AnyFieldApi) => (
              <div className="space-y-1.5">
                <Label htmlFor="product-material">Material</Label>

                <SearchableCreateCombobox
                  items={materials}
                  value={field.state.value ?? ''}
                  onChange={field.handleChange}
                  getItemId={(material) => material.id}
                  getItemLabel={(material) => material.name}
                  onCreate={async (name) => {
                    const result = await createMaterialAction({ name });
                    if (!result.success || !result.data) {
                      throw new Error(result.message ?? 'Failed to create material');
                    }
                    await queryClient.invalidateQueries({
                      queryKey: ['material'],
                    });
                    return result.data;
                  }}
                  placeholder="Select material..."
                  searchPlaceholder="Search or create material..."
                  emptyMessage="No material found."
                  createMessage={(name) => `Create material "${name}"`}
                />

                {field.state.meta.errors.length > 0 && (
                  <FieldError>
                    {field.state.meta.errors[0]?.message ?? String(field.state.meta.errors[0])}
                  </FieldError>
                )}
              </div>
            )}
          </form.Field>
          {/* Price Field */}
          <form.Field name="price">
            {(subField: AnyFieldApi) => (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">
                  Price ($) <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={subField.state.value ?? ''}
                  onChange={(e) =>
                    subField.handleChange(e.target.value ? parseFloat(e.target.value) : undefined)
                  }
                />
                {subField.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {subField.state.meta.errors
                      .map((err) => (typeof err === 'string' ? err : err.message))
                      .join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Sale Price Field */}
          <form.Field name="salePrice">
            {(subField: AnyFieldApi) => (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Sale Price ($)</Label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="Optional"
                  value={subField.state.value ?? ''}
                  onChange={(e) =>
                    subField.handleChange(e.target.value ? parseFloat(e.target.value) : undefined)
                  }
                />
                {subField.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {subField.state.meta.errors
                      .map((err) => (typeof err === 'string' ? err : err.message))
                      .join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>
      </div>
    </FormSection>
  );
}

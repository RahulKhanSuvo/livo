'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { type ProductForm } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';
import { FieldError } from '@/components/ui/field';
import { Brand, Material } from '@/generated/prisma/client';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
interface ProductIdentityFormProps {
  form: ProductForm;
  mode: 'create' | 'edit';
  brands: Brand[];
  materials: Material[];
}

export function ProductIdentityForm({ brands, form, mode, materials }: ProductIdentityFormProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>{mode === 'create' ? 'Identity' : 'Edit Identity'}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
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
            <form.Field name="brand">
              {(field: AnyFieldApi) => (
                <div className="space-y-1.5">
                  <Label htmlFor="product-brand">Brand</Label>

                  <Combobox
                    items={brands}
                    itemToStringValue={(brand) => brand.name}
                    value={field.state.value ?? ''}
                    onValueChange={(value) => {
                      field.handleChange(value?.name ?? '');
                    }}
                  >
                    <ComboboxInput
                      id="product-brand"
                      placeholder="Search or select a brand..."
                      autoComplete="off"
                      onBlur={field.handleBlur}
                    />

                    <ComboboxContent>
                      <ComboboxEmpty>No brand found.</ComboboxEmpty>

                      <ComboboxList>
                        {(brand) => (
                          <ComboboxItem key={brand.id} value={brand}>
                            {brand.name}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>

                  {field.state.meta.errors.length > 0 && (
                    <FieldError>
                      {field.state.meta.errors[0]?.message ?? String(field.state.meta.errors[0])}
                    </FieldError>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="material">
              {(field: AnyFieldApi) => (
                <div className="space-y-1.5">
                  <Label htmlFor="product-material">Material</Label>

                  <Combobox
                    items={materials}
                    itemToStringValue={(material) => material.name}
                    value={field.state.value ?? ''}
                    onValueChange={(value) => {
                      field.handleChange(value?.name ?? '');
                    }}
                  >
                    <ComboboxInput
                      id="product-material"
                      placeholder="Search or select a material..."
                      autoComplete="off"
                      onBlur={field.handleBlur}
                    />

                    <ComboboxContent>
                      <ComboboxEmpty>No material found.</ComboboxEmpty>

                      <ComboboxList>
                        {(material) => (
                          <ComboboxItem key={material.id} value={material}>
                            {material.name}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>

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
                  <Label className="text-xs font-medium text-muted-foreground">
                    Sale Price ($)
                  </Label>
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
      </CardContent>
    </Card>
  );
}

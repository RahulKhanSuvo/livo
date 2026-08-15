'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { type ProductForm } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';

interface ProductDimensionsFormProps {
  form: ProductForm;
  mode: 'create' | 'edit';
}

export function ProductDimensionsForm({ form, mode }: ProductDimensionsFormProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>
          {mode === 'create' ? 'Dimensions & Specifications' : 'Edit Dimensions & Specifications'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <form.Field name="finish">
            {(field: AnyFieldApi) => (
              <div className="space-y-1.5">
                <Label htmlFor="product-finish">Finish</Label>
                <Input
                  id="product-finish"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Natural, Walnut"
                  autoComplete="off"
                />
              </div>
            )}
          </form.Field>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['width', 'height', 'depth', 'weightKg'].map((dim) => (
              <form.Field key={dim} name={dim as 'width' | 'height' | 'depth' | 'weightKg'}>
                {(field: AnyFieldApi) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={`product-${dim}`}>
                      {dim.charAt(0).toUpperCase() + dim.slice(1)}{' '}
                      {dim === 'weightKg' ? '(kg)' : '(cm)'}
                    </Label>
                    <Input
                      id={`product-${dim}`}
                      type="number"
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      min={0}
                      step="0.01"
                    />
                  </div>
                )}
              </form.Field>
            ))}
          </div>

          <form.Field name="assemblyRequired">
            {(field: AnyFieldApi) => (
              <div className="flex items-center gap-2.5 pt-2">
                <Checkbox
                  id="product-assemblyRequired"
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(Boolean(checked))}
                />
                <Label htmlFor="product-assemblyRequired" className="font-normal">
                  Assembly required
                </Label>
              </div>
            )}
          </form.Field>
        </div>
      </CardContent>
    </Card>
  );
}

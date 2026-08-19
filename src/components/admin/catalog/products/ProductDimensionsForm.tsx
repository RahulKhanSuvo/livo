'use client';

import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { type ProductForm } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';
import { FieldError } from '@/components/ui/field';
import { FormSection } from './FormSection';

interface ProductDimensionsFormProps {
  form: ProductForm;
}

export function ProductDimensionsForm({ form }: ProductDimensionsFormProps) {
  return (
    <FormSection
      title="Dimensions & specifications"
      description="Physical measurements help with shipping and room planning."
    >
      <div className="space-y-4">
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
                    onChange={(e) =>
                      field.handleChange(e.target.value ? Number(e.target.value) : undefined)
                    }
                    min={0}
                    step="0.01"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldError>
                      {field.state.meta.errors[0]?.message ?? String(field.state.meta.errors[0])}
                    </FieldError>
                  )}
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
    </FormSection>
  );
}

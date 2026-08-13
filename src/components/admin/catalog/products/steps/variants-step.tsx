'use client';

import { useStore } from '@tanstack/react-form';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete01Icon, PlusSignIcon } from '@hugeicons/core-free-icons';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ProductForm } from '../use-product-form';
import type { VariantForm } from '../types';

export function VariantsStep({ form }: { form: ProductForm }) {
  const variants = useStore(form.store, (s) => s.values.variants);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Each variant is a colour/SKU combination on the product.
      </p>

      {variants.map((_, idx) => (
        <div key={idx} className="space-y-4 rounded-2xl border border-border/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Variant {idx + 1}</p>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Remove variant"
              disabled={variants.length <= 1}
              onClick={() => void form.removeFieldValue('variants', idx)}
            >
              <HugeiconsIcon icon={Delete01Icon} size={16} className="text-destructive" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name={`variants[${idx}].color`}>
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Colour / option</Label>
                  <Input
                    placeholder="e.g. Sage green"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field
              name={`variants[${idx}].sku`}
              validators={{
                onSubmit: ({ value }) =>
                  value.trim().length < 2
                    ? 'Add a SKU'
                    : !/^[A-Z0-9-]+$/.test(value)
                      ? 'Uppercase letters, numbers, dashes only'
                      : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label>SKU *</Label>
                  <Input
                    placeholder="SITS-MLO-01"
                    className="font-mono text-xs tracking-wider uppercase"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs font-normal text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <form.Field
              name={`variants[${idx}].price`}
              validators={{
                onSubmit: ({ value }) =>
                  value === ''
                    ? 'Set a price'
                    : Number(value) <= 0
                      ? 'Must be greater than 0'
                      : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Price ($) *</Label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="1290.00"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs font-normal text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name={`variants[${idx}].salePrice`}>
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Sale price ($)</Label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="Optional"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field
              name={`variants[${idx}].stock`}
              validators={{
                onSubmit: ({ value }) =>
                  value === ''
                    ? 'Set stock'
                    : Number(value) < 0
                      ? 'Stock cannot be negative'
                      : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Stock *</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="0"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs font-normal text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full gap-1.5"
        onClick={() =>
          void form.pushFieldValue('variants', {
            color: '',
            sku: '',
            price: '',
            salePrice: '',
            stock: '',
          } satisfies VariantForm)
        }
      >
        <HugeiconsIcon icon={PlusSignIcon} size={16} />
        Add variant
      </Button>
    </div>
  );
}

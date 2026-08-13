'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ProductForm } from '../use-product-form';

export function IdentityStep({ form }: { form: ProductForm }) {
  return (
    <div className="space-y-4">
      <form.Field
        name="name"
        validators={{
          onSubmit: ({ value }) =>
            value.trim().length < 2 ? 'Enter a product name (min 2 characters)' : undefined,
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor="product-name">Product name *</Label>
            <Input
              id="product-name"
              placeholder="e.g. Mello Lounge Sofa"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs font-normal text-destructive">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="brand">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="product-brand">Brand</Label>
              <Input
                id="product-brand"
                placeholder="e.g. SITS"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="material">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="product-material">Material</Label>
              <Input
                id="product-material"
                placeholder="e.g. Oak, bouclé"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="description">
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              rows={3}
              placeholder="A short note on form, function and feeling."
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}

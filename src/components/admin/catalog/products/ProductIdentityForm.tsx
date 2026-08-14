'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { type FormValues } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';

interface ProductIdentityFormProps {
  form: ReturnType<typeof import('@tanstack/react-form').useForm<FormValues>>;
}

export function ProductIdentityForm({ form }: ProductIdentityFormProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Identity</CardTitle>
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

          <form.Field name="slug">
            {(field: AnyFieldApi) => (
              <div className="space-y-1.5">
                <Label htmlFor="product-slug">Slug *</Label>
                <Input
                  id="product-slug"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. mello-lounge-sofa"
                  className="font-mono text-xs"
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
              </div>
            )}
          </form.Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="brand">
              {(field: AnyFieldApi) => (
                <div className="space-y-1.5">
                  <Label htmlFor="product-brand">Brand</Label>
                  <Input
                    id="product-brand"
                    value={field.state.value ?? ''}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. SITS"
                    autoComplete="off"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="material">
              {(field: AnyFieldApi) => (
                <div className="space-y-1.5">
                  <Label htmlFor="product-material">Material</Label>
                  <Input
                    id="product-material"
                    value={field.state.value ?? ''}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Oak, bouclé"
                    autoComplete="off"
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

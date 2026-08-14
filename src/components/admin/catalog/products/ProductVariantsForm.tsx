'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, Delete02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type VariantForm, type ProductForm } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';

export function ProductVariantsForm({
  form,
  emptyVariant,
}: {
  form: ProductForm;
  emptyVariant: VariantForm;
}) {
  return (
    <form.Field name="variants" mode="array">
      {(field: AnyFieldApi) => (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Product Variants *</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => field.pushValue(emptyVariant)}
              className="gap-1.5"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={16} />
              Add Variant
            </Button>
          </div>

          {field.state.value.map((_: VariantForm, index: number) => (
            <Card key={index} className="relative">
              <CardHeader className="flex-row items-center justify-between border-b py-4">
                <CardTitle className="text-base">Variant #{index + 1}</CardTitle>
                {field.state.value.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => field.removeValue(index)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={16} />
                  </Button>
                )}
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <form.Field name={`variants[${index}].colorHex`}>
                    {(subField: AnyFieldApi) => (
                      <div className="space-y-1.5">
                        <Label>Color HEX</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={subField.state.value || '#000000'}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            className="size-9 shrink-0 cursor-pointer rounded-md border p-1"
                          />
                          <Input
                            placeholder="#000000"
                            value={subField.state.value ?? ''}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            className="font-mono text-xs"
                          />
                        </div>
                        {subField.state.meta.errors.length > 0 && (
                          <p className="text-xs text-destructive">
                            {subField.state.meta.errors[0]?.message ??
                              String(subField.state.meta.errors[0])}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field name={`variants[${index}].sku`}>
                    {(subField: AnyFieldApi) => (
                      <div className="space-y-1.5">
                        <Label>SKU *</Label>
                        <Input
                          placeholder="SITS-MLO-01"
                          className="font-mono text-xs uppercase tracking-wider"
                          value={subField.state.value}
                          onChange={(e) => subField.handleChange(e.target.value)}
                        />
                        {subField.state.meta.errors.length > 0 && (
                          <p className="text-xs text-destructive">
                            {subField.state.meta.errors[0]?.message ??
                              String(subField.state.meta.errors[0])}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <form.Field name={`variants[${index}].price`}>
                    {(subField: AnyFieldApi) => (
                      <div className="space-y-1.5">
                        <Label>Price ($) *</Label>
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder="1290.00"
                          value={subField.state.value ?? ''}
                          onChange={(e) => subField.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name={`variants[${index}].salePrice`}>
                    {(subField: AnyFieldApi) => (
                      <div className="space-y-1.5">
                        <Label>Sale price ($)</Label>
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder="Optional"
                          value={subField.state.value ?? ''}
                          onChange={(e) => subField.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name={`variants[${index}].stock`}>
                    {(subField: AnyFieldApi) => (
                      <div className="space-y-1.5">
                        <Label>Stock *</Label>
                        <Input
                          type="number"
                          min={0}
                          placeholder="0"
                          value={subField.state.value ?? ''}
                          onChange={(e) => subField.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <form.Field name={`variants[${index}].mainImage`}>
                    {(subField: AnyFieldApi) => (
                      <div className="space-y-1.5">
                        <Label>Main Image URL *</Label>
                        <Input
                          placeholder="https://..."
                          value={subField.state.value}
                          onChange={(e) => subField.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name={`variants[${index}].hoverImage`}>
                    {(subField: AnyFieldApi) => (
                      <div className="space-y-1.5">
                        <Label>Hover Image URL</Label>
                        <Input
                          placeholder="https://..."
                          value={subField.state.value}
                          onChange={(e) => subField.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Gallery Images */}
                <form.Field name={`variants[${index}].gallery`} mode="array">
                  {(galleryField: AnyFieldApi) => (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold uppercase text-muted-foreground">
                          Gallery Image URLs
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => galleryField.pushValue('')}
                        >
                          + Add URL
                        </Button>
                      </div>

                      {galleryField.state.value.map((_: string, galleryIndex: number) => (
                        <form.Field
                          key={galleryIndex}
                          name={`variants[${index}].gallery[${galleryIndex}]`}
                        >
                          {(urlField: AnyFieldApi) => (
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="https://..."
                                value={urlField.state.value}
                                onChange={(e) => urlField.handleChange(e.target.value)}
                              />
                              {galleryField.state.value.length > 0 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => galleryField.removeValue(galleryIndex)}
                                  className="shrink-0 text-destructive"
                                >
                                  <HugeiconsIcon icon={Delete02Icon} size={14} />
                                </Button>
                              )}
                            </div>
                          )}
                        </form.Field>
                      ))}
                    </div>
                  )}
                </form.Field>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </form.Field>
  );
}

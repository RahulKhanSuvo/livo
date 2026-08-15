'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, Delete02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type VariantForm, type ProductForm } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';
import { GallerySectionImageAdd } from './GallerySectionImageAdd';

// Gallery Component (Max 4 Images Limit)

// Main Component
interface ProductVariantsFormProps {
  form: ProductForm;
  emptyVariant: VariantForm;
  mode: 'create' | 'edit';
}

export function ProductVariantsForm({ form, emptyVariant, mode }: ProductVariantsFormProps) {
  return (
    <form.Field name="variants" mode="array">
      {(field: AnyFieldApi) => (
        <div className="space-y-8">
          {/* Section Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                {mode === 'create' ? 'Product Variants' : 'Edit Product Variants'}
              </h2>
              <p className="text-xs text-muted-foreground">
                Manage color variations, pricing, inventory, and images for this product.
              </p>
            </div>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => field.pushValue(emptyVariant)}
              className="gap-1.5 shadow-xs"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={16} />
              Add Variant
            </Button>
          </div>

          {/* Variant Cards List */}
          <div className="space-y-6">
            {field.state.value.map((_: VariantForm, index: number) => (
              <Card key={index} className="overflow-hidden border-border/80 shadow-xs">
                {/* Card Header */}
                <CardHeader className="flex-row items-center justify-between border-b bg-muted/20 px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <CardTitle className="text-sm font-medium">Variant Configuration</CardTitle>
                  </div>
                  {field.state.value.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => field.removeValue(index)}
                      className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={14} className="mr-1" />
                      Remove
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="space-y-8 p-6">
                  {/* Grid 1: Details & Inventory */}
                  <div className="grid gap-4 sm:grid-cols-12">
                    {/* Color Picker Field */}
                    <form.Field name={`variants[${index}].colorHex`}>
                      {(subField: AnyFieldApi) => (
                        <div className="space-y-1.5 sm:col-span-4">
                          <Label className="text-xs font-medium text-muted-foreground">Color</Label>
                          <div className="flex items-center gap-2">
                            <div className="relative shrink-0">
                              <input
                                type="color"
                                value={subField.state.value || '#000000'}
                                onChange={(e) => subField.handleChange(e.target.value)}
                                className="h-9 w-9 cursor-pointer rounded-lg border border-input p-1"
                              />
                            </div>
                            <Input
                              placeholder="#000000"
                              value={subField.state.value ?? ''}
                              onChange={(e) => subField.handleChange(e.target.value)}
                              className="font-mono text-xs uppercase"
                            />
                          </div>
                        </div>
                      )}
                    </form.Field>

                    {/* SKU Field */}
                    <form.Field name={`variants[${index}].sku`}>
                      {(subField: AnyFieldApi) => (
                        <div className="space-y-1.5 sm:col-span-8">
                          <Label className="text-xs font-medium text-muted-foreground">
                            SKU <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            placeholder="SITS-MLO-01"
                            className="font-mono text-xs uppercase tracking-wider"
                            value={subField.state.value}
                            onChange={(e) => subField.handleChange(e.target.value)}
                          />
                        </div>
                      )}
                    </form.Field>

                    {/* Price Field */}
                    <form.Field name={`variants[${index}].price`}>
                      {(subField: AnyFieldApi) => (
                        <div className="space-y-1.5 sm:col-span-4">
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
                              subField.handleChange(
                                e.target.value ? parseFloat(e.target.value) : undefined
                              )
                            }
                          />
                        </div>
                      )}
                    </form.Field>

                    {/* Sale Price Field */}
                    <form.Field name={`variants[${index}].salePrice`}>
                      {(subField: AnyFieldApi) => (
                        <div className="space-y-1.5 sm:col-span-4">
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
                              subField.handleChange(
                                e.target.value ? parseFloat(e.target.value) : undefined
                              )
                            }
                          />
                        </div>
                      )}
                    </form.Field>

                    {/* Stock Field */}
                    <form.Field name={`variants[${index}].stock`}>
                      {(subField: AnyFieldApi) => (
                        <div className="space-y-1.5 sm:col-span-4">
                          <Label className="text-xs font-medium text-muted-foreground">
                            Stock <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            type="number"
                            min={0}
                            placeholder="0"
                            value={subField.state.value ?? ''}
                            onChange={(e) =>
                              subField.handleChange(
                                e.target.value ? parseInt(e.target.value, 10) : undefined
                              )
                            }
                          />
                        </div>
                      )}
                    </form.Field>
                  </div>

                  {/* Gallery Section with strict 4 limit */}
                  <form.Field name={`variants[${index}].gallery`}>
                    {(galleryField: AnyFieldApi) => (
                      <GallerySectionImageAdd galleryField={galleryField} />
                    )}
                  </form.Field>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </form.Field>
  );
}

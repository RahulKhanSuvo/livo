'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, Delete02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type VariantForm, type ProductForm } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';
import { GallerySectionImageAdd } from './GallerySectionImageAdd';
import { FormSection } from './FormSection';

interface ProductVariantsFormProps {
  form: ProductForm;
  emptyVariant: VariantForm;
}

export function ProductVariantsForm({ form, emptyVariant }: ProductVariantsFormProps) {
  return (
    <form.Field name="variants" mode="array">
      {(field: AnyFieldApi) => (
        <FormSection
          title="Variants"
          description="Manage colour, stock and imagery for each variation of this product."
          action={
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => field.pushValue(emptyVariant)}
              className="gap-1.5"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={16} />
              Add variant
            </Button>
          }
        >
          <div className="space-y-4">
            {field.state.value.map((_: VariantForm, index: number) => (
              <div
                key={index}
                className="overflow-hidden rounded-sm bg-card ring-1 ring-foreground/10"
              >
                <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <p className="text-sm font-medium text-foreground">Variant {index + 1}</p>
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
                </div>

                <div className="space-y-6 p-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Color Picker Field */}
                    <form.Field name={`variants[${index}].colorHex`}>
                      {(subField: AnyFieldApi) => (
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-muted-foreground">Color</Label>
                          <div className="flex items-center gap-2">
                            <div className="relative shrink-0">
                              <input
                                type="color"
                                value={subField.state.value || '#000000'}
                                onChange={(e) => subField.handleChange(e.target.value)}
                                className="h-9 w-9 cursor-pointer rounded-sm border border-input p-1"
                              />
                            </div>
                            <Input
                              placeholder="#000000"
                              value={subField.state.value ?? ''}
                              onChange={(e) => subField.handleChange(e.target.value)}
                              className="font-mono text-xs uppercase"
                            />
                          </div>
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

                    {/* Stock Field */}
                    <form.Field name={`variants[${index}].stock`}>
                      {(subField: AnyFieldApi) => (
                        <div className="space-y-1.5">
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

                  {/* Gallery Section with strict 4 limit */}
                  <form.Field name={`variants[${index}].images`}>
                    {(galleryField: AnyFieldApi) => (
                      <GallerySectionImageAdd galleryField={galleryField} />
                    )}
                  </form.Field>
                </div>
              </div>
            ))}
          </div>
        </FormSection>
      )}
    </form.Field>
  );
}

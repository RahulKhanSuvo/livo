'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlusSignIcon,
  Delete02Icon,
  Upload01Icon,
  CheckmarkBadge01Icon,
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type VariantForm, type ProductForm } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';

// Single Image Upload Card Component
function SingleImageUpload({
  label,
  required = false,
  field,
}: {
  label: string;
  required?: boolean;
  field: AnyFieldApi;
}) {
  const file = field.state.value as File | undefined | null;

  const previewUrl = useMemo(() => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);

  const error = field.state.meta.errors[0];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {file && (
          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <HugeiconsIcon icon={CheckmarkBadge01Icon} size={12} /> Uploaded
          </span>
        )}
      </div>

      <div className="relative group aspect-video w-full overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition-all hover:border-primary/50 hover:bg-muted/50">
        {previewUrl ? (
          <>
            <Image src={previewUrl} alt={label} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
              <Label
                htmlFor={`file-input-${field.name}`}
                className="cursor-pointer rounded-lg bg-background/90 px-3 py-1.5 text-xs font-medium shadow-xs hover:bg-background"
              >
                Change
              </Label>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={() => field.handleChange(undefined)}
              >
                <HugeiconsIcon icon={Delete02Icon} size={14} />
              </Button>
            </div>
          </>
        ) : (
          <Label
            htmlFor={`file-input-${field.name}`}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center"
          >
            <div className="rounded-full bg-background p-2.5 shadow-xs border">
              <HugeiconsIcon icon={Upload01Icon} size={18} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Click to upload</p>
              <p className="text-[10px] text-muted-foreground">PNG, JPG, WEBP up to 5MB</p>
            </div>
          </Label>
        )}

        <input
          id={`file-input-${field.name}`}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            field.handleChange(selectedFile ?? undefined);
          }}
        />
      </div>

      {error && (
        <p className="text-xs font-medium text-destructive">
          {typeof error === 'string' ? error : error?.message}
        </p>
      )}
    </div>
  );
}

// Gallery Tile Component
function GalleryImageItem({ field, onRemove }: { field: AnyFieldApi; onRemove: () => void }) {
  const file = field.state.value as File | undefined | null;

  const previewUrl = useMemo(() => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);

  return (
    <div className="group relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted/30 transition-all hover:shadow-xs">
      {previewUrl ? (
        <>
          <Image
            src={previewUrl}
            alt="Gallery preview"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="h-8 w-8"
              onClick={onRemove}
            >
              <HugeiconsIcon icon={Delete02Icon} size={14} />
            </Button>
          </div>
        </>
      ) : (
        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1.5 p-2 transition-colors hover:bg-muted/60">
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) field.handleChange(selectedFile);
            }}
          />
          <div className="rounded-full bg-background p-2 border shadow-xs">
            <HugeiconsIcon icon={Upload01Icon} size={14} className="text-muted-foreground" />
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">Upload</span>
        </label>
      )}
    </div>
  );
}

// Main Component
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
        <div className="space-y-8">
          {/* Section Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Product Variants</h2>
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
                            onChange={(e) => subField.handleChange(e.target.value)}
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
                            onChange={(e) => subField.handleChange(e.target.value)}
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
                            onChange={(e) => subField.handleChange(e.target.value)}
                          />
                        </div>
                      )}
                    </form.Field>
                  </div>

                  {/* Section Divider */}
                  <div className="relative border-t">
                    <span className="absolute left-0 -top-2.5 bg-card pr-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Primary Media
                    </span>
                  </div>

                  {/* Single Image Uploads */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <form.Field name={`variants[${index}].mainImage`}>
                      {(subField: AnyFieldApi) => (
                        <SingleImageUpload label="Main Image" required field={subField} />
                      )}
                    </form.Field>

                    <form.Field name={`variants[${index}].hoverImage`}>
                      {(subField: AnyFieldApi) => (
                        <SingleImageUpload label="Hover Image" field={subField} />
                      )}
                    </form.Field>
                  </div>

                  {/* Section Divider */}
                  <div className="relative border-t">
                    <span className="absolute left-0 -top-2.5 bg-card pr-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Gallery Media
                    </span>
                  </div>

                  {/* Gallery Section */}
                  <form.Field name={`variants[${index}].gallery`} mode="array">
                    {(galleryField: AnyFieldApi) => (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Upload additional photos for this variant carousel.
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs gap-1"
                            onClick={() => galleryField.pushValue(undefined)}
                          >
                            <HugeiconsIcon icon={PlusSignIcon} size={14} />
                            Add Tile
                          </Button>
                        </div>

                        {galleryField.state.value.length > 0 ? (
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
                            {galleryField.state.value.map(
                              (_: File | null, galleryIndex: number) => (
                                <form.Field
                                  key={galleryIndex}
                                  name={`variants[${index}].gallery[${galleryIndex}]`}
                                >
                                  {(urlField: AnyFieldApi) => (
                                    <GalleryImageItem
                                      field={urlField}
                                      onRemove={() => galleryField.removeValue(galleryIndex)}
                                    />
                                  )}
                                </form.Field>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="flex h-20 w-full items-center justify-center rounded-xl border border-dashed text-xs text-muted-foreground italic bg-muted/10">
                            No gallery images added yet. Click &quot;Add Tile&quot; above.
                          </div>
                        )}
                      </div>
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

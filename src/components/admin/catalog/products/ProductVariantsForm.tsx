'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, Delete02Icon, Upload01Icon, Image01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type VariantForm, type ProductForm } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';

// Helper component to handle local previews for single File state
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
    <div className="space-y-1.5">
      <Label>
        {label} {required && '*'}
      </Label>
      <div className="flex items-center gap-4">
        {/* Preview Container */}
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
          {previewUrl ? (
            <>
              <Image src={previewUrl} alt={label} fill className="object-cover" />
              <button
                type="button"
                onClick={() => field.handleChange(undefined)}
                className="absolute right-1 top-1 rounded-full bg-background/80 p-1 text-destructive shadow-sm backdrop-blur-sm hover:bg-background"
                title="Remove image"
              >
                <HugeiconsIcon icon={Delete02Icon} size={12} />
              </button>
            </>
          ) : (
            <HugeiconsIcon icon={Image01Icon} size={24} className="text-muted-foreground/50" />
          )}
        </div>

        {/* Input Trigger */}
        <div className="flex-1 space-y-1">
          <Label
            htmlFor={`file-input-${field.name}`}
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <HugeiconsIcon icon={Upload01Icon} size={14} />
            {file ? 'Change Image' : 'Upload Image'}
          </Label>
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
          <p className="text-[10px] text-muted-foreground">JPG, PNG or WEBP (Max 5MB)</p>
        </div>
      </div>

      {error && (
        <p className="text-xs text-destructive">
          {typeof error === 'string' ? error : error?.message}
        </p>
      )}
    </div>
  );
}

// Helper component for multi-file Gallery preview
function GalleryImageItem({ field, onRemove }: { field: AnyFieldApi; onRemove: () => void }) {
  const file = field.state.value as File | undefined | null;

  const previewUrl = useMemo(() => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);

  return (
    <div className="group relative flex h-24 w-full items-center justify-center overflow-hidden rounded-lg border bg-muted/40">
      {previewUrl ? (
        <>
          <Image
            src={previewUrl}
            alt="Gallery item"
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="h-7 w-7"
              onClick={onRemove}
            >
              <HugeiconsIcon icon={Delete02Icon} size={14} />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-1 p-2 text-center">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) field.handleChange(selectedFile);
            }}
          />
          <HugeiconsIcon icon={Upload01Icon} size={18} className="text-muted-foreground" />
          <span className="text-[10px] font-medium text-muted-foreground">Select File</span>
        </div>
      )}
    </div>
  );
}

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
                {/* Details Section */}
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

                {/* Pricing & Stock */}
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

                {/* Single Image Uploads */}
                <div className="grid gap-6 sm:grid-cols-2 border-t pt-4">
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

                {/* Gallery File Uploads */}
                <form.Field name={`variants[${index}].gallery`} mode="array">
                  {(galleryField: AnyFieldApi) => (
                    <div className="space-y-3 border-t pt-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold uppercase text-muted-foreground">
                          Gallery Images
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs gap-1"
                          onClick={() => galleryField.pushValue(undefined)}
                        >
                          <HugeiconsIcon icon={PlusSignIcon} size={14} />
                          Add Image Slot
                        </Button>
                      </div>

                      {galleryField.state.value.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {galleryField.state.value.map((_: File | null, galleryIndex: number) => (
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
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground italic">
                          No gallery images added yet.
                        </p>
                      )}
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

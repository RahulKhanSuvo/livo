'use client';

import { Button } from '@/components/ui/button';
import { Delete02Icon, PlusSignIcon, Upload01Icon } from '@hugeicons/core-free-icons';
import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '@/lib/utils';
import { AnyFieldApi } from '@tanstack/react-form';

const MAX_GALLERY_IMAGES = 4;

type ExistingImage = {
  id: string;
  imageUrl: string;
};

type GalleryItem = File | ExistingImage;

interface GallerySectionImageAddProps {
  galleryField: AnyFieldApi;
}

function isExistingImage(value: unknown): value is ExistingImage {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const image = value as Partial<ExistingImage>;

  return (
    typeof image.id === 'string' && typeof image.imageUrl === 'string' && image.imageUrl.length > 0
  );
}

function isGalleryItem(value: unknown): value is GalleryItem {
  return value instanceof File || isExistingImage(value);
}

export function GallerySectionImageAdd({ galleryField }: GallerySectionImageAddProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rawValue = galleryField.state.value;
  console.log('eae', rawValue);
  /**
   * Only valid gallery items are rendered.
   *
   * This protects the UI from accidentally receiving:
   *
   * {}
   */
  const galleryItems: GalleryItem[] = Array.isArray(rawValue) ? rawValue.filter(isGalleryItem) : [];

  const remainingSlots = Math.max(0, MAX_GALLERY_IMAGES - galleryItems.length);

  const isMaxReached = remainingSlots === 0;

  const handleMultipleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);

    if (selectedFiles.length === 0) {
      return;
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      galleryField.handleChange([...galleryItems, ...filesToAdd]);
    }

    e.target.value = '';
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedItems = galleryItems.filter((_, index) => index !== indexToRemove);

    galleryField.handleChange(updatedItems);
  };

  const error = galleryField.state.meta.errors[0];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Gallery Images (Max {MAX_GALLERY_IMAGES})
          </span>

          <p className="text-[11px] text-muted-foreground">
            {galleryItems.length} of {MAX_GALLERY_IMAGES} uploaded
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={isMaxReached}
          className="hidden"
          onChange={handleMultipleUpload}
        />

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isMaxReached}
          className="h-8 gap-1.5 text-xs"
          onClick={() => fileInputRef.current?.click()}
        >
          <HugeiconsIcon icon={Upload01Icon} size={14} />

          {isMaxReached ? 'Limit Reached' : 'Upload Images'}
        </Button>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {galleryItems.map((item, index) => (
          <GalleryImage
            key={item instanceof File ? `${item.name}-${item.lastModified}-${index}` : item.id}
            item={item}
            index={index}
            onRemove={() => handleRemoveImage(index)}
          />
        ))}

        {/* Add image placeholder */}
        {!isMaxReached && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'flex aspect-square w-full flex-col',
              'items-center justify-center gap-1.5',
              'rounded-xl border-2 border-dashed',
              'border-muted-foreground/20',
              'bg-muted/20 text-muted-foreground',
              'transition-colors',
              'hover:border-primary/50',
              'hover:bg-muted/40',
              'hover:text-foreground'
            )}
          >
            <div className="rounded-full border bg-background p-2 shadow-xs">
              <HugeiconsIcon icon={PlusSignIcon} size={14} />
            </div>

            <span className="text-[11px] font-medium">Add Image</span>
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs font-medium text-destructive">
          {typeof error === 'string' ? error : error?.message}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/* Individual Image */
/* ------------------------------------------------ */

function GalleryImage({
  item,
  index,
  onRemove,
}: {
  item: GalleryItem;
  index: number;
  onRemove: () => void;
}) {
  const isFile = item instanceof File;

  /**
   * Existing image:
   *
   * We already have the Cloudinary URL.
   */
  const existingImageUrl = !isFile ? item.imageUrl : null;

  /**
   * New File:
   *
   * Create an object URL.
   *
   * useMemo runs during rendering, but does not
   * access refs or set state.
   */
  const filePreviewUrl = useMemo(() => {
    if (!isFile) {
      return null;
    }

    return URL.createObjectURL(item);
  }, [item, isFile]);

  /**
   * Clean up object URL.
   */
  useEffect(() => {
    if (!filePreviewUrl) {
      return;
    }

    return () => {
      URL.revokeObjectURL(filePreviewUrl);
    };
  }, [filePreviewUrl]);

  const imageSrc = existingImageUrl ?? filePreviewUrl;

  if (!imageSrc) {
    return null;
  }

  return (
    <div
      className={cn(
        'group relative aspect-square w-full',
        'overflow-hidden rounded-xl border',
        'bg-muted/30'
      )}
    >
      <Image
        src={imageSrc}
        alt={`Gallery image ${index + 1}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        unoptimized={isFile}
      />

      {/* Hover overlay */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          'bg-black/40 opacity-0 transition-opacity',
          'group-hover:opacity-100'
        )}
      >
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

      {/* Saved / New badge */}
      <div className="absolute left-2 top-2">
        <span className="rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white">
          {isFile ? 'New' : 'Saved'}
        </span>
      </div>
    </div>
  );
}

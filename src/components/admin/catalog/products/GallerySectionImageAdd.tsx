'use client';

import { Button } from '@/components/ui/button';
import { Delete02Icon, PlusSignIcon, Upload01Icon } from '@hugeicons/core-free-icons';
import Image from 'next/image';
import { useRef } from 'react';
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

export function GallerySectionImageAdd({ galleryField }: GallerySectionImageAddProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const galleryItems = (galleryField.state.value as GalleryItem[]) ?? [];

  const remainingSlots = MAX_GALLERY_IMAGES - galleryItems.length;

  const isMaxReached = remainingSlots <= 0;

  const handleMultipleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);

    if (selectedFiles.length === 0) return;

    const filesToAdd = selectedFiles.slice(0, remainingSlots);
    console.log(filesToAdd);

    galleryField.handleChange([...galleryItems, ...filesToAdd]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = galleryItems.filter((_, index) => index !== indexToRemove);

    galleryField.handleChange(updated);
  };

  const error = galleryField.state.meta.errors[0];

  return (
    <div className="space-y-3">
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {galleryItems.map((item, index) => {
          const isFile = item instanceof File;

          const imageSrc = isFile ? URL.createObjectURL(item) : item.imageUrl;

          return (
            <div
              key={isFile ? `${item.name}-${index}` : item.id}
              className="group relative aspect-square w-full overflow-hidden rounded-xl border bg-muted/30"
            >
              <Image
                src={imageSrc}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized={isFile}
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemoveImage(index)}
                >
                  <HugeiconsIcon icon={Delete02Icon} size={14} />
                </Button>
              </div>
            </div>
          );
        })}

        {!isMaxReached && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-xl',
              'border-2 border-dashed border-muted-foreground/20',
              'bg-muted/20 text-muted-foreground',
              'transition-colors hover:border-primary/50',
              'hover:bg-muted/40 hover:text-foreground'
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

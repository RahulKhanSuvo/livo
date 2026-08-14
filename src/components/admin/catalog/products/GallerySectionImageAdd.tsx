import { Button } from '@/components/ui/button';
import { Delete02Icon, PlusSignIcon, Upload01Icon } from '@hugeicons/core-free-icons';
import { AnyFieldApi } from '@tanstack/react-form';
import Image from 'next/image';
import { useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
const MAX_GALLERY_IMAGES = 4;
export function GallerySectionImageAdd({ galleryField }: { galleryField: AnyFieldApi }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryItems = (galleryField.state.value as File[]) || [];
  const remainingSlots = MAX_GALLERY_IMAGES - galleryItems.length;
  const isMaxReached = remainingSlots <= 0;

  const handleMultipleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    // Slice array to limit strictly to max 4 images
    const filesToAdd = selectedFiles.slice(0, remainingSlots);
    galleryField.handleChange([...galleryItems, ...filesToAdd]);

    // Reset input value so same files can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = galleryItems.filter((_, idx) => idx !== indexToRemove);
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
          className="h-8 text-xs gap-1.5"
          onClick={() => fileInputRef.current?.click()}
        >
          <HugeiconsIcon icon={Upload01Icon} size={14} />
          {isMaxReached ? 'Limit Reached' : 'Upload Images'}
        </Button>
      </div>

      {/* Grid displaying up to 4 preview tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {galleryItems.map((file, imgIdx) => {
          const previewUrl = file instanceof File ? URL.createObjectURL(file) : null;

          return (
            <div
              key={imgIdx}
              className="group relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted/30 transition-all hover:shadow-xs"
            >
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt={`Gallery item ${imgIdx + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemoveImage(imgIdx)}
                >
                  <HugeiconsIcon icon={Delete02Icon} size={14} />
                </Button>
              </div>
            </div>
          );
        })}

        {/* Empty Dropzone Tile placeholder if less than 4 */}
        {!isMaxReached && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/20 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/40 hover:text-foreground"
          >
            <div className="rounded-full bg-background p-2 border shadow-xs">
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

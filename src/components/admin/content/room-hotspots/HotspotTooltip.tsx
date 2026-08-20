'use client';

import * as React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete01Icon, CheckIcon, LoadingIcon } from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type {
  AdminRoomHotspot,
  CardPosition,
} from '@/actions/content/room-hotspots/room-hotspots.type';
import { ProductPicker } from './ProductPicker';

const CARD_POSITIONS: CardPosition[] = ['top', 'bottom', 'left', 'right'];

export function HotspotTooltip({
  hotspot,
  onClose,
  onDelete,
  onSave,
  deleting,
  creating,
  saving,
}: {
  hotspot: AdminRoomHotspot;
  onClose: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: (
    id: string,
    patch: { productId: string | null; cardPosition: CardPosition | null; isActive: boolean }
  ) => void;
  deleting: boolean;
  creating: boolean;
  saving: boolean;
}) {
  const [productId, setProductId] = React.useState<string | null>(hotspot.productId);
  const [productName, setProductName] = React.useState(hotspot.product?.name ?? '');
  const [cardPosition, setCardPosition] = React.useState<CardPosition | null>(hotspot.cardPosition);
  const [isActive, setIsActive] = React.useState(hotspot.isActive);

  const flipX = hotspot.x > 65;
  const flipY = hotspot.y > 65;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        transform: `translate(${flipX ? 'calc(-100% - 16px)' : '16px'}, ${
          flipY ? 'calc(-100% - 16px)' : '16px'
        })`,
      }}
      className="absolute z-40 w-72 rounded-sm border border-black/10 bg-white p-4 shadow-2xl"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">Hotspot</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onDelete(hotspot.id)}
            disabled={deleting}
            className="flex size-7 items-center justify-center rounded-full text-destructive hover:bg-destructive/10 disabled:opacity-50"
            aria-label="Delete hotspot"
          >
            {deleting ? (
              <HugeiconsIcon icon={LoadingIcon} size={16} className="animate-spin" />
            ) : (
              <HugeiconsIcon icon={Delete01Icon} size={16} />
            )}
          </button>
          <button
            type="button"
            onClick={() => onClose(hotspot.id)}
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-black/5"
            aria-label="Close"
          >
            <HugeiconsIcon icon={CheckIcon} size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Product</Label>
        <ProductPicker
          value={productId}
          displayName={productName}
          autoFocus={!productId}
          onSelect={(pid, name) => {
            setProductId(pid);
            setProductName(name);
          }}
        />
        {productId && productName && (
          <p className="text-xs text-muted-foreground">Assigned: {productName}</p>
        )}
      </div>

      <div className="mt-3 space-y-1.5">
        <Label>Card position</Label>
        <div className="grid grid-cols-4 gap-1">
          {CARD_POSITIONS.map((pos) => (
            <Button
              key={pos}
              size="sm"
              variant={cardPosition === pos ? 'default' : 'outline'}
              onClick={() => setCardPosition(pos)}
              className="capitalize"
            >
              {pos}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Label>Active</Label>
        <button
          type="button"
          onClick={() => setIsActive((v) => !v)}
          className={cn(
            'relative h-6 w-11 rounded-full transition-colors',
            isActive ? 'bg-primary' : 'bg-neutral-300'
          )}
          aria-pressed={isActive}
        >
          <span
            className={cn(
              'absolute top-0.5 size-5 rounded-full bg-white transition-all',
              isActive ? 'left-[22px]' : 'left-0.5'
            )}
          />
        </button>
      </div>

      <Button
        className="mt-4 w-full gap-1.5"
        disabled={creating || saving}
        onClick={() => onSave(hotspot.id, { productId, cardPosition, isActive })}
      >
        <HugeiconsIcon
          icon={saving ? LoadingIcon : CheckIcon}
          size={16}
          className={saving ? 'animate-spin' : ''}
        />
        {creating ? 'Creating…' : saving ? 'Saving…' : 'Save changes'}
      </Button>
    </div>
  );
}

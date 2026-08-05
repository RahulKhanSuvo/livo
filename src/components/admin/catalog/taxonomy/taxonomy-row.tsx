'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Folder01Icon,
  Folder02Icon,
  GroupItemsIcon,
  PlusSignIcon,
  Edit02Icon,
  Delete01Icon,
  ChevronRightIcon,
} from '@hugeicons/core-free-icons';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { RowItem } from './types';

const LEVEL_META = {
  category: { tone: '#4b6b56', icon: Folder01Icon },
  subcategory: { tone: '#d98e63', icon: Folder02Icon },
  productType: { tone: '#8a9b80', icon: GroupItemsIcon },
} as const;

export function ExplorerRow({
  row,
  childLabel,
  onOpen,
  onAddChild,
  onEdit,
  onDelete,
}: {
  row: RowItem;
  childLabel: string;
  onOpen: () => void;
  onAddChild?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { tone, icon } = LEVEL_META[row.kind];
  const isLeaf = row.kind === 'productType';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[#f6f5f1]/70"
    >
      <span
        className="grid size-8 shrink-0 place-items-center rounded-lg"
        style={{ backgroundColor: `${tone}14`, color: tone }}
      >
        <HugeiconsIcon icon={icon} size={16} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground/90">{row.item.name}</p>
        <p className="truncate text-xs text-muted-foreground">{childLabel}</p>
      </div>
      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        {onAddChild && (
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Add child"
            onClick={(e) => {
              e.stopPropagation();
              onAddChild();
            }}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={13} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <HugeiconsIcon icon={Edit02Icon} size={13} />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <HugeiconsIcon icon={Delete01Icon} size={13} className="text-destructive" />
        </Button>
      </div>
      <HugeiconsIcon
        icon={ChevronRightIcon}
        size={16}
        className={cn('shrink-0 text-muted-foreground', isLeaf && 'invisible')}
      />
    </div>
  );
}

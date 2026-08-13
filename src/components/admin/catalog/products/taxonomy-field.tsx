'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, PlusSignIcon } from '@hugeicons/core-free-icons';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CREATE_NEW = '__create__';

export function TaxonomyField({
  label,
  value,
  options,
  placeholder,
  disabled,
  disabledLabel,
  onPick,
  onCustom,
}: {
  label: string;
  value: string;
  options: { id: string; name: string }[];
  placeholder: string;
  disabled?: boolean;
  disabledLabel?: string;
  onPick: (name: string) => void;
  onCustom: (name: string) => void;
}) {
  const [creating, setCreating] = useState(false);
  const current = options.find((o) => o.name === value);

  if (creating) {
    return (
      <div className="space-y-1.5">
        <Label>{label}</Label>
        <div className="flex gap-1.5">
          <Input
            autoFocus
            value={value}
            onChange={(e) => onCustom(e.target.value)}
            placeholder="Type a new name…"
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Back to existing options"
            onClick={() => setCreating(false)}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} />
          </Button>
        </div>
        {value.trim() === '' && (
          <p className="text-xs font-normal text-destructive">Give it a name</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select
        disabled={disabled}
        value={current ? current.name : undefined}
        onValueChange={(next) => {
          if (next === CREATE_NEW) {
            setCreating(true);
            return;
          }
          onPick(next);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.id} value={o.name}>
              {o.name}
            </SelectItem>
          ))}
          {options.length > 0 && <SelectSeparator />}
          {!disabled && (
            <SelectItem value={CREATE_NEW}>
              <HugeiconsIcon icon={PlusSignIcon} size={14} />
              Create new…
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      {disabled && disabledLabel && (
        <p className="text-xs text-muted-foreground">{disabledLabel}</p>
      )}
    </div>
  );
}

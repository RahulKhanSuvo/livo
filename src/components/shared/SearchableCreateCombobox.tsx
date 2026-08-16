'use client';

import { useMemo, useState } from 'react';

import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, PlusSignIcon, Tick02Icon } from '@hugeicons/core-free-icons';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SearchableCreateComboboxProps<T> {
  items: T[];
  value: string;
  onChange: (value: string) => void;

  getItemId: (item: T) => string;
  getItemLabel: (item: T) => string;

  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  createMessage?: (value: string) => string;

  disabled?: boolean;
}

export function SearchableCreateCombobox<T>({
  items,
  value,
  onChange,
  getItemId,
  getItemLabel,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No item found.',
  createMessage = (value) => `Create "${value}"`,
  disabled = false,
}: SearchableCreateComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const normalizedSearch = search.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    if (!normalizedSearch) {
      return items;
    }

    return items.filter((item) => getItemLabel(item).toLowerCase().includes(normalizedSearch));
  }, [items, normalizedSearch, getItemLabel]);

  const exactMatchExists = useMemo(() => {
    if (!normalizedSearch) {
      return false;
    }

    return items.some((item) => getItemLabel(item).trim().toLowerCase() === normalizedSearch);
  }, [items, normalizedSearch, getItemLabel]);

  const handleSelect = (item: T) => {
    onChange(getItemLabel(item));
    setOpen(false);
    setSearch('');
  };

  const handleCreate = () => {
    const newValue = search.trim();

    if (!newValue) return;

    onChange(newValue);
    setOpen(false);
    setSearch('');
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (!nextOpen) {
          setSearch('');
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
        >
          <span className={value ? '' : 'text-muted-foreground'}>{value || placeholder}</span>

          <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder={searchPlaceholder} value={search} onValueChange={setSearch} />

          <CommandList>
            {filteredItems.length === 0 && <CommandEmpty>{emptyMessage}</CommandEmpty>}

            {filteredItems.length > 0 && (
              <CommandGroup>
                {filteredItems.map((item) => {
                  const id = getItemId(item);
                  const label = getItemLabel(item);

                  return (
                    <CommandItem key={id} value={label} onSelect={() => handleSelect(item)}>
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        className={`mr-2 size-4 ${value === label ? 'opacity-100' : 'opacity-0'}`}
                      />

                      {label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            {normalizedSearch && !exactMatchExists && (
              <CommandGroup>
                <CommandItem onSelect={handleCreate}>
                  <HugeiconsIcon icon={PlusSignIcon} className="mr-2 size-4" />

                  {createMessage(search.trim())}
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

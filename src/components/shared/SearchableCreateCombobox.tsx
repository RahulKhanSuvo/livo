'use client';

import { useMemo, useState } from 'react';

import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, Tick02Icon } from '@hugeicons/core-free-icons';

import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from '@/components/ui/combobox';

interface SearchableCreateComboboxProps<T> {
  items: T[];

  /** Selected item ID */
  value: string;

  /** Returns selected/created item ID */
  onChange: (value: string) => void;

  getItemId: (item: T) => string;
  getItemLabel: (item: T) => string;

  /** Called when creating a new item */
  onCreate?: (name: string) => Promise<T>;

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
  onCreate,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No item found.',
  createMessage = (value) => `Create "${value}"`,
  disabled = false,
}: SearchableCreateComboboxProps<T>) {
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const selectedItem = useMemo(
    () => items.find((item) => getItemId(item) === value) ?? null,
    [items, value, getItemId]
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return items;
    }

    return items.filter((item) => getItemLabel(item).toLowerCase().includes(query));
  }, [items, search, getItemLabel]);

  const exactMatchExists = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return false;
    }

    return items.some((item) => getItemLabel(item).trim().toLowerCase() === query);
  }, [items, search, getItemLabel]);

  const handleSelect = (item: T) => {
    onChange(getItemId(item));
    setSearch('');
  };

  const handleCreate = async () => {
    const name = search.trim();

    if (!name || !onCreate || isCreating) {
      return;
    }

    try {
      setIsCreating(true);

      const createdItem = await onCreate(name);

      onChange(getItemId(createdItem));

      setSearch('');
    } catch (error) {
      console.error('Failed to create item:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Combobox
      items={filteredItems}
      value={selectedItem}
      onValueChange={(item) => {
        if (!item) {
          onChange('');
          setSearch('');
          return;
        }

        handleSelect(item);
      }}
      inputValue={search}
      onInputValueChange={(value) => {
        setSearch(value);
      }}
      itemToStringValue={getItemLabel}
    >
      <ComboboxInput
        placeholder={
          isCreating ? 'Creating...' : selectedItem ? getItemLabel(selectedItem) : searchPlaceholder
        }
        disabled={disabled || isCreating}
        autoComplete="off"
      />

      <ComboboxContent>
        {filteredItems.length === 0 && !search.trim() && (
          <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        )}

        <ComboboxList>
          {filteredItems.map((item) => {
            const id = getItemId(item);
            const label = getItemLabel(item);

            return (
              <ComboboxItem key={id} value={item}>
                <HugeiconsIcon
                  icon={Tick02Icon}
                  className={`mr-2 size-4 ${value === id ? 'opacity-100' : 'opacity-0'}`}
                />

                {label}
              </ComboboxItem>
            );
          })}

          {onCreate && search.trim() && !exactMatchExists && (
            <ComboboxItem value={null} onSelect={handleCreate} disabled={isCreating}>
              <HugeiconsIcon icon={PlusSignIcon} className="mr-2 size-4" />

              {isCreating ? 'Creating...' : createMessage(search.trim())}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

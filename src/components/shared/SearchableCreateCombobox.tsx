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
  value: string;
  onChange: (value: string) => void;

  getItemId: (item: T) => string;
  getItemLabel: (item: T) => string;

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

  /**
   * Find selected object from the ID stored in the form.
   */
  const selectedItem = useMemo(() => {
    return items.find((item) => getItemId(item) === value) ?? null;
  }, [items, value, getItemId]);

  /**
   * Label of currently selected item.
   */
  const selectedLabel = selectedItem ? getItemLabel(selectedItem) : '';

  /**
   * What should actually be displayed in the input.
   *
   * If the user is searching -> show search text.
   * Otherwise -> show selected item's name.
   */
  const inputValue = search || selectedLabel;

  /**
   * Filter items.
   */
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return items;
    }

    return items.filter((item) => getItemLabel(item).toLowerCase().includes(query));
  }, [items, search, getItemLabel]);

  /**
   * Check if exact name already exists.
   */
  const exactMatchExists = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return false;
    }

    return items.some((item) => getItemLabel(item).trim().toLowerCase() === query);
  }, [items, search, getItemLabel]);

  /**
   * Existing item selected.
   */
  const handleSelect = (item: T) => {
    const id = getItemId(item);
    const label = getItemLabel(item);

    // Form stores ID
    onChange(id);

    // Input displays NAME
    setSearch(label);
  };

  /**
   * Create new item.
   */
  const handleCreate = async () => {
    const name = search.trim();

    if (!name || !onCreate || isCreating) {
      return;
    }

    try {
      setIsCreating(true);

      const createdItem = await onCreate(name);

      const id = getItemId(createdItem);
      const label = getItemLabel(createdItem);

      // Form stores ID
      onChange(id);

      // Input displays NAME
      setSearch(label);
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
      itemToStringValue={(item) => {
        if (!item) {
          return '';
        }

        return getItemLabel(item);
      }}
    >
      <ComboboxInput
        value={inputValue}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        placeholder={isCreating ? 'Creating...' : selectedItem ? selectedLabel : searchPlaceholder}
        disabled={disabled || isCreating}
        autoComplete="off"
      />

      <ComboboxContent>
        <ComboboxList>
          {filteredItems.map((item) => {
            const id = getItemId(item);
            const label = getItemLabel(item);

            return (
              <ComboboxItem key={id} value={item}>
                {label}
              </ComboboxItem>
            );
          })}
        </ComboboxList>

        {onCreate && search.trim() && !exactMatchExists && (
          <div className="border-t p-1">
            <button
              type="button"
              disabled={isCreating}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={() => {
                void handleCreate();
              }}
              className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <HugeiconsIcon icon={PlusSignIcon} className="mr-2 size-4" />

              {isCreating ? 'Creating...' : createMessage(search.trim())}
            </button>
          </div>
        )}

        {filteredItems.length === 0 && search.trim() && (
          <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        )}
      </ComboboxContent>
    </Combobox>
  );
}

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

  /** Called with selected/created item ID */
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
  placeholder = 'Select...',
  emptyMessage = 'No item found.',
  createMessage = (value) => `Create "${value}"`,
  disabled = false,
}: SearchableCreateComboboxProps<T>) {
  const [search, setSearch] = useState('');
  const [createdItem, setCreatedItem] = useState<T | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  /*
   * Include the newly-created item locally.
   *
   * This is important because the parent `items` array won't contain
   * the new item until React Query refetches.
   */
  const allItems = useMemo(() => {
    if (!createdItem) {
      return items;
    }

    const createdId = getItemId(createdItem);

    const alreadyExists = items.some((item) => getItemId(item) === createdId);

    return alreadyExists ? items : [...items, createdItem];
  }, [items, createdItem, getItemId]);

  /*
   * Find selected item by ID.
   */
  const selectedItem = useMemo(() => {
    return allItems.find((item) => getItemId(item) === value) ?? null;
  }, [allItems, value, getItemId]);

  /*
   * Filter items using search text.
   */
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return allItems;
    }

    return allItems.filter((item) => getItemLabel(item).toLowerCase().includes(query));
  }, [allItems, search, getItemLabel]);

  /*
   * Check whether the typed name already exists.
   */
  const exactMatchExists = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return false;
    }

    return allItems.some((item) => getItemLabel(item).trim().toLowerCase() === query);
  }, [allItems, search, getItemLabel]);

  /*
   * Select existing item.
   */
  const handleSelect = (item: T) => {
    onChange(getItemId(item));
    setSearch('');
  };

  /*
   * Create new item.
   */
  const handleCreate = async () => {
    const name = search.trim();

    if (!name || !onCreate || isCreating) {
      return;
    }

    try {
      setIsCreating(true);

      const newItem = await onCreate(name);

      /*
       * Keep it locally so the combobox can immediately
       * display its name.
       */
      setCreatedItem(newItem);

      /*
       * Store ID in the form.
       */
      onChange(getItemId(newItem));

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
      onInputValueChange={setSearch}
      itemToStringValue={getItemLabel}
    >
      <ComboboxInput
        placeholder={
          isCreating ? 'Creating...' : selectedItem ? getItemLabel(selectedItem) : placeholder
        }
        disabled={disabled || isCreating}
        autoComplete="off"
      />

      <ComboboxContent>
        {filteredItems.length === 0 && <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>}

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
            <ComboboxItem value={null} disabled={isCreating} onSelect={handleCreate}>
              <HugeiconsIcon icon={PlusSignIcon} className="mr-2 size-4" />

              {isCreating ? 'Creating...' : createMessage(search.trim())}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

'use client';

import { RefObject } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, Cancel01Icon, Loading02Icon } from '@hugeicons/core-free-icons';

interface SearchHeaderProps {
  query: string;
  isSearching: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onQueryChange: (value: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function SearchHeader({
  query,
  isSearching,
  inputRef,
  onQueryChange,
  onClear,
  onClose,
}: SearchHeaderProps) {
  return (
    <div className="shrink-0 max-w-360 w-full mx-auto px-6 md:px-10 h-20 flex items-center justify-between relative border-b border-neutral-100 bg-white z-10">
      <div className="w-10" /> {/* Left spacer */}
      {/* Centered Search Input Pill */}
      <div className="flex-1 max-w-xl mx-auto flex items-center gap-3 px-5 py-2.5 rounded-full border border-neutral-300 bg-white focus-within:border-black transition-colors shadow-xs">
        {isSearching ? (
          <HugeiconsIcon
            icon={Loading02Icon}
            size={18}
            className="animate-spin text-neutral-500 shrink-0"
          />
        ) : (
          <HugeiconsIcon icon={Search01Icon} size={18} className="text-neutral-400 shrink-0" />
        )}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="What can we help you find?"
          className="w-full text-sm text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
        />

        {query && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-neutral-400 hover:text-neutral-800 font-medium"
          >
            Clear
          </button>
        )}
      </div>
      {/* Close Button */}
      <div className="w-10 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="p-2 text-neutral-500 hover:text-black transition-colors rounded-full hover:bg-neutral-100"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={22} />
        </button>
      </div>
    </div>
  );
}

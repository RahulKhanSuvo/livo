'use client';

import Link from 'next/link';
import { SearchCategoryResult } from '@/actions/products/searchProductsAction';

interface SearchSuggestionsProps {
  categories: SearchCategoryResult[];
  onSelectSuggestion: (term: string) => void;
  onClose: () => void;
}

const quickSearches = ['Table', 'Chairs', 'Sofa', 'Lamp', 'Bed'];
const usefulLinks = [
  { label: 'Tables', href: '/shop' },
  { label: 'Chairs', href: '/shop' },
  { label: 'Sofas', href: '/shop' },
  { label: 'Decor & Lamps', href: '/shop' },
  { label: 'Storage & Bookshelves', href: '/shop' },
];

export function SearchSuggestions({
  categories,
  onSelectSuggestion,
  onClose,
}: SearchSuggestionsProps) {
  return (
    <div className="md:col-span-5 md:border-l md:border-neutral-200/80 md:pl-8 space-y-6">
      {/* Dynamic Categories from Server Action */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-2.5">
            Categories ({categories.length})
          </h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={cat.href}
                  onClick={onClose}
                  className="text-xs font-medium text-primary hover:underline block py-0.5"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-b border-neutral-100 mt-4" />
        </div>
      )}

      {/* Quick Searches */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-2.5">
          Popular searches
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {quickSearches.map((term, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSuggestion(term)}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700 hover:border-black hover:bg-white hover:text-black transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-neutral-100" />

      {/* Quick Navigation Links */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-2.5">
          Explore Categories
        </h3>
        <ul className="space-y-1.5">
          {usefulLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.href}
                onClick={onClose}
                className="text-xs text-neutral-700 hover:text-black transition-colors block py-0.5"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

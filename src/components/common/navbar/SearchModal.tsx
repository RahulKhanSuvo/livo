'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import {
  searchProductsAction,
  SearchProductResult,
  SearchCategoryResult,
} from '@/actions/products/searchProductsAction';
import { SearchHeader } from '@/components/search/search-header';
import { SearchProductList } from '@/components/search/search-product-list';
import { SearchSuggestions } from '@/components/search/search-suggestions';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchProductResult[]>([]);
  const [categoryResults, setCategoryResults] = useState<SearchCategoryResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle focus lock & body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search query via Server Action
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    let isSubscribed = true;
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const res = await searchProductsAction(trimmed);
      if (isSubscribed) {
        if (res.success) {
          setSearchResults(res.products);
          setCategoryResults(res.categories);
        }
        setIsSearching(false);
      }
    }, 250);

    return () => {
      isSubscribed = false;
      clearTimeout(timer);
    };
  }, [query]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      setCategoryResults([]);
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSearchResults([]);
    setCategoryResults([]);
    setIsSearching(false);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-white overflow-y-auto flex flex-col"
        >
          {/* Header Bar */}
          <SearchHeader
            query={query}
            isSearching={isSearching}
            inputRef={inputRef}
            onQueryChange={handleQueryChange}
            onClear={handleClear}
            onClose={onClose}
          />

          {/* Search Content Body */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.28, ease: 'easeOut' },
            }}
            className="w-full overflow-hidden flex-1"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.38, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto px-6 pt-8 pb-16"
            >
              <h2 className="text-base font-semibold text-neutral-800 text-center mb-8">
                {query.trim() ? `Search results for "${query}"` : 'Live Product Search'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Left Column: Product Search Results */}
                <SearchProductList
                  products={searchResults}
                  isSearching={isSearching}
                  query={query}
                  onSelectProduct={onClose}
                />

                {/* Right Column: Category Results & Navigation */}
                <SearchSuggestions
                  categories={categoryResults}
                  onSelectSuggestion={(term) => handleQueryChange(term)}
                  onClose={onClose}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;

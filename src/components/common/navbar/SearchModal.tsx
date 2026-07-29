'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProductItem {
  id: string;
  brand: string;
  name: string;
  price: string;
  image: string;
  href: string;
}

const popularProducts: ProductItem[] = [
  {
    id: '1',
    brand: 'MINIFORMS',
    name: 'Acco Miniform Table',
    price: '$1,500.00',
    image:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=300&auto=format&fit=crop',
    href: '/shop/dining-room/acco-miniform-table',
  },
  {
    id: '2',
    brand: 'HAY',
    name: 'Accord chair',
    price: '$200.00',
    image:
      'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?q=80&w=300&auto=format&fit=crop',
    href: '/shop/dining-room/accord-chair',
  },
  {
    id: '3',
    brand: 'SITS',
    name: 'Alex sofa',
    price: '$1,800.00',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop',
    href: '/shop/living-room/alex-sofa',
  },
  {
    id: '4',
    brand: 'NORMANN COPENHAGEN',
    name: 'Amédée Chair',
    price: '$2,010.00',
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=300&auto=format&fit=crop',
    href: '/shop/living-room/amedee-chair',
  },
  {
    id: '5',
    brand: 'LIGNE ROSET',
    name: 'Anda Armchair',
    price: '$3,700.00',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=300&auto=format&fit=crop',
    href: '/shop/living-room/anda-armchair',
  },
];

const popularSearches = ['Table', 'Chairs', 'Lamp'];

const popularCollections = ['Beds', 'Chairs', 'Benches', 'Lightning'];

const usefulLinks = [
  'Tables',
  'Chairs',
  'Stools',
  'Benches',
  'Storage',
  'Decor',
  'TV Cabinets',
  'Armchairs',
  'Wardrobes and bookcases',
];

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen && query !== '') {
    setQuery('');
  }

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = query
    ? popularProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())
      )
    : popularProducts;

  const filteredSearches = query
    ? popularSearches.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : popularSearches;

  const filteredCollections = query
    ? popularCollections.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : popularCollections;

  const filteredLinks = query
    ? usefulLinks.filter((l) => l.toLowerCase().includes(query.toLowerCase()))
    : usefulLinks;

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
          {/* Search Header Bar - Stays fixed at top */}
          <div className="shrink-0 max-w-[1440px] w-full mx-auto px-6 md:px-10 h-20 flex items-center justify-between relative border-b border-neutral-100 bg-white z-10">
            <div className="w-10" /> {/* Spacer */}
            {/* Centered Search Pill */}
            <div className="flex-1 max-w-xl mx-auto flex items-center gap-3 px-5 py-2.5 rounded-full border border-neutral-300 bg-white focus-within:border-black transition-colors shadow-xs">
              <HugeiconsIcon icon={Search01Icon} size={18} className="text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What can we help you find?"
                className="w-full text-sm text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-xs text-neutral-400 hover:text-neutral-800"
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

          {/* Main Search Content with Shutter Animation (Height expands smoothly from small/0 to full) */}
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
                Trending searches
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Left Column: Popular products */}
                <div className="md:col-span-7">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-5">
                    Popular products
                  </h3>

                  {filteredProducts.length === 0 ? (
                    <p className="text-xs text-neutral-500 py-4">No matching products found.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={product.href}
                          onClick={onClose}
                          className="flex items-center gap-3.5 group"
                        >
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#f7f7f7] rounded-xs flex items-center justify-center p-2 shrink-0 overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="80px"
                              className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400 truncate">
                              {product.brand}
                            </span>
                            <span className="text-xs font-medium text-neutral-900 group-hover:underline truncate mt-0.5">
                              {product.name}
                            </span>
                            <span className="text-xs font-semibold text-neutral-900 mt-1">
                              {product.price}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Searches, Collections & Useful Links */}
                <div className="md:col-span-5 md:border-l md:border-neutral-200/80 md:pl-8 space-y-6">
                  {/* Section 1: Popular searches */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-2.5">
                      Popular searches
                    </h3>
                    <ul className="space-y-1">
                      {filteredSearches.map((item, idx) => (
                        <li key={idx}>
                          <button
                            type="button"
                            onClick={() => setQuery(item)}
                            className="text-xs text-neutral-700 hover:text-black transition-colors block py-0.5 text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-b border-neutral-100" />

                  {/* Section 2: Popular collections */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-2.5">
                      Popular collections
                    </h3>
                    <ul className="space-y-1">
                      {filteredCollections.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/shop/${item.toLowerCase()}`}
                            onClick={onClose}
                            className="text-xs text-neutral-700 hover:text-black transition-colors block py-0.5"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-b border-neutral-100" />

                  {/* Section 3: Useful links */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-2.5">
                      Useful links
                    </h3>
                    <ul className="space-y-1">
                      {filteredLinks.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/shop/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={onClose}
                            className="text-xs text-neutral-700 hover:text-black transition-colors block py-0.5"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;

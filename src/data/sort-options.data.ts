export interface SortOption {
  id: string;
  label: string;
}

export const sortOptionsData: SortOption[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'most-relevant', label: 'Most relevant' },
  { id: 'best-selling', label: 'Best selling' },
  { id: 'alphabetically-a-z', label: 'Alphabetically, A-Z' },
  { id: 'alphabetically-z-a', label: 'Alphabetically, Z-A' },
  { id: 'price-low-to-high', label: 'Price, low to high' },
  { id: 'price-high-to-low', label: 'Price, high to low' },
  { id: 'date-old-to-new', label: 'Date, old to new' },
  { id: 'date-new-to-old', label: 'Date, new to old' },
];

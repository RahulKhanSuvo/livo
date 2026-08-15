export interface SortOption {
  id: string;
  label: string;
  sort: 'createdAt' | 'price' | 'soldCount';
  sortOrder: 'asc' | 'desc';
}

export const sortOptionsData: SortOption[] = [
  {
    id: 'newest',
    label: 'Newest',
    sort: 'createdAt',
    sortOrder: 'desc',
  },
  {
    id: 'best-selling',
    label: 'Best Selling',
    sort: 'soldCount',
    sortOrder: 'desc',
  },
  {
    id: 'price-low',
    label: 'Price, low to high',
    sort: 'price',
    sortOrder: 'asc',
  },
  {
    id: 'price-high',
    label: 'Price, high to low',
    sort: 'price',
    sortOrder: 'desc',
  },
];

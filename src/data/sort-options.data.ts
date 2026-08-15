export interface SortOption {
  id: string;
  label: string;
}

export const sortOptionsData: SortOption[] = [
  { id: 'createdAt:desc', label: 'Newest' },
  { id: 'soldCount', label: 'Best Selling' },
  { id: 'price:asc', label: 'Price, low to high' },
  { id: 'price:desc', label: 'Price, high to low' },
];

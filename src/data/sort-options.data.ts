export type SortField = 'createdAt' | 'soldCount' | 'price';
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  id: string;
  label: string;
  field: SortField;
  direction: SortDirection;
}

export const sortOptionsData: SortOption[] = [
  {
    id: 'createdAt:desc',
    label: 'Newest',
    field: 'createdAt',
    direction: 'desc',
  },
  {
    id: 'soldCount:desc',
    label: 'Best Selling',
    field: 'soldCount',
    direction: 'desc',
  },
  {
    id: 'price:asc',
    label: 'Price, low to high',
    field: 'price',
    direction: 'asc',
  },
  {
    id: 'price:desc',
    label: 'Price, high to low',
    field: 'price',
    direction: 'desc',
  },
];

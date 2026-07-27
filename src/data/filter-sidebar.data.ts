export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
}

export const filterGroupsData: FilterGroup[] = [
  {
    id: 'brand',
    title: 'Brand',
    options: [
      { id: 'nap', label: 'NAP', count: 1 },
      { id: 'normann-copenhagen', label: 'Normann Copenhagen', count: 1 },
      { id: 'sits', label: 'Sits', count: 11 },
    ],
  },
  {
    id: 'price',
    title: 'Price',
    options: [
      { id: 'under-500', label: 'Under $500', count: 4 },
      { id: '500-1000', label: '$500 - $1,000', count: 8 },
      { id: 'over-1000', label: 'Over $1,000', count: 3 },
    ],
  },
  {
    id: 'availability',
    title: 'Availability',
    options: [
      { id: 'in-stock', label: 'In Stock', count: 12 },
      { id: 'pre-order', label: 'Pre-order', count: 3 },
    ],
  },
  {
    id: 'fabrics',
    title: 'Fabrics',
    options: [
      { id: 'velvet', label: 'Velvet', count: 5 },
      { id: 'leather', label: 'Leather', count: 4 },
      { id: 'wool', label: 'Wool', count: 6 },
    ],
  },
  {
    id: 'color',
    title: 'Color',
    options: [
      { id: 'beige', label: 'Beige', count: 7 },
      { id: 'green', label: 'Green', count: 3 },
      { id: 'brown', label: 'Brown', count: 5 },
    ],
  },
  {
    id: 'features',
    title: 'Features',
    options: [
      { id: 'modular', label: 'Modular', count: 4 },
      { id: 'removable-cover', label: 'Removable Cover', count: 6 },
    ],
  },
  {
    id: 'product-type',
    title: 'Product type',
    options: [
      { id: 'corner-sofa', label: 'Corner Sofa', count: 3 },
      { id: '2-seater', label: '2-Seater Sofa', count: 5 },
      { id: '3-seater', label: '3-Seater Sofa', count: 7 },
    ],
  },
];

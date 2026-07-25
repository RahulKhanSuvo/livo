import productImage from '@/assets/Products/produkt-1-3_d19c7532-696c-4510-bd8f-5e72ba26645f.webp';
export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  badges?: Array<{
    label: string;
    variant: 'blue' | 'green' | 'red';
  }>;
  image: typeof productImage;
  category: 'new' | 'sofas' | 'tables';
  colorSwatches?: string[]; // Array of color hexes or class names
}

export const productsData: Product[] = [
  {
    id: '1',
    brand: 'LIGNE ROSET',
    name: 'Uncover Armchair B',
    price: 1360.0,
    badges: [{ label: 'Trending', variant: 'blue' }],
    image: productImage,
    category: 'new',
    colorSwatches: ['#F3F3EF', '#3A7D69'],
  },
  {
    id: '2',
    brand: 'LIGNE ROSET',
    name: 'Hémicycle Vis-à-Vis Sofa',
    price: 7810.0,
    image: productImage,
    category: 'sofas',
  },
  {
    id: '3',
    brand: "UN'COMMON",
    name: 'Zebu Armchair',
    price: 1340.0,
    originalPrice: 1590.0,
    badges: [
      { label: 'Eco Friendly', variant: 'green' },
      { label: 'Sale', variant: 'red' },
    ],
    image: productImage,
    category: 'new',
  },
  {
    id: '4',
    brand: 'NORR11',
    name: 'Naked Side Table 45',
    price: 590.0,
    image: productImage,
    category: 'tables',
    colorSwatches: ['#D4AF37', '#B0A8A0', '#2E5B3E'],
  },
  {
    id: '5',
    brand: 'FRITZ HANSEN',
    name: 'Egg Footstool',
    price: 310.0,
    image: productImage,
    category: 'new',
  },
];

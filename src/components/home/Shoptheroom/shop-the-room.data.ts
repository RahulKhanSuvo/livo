export interface Hotspot {
  id: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  cardPosition?: 'top' | 'bottom' | 'left' | 'right';
  product: {
    title: string;
    brand: string;
    originalPrice: string;
    salePrice: string;
    discountBadge?: string;
    imageUrl: string;
    href: string;
  };
}

export const roomHotspots: Hotspot[] = [
  {
    id: '1',
    x: 23,
    y: 75,
    cardPosition: 'top',
    product: {
      title: 'Bit table Normann Copenhagen',
      brand: 'Normann Copenhagen',
      originalPrice: '$599.00',
      salePrice: '$400.00',
      discountBadge: '-33%',
      imageUrl: '/images/products/bit-table.jpg',
      href: '/products/bit-table',
    },
  },
  {
    id: '2',
    x: 48.8,
    y: 68,
    cardPosition: 'top',
    product: {
      title: 'Modular Velvet Sofa',
      brand: 'SITS',
      originalPrice: '$2,400.00',
      salePrice: '$1,890.00',
      discountBadge: '-21%',
      imageUrl: '/images/products/velvet-sofa.jpg',
      href: '/products/velvet-sofa',
    },
  },
  {
    id: '3',
    x: 65,
    y: 78.5,
    cardPosition: 'top',
    product: {
      title: 'Lounge Armchair End',
      brand: 'MENU',
      originalPrice: '$1,100.00',
      salePrice: '$850.00',
      imageUrl: '/images/products/armchair.jpg',
      href: '/products/armchair',
    },
  },
  {
    id: '4',
    x: 67.8,
    y: 34.5,
    cardPosition: 'left',
    product: {
      title: 'Round Wall Mirror',
      brand: 'Ferm Living',
      originalPrice: '$350.00',
      salePrice: '$290.00',
      imageUrl: '/images/products/round-mirror.jpg',
      href: '/products/round-mirror',
    },
  },
];

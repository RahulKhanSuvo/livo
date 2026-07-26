import { StaticImageData } from 'next/image';

export interface Product {
  id: string;
  brand: string;
  name: string;
  slug: string;
  category: string;

  price: number;
  salePrice?: number;

  badges: ProductBadge[];

  description: string;
  specifications: ProductSpecifications;

  variants: ProductVariant[];
}

export interface ProductBadge {
  id: string;
  label: string;
  type: 'trending' | 'sale' | 'eco-friendly' | 'new' | 'best-seller' | 'limited' | 'exclusive';
}

export interface ProductSpecifications {
  material: {
    frame: string;
    seat: string;
    finish: string;
  };

  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  weight?: string;
  assemblyRequired?: boolean;
}

export interface ProductVariant {
  id: string;

  color: string;
  hex: string;

  stock: number;

  sku?: string;

  mainImage: StaticImageData;
  hoverImage: StaticImageData;
  gallery: StaticImageData[];

  price?: number;
}

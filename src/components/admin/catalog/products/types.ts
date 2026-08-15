/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactFormExtendedApi } from '@tanstack/react-form';
import type { ProductValidationType } from '@/actions/products/productValidation';

export type Category = {
  id: string;
  name: string;
  slug?: string;
  subCategories: SubCategory[];
};

export type SubCategory = {
  id: string;
  name: string;
  productTypes: ProductType[];
};

export type ProductType = {
  id: string;
  name: string;
};

export type VariantForm = {
  id?: string;
  colorHex: string;
  stock: number;
  images: File[];
};

export type CategoryTree = Category[];

export const emptyForm: ProductValidationType = {
  name: '',
  brand: '',
  price: 0,
  salePrice: 0,
  material: '',
  description: '',
  productTypeId: '',
  width: 0,
  height: 0,
  depth: 0,
  weightKg: 0,
  assemblyRequired: false,
  variants: [
    {
      colorHex: '',
      stock: 0,
      images: [],
    },
  ],
};

export const STEPS = ['Identity', 'Classification', 'Variants'] as const;

export type ProductForm = ReactFormExtendedApi<
  ProductValidationType,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;

export type ImageType = 'MAIN' | 'HOVER' | 'GALLERY';

export interface ProductImage {
  id: string;
  variantId: string;
  imageUrl: string;
  alt: string | null;
  type: ImageType;
  sortOrder: number;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  colorHex: string;
  sku: string;
  price: string;
  salePrice: string | null;
  stock: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
}

export interface Product {
  id: string;
  productTypeId: string;
  name: string;
  slug: string;
  description: string;
  brand: string | null;
  material: string | null;
  finish: string | null;
  width: string;
  height: string;
  depth: string;
  weightKg: string;
  assemblyRequired: boolean;
  createdAt: string;
  updatedAt: string;
  variants: ProductVariant[];
}

export interface GetProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

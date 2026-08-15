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
  colorHex?: string;
  sku: string;
  price: number;
  salePrice: number | undefined;
  stock: number;
  gallery: string[];
};

export type FormValues = {
  name: string;
  slug: string;
  brand: string;
  material: string;
  description: string;
  categoryName: string;
  subcategoryName: string;
  productTypeName: string;
  productTypeId: string;
  width: number | undefined;
  height: number | undefined;
  depth: number | undefined;
  weightKg: number | undefined;
  finish: string;
  assemblyRequired: boolean;
  variants: VariantForm[];
};

export type CategoryTree = Category[];

export const emptyForm: FormValues = {
  name: '',
  slug: '',
  brand: '',
  material: '',
  description: '',
  categoryName: '',
  subcategoryName: '',
  productTypeName: '',
  productTypeId: '',
  width: undefined,
  height: undefined,
  depth: undefined,
  weightKg: undefined,
  finish: '',
  assemblyRequired: false,
  variants: [
    {
      colorHex: '',
      sku: '',
      price: 0,
      salePrice: undefined,
      stock: 0,
      gallery: [],
    },
  ],
};

export const emptyVariant: VariantForm = {
  colorHex: '',
  sku: '',
  price: 0,
  salePrice: undefined,
  stock: 0,
  gallery: [],
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

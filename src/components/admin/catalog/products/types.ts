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
  mainImage: string;
  hoverImage?: string;
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
      mainImage: '',
      hoverImage: '',
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
  mainImage: '',
  hoverImage: '',
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

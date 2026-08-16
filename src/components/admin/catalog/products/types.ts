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
  brandId: '',
  price: 0,
  salePrice: 0,
  materialId: '',
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

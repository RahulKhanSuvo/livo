export type Category = {
  id: string;
  name: string;
  slug: string;
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
  color: string;
  sku: string;
  price: string;
  salePrice: string;
  stock: string;
};

export type FormValues = {
  name: string;
  brand: string;
  material: string;
  description: string;
  categoryName: string;
  subcategoryName: string;
  productTypeName: string;
  variants: VariantForm[];
};

export type CategoryTree = Category[];

export const emptyForm: FormValues = {
  name: '',
  brand: '',
  material: '',
  description: '',
  categoryName: '',
  subcategoryName: '',
  productTypeName: '',
  variants: [{ color: '', sku: '', price: '', salePrice: '', stock: '' }],
};

export const emptyVariant: VariantForm = {
  color: '',
  sku: '',
  price: '',
  salePrice: '',
  stock: '',
};

export const STEPS = ['Identity', 'Classification', 'Variants'] as const;

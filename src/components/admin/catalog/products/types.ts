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

export const STEPS = ['Identity', 'Classification', 'Variants'] as const;

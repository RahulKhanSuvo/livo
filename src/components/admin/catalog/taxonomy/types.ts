import type { CategoryItem, SubcategoryItem, ProductTypeItem } from '../catalog.data';

export type TaxonomyFocus = 'category' | 'subcategory' | 'productType';

export type ModalMode = 'add' | 'edit';

export type ModalState =
  | { level: 'category'; mode: ModalMode; item?: CategoryItem }
  | { level: 'subcategory'; mode: ModalMode; item?: SubcategoryItem; presetCategoryId?: string }
  | { level: 'productType'; mode: ModalMode; item?: ProductTypeItem; presetSubcategoryId?: string }
  | null;

export type RowItem =
  | { kind: 'category'; item: CategoryItem }
  | { kind: 'subcategory'; item: SubcategoryItem }
  | { kind: 'productType'; item: ProductTypeItem };

export interface ModalSaveValues {
  name: string;
  slug?: string;
  parentId?: string;
  description?: string;
}

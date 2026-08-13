'use client';

import { useStore } from '@tanstack/react-form';

import {
  categories as seedCategories,
  subcategories as seedSubcategories,
  productTypes as seedProductTypes,
} from '@/components/admin/catalog/catalog.data';
import { TaxonomyField } from '../taxonomy-field';
import type { ProductForm } from '../use-product-form';

export function ClassificationStep({ form }: { form: ProductForm }) {
  const values = useStore(form.store, (s) => s.values);

  const selectedCategory = seedCategories.find((c) => c.name === values.categoryName);
  const subcategoryOptions = selectedCategory
    ? seedSubcategories.filter((s) => s.parentId === selectedCategory.id)
    : [];
  const selectedSubcategory = seedSubcategories.find((s) => s.name === values.subcategoryName);
  const productTypeOptions = selectedSubcategory
    ? seedProductTypes.filter((t) => t.subcategoryId === selectedSubcategory.id)
    : [];

  function pickCategory(name: string) {
    form.setFieldValue('categoryName', name);
    form.setFieldValue('subcategoryName', '');
    form.setFieldValue('productTypeName', '');
  }

  function pickSubcategory(name: string) {
    form.setFieldValue('subcategoryName', name);
    form.setFieldValue('productTypeName', '');
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Pick an existing level, or create a new one if nothing matches.
      </p>

      <form.Field
        name="categoryName"
        validators={{
          onSubmit: ({ value }) => (!value.trim() ? 'Choose or create a category' : undefined),
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <TaxonomyField
              label="Category *"
              value={field.state.value}
              options={seedCategories}
              placeholder="Select a category…"
              onPick={pickCategory}
              onCustom={pickCategory}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs font-normal text-destructive">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="subcategoryName"
        validators={{
          onSubmit: ({ value }) => (!value.trim() ? 'Choose or create a subcategory' : undefined),
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <TaxonomyField
              label="Subcategory *"
              value={field.state.value}
              options={subcategoryOptions}
              placeholder="Select a subcategory…"
              disabled={!field.state.value && !values.categoryName}
              disabledLabel="Choose or create a category first."
              onPick={pickSubcategory}
              onCustom={pickSubcategory}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs font-normal text-destructive">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="productTypeName"
        validators={{
          onSubmit: ({ value }) => (!value.trim() ? 'Choose or create a product type' : undefined),
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <TaxonomyField
              label="Product type *"
              value={field.state.value}
              options={productTypeOptions}
              placeholder="Select a product type…"
              disabled={!field.state.value && !values.subcategoryName}
              disabledLabel="Choose or create a subcategory first."
              onPick={(name) => form.setFieldValue('productTypeName', name)}
              onCustom={(name) => form.setFieldValue('productTypeName', name)}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs font-normal text-destructive">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>
    </div>
  );
}

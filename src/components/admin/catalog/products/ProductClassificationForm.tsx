'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { type CategoryTree, type ProductForm } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';
import { FormSection } from './FormSection';

interface ProductClassificationFormProps {
  form: ProductForm;
  categories: CategoryTree;
}

function findClassification(categories: CategoryTree, productTypeId: string) {
  for (const category of categories) {
    for (const subCategory of category.subCategories) {
      const productType = subCategory.productTypes.find((type) => type.id === productTypeId);

      if (productType) {
        return {
          categoryId: category.id,
          subCategoryId: subCategory.id,
        };
      }
    }
  }

  return {
    categoryId: '',
    subCategoryId: '',
  };
}

export function ProductClassificationForm({ form, categories }: ProductClassificationFormProps) {
  const productTypeId = form.getFieldValue('productTypeId');

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');

  const derivedClassification = findClassification(categories, productTypeId);
  const effectiveCategoryId = selectedCategoryId || derivedClassification.categoryId;
  const effectiveSubCategoryId = selectedSubCategoryId || derivedClassification.subCategoryId;

  const activeCategory = categories.find((category) => category.id === effectiveCategoryId);

  const subCategories = activeCategory?.subCategories ?? [];

  const activeSubCategory = subCategories.find(
    (subCategory) => subCategory.id === effectiveSubCategoryId
  );

  const productTypes = activeSubCategory?.productTypes ?? [];

  return (
    <FormSection
      title="Classification"
      description="Choose where this product lives in your catalogue taxonomy."
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Category */}
          <div className="space-y-1.5">
            <Label>Category</Label>

            <Select
              value={effectiveCategoryId}
              onValueChange={(categoryId) => {
                setSelectedCategoryId(categoryId);
                setSelectedSubCategoryId('');

                form.setFieldValue('productTypeId', '');
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sub Category */}
          <div className="space-y-1.5">
            <Label>Sub-Category</Label>

            <Select
              disabled={!effectiveCategoryId || subCategories.length === 0}
              value={effectiveSubCategoryId}
              onValueChange={(subCategoryId) => {
                setSelectedSubCategoryId(subCategoryId);

                form.setFieldValue('productTypeId', '');
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    !effectiveCategoryId ? 'Select category first' : 'Select Sub-Category'
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {subCategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Type */}
          <form.Field name="productTypeId">
            {(field: AnyFieldApi) => (
              <div className="space-y-1.5">
                <Label>Product Type *</Label>

                <Select
                  disabled={!effectiveSubCategoryId || productTypes.length === 0}
                  value={field.state.value}
                  onValueChange={(typeId) => {
                    field.handleChange(typeId);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        !effectiveSubCategoryId
                          ? 'Select sub-category first'
                          : 'Select Product Type'
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {productTypes.map((productType) => (
                      <SelectItem key={productType.id} value={productType.id}>
                        {productType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]?.message ?? String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>
      </div>
    </FormSection>
  );
}

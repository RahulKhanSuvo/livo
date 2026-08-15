'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  /*
   * Initialize from existing product when editing.
   */
  const initialClassification = findClassification(categories, productTypeId);

  const [selectedCategoryId, setSelectedCategoryId] = useState(initialClassification.categoryId);

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(
    initialClassification.subCategoryId
  );

  const activeCategory = categories.find((category) => category.id === selectedCategoryId);

  const subCategories = activeCategory?.subCategories ?? [];

  const activeSubCategory = subCategories.find(
    (subCategory) => subCategory.id === selectedSubCategoryId
  );

  const productTypes = activeSubCategory?.productTypes ?? [];

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Classification</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Category */}
          <div className="space-y-1.5">
            <Label>Category</Label>

            <Select
              value={selectedCategoryId}
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
              disabled={!selectedCategoryId || subCategories.length === 0}
              value={selectedSubCategoryId}
              onValueChange={(subCategoryId) => {
                setSelectedSubCategoryId(subCategoryId);

                form.setFieldValue('productTypeId', '');
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    !selectedCategoryId ? 'Select category first' : 'Select Sub-Category'
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
                  disabled={!selectedSubCategoryId || productTypes.length === 0}
                  value={field.state.value}
                  onValueChange={(typeId) => {
                    field.handleChange(typeId);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        !selectedSubCategoryId ? 'Select sub-category first' : 'Select Product Type'
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
      </CardContent>
    </Card>
  );
}

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
import { type CategoryTree } from './types';
import { type AnyFieldApi } from '@tanstack/form-core';

interface ProductClassificationFormProps {
  form: ReturnType<typeof import('@tanstack/react-form').useForm>;
  categories: CategoryTree;
}

export function ProductClassificationForm({ form, categories }: ProductClassificationFormProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('');

  // Get active subcategories based on chosen category
  const activeCategory = categories.find((c) => c.id === selectedCategoryId);
  const subCategories = activeCategory?.subCategories ?? [];

  // Get active product types based on chosen subcategory
  const activeSubCategory = subCategories.find((s) => s.id === selectedSubCategoryId);
  const productTypes = activeSubCategory?.productTypes ?? [];

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Classification</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* 1. Category Dropdown */}
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select
              value={selectedCategoryId}
              onValueChange={(catId) => {
                setSelectedCategoryId(catId);
                setSelectedSubCategoryId('');
                // Reset form's productTypeId when top category changes
                form.setFieldValue('productTypeId', '');
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 2. SubCategory Dropdown */}
          <div className="space-y-1.5">
            <Label>Sub-Category</Label>
            <Select
              disabled={!selectedCategoryId || subCategories.length === 0}
              value={selectedSubCategoryId}
              onValueChange={(subCatId) => {
                setSelectedSubCategoryId(subCatId);
                // Reset form's productTypeId when subcategory changes
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
                {subCategories.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. ProductType Field (Bound to Form) */}
          <form.Field name="productTypeId">
            {(field: AnyFieldApi) => (
              <div className="space-y-1.5">
                <Label>Product Type *</Label>
                <Select
                  disabled={!selectedSubCategoryId || productTypes.length === 0}
                  value={field.state.value}
                  onValueChange={(typeId) => field.handleChange(typeId)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        !selectedSubCategoryId ? 'Select sub-category first' : 'Select Product Type'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((pt) => (
                      <SelectItem key={pt.id} value={pt.id}>
                        {pt.name}
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

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { CategoryItem, SubcategoryItem } from '../catalog.data';
import type { ModalState, ModalSaveValues } from './types';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function TaxonomyModal({
  modal,
  categories,
  subcategories,
  selectedCategoryName,
  selectedSubcategoryName,
  onClose,
  onSave,
}: {
  modal: NonNullable<ModalState>;
  categories: CategoryItem[];
  subcategories: SubcategoryItem[];
  selectedCategoryName?: string;
  selectedSubcategoryName?: string;
  onClose: () => void;
  onSave: (values: ModalSaveValues) => void;
}) {
  const isEdit = modal.mode === 'edit';
  const [name, setName] = useState(modal.item?.name ?? '');
  const [slug, setSlug] = useState(
    modal.level === 'category' ? ('slug' in (modal.item ?? {}) ? (modal.item?.slug ?? '') : '') : ''
  );
  const [description, setDescription] = useState(
    modal.level === 'category' ? (modal.item?.description ?? '') : ''
  );
  const [parentId, setParentId] = useState<string>(
    modal.level === 'subcategory'
      ? (modal.presetCategoryId ??
          (modal.item && 'parentId' in modal.item ? modal.item.parentId : '') ??
          '')
      : modal.level === 'productType'
        ? (modal.presetSubcategoryId ??
          (modal.item && 'subcategoryId' in modal.item ? modal.item.subcategoryId : '') ??
          '')
        : ''
  );

  const parentLabel =
    modal.level === 'subcategory'
      ? (selectedCategoryName ?? categories.find((c) => c.id === parentId)?.name)
      : modal.level === 'productType'
        ? (selectedSubcategoryName ?? subcategories.find((s) => s.id === parentId)?.name)
        : null;

  const titles = {
    category: isEdit ? 'Edit category' : 'Add category',
    subcategory: isEdit ? 'Edit subcategory' : 'Add subcategory',
    productType: isEdit ? 'Edit product type' : 'Add product type',
  };

  const parentOptions =
    modal.level === 'subcategory' ? categories : modal.level === 'productType' ? subcategories : [];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{titles[modal.level]}</DialogTitle>
          {parentLabel && (
            <DialogDescription>
              {modal.level === 'subcategory' ? 'Category' : 'Subcategory'}:{' '}
              <strong>{parentLabel}</strong>
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="taxonomy-name">Name</Label>
            <Input
              id="taxonomy-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!isEdit && modal.level === 'category') setSlug(slugify(e.target.value));
              }}
              placeholder={
                modal.level === 'category'
                  ? 'e.g. Living Room'
                  : modal.level === 'subcategory'
                    ? 'e.g. Sofas'
                    : 'e.g. Sectional Sofas'
              }
              autoFocus
            />
          </div>

          {modal.level === 'category' && (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="taxonomy-slug">Slug</Label>
                <Input
                  id="taxonomy-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="living-room"
                  className="font-mono text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="taxonomy-desc">Description</Label>
                <Input
                  id="taxonomy-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Sofas, chairs and tables for everyday living."
                />
              </div>
            </>
          )}

          {modal.level !== 'category' && (
            <div className="space-y-1.5">
              <Label htmlFor="taxonomy-parent">
                Parent {modal.level === 'subcategory' ? 'category' : 'subcategory'}
              </Label>
              <select
                id="taxonomy-parent"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className="h-9 w-full rounded-4xl border border-input bg-input/30 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="" disabled>
                  Select…
                </option>
                {parentOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSave({
                name,
                slug: slug || undefined,
                description: description || undefined,
                parentId: parentId || undefined,
              })
            }
          >
            {isEdit ? 'Save' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

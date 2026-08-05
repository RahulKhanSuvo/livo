'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, ChevronRightIcon, ArrowLeft01Icon } from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/admin/ui/page-header';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  categories as seedCategories,
  subcategories as seedSubcategories,
  productTypes as seedProductTypes,
  type CategoryItem,
  type SubcategoryItem,
  type ProductTypeItem,
} from '../catalog.data';
import { ExplorerRow } from './taxonomy-row';
import { TaxonomyModal } from './taxonomy-modal';
import type { ModalState, ModalSaveValues, RowItem, TaxonomyFocus } from './types';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function childLabelFor(
  row: RowItem,
  subcategories: SubcategoryItem[],
  productTypes: ProductTypeItem[]
): string {
  if (row.kind === 'category') {
    const n = subcategories.filter((s) => s.parentId === row.item.id).length;
    return n === 1 ? '1 subcategory' : `${n} subcategories`;
  }
  if (row.kind === 'subcategory') {
    const n = productTypes.filter((t) => t.subcategoryId === row.item.id).length;
    return n === 1 ? '1 product type' : `${n} product types`;
  }
  return `${row.item.products} products`;
}

export function TaxonomyExplorer({ focus }: { focus: TaxonomyFocus }) {
  const [categories, setCategories] = useState<CategoryItem[]>(seedCategories);
  const [subcategories, setSubcategories] = useState<SubcategoryItem[]>(seedSubcategories);
  const [productTypes, setProductTypes] = useState<ProductTypeItem[]>(seedProductTypes);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    focus === 'category' ? null : (seedCategories[0]?.id ?? null)
  );
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(
    focus === 'productType'
      ? (seedSubcategories.find((s) => s.parentId === seedCategories[0]?.id)?.id ?? null)
      : null
  );
  const [modal, setModal] = useState<ModalState>(null);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const selectedSubcategory = subcategories.find((s) => s.id === selectedSubcategoryId);

  const rows: RowItem[] = !selectedCategoryId
    ? categories.map((item) => ({ kind: 'category', item }))
    : !selectedSubcategoryId
      ? subcategories
          .filter((s) => s.parentId === selectedCategoryId)
          .map((item) => ({ kind: 'subcategory', item }))
      : productTypes
          .filter((t) => t.subcategoryId === selectedSubcategoryId)
          .map((item) => ({ kind: 'productType', item }));

  const columnTitle = !selectedCategoryId
    ? 'Categories'
    : !selectedSubcategoryId
      ? 'Subcategories'
      : 'Product Types';

  function handleOpen(row: RowItem) {
    if (row.kind === 'category') {
      setSelectedCategoryId(row.item.id);
      setSelectedSubcategoryId(null);
    } else if (row.kind === 'subcategory') {
      setSelectedSubcategoryId(row.item.id);
    }
  }

  function goUp() {
    if (selectedSubcategoryId) {
      setSelectedSubcategoryId(null);
    } else {
      setSelectedCategoryId(null);
    }
  }

  function handleAdd() {
    if (!selectedCategoryId) {
      setModal({ level: 'category', mode: 'add' });
    } else if (!selectedSubcategoryId) {
      setModal({ level: 'subcategory', mode: 'add', presetCategoryId: selectedCategoryId });
    } else {
      setModal({ level: 'productType', mode: 'add', presetSubcategoryId: selectedSubcategoryId });
    }
  }

  function handleSave(values: ModalSaveValues) {
    if (!modal) return;
    const name = values.name.trim();
    if (!name) return;

    if (modal.level === 'category') {
      if (modal.mode === 'edit' && modal.item) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === modal.item!.id
              ? {
                  ...c,
                  name,
                  slug: values.slug || c.slug,
                  description: values.description ?? c.description,
                }
              : c
          )
        );
      } else {
        setCategories((prev) => [
          ...prev,
          {
            id: `C-${String(categories.length + 1).padStart(2, '0')}`,
            name,
            slug: values.slug || slugify(name),
            products: 0,
            description: values.description ?? '',
          },
        ]);
        setSelectedCategoryId(null);
      }
    }

    if (modal.level === 'subcategory') {
      const parentId = values.parentId ?? modal.presetCategoryId ?? selectedCategoryId ?? '';
      const parent = categories.find((c) => c.id === parentId);
      if (modal.mode === 'edit' && modal.item) {
        setSubcategories((prev) =>
          prev.map((s) =>
            s.id === modal.item!.id ? { ...s, name, parentId, parent: parent?.name ?? s.parent } : s
          )
        );
      } else {
        const next: SubcategoryItem = {
          id: `S-${String(subcategories.length + 1).padStart(3, '0')}`,
          name,
          parent: parent?.name ?? '',
          parentId,
          products: 0,
        };
        setSubcategories((prev) => [...prev, next]);
        setSelectedSubcategoryId(next.id);
      }
    }

    if (modal.level === 'productType') {
      const subcategoryId =
        values.parentId ?? modal.presetSubcategoryId ?? selectedSubcategoryId ?? '';
      const sub = subcategories.find((s) => s.id === subcategoryId);
      if (modal.mode === 'edit' && modal.item) {
        setProductTypes((prev) =>
          prev.map((t) =>
            t.id === modal.item!.id
              ? { ...t, name, subcategoryId, subcategory: sub?.name ?? t.subcategory }
              : t
          )
        );
      } else {
        setProductTypes((prev) => [
          ...prev,
          {
            id: `T-${String(productTypes.length + 1).padStart(2, '0')}`,
            name,
            subcategory: sub?.name ?? '',
            subcategoryId,
            products: 0,
          },
        ]);
      }
    }

    setModal(null);
  }

  function handleDelete(row: RowItem) {
    if (row.kind === 'category') {
      setCategories((prev) => prev.filter((c) => c.id !== row.item.id));
      const removedSubcats = subcategories.filter((s) => s.parentId === row.item.id);
      setSubcategories((prev) => prev.filter((s) => s.parentId !== row.item.id));
      setProductTypes((prev) =>
        prev.filter((t) => !removedSubcats.some((s) => s.id === t.subcategoryId))
      );
      if (selectedCategoryId === row.item.id) setSelectedCategoryId(null);
      setSelectedSubcategoryId(null);
    } else if (row.kind === 'subcategory') {
      setSubcategories((prev) => prev.filter((s) => s.id !== row.item.id));
      setProductTypes((prev) => prev.filter((t) => t.subcategoryId !== row.item.id));
      if (selectedSubcategoryId === row.item.id) setSelectedSubcategoryId(null);
    } else {
      setProductTypes((prev) => prev.filter((t) => t.id !== row.item.id));
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={columnTitle}
        description="Drill down: Categories → Subcategories → Product Types. Tap a row to open it."
      />

      {/* Breadcrumb + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-1.5 text-sm">
          <button
            type="button"
            onClick={() => {
              setSelectedCategoryId(null);
              setSelectedSubcategoryId(null);
            }}
            className={cn(
              'cursor-pointer transition-colors',
              !selectedCategoryId
                ? 'font-semibold text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Categories
          </button>
          {selectedCategory && (
            <>
              <HugeiconsIcon icon={ChevronRightIcon} size={12} className="text-muted-foreground" />
              <button
                type="button"
                onClick={() => setSelectedSubcategoryId(null)}
                className={cn(
                  'cursor-pointer transition-colors',
                  !selectedSubcategoryId
                    ? 'font-semibold text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {selectedCategory.name}
              </button>
            </>
          )}
          {selectedSubcategory && (
            <>
              <HugeiconsIcon icon={ChevronRightIcon} size={12} className="text-muted-foreground" />
              <span className="font-semibold text-foreground">{selectedSubcategory.name}</span>
            </>
          )}
        </nav>

        <Button size="sm" className="gap-1.5" onClick={handleAdd}>
          <HugeiconsIcon icon={PlusSignIcon} size={14} />
          Add {columnTitle.slice(0, -1).toLowerCase()}
        </Button>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-foreground/10">
        {selectedCategoryId && (
          <button
            type="button"
            onClick={goUp}
            className="flex w-full cursor-pointer items-center gap-2 border-b border-foreground/8 px-4 py-3 text-sm font-medium text-[#4b6b56] transition-colors hover:bg-[#f6f5f1]/70"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
            {selectedSubcategoryId ? `Back to ${selectedCategory?.name}` : 'Back to all categories'}
          </button>
        )}
        {rows.length === 0 ? (
          <div className="px-4 py-16 text-center">
            <p className="text-sm font-medium text-muted-foreground">Nothing here yet.</p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              {selectedSubcategoryId
                ? 'Add a product type to organize products within this subcategory.'
                : selectedCategoryId
                  ? 'Add a subcategory to organize products within this category.'
                  : 'Create your first category to organize your store.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-foreground/5">
            {rows.map((row) => (
              <ExplorerRow
                key={row.item.id}
                row={row}
                childLabel={childLabelFor(row, subcategories, productTypes)}
                onOpen={() => handleOpen(row)}
                onAddChild={
                  row.kind === 'category'
                    ? () =>
                        setModal({
                          level: 'subcategory',
                          mode: 'add',
                          presetCategoryId: row.item.id,
                        })
                    : row.kind === 'subcategory'
                      ? () =>
                          setModal({
                            level: 'productType',
                            mode: 'add',
                            presetSubcategoryId: row.item.id,
                          })
                      : undefined
                }
                onEdit={() =>
                  row.kind === 'category'
                    ? setModal({ level: 'category', mode: 'edit', item: row.item })
                    : row.kind === 'subcategory'
                      ? setModal({ level: 'subcategory', mode: 'edit', item: row.item })
                      : setModal({ level: 'productType', mode: 'edit', item: row.item })
                }
                onDelete={() => handleDelete(row)}
              />
            ))}
          </div>
        )}
      </div>

      {modal && (
        <TaxonomyModal
          key={`${modal.level}-${modal.mode}-${modal.item?.id ?? 'new'}`}
          modal={modal}
          categories={categories}
          subcategories={subcategories}
          selectedCategoryName={selectedCategory?.name}
          selectedSubcategoryName={selectedSubcategory?.name}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

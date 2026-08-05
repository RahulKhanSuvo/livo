'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Folder01Icon,
  Folder02Icon,
  GroupItemsIcon,
  PlusSignIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Edit02Icon,
  Delete01Icon,
  PackageIcon,
  CheckmarkCircle02Icon,
} from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/admin/ui/page-header';
import { StatCard } from '@/components/admin/ui/stat-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  categories as seedCategories,
  subcategories as seedSubcategories,
  productTypes as seedProductTypes,
  type CategoryItem,
  type SubcategoryItem,
  type ProductTypeItem,
} from './catalog.data';

export type TaxonomyFocus = 'category' | 'subcategory' | 'productType';

type ModalState =
  | {
      level: 'category';
      mode: 'add' | 'edit';
      item?: CategoryItem;
    }
  | {
      level: 'subcategory';
      mode: 'add' | 'edit';
      item?: SubcategoryItem;
      presetCategoryId?: string;
    }
  | {
      level: 'productType';
      mode: 'add' | 'edit';
      item?: ProductTypeItem;
      presetSubcategoryId?: string;
    }
  | null;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function TaxonomyExplorer({ focus }: { focus: TaxonomyFocus }) {
  const [categories, setCategories] = useState<CategoryItem[]>(seedCategories);
  const [subcategories, setSubcategories] = useState<SubcategoryItem[]>(seedSubcategories);
  const [productTypes, setProductTypes] = useState<ProductTypeItem[]>(seedProductTypes);
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(focus === 'category' ? [] : [])
  );
  const [modal, setModal] = useState<ModalState>(null);

  const totalProducts = categories.reduce((sum, c) => sum + c.products, 0);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function subcategoriesFor(categoryId: string) {
    return subcategories.filter((s) => s.parentId === categoryId);
  }

  function productTypesFor(subcategoryId: string) {
    return productTypes.filter((t) => t.subcategoryId === subcategoryId);
  }

  function handleSave(values: {
    name: string;
    slug?: string;
    parentId?: string;
    description?: string;
  }) {
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
            id: `C-${String(prev.length + 1).padStart(2, '0')}`,
            name,
            slug: values.slug || slugify(name),
            products: 0,
            description: values.description ?? '',
          },
        ]);
      }
    }

    if (modal.level === 'subcategory') {
      const parentId = values.parentId ?? modal.presetCategoryId ?? categories[0]?.id;
      const parent = categories.find((c) => c.id === parentId);
      if (modal.mode === 'edit' && modal.item) {
        setSubcategories((prev) =>
          prev.map((s) =>
            s.id === modal.item!.id
              ? {
                  ...s,
                  name,
                  parentId: parentId ?? s.parentId,
                  parent: parent?.name ?? s.parent,
                }
              : s
          )
        );
      } else {
        setSubcategories((prev) => [
          ...prev,
          {
            id: `S-${String(prev.length + 1).padStart(3, '0')}`,
            name,
            parent: parent?.name ?? '',
            parentId: parentId ?? '',
            products: 0,
          },
        ]);
      }
    }

    if (modal.level === 'productType') {
      const subcategoryId = values.parentId ?? modal.presetSubcategoryId ?? subcategories[0]?.id;
      const sub = subcategories.find((s) => s.id === subcategoryId);
      if (modal.mode === 'edit' && modal.item) {
        setProductTypes((prev) =>
          prev.map((t) =>
            t.id === modal.item!.id
              ? {
                  ...t,
                  name,
                  subcategoryId: subcategoryId ?? t.subcategoryId,
                  subcategory: sub?.name ?? t.subcategory,
                }
              : t
          )
        );
      } else {
        setProductTypes((prev) => [
          ...prev,
          {
            id: `T-${String(prev.length + 1).padStart(2, '0')}`,
            name,
            subcategory: sub?.name ?? '',
            subcategoryId: subcategoryId ?? '',
            products: 0,
          },
        ]);
      }
    }

    setModal(null);
  }

  function handleDelete(level: TaxonomyFocus, id: string) {
    if (level === 'category') {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setSubcategories((prev) => prev.filter((s) => s.parentId !== id));
      setProductTypes((prev) =>
        prev.filter(
          (t) => !subcategories.some((s) => s.id === t.subcategoryId && s.parentId === id)
        )
      );
    }
    if (level === 'subcategory') {
      setSubcategories((prev) => prev.filter((s) => s.id !== id));
      setProductTypes((prev) => prev.filter((t) => t.subcategoryId !== id));
    }
    if (level === 'productType') {
      setProductTypes((prev) => prev.filter((t) => t.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={
          focus === 'category'
            ? 'Categories'
            : focus === 'subcategory'
              ? 'Subcategories'
              : 'Product Types'
        }
        description="The catalog taxonomy — Categories hold Subcategories, which hold Product Types. Each level flows into the next."
        actions={
          <Button
            className="gap-1.5"
            onClick={() =>
              setModal(
                focus === 'category'
                  ? { level: 'category', mode: 'add' }
                  : focus === 'subcategory'
                    ? { level: 'subcategory', mode: 'add' }
                    : { level: 'productType', mode: 'add' }
              )
            }
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add{' '}
            {focus === 'category' ? 'category' : focus === 'subcategory' ? 'subcategory' : 'type'}
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Categories" value={String(categories.length)} icon={Folder01Icon} />
        <StatCard
          label="Subcategories"
          value={String(subcategories.length)}
          icon={Folder02Icon}
          accent="#d98e63"
        />
        <StatCard
          label="Product types"
          value={String(productTypes.length)}
          icon={GroupItemsIcon}
          accent="#8a9b80"
        />
        <StatCard
          label="Live products"
          value={String(totalProducts)}
          icon={PackageIcon}
          accent="#161512"
        />
      </div>

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-foreground/10">
        <div className="flex flex-wrap items-center gap-2 border-b border-foreground/8 bg-[#faf9f5] px-4 py-3 sm:px-5">
          <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Taxonomy tree
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#4b6b56]" /> Category
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#d98e63]" /> Subcategory
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#8a9b80]" /> Product type
            </span>
          </div>
        </div>

        <div className="divide-y divide-foreground/5">
          {categories.map((category) => {
            const cats = subcategoriesFor(category.id);
            const isOpen = expanded.has(category.id);
            const isHighlighted = focus === 'category';

            return (
              <div key={category.id}>
                <div
                  className={cn(
                    'group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[#f6f5f1]/60 sm:px-5',
                    isHighlighted && 'bg-[#f6f5f1]/70'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(category.id)}
                    className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
                    aria-label={isOpen ? 'Collapse' : 'Expand'}
                  >
                    <HugeiconsIcon
                      icon={isOpen ? ChevronDownIcon : ChevronRightIcon}
                      size={15}
                      strokeWidth={2}
                    />
                  </button>
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#4b6b56]/12 text-[#4b6b56]">
                    <HugeiconsIcon icon={Folder01Icon} size={16} strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {category.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">/{category.slug}</p>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {cats.length} sub{cats.length === 1 ? '' : 's'}
                  </span>
                  <span className="hidden rounded-full bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground/70 md:block">
                    {category.products} products
                  </span>
                  <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Edit category"
                      onClick={() => setModal({ level: 'category', mode: 'edit', item: category })}
                    >
                      <HugeiconsIcon icon={Edit02Icon} size={15} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Delete category"
                      onClick={() => handleDelete('category', category.id)}
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={15} className="text-destructive" />
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="hidden gap-1 sm:inline-flex"
                    onClick={() =>
                      setModal({ level: 'subcategory', mode: 'add', presetCategoryId: category.id })
                    }
                  >
                    <HugeiconsIcon icon={PlusSignIcon} size={14} />
                    Add
                  </Button>
                </div>

                {isOpen && (
                  <div className="bg-foreground/[0.015]">
                    {cats.length === 0 && (
                      <p className="px-16 py-3 text-xs text-muted-foreground">
                        No subcategories yet — add one from the row above.
                      </p>
                    )}
                    {cats.map((sub) => {
                      const types = productTypesFor(sub.id);
                      const isSubOpen = expanded.has(sub.id);
                      const isSubHighlighted = focus === 'subcategory';

                      return (
                        <div key={sub.id}>
                          <div
                            className={cn(
                              'group flex items-center gap-3 border-l-2 border-[#4b6b56]/20 py-3 pr-4 pl-8 transition-colors hover:bg-[#f6f5f1]/60 sm:pl-10',
                              isSubHighlighted && 'bg-[#f6f5f1]/70'
                            )}
                          >
                            <button
                              type="button"
                              onClick={() => toggle(sub.id)}
                              className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
                              aria-label={isSubOpen ? 'Collapse' : 'Expand'}
                            >
                              <HugeiconsIcon
                                icon={isSubOpen ? ChevronDownIcon : ChevronRightIcon}
                                size={15}
                                strokeWidth={2}
                              />
                            </button>
                            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#d98e63]/15 text-[#d98e63]">
                              <HugeiconsIcon icon={Folder02Icon} size={14} strokeWidth={2} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-foreground">
                                {sub.name}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                inside {sub.parent}
                              </p>
                            </div>
                            <span className="hidden text-xs text-muted-foreground sm:block">
                              {types.length} type{types.length === 1 ? '' : 's'}
                            </span>
                            <span className="hidden rounded-full bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground/70 md:block">
                              {sub.products} products
                            </span>
                            <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Edit subcategory"
                                onClick={() =>
                                  setModal({ level: 'subcategory', mode: 'edit', item: sub })
                                }
                              >
                                <HugeiconsIcon icon={Edit02Icon} size={15} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Delete subcategory"
                                onClick={() => handleDelete('subcategory', sub.id)}
                              >
                                <HugeiconsIcon
                                  icon={Delete01Icon}
                                  size={15}
                                  className="text-destructive"
                                />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="hidden gap-1 sm:inline-flex"
                              onClick={() =>
                                setModal({
                                  level: 'productType',
                                  mode: 'add',
                                  presetSubcategoryId: sub.id,
                                })
                              }
                            >
                              <HugeiconsIcon icon={PlusSignIcon} size={14} />
                              Add
                            </Button>
                          </div>

                          {isSubOpen && (
                            <div>
                              {types.length === 0 && (
                                <p className="px-16 py-3 text-xs text-muted-foreground">
                                  No product types yet — add one from the row above.
                                </p>
                              )}
                              {types.map((type) => {
                                const isTypeHighlighted = focus === 'productType';
                                return (
                                  <div
                                    key={type.id}
                                    className={cn(
                                      'group flex items-center gap-3 border-l-2 border-[#8a9b80]/20 py-3 pr-4 pl-14 transition-colors hover:bg-[#f6f5f1]/60 sm:pl-16',
                                      isTypeHighlighted && 'bg-[#f6f5f1]/70'
                                    )}
                                  >
                                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-[#8a9b80]/15 text-[#8a9b80]">
                                      <HugeiconsIcon
                                        icon={GroupItemsIcon}
                                        size={13}
                                        strokeWidth={2}
                                      />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm text-foreground/90">
                                        {type.name}
                                      </p>
                                      <p className="truncate text-xs text-muted-foreground">
                                        under {type.subcategory}
                                      </p>
                                    </div>
                                    <span className="hidden rounded-full bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground/70 md:block">
                                      {type.products} products
                                    </span>
                                    <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                                      <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Edit product type"
                                        onClick={() =>
                                          setModal({
                                            level: 'productType',
                                            mode: 'edit',
                                            item: type,
                                          })
                                        }
                                      >
                                        <HugeiconsIcon icon={Edit02Icon} size={15} />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Delete product type"
                                        onClick={() => handleDelete('productType', type.id)}
                                      >
                                        <HugeiconsIcon
                                          icon={Delete01Icon}
                                          size={15}
                                          className="text-destructive"
                                        />
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-[#4b6b56]/8 p-4 text-sm text-[#4b6b56] ring-1 ring-[#4b6b56]/15">
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          size={18}
          strokeWidth={2}
          className="mt-0.5 shrink-0"
        />
        <p>
          Taxonomy order: <strong>Category</strong> → <strong>Subcategory</strong> →{' '}
          <strong>Product Type</strong> → Product. Use the <em>Add</em> buttons to build the tree
          level by level — each new child is attached to its parent automatically.
        </p>
      </div>

      {modal && (
        <TaxonomyModal
          key={`${modal.level}-${modal.mode}-${modal.item?.id ?? 'new'}`}
          modal={modal}
          categories={categories}
          subcategories={subcategories}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function TaxonomyModal({
  modal,
  categories,
  subcategories,
  onClose,
  onSave,
}: {
  modal: NonNullable<ModalState>;
  categories: CategoryItem[];
  subcategories: SubcategoryItem[];
  onClose: () => void;
  onSave: (values: {
    name: string;
    slug?: string;
    parentId?: string;
    description?: string;
  }) => void;
}) {
  const isEdit = modal.mode === 'edit';
  const [name, setName] = useState(modal.item?.name ?? '');
  const [slug, setSlug] = useState(modal.item ? ('slug' in modal.item ? modal.item.slug : '') : '');
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

  const titles = {
    category: isEdit ? 'Edit category' : 'Add category',
    subcategory: isEdit ? 'Edit subcategory' : 'Add subcategory',
    productType: isEdit ? 'Edit product type' : 'Add product type',
  };

  const descriptions = {
    category: 'A top-level room in your store.',
    subcategory: 'A second-level grouping inside a category.',
    productType: 'A fine-grained type inside a subcategory.',
  };

  const parentOptions =
    modal.level === 'subcategory' ? categories : modal.level === 'productType' ? subcategories : [];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{titles[modal.level]}</DialogTitle>
          <DialogDescription>{descriptions[modal.level]}</DialogDescription>
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
                  Select a {modal.level === 'subcategory' ? 'category' : 'subcategory'}…
                </option>
                {parentOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                {modal.level === 'subcategory'
                  ? 'This subcategory will live inside the chosen category.'
                  : 'This type will live inside the chosen subcategory.'}
              </p>
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
            {isEdit ? 'Save changes' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useState, Children } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Folder01Icon,
  Folder02Icon,
  GroupItemsIcon,
  PlusSignIcon,
  Edit02Icon,
  Delete01Icon,
  PackageIcon,
  CheckmarkCircle02Icon,
  ArrowRight01Icon,
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
  | { level: 'category'; mode: 'add' | 'edit'; item?: CategoryItem }
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    seedCategories.find((c) => c.id === seedCategories[0]?.id)?.id ?? null
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>(null);

  const totalProducts = categories.reduce((sum, c) => sum + c.products, 0);

  const subcategoriesFor =
    categories.filter((c) => c.id === selectedCategory)[0] === undefined
      ? []
      : subcategories.filter((s) => s.parentId === selectedCategory);

  const visibleTypes =
    selectedSubcategory === null
      ? []
      : productTypes.filter((t) => t.subcategoryId === selectedSubcategory);

  function openAdd(level: TaxonomyFocus, preset?: { categoryId?: string; subcategoryId?: string }) {
    if (level === 'category') setModal({ level: 'category', mode: 'add' });
    if (level === 'subcategory')
      setModal({ level: 'subcategory', mode: 'add', presetCategoryId: preset?.categoryId });
    if (level === 'productType')
      setModal({
        level: 'productType',
        mode: 'add',
        presetSubcategoryId: preset?.subcategoryId ?? selectedSubcategory ?? undefined,
      });
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
        const next: CategoryItem = {
          id: `C-${String(categories.length + 1).padStart(2, '0')}`,
          name,
          slug: values.slug || slugify(name),
          products: 0,
          description: values.description ?? '',
        };
        setCategories((prev) => [...prev, next]);
        setSelectedCategory(next.id);
      }
    }

    if (modal.level === 'subcategory') {
      const parentId = values.parentId ?? modal.presetCategoryId ?? selectedCategory ?? undefined;
      const parent = categories.find((c) => c.id === parentId);
      if (modal.mode === 'edit' && modal.item) {
        setSubcategories((prev) =>
          prev.map((s) =>
            s.id === modal.item!.id
              ? { ...s, name, parentId: parentId ?? s.parentId, parent: parent?.name ?? s.parent }
              : s
          )
        );
      } else {
        const next: SubcategoryItem = {
          id: `S-${String(subcategories.length + 1).padStart(3, '0')}`,
          name,
          parent: parent?.name ?? '',
          parentId: parentId ?? '',
          products: 0,
        };
        setSubcategories((prev) => [...prev, next]);
        setSelectedSubcategory(next.id);
      }
    }

    if (modal.level === 'productType') {
      const subcategoryId =
        values.parentId ?? modal.presetSubcategoryId ?? selectedSubcategory ?? undefined;
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
            id: `T-${String(productTypes.length + 1).padStart(2, '0')}`,
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
      if (selectedCategory === id) setSelectedCategory(null);
    }
    if (level === 'subcategory') {
      setSubcategories((prev) => prev.filter((s) => s.id !== id));
      setProductTypes((prev) => prev.filter((t) => t.subcategoryId !== id));
      if (selectedSubcategory === id) setSelectedSubcategory(null);
    }
    if (level === 'productType') {
      setProductTypes((prev) => prev.filter((t) => t.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Catalog Taxonomy"
        description="Pick a category, then a subcategory — product types appear on the right. Each level flows into the next."
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <TaxonomyColumn
          title="Categories"
          subtitle="Top level · rooms of the store"
          tone="#4b6b56"
          icon={Folder01Icon}
          highlight={focus === 'category'}
          onAdd={() => openAdd('category')}
          emptyText="No categories yet."
        >
          {categories.map((category) => (
            <ColumnRow
              key={category.id}
              title={category.name}
              meta={`/${category.slug}`}
              count={category.products}
              countLabel="products"
              selected={selectedCategory === category.id}
              tone="#4b6b56"
              icon={Folder01Icon}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedSubcategory(null);
              }}
              onEdit={() => setModal({ level: 'category', mode: 'edit', item: category })}
              onDelete={() => handleDelete('category', category.id)}
              onAddChild={() => openAdd('subcategory', { categoryId: category.id })}
              addChildLabel="Add sub"
            />
          ))}
        </TaxonomyColumn>

        <TaxonomyColumn
          title="Subcategories"
          subtitle={
            selectedCategory
              ? `inside ${categories.find((c) => c.id === selectedCategory)?.name ?? ''}`
              : 'select a category first'
          }
          tone="#d98e63"
          icon={Folder02Icon}
          highlight={focus === 'subcategory'}
          onAdd={() => openAdd('subcategory')}
          onAddDisabled={!selectedCategory}
          emptyText="No subcategories in this category yet."
        >
          {subcategoriesFor.map((sub) => (
            <ColumnRow
              key={sub.id}
              title={sub.name}
              meta={sub.parent}
              count={sub.products}
              countLabel="products"
              selected={selectedSubcategory === sub.id}
              tone="#d98e63"
              icon={Folder02Icon}
              onClick={() => setSelectedSubcategory(sub.id)}
              onEdit={() => setModal({ level: 'subcategory', mode: 'edit', item: sub })}
              onDelete={() => handleDelete('subcategory', sub.id)}
              onAddChild={() => openAdd('productType', { subcategoryId: sub.id })}
              addChildLabel="Add type"
            />
          ))}
        </TaxonomyColumn>

        <TaxonomyColumn
          title="Product types"
          subtitle={
            selectedSubcategory
              ? `inside ${subcategories.find((s) => s.id === selectedSubcategory)?.name ?? ''}`
              : 'select a subcategory first'
          }
          tone="#8a9b80"
          icon={GroupItemsIcon}
          highlight={focus === 'productType'}
          onAdd={() => openAdd('productType')}
          onAddDisabled={!selectedSubcategory}
          emptyText="No product types in this subcategory yet."
        >
          {visibleTypes.map((type) => (
            <ColumnRow
              key={type.id}
              title={type.name}
              meta={type.subcategory}
              count={type.products}
              countLabel="products"
              selected={false}
              tone="#8a9b80"
              icon={GroupItemsIcon}
              onClick={() => {}}
              onEdit={() => setModal({ level: 'productType', mode: 'edit', item: type })}
              onDelete={() => handleDelete('productType', type.id)}
            />
          ))}
        </TaxonomyColumn>
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-[#4b6b56]/8 p-4 text-sm text-[#4b6b56] ring-1 ring-[#4b6b56]/15">
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          size={18}
          strokeWidth={2}
          className="mt-0.5 shrink-0"
        />
        <p>
          Flow: <strong>Category</strong> <HugeiconsIcon icon={ArrowRight01Icon} size={13} />{' '}
          <strong>Subcategory</strong> <HugeiconsIcon icon={ArrowRight01Icon} size={13} />{' '}
          <strong>Product Type</strong> → Product. Each child is attached to its parent
          automatically.
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

function TaxonomyColumn({
  title,
  subtitle,
  tone,
  icon,
  highlight,
  onAdd,
  onAddDisabled,
  emptyText,
  children,
}: {
  title: string;
  subtitle: string;
  tone: string;
  icon: React.ComponentProps<typeof HugeiconsIcon>['icon'];
  highlight?: boolean;
  onAdd: () => void;
  onAddDisabled?: boolean;
  emptyText: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-foreground/10',
        highlight && 'ring-2 ring-[#4b6b56]/40'
      )}
    >
      <div className="flex items-center gap-3 border-b border-foreground/8 bg-[#faf9f5] px-4 py-3">
        <span
          className="grid size-8 shrink-0 place-items-center rounded-lg"
          style={{ backgroundColor: `${tone}14`, color: tone }}
        >
          <HugeiconsIcon icon={icon} size={16} strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <Button
          size="icon-sm"
          variant="secondary"
          onClick={onAdd}
          disabled={onAddDisabled}
          aria-label={`Add ${title.toLowerCase()}`}
        >
          <HugeiconsIcon icon={PlusSignIcon} size={15} />
        </Button>
      </div>
      <div className="flex-1 divide-y divide-foreground/5">
        {Children.count(children) === 0 && (
          <p className="px-4 py-8 text-center text-xs text-muted-foreground">{emptyText}</p>
        )}
        {children}
      </div>
    </div>
  );
}

function ColumnRow({
  title,
  meta,
  count,
  countLabel,
  selected,
  tone,
  icon,
  onClick,
  onEdit,
  onDelete,
  onAddChild,
  addChildLabel,
}: {
  title: string;
  meta?: string;
  count: number;
  countLabel: string;
  selected?: boolean;
  tone: string;
  icon: React.ComponentProps<typeof HugeiconsIcon>['icon'];
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddChild?: () => void;
  addChildLabel?: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        'group flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[#f6f5f1]/70',
        selected && 'bg-[#f6f5f1]'
      )}
    >
      <span
        className="grid size-7 shrink-0 place-items-center rounded-lg"
        style={{ backgroundColor: `${tone}14`, color: tone }}
      >
        <HugeiconsIcon icon={icon} size={14} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        {meta && <p className="truncate text-xs text-muted-foreground">{meta}</p>}
      </div>
      <span
        className="shrink-0 rounded-full bg-foreground/5 px-2 py-0.5 text-[11px] font-medium text-foreground/60"
        title={`${count} ${countLabel}`}
      >
        {count}
      </span>
      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        {onAddChild && (
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={addChildLabel}
            onClick={(e) => {
              e.stopPropagation();
              onAddChild();
            }}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={13} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <HugeiconsIcon icon={Edit02Icon} size={13} />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <HugeiconsIcon icon={Delete01Icon} size={13} className="text-destructive" />
        </Button>
      </div>
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

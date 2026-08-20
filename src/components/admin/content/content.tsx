import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon, PlusSignIcon } from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/admin/ui/page-header';
import { DataTable, type Column } from '@/components/admin/ui/data-table';
import { StatusBadge, Avatar } from '@/components/admin/ui/badges';
import { initials } from '@/components/admin/ui/format';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  banners,
  heroSlides,
  collections,
  blogPosts,
  type ContentRow,
  type HeroSlide,
  type Collection,
  type BlogPost,
} from './content.data';

function RowActions() {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Row actions">
            <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Preview</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" className="cursor-pointer">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const bannerCols: Column<ContentRow>[] = [
  { key: 'title', header: 'Banner', cell: (r) => <span className="font-medium">{r.title}</span> },
  {
    key: 'placement',
    header: 'Placement',
    cell: (r) => <span className="text-foreground/80">{r.placement}</span>,
  },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'updated',
    header: 'Updated',
    cell: (r) => <span className="text-foreground/80">{r.updated}</span>,
  },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

const slideColumns: Column<HeroSlide>[] = [
  {
    key: 'slide',
    header: 'Slide',
    cell: (r) => (
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-sm bg-[#4b6b56]/10 text-[10px] font-bold uppercase text-[#4b6b56]">
          {r.image}
        </span>
        <div>
          <p className="font-medium">{r.title}</p>
          <p className="text-xs text-muted-foreground">{r.subtitle || '—'}</p>
        </div>
      </div>
    ),
  },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

const collectionCols: Column<Collection>[] = [
  { key: 'name', header: 'Collection', cell: (r) => <span className="font-medium">{r.name}</span> },
  {
    key: 'products',
    header: 'Products',
    cell: (r) => <span className="font-medium">{r.products}</span>,
  },
  {
    key: 'updated',
    header: 'Updated',
    cell: (r) => <span className="text-foreground/80">{r.updated}</span>,
  },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

const blogCols: Column<BlogPost>[] = [
  {
    key: 'title',
    header: 'Post',
    cell: (r) => (
      <div>
        <p className="font-medium">{r.title}</p>
        <p className="text-xs text-muted-foreground">{r.category}</p>
      </div>
    ),
  },
  {
    key: 'author',
    header: 'Author',
    cell: (r) => (
      <div className="flex items-center gap-2.5">
        <Avatar initials={initials(r.author)} tone="#8a9b80" />
        <span className="font-medium">{r.author}</span>
      </div>
    ),
  },
  { key: 'views', header: 'Views', cell: (r) => <span className="font-medium">{r.views}</span> },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

export function BannersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Homepage Banners"
        description="The promotional banners that greet shoppers across your homepage."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            New banner
          </Button>
        }
      />
      <DataTable columns={bannerCols} data={banners} keyField={(r) => r.id} />
    </div>
  );
}

export function HeroSlidesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hero Slides"
        description="The cinematic slides that open your storefront."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add slide
          </Button>
        }
      />
      <DataTable columns={slideColumns} data={heroSlides} keyField={(r) => r.id} />
    </div>
  );
}

export function CollectionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Collections"
        description="Curated edits featured across your homepage, like Pure Detail and Soft Light."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            New collection
          </Button>
        }
      />
      <DataTable columns={collectionCols} data={collections} keyField={(r) => r.id} />
    </div>
  );
}

export function BlogPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog"
        description="Stories and guides from your editorial team."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Write post
          </Button>
        }
      />
      <DataTable columns={blogCols} data={blogPosts} keyField={(r) => r.id} />
    </div>
  );
}

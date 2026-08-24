# LIVO Build — Anchored Summary

## Goal

- Build/refine the LIVO furniture storefront (Next.js App Router) + `/admin`: product gallery, filtering, search, cart, checkout, and admin catalog/order management.
- Active focus: product detail page gallery image-selector placement (bottom of main image on all viewports).

## Constraints & Preferences

- Minimal rounding only: `rounded-sm` for cards/inputs/buttons; `rounded-full` reserved for avatars/pills/dots.
- All colors use `globals.css` token variables; primary sage `#4b6b56`, secondary blush `#e9c8b3`, terracotta `#d98e63` only for admin sidebar active.
- Auth pages: Mona Sans (`font-sans`), NO serif/italic, NO brand logo.
- Verify with `bun x tsc --noEmit` after changes (must exit 0).
- Shop page uses regular client-fetch (`Suspense` + `useInfiniteQuery`), NOT server prefetch — per explicit user request.
- Revert experiments the user dislikes (keepPreviousData/prefetch pagination reverted; `light` flag abandoned).
- Image selector on product detail must sit BELOW the main image (horizontal row) on desktop, tablet, AND mobile — never on the side.

## Progress

### Done

- **Image-cache build error fixed**: `next.config.ts` added `images.formats: ['image/webp']` (avoids Next 16 AVIF 0-byte LRU error); cleared `.next/cache/images`.
- **Console noise removed**: removed `console.log('items.length', items)` at `src/components/common/navbar/RightActions.tsx:12`.
- **Filter skeleton improved**: `ProductFilterSidebar.tsx:233` rewritten to mirror real UI (Filter header + 4 accordion sections with square checkbox + label rows) using `Skeleton` from `@/components/ui/skeleton`.
- **Shop query performance**:
  - `getAllFurniture.ts`: dropped `description` from search OR; removed `mode:'insensitive'` from all slug `equals`/`endsWith`/`contains` (slugs already lowercased → uses `@unique` index); `variants` include now `images: { take: 2 }`.
  - Indexes added to `prisma/schema/product.prisma` and applied via `prisma db push` (NOT `migrate dev` — that demanded a destructive reset): Product `[productTypeId, status, name, createdAt, price, soldCount]`; Variant `[productId]`, `[productId, stock]`; Brand(name), Material(name).
- **Blog fully removed** (user: ecommerce site, no journal): deleted `src/app/(public)/blog/`, `src/app/(admin)/admin/content/blog/`, `src/components/blog/`; removed `BlogPage`/`blogCols` + imports in `content.tsx`; removed `BlogPost` interface & `blogPosts` in `content.data.ts`; removed BLOG nav link in `navbar.data.ts`; removed Blog sidebar item + `BloggerIcon` import in `app-sidebar.data.ts`; deleted `.next` to clear stale generated route types. `tsc` passes.
- **QuickLinks made relevant**: `src/components/home/QuickLinks.tsx` `quickLinksData` now links to real shop routes — Sofas/Chairs/Tables/Beds/Storage/Living Room/Dining Room/Outdoor → `/shop/<type|room>`. (Component already existed & rendered on homepage; removed my separate `ShopQuickLinks` shop-bar experiment.) Verified slugs resolve: `sofa/chair/table/bed` → productType filter, `living-room/dining-room/outdoor/storage` → room filter (all valid, no 404).
- **Search result → detail page fixed**: `src/actions/products/searchProductsAction.ts:99` `href` changed from `/shop/${categorySlug}/${subCategorySlug}/${p.id}` to `/product/${p.id}`; removed unused `categorySlug`/`subCategorySlug` vars.
- **Admin logout loading state**: `src/components/admin/shell/topbar.tsx` added `isSigningOut` state; `signOut()` sets true then resets in `finally`; "Log out" `DropdownMenuItem` disabled + swaps `Logout01Icon`→spinning `LoadingIcon` + label "Logging out…". `tsc` passes.
- **Pagination → Load more (shop)**: `ProductList.tsx` converted to `useInfiniteQuery` (append pages, "Load more" button with `hasNextPage`/`isFetchingNextPage`); `ProductSortBar.tsx` now `useInfiniteQuery` with `getNextPageParam: () => undefined` reading `data.pages[0].data.total`. `ProductPagination.tsx` DELETED, then RECREATED for admin-only use (admin `ProductsGrid.tsx` still uses numbered pagination; storefront `/shop` uses Load more). `tsc` passes (exit 0).
- **Product detail gallery image selector relocated**: `src/components/product-details/ProductGallery.tsx` — thumbnail selector moved from a vertical LEFT column to a horizontal row BELOW the main image. Layout is now `<div className="flex flex-col gap-3">` with main image (`aspect-square w-full`) followed by `{images.length > 0 && <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">…</div>}`. Works on desktop, tablet, and mobile (horizontal scroll on small screens, wrap on `sm+`). `tsc` passes.

### In Progress

- (none)

### Blocked

- (none)

## Key Decisions

- `prisma db push` over `migrate dev` because DB drifted from migration history and `migrate dev` required a full data-wiping reset.
- Single lean static `include` (no `light` flag) because a conditional `include` made Prisma infer a union return type that broke admin consumers.
- Reverted keepPreviousData/prefetch pagination per explicit user dislike; shop back to plain loading-skeleton behavior, then replaced with Load more.
- Blog removed entirely rather than building a detail page (user clarification: "ecoum site").
- Search links to `/product/[id]` (real detail route), not shop filter URL.
- Product gallery thumbnail strip placed at the BOTTOM of the main image on ALL breakpoints per user request (was a left-side column).

## Next Steps

- (optional) Run `bun run build` to confirm image-cache + shop Load-more + gallery end-to-end in a production build.
- (optional) Add `pg_trgm` GIN index on `Product.name`/`ProductType.name` for remaining `name` `contains` searches (still unindexed).
- (optional) Add admin route guard/middleware for `/admin`.
- (optional) Verify product gallery visually on a real tablet/mobile viewport (logic complete; tsc green).
- (optional) Increment `soldCount` for COD/manual orders (in `updateOrderStatusAction`).

## Critical Context

- Project root: `/home/rahul/Projects/my-project/livo` (LIVO storefront + `/admin`).
- `globals.css` tokens: `--primary:#4b6b56`, `--primary-foreground:#f4f1e8`, `--blush:#e9c8b3`, `--sidebar-primary:var(--blush)`, `--sidebar-active:#d98e63`.
- `next.config.ts` now has `images.formats: ['image/webp']` (AVIF disabled to avoid LRU 0-byte build error); `remotePatterns` for res.cloudinary.com, images.unsplash.com, picsum.photos.
- `getAllFurniture.ts` returns `{ products, total, page, hasNextPage }` (used by `useInfiniteQuery` `getNextPageParam`).
- Shop route is a catch-all `src/app/(allProduct)/shop/[[...slug]]/page.tsx` using `resolveShopSlugs` (`room` from ROOM_SLUGS set, then `type`, then `subtype`).
- Search action `searchProductsAction.ts` builds `href: '/product/${p.id}'`.
- `ProductGallery.tsx`: main image (`aspect-square w-full`) + horizontal thumbnail strip below; opens `lightboxOpen` full-screen viewer.
- `ProductPagination.tsx` exists but is ADMIN-ONLY (used by `ProductsGrid.tsx`); storefront uses Load more.
- `tsc --noEmit` passes (exit 0) after every edit batch.
- DB applied via `prisma db push` (additive indexes only, no data loss).
- Demo creds: Admin `admin@livo.com`/`Admin@123456`; User `test@gmail.com`/`Pa$$w0rd!`.

## Relevant Files

- `next.config.ts` — `images.formats: ['image/webp']` (cache-build fix).
- `src/components/common/navbar/RightActions.tsx` — console.log removed.
- `src/components/shared/ProductFilterSidebar.tsx` — improved skeleton + `Skeleton` import.
- `src/actions/furniture/getAllFurniture.ts` — search/insensitive/include optimizations; returns `{products,total,page,hasNextPage}`.
- `prisma/schema/product.prisma` — new indexes (productTypeId, status, name, createdAt, price, soldCount, productId, productId+stock, Brand.name, Material.name).
- `src/components/home/QuickLinks.tsx` — `quickLinksData` → real `/shop/...` routes.
- `src/actions/products/searchProductsAction.ts` — `href: '/product/${p.id}'`.
- `src/components/admin/shell/topbar.tsx` — logout `isSigningOut` + `LoadingIcon`.
- `src/components/shared/ProductList.tsx` — `useInfiniteQuery` + Load more button.
- `src/components/shared/ProductSortBar.tsx` — `useInfiniteQuery` reading `pages[0].data.total`.
- `src/components/shared/ProductPagination.tsx` — recreated, ADMIN-ONLY.
- `src/components/admin/catalog/products/ProductsGrid.tsx` — admin numbered pagination (imports `ProductPagination`).
- `src/components/product-details/ProductGallery.tsx` — thumbnail selector now BELOW main image (horizontal row, mobile-scroll / sm-wrap).
- `src/lib/shopRoute.ts` — `ROOM_SLUGS` + `resolveShopSlugs`.
- (Removed) `src/app/(public)/blog/`, `src/app/(admin)/admin/content/blog/`, `src/components/blog/`, `src/components/shared/ShopQuickLinks.tsx`.

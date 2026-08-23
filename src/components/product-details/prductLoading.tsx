import { Container } from '@/components/shared/Container';
import { ProductSkeleton } from '@/components/shared/ProductSkeleton';

export default function ProductLoading() {
  const skeletonCards = Array.from({ length: 10 });

  return (
    <section>
      {/* =========================
          HEADER (mirrors ProductPageHeader)
          ========================= */}
      {/*<header className="relative w-full overflow-hidden">
        <div className="hidden w-full md:flex min-h-80 lg:min-h-90">
          <div className="flex-1 bg-neutral-200 animate-pulse" />
          <div className="flex-1 bg-neutral-200 animate-pulse" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 hidden items-center md:flex">
          <Container className="w-full">
            <div className="grid grid-cols-2">
              <div className="max-w-xl space-y-4 pr-6 lg:pr-12">
                <div className="h-9 w-2/3 rounded-sm bg-neutral-300 animate-pulse lg:h-12" />
                <div className="h-4 w-full rounded-sm bg-neutral-300 animate-pulse" />
                <div className="h-4 w-5/6 rounded-sm bg-neutral-300 animate-pulse" />
              </div>
            </div>
          </Container>
        </div>
        <div className="flex flex-col md:hidden">
          <div className="relative h-44 w-full bg-neutral-200 animate-pulse" />
          <div className="w-full bg-neutral-200 px-5 py-8 animate-pulse sm:px-8 sm:py-10">
            <div className="max-w-xl space-y-3">
              <div className="h-7 w-1/2 rounded-sm bg-neutral-300 animate-pulse" />
              <div className="h-4 w-full rounded-sm bg-neutral-300 animate-pulse" />
              <div className="h-4 w-5/6 rounded-sm bg-neutral-300 animate-pulse" />
            </div>
          </div>
        </div>
      </header>*/}

      <Container className="flex gap-10 pb-16">
        <div className="flex-1">
          {/* Sticky sort + filter bar */}
          <div className="sticky top-11 z-25 flex items-center gap-3 bg-white md:top-24">
            <div className="flex-1">
              <div className="flex w-full items-center justify-between bg-white py-5">
                <div className="h-4 w-24 rounded-sm bg-neutral-200 animate-pulse" />
                <div className="h-4 w-20 rounded-sm bg-neutral-200 animate-pulse" />
              </div>
            </div>
            <div className="h-9 w-20 rounded-sm bg-neutral-200 animate-pulse" />
          </div>

          {/* Product grid (mirrors ProductList: 2 / 3 / 4 cols) */}
          <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {skeletonCards.map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>

          {/* Pagination placeholder */}
          <div className="mt-10 flex justify-center">
            <div className="h-9 w-64 rounded-sm bg-neutral-200 animate-pulse" />
          </div>
        </div>
      </Container>
    </section>
  );
}

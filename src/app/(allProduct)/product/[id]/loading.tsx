import { Container } from '@/components/shared/Container';

export default function Loading() {
  const thumbnails = Array.from({ length: 4 });
  const variantDots = Array.from({ length: 3 });
  const accordions = Array.from({ length: 3 });
  const reviewCards = Array.from({ length: 2 });

  return (
    <div className="w-full bg-white py-6">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5">
          <div className="h-3 w-10 rounded-sm bg-neutral-200 animate-pulse" />
          <span className="text-neutral-200">/</span>
          <div className="h-3 w-16 rounded-sm bg-neutral-200 animate-pulse" />
          <span className="text-neutral-200">/</span>
          <div className="h-3 w-24 rounded-sm bg-neutral-200 animate-pulse" />
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Gallery (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="flex gap-4">
              <div className="flex shrink-0 flex-col gap-2">
                {thumbnails.map((_, i) => (
                  <div key={i} className="h-16 w-16 rounded-sm bg-[#f5f5f3] animate-pulse" />
                ))}
              </div>
              <div className="relative aspect-square w-full flex-1 rounded-sm bg-[#f5f5f3] animate-pulse p-8" />
            </div>
          </div>

          {/* Details column (col-span-5) */}
          <div className="flex flex-col space-y-4 lg:col-span-5">
            {/* Header */}
            <div className="space-y-3">
              <div className="h-3 w-24 rounded-sm bg-neutral-200 animate-pulse" />
              <div className="h-8 w-2/3 rounded-sm bg-neutral-200 animate-pulse" />
              <div className="h-6 w-1/3 rounded-sm bg-neutral-200 animate-pulse" />
            </div>

            {/* Purchase panel */}
            <div className="space-y-3">
              <div className="flex gap-2">
                {variantDots.map((_, i) => (
                  <div key={i} className="h-9 w-9 rounded-full bg-neutral-200 animate-pulse" />
                ))}
              </div>
              <div className="h-12 w-full rounded-sm bg-neutral-200 animate-pulse" />
              <div className="h-4 w-28 rounded-sm bg-neutral-200 animate-pulse" />
            </div>

            {/* Promo countdown */}
            <div className="h-10 w-full rounded-sm bg-neutral-100 animate-pulse" />

            {/* Guarantees */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded-sm bg-neutral-200 animate-pulse" />
              <div className="h-4 w-5/6 rounded-sm bg-neutral-200 animate-pulse" />
            </div>

            {/* Accordions */}
            <div className="space-y-3">
              {accordions.map((_, i) => (
                <div key={i} className="h-12 w-full rounded-sm bg-neutral-100 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Reviews placeholder */}
      <div className="mt-12">
        <Container>
          <div className="mb-6 h-7 w-48 rounded-sm bg-neutral-200 animate-pulse" />
          <div className="space-y-4">
            {reviewCards.map((_, i) => (
              <div key={i} className="h-24 w-full rounded-sm bg-neutral-100 animate-pulse" />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

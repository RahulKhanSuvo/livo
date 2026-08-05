import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, ArrowRight01Icon, SparklesIcon } from '@hugeicons/core-free-icons';

export default function ReviewsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-4xl tracking-tight text-[#161512] sm:text-5xl">
          My reviews
          <span className="text-[#d98e63]">.</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4c4a45]/60">
          Share your thoughts on the pieces you love — and help others design their homes.
        </p>
      </div>

      {/* Empty state */}
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#161512]/15 bg-white/60 px-6 py-20 text-center">
        <div aria-hidden className="bg-grain absolute inset-0 opacity-40" />
        <div className="relative mx-auto flex max-w-sm flex-col items-center">
          {/* Star cluster */}
          <div className="relative mb-8">
            <div className="grid size-20 place-items-center rounded-full bg-[#f0ece4] text-[#d98e63]">
              <HugeiconsIcon icon={StarIcon} size={34} strokeWidth={1.5} />
            </div>
            <div className="absolute -top-1 -right-1 grid size-7 place-items-center rounded-full bg-[#4b6b56] text-[#f4f1e8]">
              <HugeiconsIcon icon={SparklesIcon} size={13} strokeWidth={2} />
            </div>
          </div>

          <h2 className="font-serif text-3xl tracking-tight text-[#161512]">No reviews yet</h2>

          <p className="mt-3 text-sm leading-relaxed text-[#4c4a45]/60 max-w-xs">
            When you purchase a piece and share your experience, your review will appear here —
            helping others make considered choices.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-[#161512] px-6 py-3 text-xs font-semibold tracking-wider text-[#f4f1e8] uppercase transition-colors hover:bg-[#4b6b56]"
            >
              Browse the collection
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <p className="text-xs text-[#4c4a45]/40">Purchases made will be reviewed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

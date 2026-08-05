import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, SparklesIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { getProfileUser } from '@/components/profile/get-session';

export const metadata = { title: 'My reviews' };

export default async function ReviewsPage() {
  await getProfileUser();

  return (
    <div className="bg-[#f6f1ea] text-[#161512]">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d98e63]">
            <HugeiconsIcon icon={StarIcon} size={28} strokeWidth={1.5} className="text-[#f6f1ea]" />
          </div>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d98e63]">
            Your voice
          </p>
          <h1 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-instrument-serif)] text-4xl sm:text-6xl">
            Reviews that shape every piece we make
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
            Everything you&apos;ve shared, all in one place. Your words help other homes and guide
            our workshop.
          </p>
          <Link
            href="/shop"
            className="group mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-[#161512] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#f6f1ea] transition-colors hover:bg-[#d98e63]"
          >
            Review a piece
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="font-[family-name:var(--font-instrument-serif)] text-5xl">0</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Reviews written
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="font-[family-name:var(--font-instrument-serif)] text-5xl">—</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Average rating
            </p>
          </div>
          <div className="rounded-3xl bg-[#161512] p-6 text-[#f6f1ea] shadow-sm">
            <HugeiconsIcon
              icon={SparklesIcon}
              size={24}
              strokeWidth={1.5}
              className="text-[#d98e63]"
            />
            <p className="mt-3 text-sm leading-relaxed text-[#f6f1ea]/80">
              Share your story to help future buyers and inspire our makers.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-[#d98e63]/40 bg-[#f6f1ea] px-6 py-20 text-center">
          <span className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <HugeiconsIcon key={i} icon={StarIcon} size={20} className="text-neutral-300" />
            ))}
          </span>
          <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-2xl">
            No reviews yet
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-500">
            Once you review a purchase, it will appear here for you to revisit.
          </p>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { getProfileUser } from '@/components/profile/get-session';
import { getUserReviewsAction } from '@/actions/reviews/getUserReviewsAction';
import { StarRating } from '@/components/common/StarRating/StarRating';

export const metadata = { title: 'My reviews' };

export default async function ReviewsPage() {
  await getProfileUser();
  const { data } = await getUserReviewsAction();
  const reviews = data?.reviews ?? [];

  const average =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="bg-white text-[#161512]">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#d98e63]">
          Your voice
        </p>
        <h1 className="mt-4 max-w-2xl text-5xl font-medium tracking-tight sm:text-6xl">
          Reviews that shape every piece we make
        </h1>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="border border-neutral-200 bg-white p-6">
            <p className="text-5xl font-medium tracking-tight">{reviews.length}</p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-neutral-500">
              Reviews written
            </p>
          </div>
          <div className="border border-neutral-200 bg-white p-6">
            <p className="text-5xl font-medium tracking-tight">
              {reviews.length ? average.toFixed(1) : '—'}
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-neutral-500">
              Average rating
            </p>
          </div>
          <div className="border border-neutral-200 bg-[#161512] p-6 text-[#f4f1e8]">
            <div className="flex h-11 w-11 items-center justify-center bg-[#d98e63]">
              <HugeiconsIcon icon={StarIcon} size={22} strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-sm font-light leading-relaxed text-[#f4f1e8]/80">
              Share your story to help future buyers and inspire our makers.
            </p>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="mt-8 flex flex-col items-center border border-dashed border-[#d98e63]/40 bg-[#fbfaf7] px-6 py-20 text-center">
            <span className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <HugeiconsIcon key={i} icon={StarIcon} size={20} className="text-neutral-300" />
              ))}
            </span>
            <h2 className="mt-6 text-2xl font-medium tracking-tight">No reviews yet</h2>
            <p className="mt-2 max-w-sm text-sm font-light text-neutral-500">
              Once you review a purchase you&apos;ve received, it will appear here.
            </p>
            <Link
              href="/shop"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#161512] px-7 py-3.5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#d98e63]"
            >
              Review a piece
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <Link
                key={r.id}
                href={`/shop/${r.productId}`}
                className="border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{r.productName}</p>
                  <StarRating rating={r.rating} />
                </div>
                {r.title && <p className="mt-3 font-medium">{r.title}</p>}
                <p className="mt-1 text-sm font-light leading-relaxed text-neutral-600">
                  {r.comment}
                </p>
                <p className="mt-3 text-xs text-neutral-400">{r.date}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

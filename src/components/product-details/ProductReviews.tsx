'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, ChatIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StarRating } from '@/components/common/StarRating/StarRating';
import { authClient } from '@/lib/auth-client';
import {
  getProductReviewsAction,
  type ProductReview,
} from '@/actions/reviews/getProductReviewsAction';
import { createReviewAction } from '@/actions/reviews/createReviewAction';

function StarSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          aria-label={`${star} star`}
          className="p-0.5"
        >
          <HugeiconsIcon
            icon={StarIcon}
            size={24}
            className={cn(
              'transition-colors',
              (hover || value) >= star
                ? 'fill-[#EAB308] text-[#EAB308]'
                : 'fill-neutral-200 text-neutral-200'
            )}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <div className="rounded-sm border border-foreground/10 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-[#4b6b56] text-xs font-bold text-[#f4f1e8]">
            {review.author.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-sm font-medium">{review.author}</p>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      {review.title && <p className="mt-3 font-medium">{review.title}</p>}
      <p className="mt-1 text-sm leading-relaxed text-foreground/80">{review.comment}</p>
    </div>
  );
}

export default function ProductReviews({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const isAuthed = !!session?.user;

  const { data: result, isFetching } = useQuery({
    queryKey: ['productReviews', productId],
    queryFn: () => getProductReviewsAction({ productId }),
  });

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const data = result?.data;
  const reviews = data?.reviews ?? [];
  const canReview = data?.canReview ?? false;
  const orderItemId = data?.orderItemId ?? null;
  const existingReview = data?.existingReview ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!orderItemId) {
      setError('You can only review items you have received.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await createReviewAction({
        productId,
        orderItemId,
        rating,
        title: title.trim() || undefined,
        comment: comment.trim(),
      });
      if (res.success && res.data?.ok) {
        setTitle('');
        setComment('');
        setRating(5);
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ['productReviews', productId] });
      } else {
        setError(res.data?.message ?? res.message ?? 'Could not post review.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#f6f1ea] py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <StarRating
            rating={data?.averageRating ? Math.round(data.averageRating) : 5}
            starClassName="h-4 w-4"
          />
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-3xl">
            Customer Reviews
          </h2>
          <p className="text-sm text-neutral-600">
            {data?.total ?? 0} review{data?.total === 1 ? '' : 's'} ·{' '}
            {Number(data?.averageRating ?? 0).toFixed(1)} average
          </p>
        </div>

        <div className="mt-8">
          {isAuthed && canReview && !existingReview && (
            <div className="mb-6 rounded-sm border border-dashed border-[#d98e63]/40 bg-white p-5">
              {open ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Your rating
                    </Label>
                    <div className="mt-2">
                      <StarSelector value={rating} onChange={setRating} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="review-title"
                      className="text-xs font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      Title (optional)
                    </Label>
                    <Input
                      id="review-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Sum up your experience"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="review-comment"
                      className="text-xs font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      Your review
                    </Label>
                    <Textarea
                      id="review-comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell others what you think about this piece"
                      className="min-h-24"
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <div className="flex gap-2">
                    <Button type="submit" className="gap-1.5" disabled={submitting}>
                      {submitting && (
                        <HugeiconsIcon icon={ChatIcon} size={15} className="animate-pulse" />
                      )}
                      Post review
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-sm text-neutral-700">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      className="text-[#4b6b56]"
                    />
                    You purchased this item — share your thoughts.
                  </p>
                  <Button onClick={() => setOpen(true)} className="gap-1.5">
                    <HugeiconsIcon icon={StarIcon} size={15} />
                    Write a review
                  </Button>
                </div>
              )}
            </div>
          )}

          {isAuthed && canReview && existingReview && (
            <div className="mb-6 rounded-sm border border-[#d98e63]/30 bg-white p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-[#b9703f]">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />
                You reviewed this purchase
              </p>
              <div className="mt-3">
                <ReviewCard review={existingReview} />
              </div>
            </div>
          )}

          {isAuthed && !canReview && (
            <p className="mb-6 text-center text-sm text-neutral-500">
              Purchase and receive this item to leave a review.
            </p>
          )}

          {!isAuthed && (
            <p className="mb-6 text-center text-sm text-neutral-500">
              <Link href="/login" className="font-semibold text-[#d98e63] hover:underline">
                Sign in
              </Link>{' '}
              to write a review.
            </p>
          )}

          {isFetching && reviews.length === 0 ? (
            <p className="text-center text-sm text-neutral-500">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-sm text-neutral-500">
              No reviews yet. Be the first to share your experience.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

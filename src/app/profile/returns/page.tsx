import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  RefreshIcon,
  CheckmarkCircle02Icon,
  PackageOpenIcon,
  LockKeyIcon,
} from '@hugeicons/core-free-icons';
import { getProfileUser } from '@/components/profile/get-session';

export const metadata = { title: 'Returns' };

const steps = [
  {
    icon: PackageOpenIcon,
    title: 'Request a return',
    body: 'Contact us within 30 days of delivery. Every Livo piece carries a 30-day return window, no questions asked.',
  },
  {
    icon: CheckmarkCircle02Icon,
    title: 'We arrange pickup',
    body: 'Our white-glove team schedules a free pickup at a time that suits you. Nothing needs to be boxed.',
  },
  {
    icon: LockKeyIcon,
    title: 'Refund in full',
    body: 'Once your piece is safely back at the workshop, your refund is issued to the original payment method.',
  },
];

export default async function ReturnsPage() {
  await getProfileUser();

  return (
    <div className="bg-[#f6f5f1] text-[#161512]">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4b6b56]">
          Returns &amp; exchanges
        </p>
        <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-instrument-serif)] text-4xl sm:text-6xl">
          Our promise: love it or return it
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
          Furniture should feel right in your home. If a piece doesn&apos;t, our white-glove team
          makes returns effortless.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-3xl border border-neutral-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4b6b56]/15">
                <HugeiconsIcon
                  icon={step.icon}
                  size={24}
                  strokeWidth={1.5}
                  className="text-[#4b6b56]"
                />
              </div>
              <h2 className="mt-5 font-[family-name:var(--font-instrument-serif)] text-xl">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center rounded-3xl bg-[#161512] px-6 py-16 text-center text-[#f4f1e8]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d98e63]/20">
            <HugeiconsIcon
              icon={RefreshIcon}
              size={26}
              strokeWidth={1.5}
              className="text-[#d98e63]"
            />
          </div>
          <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-3xl">
            No open returns yet
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#f4f1e8]/70">
            Your active returns will appear here. Need to start one? Our concierge is one message
            away.
          </p>
          <Link
            href="/shop"
            className="mt-8 rounded-full bg-[#f4f1e8] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#161512] transition-colors hover:bg-[#d98e63] hover:text-[#f4f1e8]"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}

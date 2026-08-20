import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  RefreshIcon,
  PackageOpenIcon,
  CheckmarkCircle02Icon,
  LockKeyIcon,
} from '@hugeicons/core-free-icons';
import { Container } from '@/components/shared/Container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
export const metadata = {
  title: 'Return & Refund Policy — Livo',
  description:
    'Our 30-day return promise, white-glove pickup, and full-refund process — explained simply.',
};

const glance = [
  {
    icon: RefreshIcon,
    title: '30-Day Window',
    body: 'Initiate a return within 30 days of delivery, no questions asked.',
  },
  {
    icon: PackageOpenIcon,
    title: 'Free Pickup',
    body: 'Our white-glove team collects from your door. No boxing required.',
  },
  {
    icon: CheckmarkCircle02Icon,
    title: 'Full Refund',
    body: 'Refunds are issued to your original payment method in full.',
  },
  {
    icon: LockKeyIcon,
    title: 'Easy Exchanges',
    body: 'Swap for another size, colour, or piece — whenever you like.',
  },
];

const steps = [
  {
    icon: RefreshIcon,
    title: 'Request a return',
    body: 'Open a return from your account or reach out to our team. We confirm within 24 hours.',
  },
  {
    icon: PackageOpenIcon,
    title: 'We arrange pickup',
    body: 'A scheduled, contactless collection at a time that suits you. Nothing needs to be packed.',
  },
  {
    icon: CheckmarkCircle02Icon,
    title: 'Refund in full',
    body: 'Once your piece is safely back at the workshop, your refund lands in 5–7 business days.',
  },
];

const faqs = [
  {
    q: 'How do I start a return?',
    a: 'Sign in and open the order you’d like to return, or contact our care team. We’ll confirm the request and arrange everything else.',
  },
  {
    q: 'Who pays for return shipping?',
    a: 'We do. Every return includes a free, white-glove pickup — you never have to arrange couriers or boxing.',
  },
  {
    q: 'How long do refunds take?',
    a: 'Once the piece is received and inspected at our workshop (usually 1–2 days), refunds are processed within 5–7 business days to your original payment method.',
  },
  {
    q: 'Can I exchange instead of a refund?',
    a: 'Absolutely. Choose an exchange for a different size, colour, or design and we’ll coordinate the swap during pickup.',
  },
  {
    q: 'What if my item arrived damaged?',
    a: 'Report any damage or defect within 48 hours of delivery and we’ll arrange an immediate replacement at no cost.',
  },
  {
    q: 'Do you accept returns on sale items?',
    a: 'Most marked-down pieces follow the standard 30-day policy. Items labelled FINAL SALE are excluded and noted at checkout.',
  },
];

export default function ReturnAndRefundsPage() {
  return (
    <div className="bg-[#f6f5f1] text-[#161512]">
      {/* Editorial Header */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:pt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sidebar-primary">
          Returns &amp; Refunds
        </p>
        <h1 className="mt-4         font-medium text-5xl leading-[0.95] sm:text-7xl">
          We want you to
          <br />
          <em className="text-primary">love it. Truly.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-600">
          Furniture should feel right in your home. If a piece doesn’t, our white-glove team makes
          returning it effortless — free pickup, full refund, no fuss.
        </p>
      </section>

      {/* At a glance */}
      <Container size="md" className="py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {glance.map((item) => (
            <div key={item.title} className="rounded-sm border border-neutral-200 bg-white p-5">
              <span className="mb-4 grid size-10 place-items-center rounded-sm bg-primary/10 text-primary">
                <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.6} />
              </span>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Process */}
      <section className="bg-primary py-16 text-primary-foreground">
        <Container size="md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sidebar-primary">
            How it works
          </p>
          <h2 className="mt-3         font-medium text-4xl sm:text-5xl">Three simple steps</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="border-t border-primary-foreground/20 pt-6">
                <span className="        font-medium text-3xl text-sidebar-primary">0{i + 1}</span>
                <span className="ml-3 inline-grid size-9 translate-y-1 place-items-center rounded-sm bg-primary-foreground/10 text-primary-foreground">
                  <HugeiconsIcon icon={step.icon} size={18} strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Eligibility */}
      <Container size="md" className="py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="        font-medium text-3xl sm:text-4xl">What you can return</h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-600">
              {[
                'Items within 30 days of delivery',
                'Pieces in their original, unused condition',
                'Goods returned in the original packaging',
                'Faulty or defective items, reported at any time',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="        font-medium text-3xl sm:text-4xl">What we can’t take back</h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-600">
              {[
                'Bespoke or made-to-order pieces',
                'Items damaged through misuse',
                'Clearance or FINAL SALE products',
                'Perishable or consumable goods',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <HugeiconsIcon
                    icon={LockKeyIcon}
                    size={18}
                    className="mt-0.5 shrink-0 text-sidebar-primary"
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* FAQ */}
      <section className="border-t border-neutral-200 bg-white">
        <Container size="md" className="py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sidebar-primary">
            Good to know
          </p>
          <h2 className="mt-3         font-medium text-4xl sm:text-5xl">Questions, answered</h2>
          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${i}`}
                  className="border-b border-neutral-200"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-medium text-[#161512] hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-neutral-600">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#f6f5f1]">
        <Container size="md" className="py-16 text-center">
          <h2 className="        font-medium text-3xl sm:text-4xl">
            Ready to send something home?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
            Start a return from your account, or talk to our care team — we’ll handle the rest.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/profile/returns"
              className="rounded-sm bg-[#161512] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary"
            >
              Start a return
            </Link>
            <Link
              href="/shop"
              className="rounded-sm border border-neutral-300 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#161512] transition-colors hover:bg-white"
            >
              Continue shopping
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

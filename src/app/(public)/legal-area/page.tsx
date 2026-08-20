import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata = {
  title: 'Legal Area — Livo',
  description:
    'Our terms of service, privacy policy, payments, intellectual property and cookie practices.',
};

const lastUpdated = '1 August 2026';

const sections = [
  {
    id: 'terms',
    title: 'Terms of Service',
    body: [
      'These terms govern your use of the Livo storefront, including every order you place with us. By browsing or purchasing, you agree to them in full. We may update them from time to time, and continued use after changes constitutes acceptance.',
      'You confirm that the information you provide at checkout is accurate and that you are authorised to use the chosen payment method. Orders are an offer to purchase; a contract is formed only once we accept and dispatch your order.',
      'Product imagery is indicative. While we strive for accuracy, slight variations in colour and finish are inherent to natural materials such as wood, stone, and woven textiles.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    body: [
      'We collect only the information needed to fulfil your order and improve your experience: contact details, delivery address, order history, and limited technical data such as device and browsing behaviour.',
      'We never sell your personal data. It is shared only with vetted partners who help us deliver, process payments, and power our storefront — and always under contractual confidentiality.',
      'You may request access to, correction of, or deletion of your personal data at any time by contacting our care team. We respond within statutory timeframes.',
    ],
  },
  {
    id: 'payments',
    title: 'Payments & Pricing',
    body: [
      'All prices are listed in your selected currency and include applicable taxes at checkout unless stated otherwise. Promotions and discount codes cannot be combined unless explicitly noted.',
      'Payment is processed securely by our payment partners. We do not store full card numbers on our servers. Charges appear as “Livo” on your statement.',
      'In the rare event of a pricing error, we reserve the right to cancel the affected order and issue a full refund.',
    ],
  },
  {
    id: 'ip',
    title: 'Intellectual Property',
    body: [
      'All content on this site — photography, copy, product designs, and the Livo name and marks — is owned by Livo or its licensors and protected by law.',
      'You may view and share our content for personal, non-commercial use. Reproduction, resale, or modification without written permission is not permitted.',
      'If you believe your intellectual property is used here without authorisation, please reach out and we will address it promptly.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: [
      'We use essential cookies to keep your cart and session working, and optional analytics cookies to understand how the storefront is used. You can manage preferences through your browser at any time.',
      'Disabling essential cookies may affect checkout and saved details. We do not use cookies to identify you across unrelated third-party sites.',
    ],
  },
];

export default function LegalAreaPage() {
  return (
    <div className="bg-[#f6f5f1] text-[#161512]">
      {/* Editorial Header */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:pt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d98e63]">
          Legal Area
        </p>
        <h1 className="mt-4         font-medium text-5xl leading-[0.95] sm:text-7xl">
          The fine print,
          <br />
          <em className="text-[#4b6b56]">made readable.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-600">
          We believe legal should be legible. Below are the essentials that govern shopping with
          Livo — written in plain language, not legalese.
        </p>
        <p className="mt-4 text-xs uppercase tracking-wider text-neutral-400">
          Last updated {lastUpdated}
        </p>
      </section>

      {/* Legal sections */}
      <Container size="md" className="py-10">
        <div className="rounded-sm border border-neutral-200 bg-white px-5 sm:px-8">
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section, i) => (
              <AccordionItem
                key={section.id}
                value={`section-${i}`}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-[#161512] hover:text-[#4b6b56]">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pb-5 text-sm leading-relaxed text-neutral-600">
                  {section.body.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Returns reference */}
        <div className="mt-8 flex flex-col items-start gap-3 rounded-sm bg-[#4b6b56] p-6 text-[#f4f1e8] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="        font-medium text-xl">Our 30-day return promise</h3>
            <p className="mt-1 text-sm text-[#f4f1e8]/75">
              Free pickup, full refunds, and easy exchanges.
            </p>
          </div>
          <Link
            href="/return-and-refunds"
            className="shrink-0 rounded-sm bg-[#f4f1e8] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#4b6b56] transition-colors hover:bg-white"
          >
            Read the policy
          </Link>
        </div>
      </Container>
    </div>
  );
}

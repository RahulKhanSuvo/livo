import { HugeiconsIcon } from '@hugeicons/react';
import { PackageOpenIcon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';

const returnSteps = [
  {
    step: '01',
    title: 'Request a return',
    desc: 'Contact us within 30 days of delivery. We’ll send you a prepaid return label.',
  },
  {
    step: '02',
    title: 'Pack & ship',
    desc: 'Repackage the item in its original packaging and drop it off at your nearest carrier.',
  },
  {
    step: '03',
    title: 'Refund or exchange',
    desc: 'Once inspected, we’ll process your refund or arrange an exchange within 5 business days.',
  },
];

export default function ReturnsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-4xl tracking-tight text-[#161512] sm:text-5xl">
          Returns
          <span className="text-[#d98e63]">.</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4c4a45]/60">
          We want every piece to feel right in your home. If it doesn’t, returns are simple.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {returnSteps.map((item) => (
          <div
            key={item.step}
            className="rounded-2xl border border-[#161512]/10 bg-white p-6 shadow-sm"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#d98e63] uppercase">
              Step {item.step}
            </span>
            <h3 className="mt-2 font-serif text-xl tracking-tight text-[#161512]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4c4a45]/60">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Policy note */}
      <div className="rounded-2xl border border-[#161512]/10 bg-white/60 px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#4b6b56]/10 text-[#4b6b56]">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={22} strokeWidth={1.8} />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg text-[#161512]">Our promise</h4>
            <p className="text-sm leading-relaxed text-[#4c4a45]/60">
              Every piece is covered by our 30-day return guarantee. If you’re not completely
              satisfied with your purchase, we’ll make it right — no questions asked.
            </p>
          </div>
        </div>
      </div>

      {/* No active returns */}
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#161512]/15 bg-white/60 px-6 py-16 text-center">
        <div aria-hidden className="bg-grain absolute inset-0 opacity-40" />
        <div className="relative mx-auto flex max-w-sm flex-col items-center">
          <div className="grid size-16 place-items-center rounded-full bg-[#f0ece4] text-[#4b6b56]">
            <HugeiconsIcon icon={PackageOpenIcon} size={28} strokeWidth={1.5} />
          </div>
          <h3 className="mt-6 font-serif text-2xl text-[#161512]">No returns in progress</h3>
          <p className="mt-2 text-sm text-[#4c4a45]/60">
            You haven’t started any returns yet. Your purchases are looking good.
          </p>
        </div>
      </div>
    </div>
  );
}

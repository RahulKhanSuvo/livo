import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { GridIcon, ArrowRight01Icon, Bookmark02Icon } from '@hugeicons/core-free-icons';

export default function CollectionsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-4xl tracking-tight text-[#161512] sm:text-5xl">
          Collections
          <span className="text-[#d98e63]">.</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4c4a45]/60">
          Save pieces you love into personal collections — mood boards for your next room.
        </p>
      </div>

      {/* Empty state */}
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#161512]/15 bg-white/60 px-6 py-20 text-center">
        <div aria-hidden className="bg-grain absolute inset-0 opacity-40" />
        <div className="relative mx-auto flex max-w-sm flex-col items-center">
          {/* Icon cluster */}
          <div className="relative mb-8">
            <div className="grid size-20 place-items-center rounded-full bg-[#f0ece4] text-[#4b6b56]">
              <HugeiconsIcon icon={GridIcon} size={34} strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full bg-[#d98e63] text-white">
              <HugeiconsIcon icon={Bookmark02Icon} size={13} strokeWidth={2} />
            </div>
          </div>

          <h2 className="font-serif text-3xl tracking-tight text-[#161512]">No collections yet</h2>

          <p className="mt-3 text-sm leading-relaxed text-[#4c4a45]/60 max-w-xs">
            Bookmark your favourite pieces and organise them into collections — living room
            inspiration, bedroom must-haves, or anything in between.
          </p>

          <Link
            href="/shop"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#161512] px-6 py-3 text-xs font-semibold tracking-wider text-[#f4f1e8] uppercase transition-colors hover:bg-[#4b6b56]"
          >
            Start browsing
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

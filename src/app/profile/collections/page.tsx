import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { GridIcon, ArrowRight01Icon, Bookmark02Icon } from '@hugeicons/core-free-icons';
import { getProfileUser } from '@/components/profile/get-session';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Collections' };

export default async function CollectionsPage() {
  await getProfileUser();

  return (
    <div className="bg-white text-[#161512]">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-sidebar-primary">
          Saved collections
        </p>
        <h1 className="mt-4 max-w-2xl text-5xl font-medium tracking-tight sm:text-6xl">
          Rooms you&apos;re dreaming up
        </h1>
        <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-neutral-600">
          Save pieces and build collections for every room, mood, or project on your mind.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center border border-dashed border-neutral-300 bg-[#fbfaf7] px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center bg-white">
              <HugeiconsIcon
                icon={Bookmark02Icon}
                size={24}
                strokeWidth={1.5}
                className="text-sidebar-primary"
              />
            </div>
            <h2 className="mt-5 text-2xl font-medium tracking-tight">No saved pieces yet</h2>
            <p className="mt-2 max-w-xs text-sm font-light text-neutral-600">
              Tap the bookmark on any product to start a collection.
            </p>
          </div>

          <div className="flex flex-col items-start border border-neutral-200 bg-[#161512] px-6 py-16 text-primary-foreground">
            <div className="flex h-14 w-14 items-center justify-center bg-sidebar-primary">
              <HugeiconsIcon icon={GridIcon} size={24} strokeWidth={1.5} />
            </div>
            <h2 className="mt-5 text-2xl font-medium tracking-tight">Explore the collection</h2>
            <p className="mt-2 max-w-xs text-sm font-light text-primary-foreground/70">
              Discover sofas, tables, and lighting made for real living.
            </p>
            <Button asChild className="group mt-8">
              <Link href="/shop">
                Browse
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={14}
                  className="transition-transform group-hover/button:translate-x-0.5"
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

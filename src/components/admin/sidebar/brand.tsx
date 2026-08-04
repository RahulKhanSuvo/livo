import Link from 'next/link';

import { cn } from '@/lib/utils';

export function Brand({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Link
      href="/admin"
      className={cn(
        'flex items-center gap-2.5 px-4 py-5 transition-all',
        collapsed && 'justify-center px-0'
      )}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-black/10">
        <span className="font-serif text-lg leading-none">L</span>
      </span>
      {!collapsed && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-xl tracking-tight text-sidebar-foreground">LIVO</span>
          <span className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-sidebar-foreground/50 uppercase">
            Admin
          </span>
        </span>
      )}
    </Link>
  );
}

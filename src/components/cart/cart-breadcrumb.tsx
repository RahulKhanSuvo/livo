'use client';

import Link from 'next/link';

export function CartBreadcrumb() {
  return (
    <nav className="mb-6 mt-6 flex items-center text-xs text-neutral-500">
      <Link href="/" className="hover:text-black transition-colors">
        Home
      </Link>
      <span className="mx-2 text-neutral-400">&gt;</span>
      <span className="font-medium text-primary">Cart</span>
    </nav>
  );
}

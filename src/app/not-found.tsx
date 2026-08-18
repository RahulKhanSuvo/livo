import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[#f6f5f1] px-6 text-center">
      <Link href="/" className="mb-10 text-2xl font-bold tracking-tight text-[#4b6b56]">
        LIVO
      </Link>

      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#d98e63]">Error 404</p>
      <h1 className="mt-4 font-serif text-7xl leading-none text-[#161512] sm:text-8xl">404</h1>
      <p className="mt-5 text-lg font-light tracking-tight text-neutral-800 sm:text-xl">
        We can’t find that page.
      </p>
      <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-neutral-600">
        The page you’re looking for doesn’t exist or has been moved. Let’s get you back to something
        you’ll love.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#161512] px-7 py-3 text-xs font-medium uppercase tracking-wider text-[#f4f1e8] transition-colors hover:bg-[#d98e63]"
        >
          Back to home
        </Link>
        <Link
          href="/shop"
          className="text-xs font-medium uppercase tracking-wider text-[#4b6b56] underline-offset-4 hover:underline"
        >
          Browse the collection
        </Link>
      </div>
    </main>
  );
}

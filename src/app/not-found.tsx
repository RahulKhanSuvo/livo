import Link from 'next/link';
import { Container } from '@/components/shared/Container';

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center bg-white">
      <Container size="sm" className="py-24 text-center">
        <span className="text-[140px] sm:text-[180px] font-bold text-neutral-100 leading-none">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-2">Page not found</h1>
        <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 text-xs font-bold uppercase tracking-widest text-white bg-neutral-900 hover:bg-neutral-800 transition-colors px-8 py-3"
        >
          Back to home
        </Link>
      </Container>
    </main>
  );
}

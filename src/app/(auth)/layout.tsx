import type { Metadata } from 'next';
import { Navbar } from '@/components/common/navbar/Navbar';
import { Footer } from '@/components/common/footer/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Sign in — Livo',
    template: '%s — Livo',
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}

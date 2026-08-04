import { Navbar } from '@/components/common/navbar/Navbar';
import { Footer } from '@/components/common/footer/Footer';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}
import { Navbar } from '@/components/common/navbar/Navbar';
import { Footer } from '@/components/common/footer/Footer';
import { AiAssistant } from '@/components/ai/AiAssistant';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <AiAssistant />
    </>
  );
}

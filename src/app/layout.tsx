import type { Metadata } from 'next';
import { Mona_Sans, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import QueryProviders from '@/providers/QueryProvider';
import { Toaster } from 'sonner';
// import Navbar from '@/components/common/navbar/Navbar';
// import Footer from '@/components/common/footer/Footer';

const monaSans = Mona_Sans({
  variable: '--font-mona-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});
export const metadata: Metadata = {
  title: 'Livo',
  description:
    'Livo is your destination for quality furniture and home decor, including sofas, chairs, tables, TV cabinets, lamps, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        monaSans.variable,
        geistMono.variable,
        instrumentSerif.variable,
        'font-sans'
      )}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryProviders>
          {children}
          <Toaster richColors position="top-right" />
        </QueryProviders>
      </body>
    </html>
  );
}

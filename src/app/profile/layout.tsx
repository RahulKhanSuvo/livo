import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Your profile — Livo',
    template: '%s — Livo',
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}

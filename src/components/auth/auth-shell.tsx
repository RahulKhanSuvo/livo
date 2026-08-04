'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, SparklesIcon } from '@hugeicons/core-free-icons';

import heroImage from '@/assets/hero/main-banner-7-desktop.webp';

const ease = [0.16, 1, 0.3, 1] as const;

export type AuthMode = 'signin' | 'signup';

const HEADLINE = ['Design', 'for', 'the', 'way', 'you', 'live.'];

export function AuthShell({ mode, children }: { mode: AuthMode; children: ReactNode }) {
  return (
    <main className="grid min-h-dvh w-full bg-[#f6f5f1] lg:grid-cols-2">
      {/* ── Visual panel ─────────────────────────────────────────────── */}
      <div className="relative hidden overflow-hidden lg:block">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
          className="absolute inset-0"
        >
          <Image
            src={heroImage}
            alt="Livo furniture showroom"
            fill
            priority
            className="object-cover"
            sizes="50vw"
          />
        </motion.div>

        {/* Grade + grain */}
        <div className="absolute inset-0 bg-linear-to-t from-[#161512]/90 via-[#161512]/25 to-[#161512]/40" />
        <div aria-hidden className="bg-grain absolute inset-0 opacity-70" />

        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="absolute top-10 left-10 z-10 flex items-center gap-3"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-[#d98e63] font-serif text-xl text-[#161512] shadow-lg shadow-black/20">
            L
          </span>
          <span className="font-serif text-2xl tracking-tight text-[#f4f1e8]">LIVO</span>
        </motion.div>

        {/* Headline */}
        <div className="absolute bottom-0 left-0 z-10 w-full p-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
            className="mb-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.4em] text-[#f4f1e8]/60 uppercase"
          >
            <HugeiconsIcon icon={SparklesIcon} size={14} />
            Livo Studio — Est. 2026
          </motion.p>

          <h1 className="font-serif text-6xl font-normal italic leading-[1.02] text-[#f4f1e8]">
            {HEADLINE.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.65 + i * 0.07 }}
                >
                  {word}
                  {i < HEADLINE.length - 1 ? '\u00A0' : ''}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 max-w-sm border-l border-[#d98e63]/60 pl-5 text-sm leading-relaxed text-[#f4f1e8]/70 italic"
          >
            “Every piece in our collection is chosen to make a home feel considered — never
            decorated, always designed.”
          </motion.blockquote>
        </div>
      </div>

      {/* ── Form panel ───────────────────────────────────────────────── */}
      <div className="bg-grain relative flex flex-col items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
        {/* Mobile brand */}
        <Link href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
          <span className="grid size-9 place-items-center rounded-xl bg-[#d98e63] font-serif text-lg text-[#161512]">
            L
          </span>
          <span className="font-serif text-2xl tracking-tight text-[#4c4a45]">LIVO</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Animated tab switcher */}

          {/* Animated form swap */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              {children}
            </motion.div>
          </AnimatePresence>

          {/* Footer link */}
          <p className="mt-8 text-center text-sm text-[#4c4a45]/50">
            {mode === 'signin' ? (
              <>
                New to Livo?{' '}
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-0.5 font-medium text-[#4b6b56] hover:underline"
                >
                  Create an account
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} strokeWidth={2} />
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="inline-flex items-center gap-0.5 font-medium text-[#4b6b56] hover:underline"
                >
                  Sign in
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} strokeWidth={2} />
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}

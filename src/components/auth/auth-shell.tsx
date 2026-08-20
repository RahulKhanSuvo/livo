'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, SparklesIcon } from '@hugeicons/core-free-icons';

import livingRoom from '@/assets/productCat/livingRoom.png';
import diningRoom from '@/assets/productCat/diningRoom.jpeg';

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
            src={mode === 'signup' ? diningRoom : livingRoom}
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

        {/* Headline */}
        <div className="absolute bottom-0 left-0 z-10 w-full p-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
            className="mb-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.4em] text-primary-foreground/60 uppercase"
          >
            <HugeiconsIcon icon={SparklesIcon} size={14} />
            Livo Studio — Est. 2026
          </motion.p>

          <h1 className="font-sans text-6xl font-normal leading-[1.02] text-primary-foreground">
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
            className="mt-10 max-w-sm border-l border-sidebar-primary/60 pl-5 text-sm leading-relaxed text-primary-foreground/70"
          >
            “Every piece in our collection is chosen to make a home feel considered — never
            decorated, always designed.”
          </motion.blockquote>
        </div>
      </div>

      {/* ── Form panel ───────────────────────────────────────────────── */}
      <div className="bg-grain relative flex flex-col items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
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
          <p className="mt-8 text-center text-sm text-primary/50">
            {mode === 'signin' ? (
              <>
                New to Livo?{' '}
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline"
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
                  className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline"
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

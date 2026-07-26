'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';

import { Container } from '@/components/shared/Container';

import { ChevronDownIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import chairImage from '@/assets/images/00rwz_W.webp';
import tableImage from '@/assets/images/100i9x_W.webp';
import jarImage from '@/assets/images/11030245_i_vue_1.webp';

export const GetCreative = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Chair slides up first, exits last
  const chairY = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [600, 0, 0, -600]);
  const chairRotate = useTransform(scrollYProgress, [0, 1], [-10, 15]);

  // Table slides up second, exits last
  const tableY = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.85, 1], [700, 700, 0, 0, -600]);
  const tableRotate = useTransform(scrollYProgress, [0, 1], [10, -10]);

  // Jar slides up last, exits last
  const jarY = useTransform(scrollYProgress, [0, 0.6, 0.85, 1], [800, 800, 0, -600]);
  const jarRotate = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ y: chairY, rotate: chairRotate, willChange: 'transform' }}
          className="absolute left-[5%] top-[18%]"
        >
          <Image src={chairImage} alt="" className="w-80 h-auto" priority />
        </motion.div>

        <motion.div
          style={{ y: tableY, rotate: tableRotate, willChange: 'transform' }}
          className="absolute left-[15%] bottom-[10%]"
        >
          <Image src={tableImage} alt="" className="w-80 h-auto" />
        </motion.div>

        <motion.div
          style={{ y: jarY, rotate: jarRotate, willChange: 'transform' }}
          className="absolute right-[8%] top-[25%]"
        >
          <Image src={jarImage} alt="" className="w-64 h-auto" />
        </motion.div>

        <Container className="relative z-20 flex h-full flex-col items-center justify-center text-center">
          <span className="mb-6 font-medium uppercase tracking-[0.2em] text-neutral-800">
            GET CREATIVE WITH US
          </span>

          <h2 className="mb-10 max-w-6xl text-5xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl md:text-7xl lg:text-[120px]">
            Check over
            <br />
            10,000 Inspirations
          </h2>

          <Link
            href="/inspirations"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm transition hover:bg-black hover:text-white"
          >
            See more
          </Link>

          <div className="mt-24">
            <HugeiconsIcon
              icon={ChevronDownIcon}
              size={22}
              strokeWidth={1.5}
              className="animate-bounce"
            />
          </div>
        </Container>
      </div>
    </section>
  );
};

export default GetCreative;

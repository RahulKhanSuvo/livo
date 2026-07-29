'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { NavCategory, PromoBanner } from './navbar.data';
import { DropdownAnimationType } from './DropdownPanel';

interface MegamenuPanelProps {
  activeCategory: NavCategory | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  animationType?: DropdownAnimationType;
}

export const MegamenuPanel = ({
  activeCategory,
  onMouseEnter,
  onMouseLeave,
  animationType = 'shutter',
}: MegamenuPanelProps) => {
  if (!activeCategory || activeCategory.type !== 'megamenu') {
    return null;
  }

  const content = (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-18 py-10">
      <div className="flex gap-10 items-start justify-between min-h-[380px]">
        {/* Left Side: Category Columns & View All Link */}
        <div className="flex-1 flex flex-col justify-between self-stretch">
          <div className="grid grid-cols-4 gap-8">
            {activeCategory.columns?.map((col, idx) => (
              <div key={idx} className="flex flex-col space-y-3">
                {col.header ? (
                  <h3 className="text-[12px] font-semibold tracking-wider text-neutral-900 uppercase">
                    {col.header}
                  </h3>
                ) : (
                  <div className="h-0" />
                )}
                <ul className="space-y-2">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        className={`text-[13px] transition-colors block py-0.5 ${
                          !col.header
                            ? 'font-semibold text-neutral-900 hover:text-black'
                            : 'font-normal text-neutral-700 hover:text-black'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* View All Link at Bottom Left */}
          {activeCategory.viewAllText && (
            <div className="mt-12">
              <Link
                href={activeCategory.viewAllHref || activeCategory.href}
                className="text-xs font-bold uppercase tracking-wider text-black underline underline-offset-4 hover:opacity-70 transition-opacity inline-block"
              >
                {activeCategory.viewAllText}
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Promo Banners */}
        {activeCategory.promos && activeCategory.promos.length > 0 && (
          <div
            className={`shrink-0 grid gap-5 ${
              activeCategory.promos.length > 1 ? 'w-[680px] grid-cols-2' : 'w-[360px] grid-cols-1'
            }`}
          >
            {activeCategory.promos.map((promo, pIdx) => (
              <PromoCard key={pIdx} promo={promo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Mode 1: Classic (as before) or None
  if (animationType === 'classic' || animationType === 'none') {
    return (
      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-neutral-200 shadow-2xl z-50 ${
          animationType === 'classic' ? 'animate-in fade-in slide-in-from-top-1 duration-150' : ''
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {content}
      </div>
    );
  }

  // Mode 2: Shutter Animation
  return (
    <AnimatePresence mode="wait">
      {activeCategory && (
        <motion.div
          key={activeCategory.id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.25, ease: 'easeOut' },
          }}
          className="absolute top-full left-0 w-full bg-white border-b border-neutral-200 shadow-2xl z-50 overflow-hidden"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PromoCard = ({ promo }: { promo: PromoBanner }) => (
  <div className="relative group w-full h-[380px] overflow-hidden rounded-xs bg-neutral-900 flex items-center justify-center">
    <Image
      src={promo.image}
      alt={promo.title}
      fill
      sizes="(max-width: 1024px) 100vw, 33vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />

    <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 text-white h-full max-w-[280px]">
      <h4 className="text-sm tracking-[0.08em] font-extrabold uppercase text-white mb-2 leading-snug text-center drop-shadow">
        {promo.title}
      </h4>
      <p className="text-[11px] text-white/90 mb-5 leading-snug font-normal text-center drop-shadow-xs">
        {promo.subtitle}
      </p>
      <Link
        href={promo.ctaHref}
        className="text-[11px] font-bold uppercase tracking-wider text-white underline underline-offset-4 hover:opacity-80 transition-opacity drop-shadow"
      >
        {promo.ctaText}
      </Link>
    </div>
  </div>
);

export default MegamenuPanel;

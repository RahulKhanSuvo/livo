'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { NavCategory } from './navbar.data';

export type DropdownAnimationType = 'shutter' | 'classic' | 'none';

interface DropdownPanelProps {
  category: NavCategory;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  animationType?: DropdownAnimationType;
}

export const DropdownPanel = ({
  category,
  isActive,
  onMouseEnter,
  onMouseLeave,
  animationType = 'classic',
}: DropdownPanelProps) => {
  if (!isActive || category.type !== 'dropdown' || !category.dropdownItems) {
    return null;
  }

  const itemsList = (
    <ul className="space-y-3">
      {category.dropdownItems.map((item, idx) => (
        <li key={idx}>
          <Link
            href={item.href}
            className="text-[13px] font-medium text-neutral-800 hover:text-black transition-colors block py-0.5"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  // Mode 1: No animation or Classic (As it was before)
  if (animationType === 'none' || animationType === 'classic') {
    return (
      <div
        className={`absolute top-full left-0 min-w-57.5 bg-white shadow-xl border border-neutral-100 py-4 px-6 z-50 text-left ${
          animationType === 'classic' ? 'animate-in fade-in slide-in-from-top-1 duration-150' : ''
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {itemsList}
      </div>
    );
  }

  // Mode 2: Shutter Animation
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key={category.id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.2 },
          }}
          className="absolute top-full left-0 min-w-57.5 bg-white shadow-xl border border-neutral-100 py-4 px-6 z-50 text-left overflow-hidden"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <motion.div
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {itemsList}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownPanel;

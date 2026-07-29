'use client';

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckCircle, Copy } from '@hugeicons/core-free-icons';

interface PromoCountdownProps {
  discountText?: string;
  promoCode?: string;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export const PromoCountdown: React.FC<PromoCountdownProps> = ({
  discountText = 'Save 10% with code',
  promoCode = 'Interior',
  days = 4,
  hours = 3,
  minutes = 23,
  seconds = 40,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const timeBlocks = [
    { label: 'DAYS', value: String(days).padStart(2, '0') },
    { label: 'HOURS', value: String(hours).padStart(2, '0') },
    { label: 'MINS', value: String(minutes).padStart(2, '0') },
    { label: 'SEC', value: String(seconds).padStart(2, '0') },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f8f7f5] p-4 border border-neutral-100">
      {/* Left Promo Code */}
      <div className="flex flex-col items-start gap-1.5">
        <span className="text-xs font-medium text-neutral-800">{discountText}</span>
        <div className="flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1">
          <span className="text-xs font-normal text-neutral-800">{promoCode}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-black transition-colors border-l border-neutral-200 pl-1.5"
          >
            {copied ? (
              <HugeiconsIcon icon={CheckCircle} className="h-3 w-3 text-green-600" />
            ) : (
              <HugeiconsIcon icon={Copy} className="h-3 w-3" />
            )}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Right Countdown Boxes */}
      <div className="flex items-center gap-2">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="flex h-12 w-11 flex-col items-center justify-center  bg-white border border-neutral-100"
          >
            <span className="text-sm font-semibold text-neutral-900 leading-none">
              {block.value}
            </span>
            <span className="text-[9px] text-neutral-400 mt-1 uppercase">{block.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

'use client';

import React from 'react';

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12" />
  </svg>
);

const TruckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
    <path d="M19 18V10M19 10L15 4H3v11h2M19 10h3l1 4v4h-2" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z" />
  </svg>
);

export const ProductGuarantees: React.FC = () => {
  const guarantees = [
    { icon: <RefreshIcon />, title: '60-Day Money Return' },
    { icon: <TruckIcon />, title: 'Free delivery in US' },
    { icon: <ShieldIcon />, title: '2-Year Limited Warranty' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 border-t border-b border-neutral-200/80 py-5 my-2">
      {guarantees.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center text-center gap-2 px-1">
          <span className="h-4 w-4 text-neutral-700">{item.icon}</span>
          <span className="text-[11px] text-neutral-600 font-light leading-tight">
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductGuarantees;

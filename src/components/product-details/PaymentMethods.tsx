import React from 'react';

export const PaymentMethods: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-1.5 pt-1">
      <span className="px-2 py-0.5 bg-[#1a1f71] text-white text-[9px] font-bold rounded italic tracking-wider">
        VISA
      </span>
      <span className="px-2 py-0.5 bg-black text-white text-[9px] font-bold rounded">
        mastercard
      </span>
      <span className="px-2 py-0.5 bg-[#006fcf] text-white text-[9px] font-bold rounded">AMEX</span>
      <span className="px-2 py-0.5 bg-white text-[#003087] text-[9px] font-bold rounded border border-neutral-200">
        PayPal
      </span>
      <span className="px-2 py-0.5 bg-white text-[#0079c1] text-[9px] font-bold rounded border border-neutral-200">
        Diners
      </span>
      <span className="px-2 py-0.5 bg-[#ff6000] text-white text-[9px] font-bold rounded">
        DISCOVER
      </span>
    </div>
  );
};

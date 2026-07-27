'use client';

import React from 'react';

interface StockStatusProps {
  stock: number;
}

export const StockStatus: React.FC<StockStatusProps> = ({ stock }) => {
  if (stock <= 0) {
    return <p className="text-xs text-red-600 font-medium">Currently Out of Stock</p>;
  }

  return (
    <p className="text-xs text-[#b8860b] font-medium">Hurry up! Only {stock} items left in stock</p>
  );
};

'use client';

import { SearchProductResult } from '@/actions/products/searchProductsAction';
import { SearchProductItem } from './search-product-item';

interface SearchProductListProps {
  products: SearchProductResult[];
  isSearching: boolean;
  query: string;
  onSelectProduct: () => void;
}

export function SearchProductList({
  products,
  isSearching,
  query,
  onSelectProduct,
}: SearchProductListProps) {
  const trimmed = query.trim();

  return (
    <div className="md:col-span-7">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-5">
        {trimmed ? `Products (${products.length})` : 'Type a product name, brand, or material'}
      </h3>

      {isSearching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-20 bg-neutral-100 rounded-sm animate-pulse" />
          <div className="h-20 bg-neutral-100 rounded-sm animate-pulse" />
        </div>
      ) : trimmed && products.length === 0 ? (
        <div className="py-8 text-center sm:text-left">
          <p className="text-sm font-medium text-neutral-800">No products found</p>
          <p className="text-xs text-neutral-500 mt-1">
            We couldn&apos;t find anything matching &quot;{query}&quot;. Try checking for typos or
            searching for a broader term like &quot;table&quot; or &quot;sofa&quot;.
          </p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {products.map((product) => (
            <SearchProductItem key={product.id} product={product} onSelect={onSelectProduct} />
          ))}
        </div>
      ) : (
        <div className="py-6 text-xs text-neutral-500">
          Search over our catalog of chairs, sofas, tables, lamps, and home decor.
        </div>
      )}
    </div>
  );
}

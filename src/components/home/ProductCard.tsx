import Image from 'next/image';
import { Product } from './productsData';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col group cursor-pointer">
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full bg-[#f6f6f6] flex items-center justify-center p-8 overflow-hidden">
        {/* Badges Container */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
            {product.badges.map((badge, idx) => (
              <span
                key={idx}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full text-white ${
                  badge.variant === 'blue'
                    ? 'bg-[#2B54C6]'
                    : badge.variant === 'green'
                      ? 'bg-[#4B6B56]'
                      : 'bg-[#7A2A2A]'
                }`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Product Information */}
      <div className="pt-4 flex flex-col space-y-1">
        <span className="text-[11px] tracking-wider text-neutral-400 uppercase font-medium">
          {product.brand}
        </span>
        <h3 className="text-sm font-normal text-neutral-900 tracking-tight">{product.name}</h3>

        {/* Price & Discounts */}
        <div className="flex items-center gap-2 pt-0.5">
          {product.originalPrice ? (
            <>
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-sm font-normal text-[#7A2A2A]">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs bg-[#7A2A2A] text-white px-1.5 py-0.5 rounded text-[10px]">
                -
                {Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                )}
                %
              </span>
            </>
          ) : (
            <span className="text-sm font-normal text-neutral-900">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        {product.colorSwatches && (
          <div className="flex items-center gap-1.5 pt-2">
            {product.colorSwatches.map((color, idx) => (
              <span
                key={idx}
                className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductCard;

import Link from 'next/link';
import { ProductHeader } from './ProductHeader';
import { ProductVariantProvider } from './ProductVariantContext';
import { ProductGallery } from './ProductGallery';
import { ProductPurchasePanel } from './ProductPurchasePanel';
import { PaymentMethods } from './PaymentMethods';
import { ProductAccordions } from './ProductAccordions';
import { PromoCountdown } from './PromoCountdown';
import { ProductGuarantees } from './ProductGuarantees';
import { Container } from '../shared/Container';
import type { ProductWithDetails } from './types';

export const ProductDetailsView = ({ product }: { product: ProductWithDetails }) => {
  const category = product.productType?.subCategory?.category;

  return (
    <div className="w-full bg-white py-6">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs text-neutral-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-neutral-700">
            Home
          </Link>
          <span>/</span>
          <Link href={`/shop/${category?.slug ?? ''}`} className="hover:text-neutral-700">
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-neutral-700 font-medium">{product.name}</span>
        </nav>

        <ProductVariantProvider initialVariant={product.variants[0]}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Gallery (client island) */}
            <div className="lg:col-span-7">
              <ProductGallery name={product.name} />
            </div>

            {/* Details Column */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <ProductHeader
                brand={product.brand?.name ?? ''}
                name={product.name}
                price={product.price}
                salePrice={product.salePrice}
              />

              {/* Variant + Add to cart + stock (client island) */}
              <ProductPurchasePanel product={product} />

              <PaymentMethods />

              <PromoCountdown />

              <ProductGuarantees />

              <ProductAccordions
                description={product.description}
                material={product.material?.name ?? ''}
                width={product.width}
                height={product.height}
                depth={product.depth}
                weightKg={product.weightKg}
                assemblyRequired={product.assemblyRequired}
              />
            </div>
          </div>
        </ProductVariantProvider>
      </Container>
    </div>
  );
};

export default ProductDetailsView;

import { Container } from '../shared/Container';
import { getRelatedProductsAction } from '@/actions/products/getRelatedProductsAction';
import ProductSlider from '../shared/ProductSlider';

export const YouMayLikeIt = async ({
  currentId,
  categoryId,
  productTypeId,
}: {
  currentId: string;
  categoryId?: string | null;
  productTypeId?: string | null;
}) => {
  const products = await getRelatedProductsAction({
    id: currentId,
    categoryId,
    productTypeId,
  });

  if (!products || products.length === 0) return <div className="py-20"></div>;

  return (
    <Container className="py-12">
      <div className="flex flex-col gap-2 mb-6">
        <span className="text-xs tracking-widest text-neutral-500 uppercase font-medium">
          Curated Selection
        </span>
        <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 tracking-tight">
          You May Also Like
        </h2>
      </div>

      <div className="overflow-hidden">
        <ProductSlider products={products} />
      </div>
    </Container>
  );
};

export default YouMayLikeIt;

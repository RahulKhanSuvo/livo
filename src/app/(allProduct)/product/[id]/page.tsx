import { notFound } from 'next/navigation';
import ProductDetailsView from '@/components/product-details/ProductDetailsView';
import FeaturesBar from '@/components/home/FeaturesBar';
import ProductReviews from '@/components/product-details/ProductReviews';
import { getProductByIdAction } from '@/actions/products/getProductByIdAction';
import { YouMayLikeIt } from '@/components/product-details/MayLikeIt';

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;
  const result = await getProductByIdAction(id);

  if (!result.success || !result.data) notFound();

  const productData = result.data;

  return (
    <div>
      <ProductDetailsView product={productData} />
      <FeaturesBar />
      <ProductReviews productId={productData.id} />
      <YouMayLikeIt />
    </div>
  );
};

export default ProductDetailPage;

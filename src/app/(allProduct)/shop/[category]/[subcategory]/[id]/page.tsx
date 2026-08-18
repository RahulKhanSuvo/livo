import { notFound } from 'next/navigation';
import ProductDetailsView from '@/components/product-details/ProductDetailsView';
import FeaturesBar from '@/components/home/FeaturesBar';
import ProductReviews from '@/components/product-details/ProductReviews';
import GetInspiredBanner from '@/components/home/banner/GetInspiredBanner';
import InteriorEditSlider from '@/components/home/InteriorEditSlider';
import { getProductByIdAction } from '@/actions/products/getProductByIdAction';

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
      <GetInspiredBanner />
      <InteriorEditSlider />
    </div>
  );
};

export default ProductDetailPage;

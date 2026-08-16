import { notFound } from 'next/navigation';
import ProductDetailsView from '@/components/product-details/ProductDetailsView';
import FeaturesBar from '@/components/home/FeaturesBar';
import CustomerReviewsSection from '@/components/common/StarRating/CustomerReviewsSection';
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
      <CustomerReviewsSection />
      <GetInspiredBanner />
      <InteriorEditSlider />
    </div>
  );
};

export default ProductDetailPage;

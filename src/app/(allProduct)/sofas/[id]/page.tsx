import { notFound } from 'next/navigation';
import { productsData } from '@/components/home/productsData';
import ProductDetailsView from '@/components/product-details/ProductDetailsView';
import FeaturesBar from '@/components/home/FeaturesBar';
import CustomerReviewsSection from '@/components/common/StarRating/CustomerReviewsSection';

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;
  const productData = productsData.find((predicate) => predicate.id === id);

  if (!productData) notFound();

  return (
    <div>
      <ProductDetailsView product={productData} />
      <FeaturesBar />
      <CustomerReviewsSection />
    </div>
  );
};

export default ProductDetailPage;

import { notFound } from 'next/navigation';
import { productsData } from '@/components/home/productsData';
import ProductDetailsView from '@/components/product-details/ProductDetailsView';

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;
  const productData = productsData.find((predicate) => predicate.id === id);

  if (!productData) notFound();

  return <ProductDetailsView product={productData} />;
};

export default ProductDetailPage;

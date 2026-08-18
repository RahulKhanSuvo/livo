import { getProductSliderItemsAction } from '@/actions/content/product-slider/getProductSliderItemsAction';
import ProductSliderClient from './ProductSliderClient';

export default async function ProductSlider() {
  const items = await getProductSliderItemsAction();
  return <ProductSliderClient items={items} />;
}

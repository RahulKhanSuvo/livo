import ProductCard from '../home/ProductCard';
import { productsData } from '../home/productsData';

const ProductList = () => {
  return (
    <div className="grid grid-cols-3 flex-1 gap-3 ">
      {productsData.map((item) => (
        <ProductCard basePath="living-room/chair" key={item.id} product={item} />
      ))}
    </div>
  );
};
export default ProductList;

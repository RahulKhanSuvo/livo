'use client';
import ProductCard from '../home/ProductCard';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAllFurniture } from '@/actions/furniture/getAllFurniture';
import { GetAllFurnitureResponse } from '@/actions/furniture/furniture.type';
const ProductList = () => {
  const { data, isLoading } = useSuspenseQuery<GetAllFurnitureResponse>({
    queryKey: ['product'],
    queryFn: () => getAllFurniture(),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 6, // 6 hours
  });
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-3 flex-1 gap-3 ">
      {data?.products.map((item) => (
        <ProductCard basePath="living-room/chair" key={item.id} product={item} />
      ))}
    </div>
  );
};
export default ProductList;

export interface ProductSliderProduct {
  id: string;
  name: string;
  price: number;
  brand: string | null;
  image: string | null;
  href: string;
}

export interface PublicProductSliderItem {
  id: string;
  mediaUrl: string;
  product: ProductSliderProduct;
}

export interface AdminProductSliderItem {
  id: string;
  productId: string;
  mediaUrl: string;
  order: number;
  isActive: boolean;
  product: ProductSliderProduct | null;
}

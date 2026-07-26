export interface ProductInfo {
  brand: string;
  title: string;
  price: string;
  imageUrl: string;
  href: string;
}

export interface SliderItem {
  id: string;
  mediaUrl: string;
  productCard: ProductInfo;
}

export const sliderData: SliderItem[] = [
  {
    id: '1',
    mediaUrl:
      'https://res.cloudinary.com/dqloniyj3/video/upload/v1785071376/86cc529c70294d03879259d063f0a418.HD-1080p-2.5Mbps-83494525_iwym3f.mp4',
    productCard: {
      brand: 'SITS',
      title: 'Mello Lounge Sofa',
      price: '$1,290.00',
      imageUrl: '/images/products/mello-sofa.jpg',
      href: '/products/mello-lounge-sofa',
    },
  },
  {
    id: '2',
    mediaUrl:
      'https://res.cloudinary.com/dqloniyj3/video/upload/v1785071376/86cc529c70294d03879259d063f0a418.HD-1080p-2.5Mbps-83494525_iwym3f.mp4',
    productCard: {
      brand: 'TOGO',
      title: 'Togo Fireside Chair',
      price: '$980.00',
      imageUrl: '/images/products/togo-chair.jpg',
      href: '/products/togo-fireside-chair',
    },
  },
  {
    id: '3',
    mediaUrl:
      'https://res.cloudinary.com/dqloniyj3/video/upload/v1785071376/86cc529c70294d03879259d063f0a418.HD-1080p-2.5Mbps-83494525_iwym3f.mp4',
    productCard: {
      brand: 'SITS',
      title: 'Colin - 3 Seater Sofa',
      price: '$1,500.00',
      imageUrl: '/images/products/colin-sofa.jpg',
      href: '/products/colin-3-seater-sofa',
    },
  },
  {
    id: '4',
    mediaUrl:
      'https://res.cloudinary.com/dqloniyj3/video/upload/v1785071376/86cc529c70294d03879259d063f0a418.HD-1080p-2.5Mbps-83494525_iwym3f.mp4',
    productCard: {
      brand: 'HAY',
      title: 'Quilted Sectional Module',
      price: '$1,850.00',
      imageUrl: '/images/products/quilted-sofa.jpg',
      href: '/products/quilted-sectional-module',
    },
  },
  {
    id: '5',
    mediaUrl:
      'https://res.cloudinary.com/dqloniyj3/video/upload/v1785071376/86cc529c70294d03879259d063f0a418.HD-1080p-2.5Mbps-83494525_iwym3f.mp4',
    productCard: {
      brand: 'FERM LIVING',
      title: 'Rico Curved Sofa',
      price: '$2,100.00',
      imageUrl: '/images/products/rico-sofa.jpg',
      href: '/products/rico-curved-sofa',
    },
  },
  {
    id: '6',
    mediaUrl:
      'https://res.cloudinary.com/dqloniyj3/video/upload/v1785071376/86cc529c70294d03879259d063f0a418.HD-1080p-2.5Mbps-83494525_iwym3f.mp4',
    productCard: {
      brand: 'MENU',
      title: 'Offset 3-Seater Sofa',
      price: '$1,650.00',
      imageUrl: '/images/products/offset-sofa.jpg',
      href: '/products/offset-3-seater-sofa',
    },
  },
];

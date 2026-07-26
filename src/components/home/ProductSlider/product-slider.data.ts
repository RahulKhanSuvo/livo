import productImage from '@/assets/images/sofapink.avif';
export interface ProductInfo {
  brand: string;
  title: string;
  price: string;
  imageUrl: typeof productImage;
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
      imageUrl: productImage,
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
      imageUrl: productImage,
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
      imageUrl: productImage,
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
      imageUrl: productImage,
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
      imageUrl: productImage,
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
      imageUrl: productImage,
      href: '/products/offset-3-seater-sofa',
    },
  },
  {
    id: '7',
    mediaUrl:
      'https://res.cloudinary.com/dqloniyj3/video/upload/v1785071376/86cc529c70294d03879259d063f0a418.HD-1080p-2.5Mbps-83494525_iwym3f.mp4',
    productCard: {
      brand: 'MUUTO',
      title: 'Oslo Lounge Chair',
      price: '$1,120.00',
      imageUrl: productImage,
      href: '/products/oslo-lounge-chair',
    },
  },
  {
    id: '8',
    mediaUrl:
      'https://res.cloudinary.com/dqloniyj3/video/upload/v1785071376/86cc529c70294d03879259d063f0a418.HD-1080p-2.5Mbps-83494525_iwym3f.mp4',
    productCard: {
      brand: 'GUBI',
      title: 'Beetle Dining Chair',
      price: '$890.00',
      imageUrl: productImage,
      href: '/products/beetle-dining-chair',
    },
  },
  {
    id: '9',
    mediaUrl:
      'https://res.cloudinary.com/dqloniyj3/video/upload/v1785071376/86cc529c70294d03879259d063f0a418.HD-1080p-2.5Mbps-83494525_iwym3f.mp4',
    productCard: {
      brand: 'HAY',
      title: 'About A Lounge Chair',
      price: '$1,450.00',
      imageUrl: productImage,
      href: '/products/about-a-lounge-chair',
    },
  },
  {
    id: '10',
    mediaUrl:
      'https://res.cloudinary.com/dqloniyj3/video/upload/v1785071376/86cc529c70294d03879259d063f0a418.HD-1080p-2.5Mbps-83494525_iwym3f.mp4',
    productCard: {
      brand: 'VITRA',
      title: 'Eames Plastic Armchair',
      price: '$760.00',
      imageUrl: productImage,
      href: '/products/eames-plastic-armchair',
    },
  },
];

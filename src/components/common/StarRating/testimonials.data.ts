import { StaticImageData } from 'next/image';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  verified: boolean;
  rating: number; // 1-5
  productThumbnail?: string | StaticImageData;
}

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    quote:
      '“We bought a full living room set and couldn’t be happier with the quality. Everything looks exactly like the photos - if not better!”',
    author: 'Michael P.',
    verified: true,
    rating: 5,
    productThumbnail: '/images/products/sofa-thumb-1.jpg',
  },
  {
    id: '2',
    quote:
      '“I’m very happy with my new chair! The quality is excellent, it’s very comfortable, and it looks great in my office. The delivery was fast and everything arrived perfectly. Highly recommended!”',
    author: 'Sarah F.',
    verified: true,
    rating: 5,
    productThumbnail: '/images/products/chair-thumb-1.jpg',
  },
  {
    id: '3',
    quote:
      '“The sofa we ordered exceeded all expectations – not only does it look stunning, but it’s incredibly comfortable. The customer service was excellent, and delivery was fast and smooth.”',
    author: 'Anna K.',
    verified: true,
    rating: 5,
    productThumbnail: '/images/products/sofa-thumb-2.jpg',
  },
  {
    id: '4',
    quote:
      '“Great value for money. The item feels solid, was well-packaged, and easy to assemble. I will definitely be coming back for more.”',
    author: 'Karolina W.',
    verified: true,
    rating: 5,
    productThumbnail: '/images/products/shelf-thumb-1.jpg',
  },
];

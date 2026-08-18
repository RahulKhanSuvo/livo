export interface TestimonialItem {
  id: string;
  title: string;
  review: string;
  author: string;
  productImage: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: '1',
    title: 'True Timeless Luxury',
    review:
      "It's a rare find where the premium price is fully justified by the world-class finish.",
    author: 'Daniel, verified customer',
    productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80',
  },
  {
    id: '2',
    title: 'Iconic Variety',
    review:
      'From bold statement pieces to timeless classics, the choice of high-end furniture is unparalleled.',
    author: 'Alexa, verified customer',
    productImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=80',
  },
  {
    id: '3',
    title: 'Flawless Service',
    review: 'Premium support and seamless delivery. Perfection from start to finish.',
    author: 'Adam, verified customer',
    productImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=200&q=80',
  },
  {
    id: '4',
    title: 'Outstanding Support',
    review: "It's refreshing to buy from a company that treats customers like real people.",
    author: 'Sophie, verified customer',
    productImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&q=80',
  },
  {
    id: '5',
    title: 'Beautiful Craftsmanship',
    review: 'Every detail feels considered. A piece that elevates the entire room.',
    author: 'Mia, verified customer',
    productImage: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=200&q=80',
  },
  {
    id: '6',
    title: 'Worth Every Penny',
    review: 'Quality that lasts. We keep coming back for more.',
    author: 'Noah, verified customer',
    productImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&q=80',
  },
];

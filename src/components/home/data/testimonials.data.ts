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
    productImage: '/images/reviews/armchair-green.png',
  },
  {
    id: '2',
    title: 'Iconic Variety',
    review:
      'From bold statement pieces to timeless classics, the choice of high-end furniture is unparalleled.',
    author: 'Alexa, verified customer',
    productImage: '/images/reviews/togo-sofa.png',
  },
  {
    id: '3',
    title: 'Flawless Service',
    review: 'Premium support and seamless delivery. Perfection from start to finish.',
    author: 'Adam, verified customer',
    productImage: '/images/reviews/lounge-chair.png',
  },
  {
    id: '4',
    title: 'Outstanding Support',
    review: "It's refreshing to buy from a company that treats customers like real people.",
    author: 'Sophie, verified customer',
    productImage: '/images/reviews/lamp.png',
  },
];

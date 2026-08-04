export interface Review {
  id: string;
  author: string;
  product: string;
  rating: number;
  title: string;
  date: string;
  status: 'Published' | 'Pending' | 'Hidden';
}

export const reviews: Review[] = [
  { id: 'R-101', author: 'Michael P.', product: 'Mello Lounge Sofa', rating: 5, title: 'Better than the photos', date: 'Aug 3, 2026', status: 'Published' },
  { id: 'R-102', author: 'Sarah F.', product: 'Togo Fireside Chair', rating: 5, title: 'Extremely comfortable', date: 'Aug 2, 2026', status: 'Published' },
  { id: 'R-103', author: 'Anna K.', product: 'Rico Curved Sofa', rating: 5, title: 'Exceeded expectations', date: 'Aug 1, 2026', status: 'Published' },
  { id: 'R-104', author: 'Karolina W.', product: 'Bit Table', rating: 4, title: 'Great value', date: 'Jul 30, 2026', status: 'Pending' },
  { id: 'R-105', author: 'Jonas R.', product: 'Oslo Lounge Chair', rating: 5, title: 'Beautiful craftsmanship', date: 'Jul 28, 2026', status: 'Pending' },
  { id: 'R-106', author: 'Diego F.', product: 'Eames Plastic Armchair', rating: 3, title: 'Good but slower delivery', date: 'Jul 25, 2026', status: 'Hidden' },
];
export type CardPosition = 'top' | 'bottom' | 'left' | 'right';

export interface RoomHotspotProduct {
  id: string;
  name: string;
  price: number;
  brand: string | null;
  image: string | null;
  href: string;
}

export interface PublicRoomHotspot {
  id: string;
  x: number;
  y: number;
  cardPosition: CardPosition | null;
  product: RoomHotspotProduct;
}

export interface AdminRoomHotspot {
  id: string;
  x: number;
  y: number;
  cardPosition: CardPosition | null;
  productId: string | null;
  isActive: boolean;
  product: RoomHotspotProduct | null;
}

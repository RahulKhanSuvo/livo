import { create } from 'zustand';

export type CartItem = {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
};

type CartStore = {
  items: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (productId: string, variantId?: string) => void;

  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (cartItem) => cartItem.productId === item.productId && cartItem.variantId === item.variantId
      );

      if (existingItem) {
        return {
          items: state.items.map((cartItem) =>
            cartItem.productId === item.productId && cartItem.variantId === item.variantId
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + item.quantity,
                }
              : cartItem
          ),
        };
      }

      return {
        items: [...state.items, item],
      };
    }),

  removeItem: (productId, variantId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      ),
    })),

  updateQuantity: (productId, variantId, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.productId === productId && item.variantId === variantId
            ? {
                ...item,
                quantity,
              }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),
}));

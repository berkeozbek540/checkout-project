import { create } from "zustand";
import type { Product } from "../types/Product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  checkoutCompleted: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  markCheckoutCompleted: () => void;
  resetCheckout: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);

      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ),
    })),
  checkoutCompleted: false,

  markCheckoutCompleted: () => set({ checkoutCompleted: true }),

  resetCheckout: () => set({ checkoutCompleted: false }),

  clearCart: () => set({ cart: [] }),
}));

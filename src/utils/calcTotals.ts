import type { CartItem } from "../store/cartStore";

export function calcTotals(cart: CartItem[]) {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 300 ? 0 : 44.99;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
}

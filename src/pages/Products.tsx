import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCartStore } from "../store/cartStore";

export default function Products() {
  const cart = useCartStore((state) => state.cart);
  console.log(cart);
  return (
    <div className="grid grid-cols-4 gap-4 justify-items-center">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

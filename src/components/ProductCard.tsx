import type { Product } from "../types/Product";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 500);
  };

  return (
    <div className="max-w-2xs rounded-xl shadow-2xl p-4">
      <img className="w-full rounded-lg" src={product.image} alt={product.title} />
      <div className="my-4">
        <div className="font-semibold text-xl text-gray-900">{product.title} </div>
        <p className="text-gray-600 text-sm ">{product.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <p className="font-bold text-xl col-span-1 text-gray-800">{product.price} TL</p>
        <button
          type="button"
          onClick={() => handleAddToCart()}
          disabled={isAdded}
          className={`col-span-2 rounded-4xl cursor-pointer px-4 py-2 text-white font-bold transition-all duration-300 ease-in-out ${
            isAdded ? "bg-green-500 scale-110" : "bg-blue-500 hover:bg-blue-700 active:scale-95"
          }`}>
          {isAdded ? "Eklendi!" : "Sepete Ekle"}
        </button>
      </div>
    </div>
  );
}

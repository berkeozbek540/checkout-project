import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Success() {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const clearCart = useCartStore((state) => state.clearCart);
  const checkoutCompleted = useCartStore((state) => state.checkoutCompleted);
  const resetCheckout = useCartStore((state) => state.resetCheckout);

  useEffect(() => {
    if (!checkoutCompleted) {
      navigate("/");
      return;
    }

    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setOrderId(id);

    clearCart();

    resetCheckout();
  }, []);
  return (
    <div className="container mx-auto max-w-xl p-8 text-center">
      <CircleCheck size={150} className="text-green-600 mx-auto" />
      <h1 className="text-3xl font-bold text-green-600 mb-4">Siparişiniz Alındı!</h1>

      <p className="text-gray-700 mb-8">
        Sipariş numaranız: <span className="font-semibold">#{orderId}. </span>
        E-posta ile bilgilendirme yapılacaktır.
      </p>

      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}

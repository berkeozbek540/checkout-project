import { useCartStore } from "../store/cartStore";
import { Minus, Plus, X } from "lucide-react";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  if (cart.length === 0) return <div>Sepet boş.</div>;

  const subTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const shippingAmount = subTotal > 300 ? 0 : 44.99;
  const totalPrice = subTotal + shippingAmount;

  const formatPrice = (value: number) =>
    value.toLocaleString("tr-TR", { minimumFractionDigits: 2 });

  return (
    <div className="container mx-auto p-4">
      <div>
        <p className="font-semibold text-2xl mb-4">Sepetim</p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="grid grid-cols-12 border-gray-400 border-b font-bold pb-2">
            <div className="col-span-6">Ürün</div>
            <div className="col-span-2 text-center">Fiyat</div>
            <div className="col-span-2 text-center">Adet</div>
            <div className="col-span-2 text-center">Toplam</div>
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center py-4 border-b border-gray-300">
              <div className="col-span-6 flex items-center">
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg "
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{item.title}</p>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <p className="font-semibold text-gray-600">{item.price} TL</p>
              </div>

              <div className="col-span-2 flex justify-center">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                    className={"px-2 py-1 cursor-pointer disabled:cursor-not-allowed"}>
                    <Minus
                      size={20}
                      className={item.quantity <= 1 ? "text-gray-300" : "text-orange-600"}
                    />
                  </button>
                  <p className="px-2">{item.quantity} </p>
                  <button onClick={() => addToCart(item)} className="px-2 py-1 cursor-pointer">
                    <Plus size={20} className="text-orange-600" />
                  </button>
                </div>
              </div>
              <div className="col-span-2 flex gap-4 justify-center">
                <p className="font-semibold text-gray-600">{item.price * item.quantity} TL</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-700 transition-colors cursor-pointer">
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1 border border-gray-300 p-4 rounded-lg max-h-fit">
          <div>
            <p className="font-semibold text-xl">Sipariş Özeti</p>
            <div className="flex justify-between py-4 ">
              <p className="text-gray-500">Ara Toplam </p>
              <p className="font-semibold text-lg">{formatPrice(subTotal)} TL</p>
            </div>
            <div className="flex justify-between pb-4 border-b border-gray-300">
              <p className="text-gray-500">Kargo Ücreti</p>
              <p className="font-semibold text-lg">{shippingAmount} TL</p>
            </div>
            <div className="flex justify-between py-4">
              <p>Toplam</p>
              <p className="font-bold text-xl">{totalPrice} TL</p>
            </div>
            <div>
              <button className="bg-black text-white p-3 mt-2 w-full rounded-md cursor-pointer hover:bg-gray-700">
                Sepeti Onayla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

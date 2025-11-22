import { useState, type ChangeEvent } from "react";
import { useMask } from "@react-input/mask";
import { useCartStore } from "../store/cartStore";
import OrderSummary from "../components/OrderSummary";
import { calcTotals } from "../utils/calcTotals";

interface CheckoutFormState {
  name: string;
  surname: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  address: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export default function Checkout() {
  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormState>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    address: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCheckoutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cart = useCartStore((state) => state.cart);
  const { subtotal, shipping, total } = calcTotals(cart);

  const phoneInputRef = useMask({
    mask: "0 (___) ___-____",
    replacement: { _: /\d/ },
  });

  const cardNumberInputRef = useMask({
    mask: "____-____-____-____",
    replacement: { _: /\d/ },
  });

  const inputStyle =
    "border border-gray-300 rounded-md shadow-sm px-3 py-2 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150";
  const labelStyle = "text-sm font-semibold mb-1 text-gray-700";

  return (
    <div className="container mx-auto max-w-4xl p-8">
      <div>
        <p className="text-xl font-bold mb-6">Teslimat Adresi</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-x-10 gap-y-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-4 gap-x-6 gap-y-5">
            <div className="col-span-4 sm:col-span-2 flex flex-col">
              <label htmlFor="name" className={labelStyle}>
                Ad
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={checkoutForm.name}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Adınızı giriniz"
                required
              />
            </div>
            <div className="col-span-4 sm:col-span-2 flex flex-col">
              <label htmlFor="surname" className={labelStyle}>
                Soyad
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={checkoutForm.surname}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Soyadınızı giriniz"
                required
              />
            </div>
            <div className="col-span-4 sm:col-span-2 flex flex-col">
              <label htmlFor="phone" className={labelStyle}>
                Telefon
              </label>
              <input
                ref={phoneInputRef}
                type="text"
                id="phone"
                name="phone"
                value={checkoutForm.phone}
                onChange={handleChange}
                className={inputStyle}
                placeholder="(___) ___-____"
                required
              />
            </div>
            <div className="col-span-4 sm:col-span-2 flex flex-col">
              <label htmlFor="email" className={labelStyle}>
                E-Posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={checkoutForm.email}
                onChange={handleChange}
                className={inputStyle}
                placeholder="E-Postanızı giriniz"
                required
              />
            </div>
            <div className="col-span-4 sm:col-span-2 flex flex-col">
              <label htmlFor="province" className={labelStyle}>
                İl
              </label>
              <input
                type="text"
                id="province"
                name="province"
                value={checkoutForm.province}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
            <div className="col-span-4 sm:col-span-2 flex flex-col">
              <label htmlFor="district" className={labelStyle}>
                İlçe
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={checkoutForm.district}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
            <div className="col-span-4 flex flex-col">
              <label htmlFor="address" className={labelStyle}>
                Adres
              </label>
              <textarea
                id="address"
                name="address"
                value={checkoutForm.address}
                onChange={handleChange}
                className={`${inputStyle} h-24 resize-none`}
                required
              />
            </div>
          </div>
        </div>

        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          buttonLabel="Sipariş Ver"
        />
      </div>

      <div>
        <p className="text-xl font-bold mt-12 mb-6">Ödeme Bilgileri</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-x-10 gap-y-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-3 gap-x-6 gap-y-5">
            <div className="col-span-3 sm:col-span-2 flex flex-col">
              <label htmlFor="cardNumber" className={labelStyle}>
                Kart Numarası
              </label>
              <input
                ref={cardNumberInputRef}
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={checkoutForm.cardNumber}
                onChange={handleChange}
                className={inputStyle}
                required
                placeholder="____-____-____-____"
              />
            </div>
            <div className="col-span-2 sm:col-span-2 flex flex-col">
              <label htmlFor="expiryDate" className={labelStyle}>
                Son Kullanma Tarihi
              </label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  id="expiryMonth"
                  name="expiryMonth"
                  value={checkoutForm.expiryMonth}
                  onChange={handleChange}
                  className={inputStyle}>
                  <option value="" disabled>
                    Ay
                  </option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  id="expiryYear"
                  name="expiryYear"
                  value={checkoutForm.expiryYear}
                  onChange={handleChange}
                  className={inputStyle}>
                  <option value="" disabled>
                    Yıl
                  </option>
                  {[...Array(12)].map((_, i) => (
                    <option key={2025 + i} value={2025 + i}>
                      {2025 + i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-1 flex flex-col">
              <label htmlFor="cvv" className={labelStyle}>
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={checkoutForm.cvv}
                onChange={handleChange}
                className={inputStyle}
                maxLength={3}
                required
                placeholder="***"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

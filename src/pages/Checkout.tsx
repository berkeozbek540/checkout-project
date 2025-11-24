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
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!checkoutForm.name.trim()) newErrors.name = "Ad boş bırakılamaz";
    if (!checkoutForm.surname.trim()) newErrors.surname = "Soyad boş bırakılamaz";

    if (!checkoutForm.phone.trim() || checkoutForm.phone.length < 16)
      newErrors.phone = "Telefon numarası geçersiz.";

    if (!checkoutForm.email.trim() || !checkoutForm.email.includes("@"))
      newErrors.email = "Geçerli bir e-posta adresi giriniz.";

    if (!checkoutForm.province.trim()) newErrors.province = "İl boş olamaz";
    if (!checkoutForm.district.trim()) newErrors.district = "İlçe boş olamaz";
    if (!checkoutForm.address.trim()) newErrors.address = "Adres boş olamaz";

    if (checkoutForm.cardNumber.replace(/-/g, "").length !== 16)
      newErrors.cardNumber = "Kart numarası geçersiz.";

    if (!checkoutForm.expiryMonth) newErrors.expiryMonth = "Ay seçiniz";
    if (!checkoutForm.expiryYear) newErrors.expiryYear = "Yıl seçiniz";

    if (!checkoutForm.cvv || checkoutForm.cvv.length !== 3)
      newErrors.cvv = "CVV 3 haneli olmalıdır.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // shake animasyonu tetikletmek için
      const form = document.getElementById("checkout-form");
      form?.classList.add("shake");

      setTimeout(() => form?.classList.remove("shake"), 500);
      return;
    }

    // VALID → success page
    window.location.href = "/success";
  };

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
      <form onSubmit={handleSubmit}>
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
                  className={`${inputStyle} ${errors.name ? "border-red-500" : ""}`}
                  placeholder="Adınızı giriniz"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
                  className={`${inputStyle} ${errors.surname ? "border-red-500" : ""}`}
                  placeholder="Soyadınızı giriniz"
                />
                {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
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
                  className={`${inputStyle} ${errors.phone ? "border-red-500" : ""}`}
                  placeholder="(___) ___-____"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
                  className={`${inputStyle} ${errors.email ? "border-red-500" : ""}`}
                  placeholder="E-Postanızı giriniz"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                  className={`${inputStyle} ${errors.province ? "border-red-500" : ""}`}
                />
                {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
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
                  className={`${inputStyle} ${errors.district ? "border-red-500" : ""}`}
                />
                {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
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
                  className={`${inputStyle} ${errors.address ? "border-red-500" : ""}`}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
                  className={`${inputStyle} ${errors.cardNumber ? "border-red-500" : ""}`}
                  placeholder="____-____-____-____"
                />
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
              </div>
              <div className="col-span-2 sm:col-span-2 flex flex-col">
                <label htmlFor="expiryDate" className={labelStyle}>
                  Son Kullanma Tarihi
                </label>
                <div className="flex gap-4">
                  <div>
                    <select
                      id="expiryMonth"
                      name="expiryMonth"
                      value={checkoutForm.expiryMonth}
                      onChange={handleChange}
                      className={`${inputStyle} ${errors.expiryMonth ? "border-red-500" : ""}`}>
                      <option value="" disabled>
                        Ay
                      </option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    {errors.expiryMonth && (
                      <p className="text-red-500 text-sm">{errors.expiryMonth}</p>
                    )}
                  </div>
                  <div>
                    <select
                      id="expiryYear"
                      name="expiryYear"
                      value={checkoutForm.expiryYear}
                      onChange={handleChange}
                      className={`${inputStyle} ${errors.expiryYear ? "border-red-500" : ""}`}>
                      <option value="" disabled>
                        Yıl
                      </option>
                      {[...Array(12)].map((_, i) => (
                        <option key={2025 + i} value={2025 + i}>
                          {2025 + i}
                        </option>
                      ))}
                    </select>
                    {errors.expiryYear && (
                      <p className="text-red-500 text-sm">{errors.expiryYear}</p>
                    )}
                  </div>
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
                  className={`${inputStyle} ${errors.cvv ? "border-red-500" : ""}`}
                  maxLength={3}
                  placeholder="***"
                />
                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

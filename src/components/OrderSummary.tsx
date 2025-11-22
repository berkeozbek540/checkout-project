interface Props {
  subtotal: number;
  shipping: number;
  total: number;
  buttonLabel: string;
}

const OrderSummary = ({ subtotal, shipping, total, buttonLabel }: Props) => {
  return (
    <div className="lg:col-span-2 border border-gray-200 p-5 rounded-xl shadow-lg bg-gray-50 max-h-fit">
      <p className="font-bold text-xl mb-4">Sipariş Özeti</p>
      <div className="flex justify-between py-2">
        <p className="text-gray-600">Ara Toplam </p>
        <p className="font-medium text-lg">{subtotal} TL</p>
      </div>
      <div className="flex justify-between pb-4 border-b border-gray-200">
        <p className="text-gray-600">Kargo Ücreti</p>
        <p className="font-medium text-lg">{shipping} TL</p>
      </div>
      <div className="flex justify-between pt-4">
        <p className="text-xl font-bold text-gray-800">Toplam</p>
        <p className="font-extrabold text-2xl text-green-600">{total} TL</p>
      </div>
      <button className="bg-blue-600 text-white p-3 mt-6 w-full rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200">
        {buttonLabel}
      </button>
    </div>
  );
};

export default OrderSummary;

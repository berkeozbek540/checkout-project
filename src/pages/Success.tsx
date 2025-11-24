import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function Success() {
  const [randomString, setRandomString] = useState<string>("");

  const generateRandomNumber = () => {
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    setRandomString(result);
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);
  return (
    <div className="container mx-auto max-w-xl p-8 text-center">
      <CircleCheck size={150} className="text-green-600 mx-auto" />
      <h1 className="text-3xl font-bold text-green-600 mb-4">Siparişiniz Alındı!</h1>

      <p className="text-gray-700 mb-8">
        Siparişiniz başarıyla oluşturuldu. Sipariş numaranız: #{randomString}. Size e-posta
        üzerinden bilgilendirme yapılacaktır.
      </p>

      <a
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
        Ana Sayfaya Dön
      </a>
    </div>
  );
}

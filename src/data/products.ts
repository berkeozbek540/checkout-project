import type { Product } from "../types/Product";
import tempImage from "../assets/product.jpg";

export const products: Product[] = [
  {
    id: 1,
    title: "Erkek Ayakkabı",
    price: 120,
    image: tempImage, // şimdilik static
    description: "Kaliteli ve rahat bir spor ayakkabı.",
  },
  {
    id: 2,
    title: "Kadın Çanta",
    price: 90,
    image: tempImage,
    description: "Günlük kullanım için ideal çanta.",
  },
  {
    id: 3,
    title: "Bluetooth Kulaklık",
    price: 150,
    image: tempImage,
    description: "Yüksek ses kalitesi ve uzun pil ömrü.",
  },
  {
    id: 4,
    title: "Cüzdan",
    price: 250,
    image: tempImage,
    description: "Deri Cüzdan.",
  },
];

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);

  const itemCount = cart.reduce((total, item) => {
    return (total = total + item.quantity);
  }, 0);
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 ">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          <img src={logo} className="max-h-20" />
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/products" className="hover:text-gray-300">
            Ürünler
          </Link>
          <Link to="/cart" className="hover:text-gray-300 flex gap-2">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                {itemCount}
              </span>
            </div>
            <div>Sepet</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

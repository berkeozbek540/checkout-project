import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Summary from "../pages/Summary";
import ProductDetail from "../pages/ProductDetail";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminProducts from "../pages/admin/AdminProducts";
import MainLayout from "../layouts/MainLayout";
import Products from "../pages/Products";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/checkout/summary",
        element: <Summary />,
      },
    ],
  },
  {
    path: "/admin",
    children: [
      { path: "", element: <AdminLogin /> },
      { path: "products", element: <AdminProducts /> },
    ],
  },
]);

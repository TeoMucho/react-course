import { Routes, Route } from "react-router-dom"; // wichtig: react-router-dom
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import "./App.css";
import { OrdersPage } from "./pages/OrdersPage";

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  );
}


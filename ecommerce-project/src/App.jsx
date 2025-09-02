import { Routes, Route } from "react-router-dom"; // wichtig: react-router-dom
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import "./App.css";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function App() {

   const [cart, setCart] = useState ([]);
   
  useEffect(() => {

  const controller = new AbortController();

    axios.get('/api/cart-items', { params: { expand: 'product' }, signal: controller.signal })
      .then((response) => {
        // passt sich an, falls die API { cartItems: [...] } liefert
        const data = Array.isArray(response.data) ? response.data : (response.data?.cartItems ?? []);
        setCart(data);
      })
      .catch((err) => {
        if (err.name !== 'CanceledError') {
          console.error('API error:', err);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  );
}


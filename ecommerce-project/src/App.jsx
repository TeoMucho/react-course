import { Routes, Route } from "react-router-dom"; // wichtig: react-router-dom
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import "./App.css";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import axios from 'axios';

export default function App() {

   const [cart, setCart] = useState ([]);
   
  useEffect(() => {

  const controller = new AbortController();

   let mounted = true;

  const fetchCart = async () => {
    try {
      const res = await axios.get('/api/cart-items', {
        params: { expand: 'product' },
        signal: controller.signal,
      });

      if (!mounted) return;

      const data = Array.isArray(res.data)
        ? res.data
        : (res.data?.cartItems ?? []);

      setCart(data);
    } catch (err) {
      if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;
      console.error('API error:', err);
    }
  };

  fetchCart();

  return () => {
    mounted = false;
    controller.abort();
  };
  }, []);

  return (
    <>
    <Header cart={cart}/>
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
    </>
  );
}


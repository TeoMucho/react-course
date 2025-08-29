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

  axios.get('http://127.0.0.1:3000/api/cart-items')
      .then ((response) => {
        setCart(response.data);
  }, []);



  })

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  );
}


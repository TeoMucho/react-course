import axios from 'axios';
import { useEffect, useState } from 'react';
import './CheckoutPage.css';
import { CheckoutHeader } from "../../components/CheckoutHeader";
import { Helmet } from "react-helmet-async";
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);

    const [paymentSummary, setPaymentSummary] = useState(null);

    // FIX: lokale Auswahl je Produkt verwalten
    const [selectedDeliveryByProduct, setSelectedDeliveryByProduct] = useState({});

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime').then((response) => {
            setDeliveryOptions(response.data);
        })
        axios.get('/api/payment-summary').then((response) => {
            setPaymentSummary(response.data);
        })
    }, [])

    // FIX: initialen Stand aus cart übernehmen / synchron halten
    useEffect(() => {
        if (Array.isArray(cart)) {
            const map = {};
            cart.forEach((item) => {
                map[item.productId] = item.deliveryOptionId;
            });
            setSelectedDeliveryByProduct(map);
        }
    }, [cart]);

    // FIX: Handler für Auswahlwechsel
    const handleChangeDelivery = async (productId, deliveryOptionId) => {
        setSelectedDeliveryByProduct(prev => ({
            ...prev,
            [productId]: deliveryOptionId
        }));

        // Optional: Server informieren und Summary neu laden
        try {
            await axios.post('/api/cart/update-delivery-option', { productId, deliveryOptionId });
            const res = await axios.get('/api/payment-summary');
            setPaymentSummary(res.data);
        } catch (error) {
            // Fallback: nichts tun / ggf. Toast einbauen
        }
    };

    return (
        <>
            <Helmet>
                <title>Checkout</title>
                <link rel="icon" href="/cart-favicon.png?v=1" type="image/png" />
            </Helmet>

            <CheckoutHeader />


<div className="checkout-page">
    <div className="page-title">Review your order</div>

    <div className="checkout-grid">
  <OrderSummary 
    cart={cart}
    deliveryOptions={deliveryOptions}
    selectedDeliveryByProduct={selectedDeliveryByProduct}
    onSelectDelivery={handleChangeDelivery}
    loadCart={loadCart}                 // ⬅️ wichtig
  />
    
        
         
 <PaymentSummary paymentSummary={paymentSummary} />
 
    </div>
</div>
</>

)
}
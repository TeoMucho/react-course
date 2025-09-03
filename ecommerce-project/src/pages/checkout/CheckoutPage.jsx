import axios from 'axios';
import { useEffect, useState } from 'react';
import './CheckoutPage.css';
import { CheckoutHeader } from "../../components/CheckoutHeader";
import { Helmet } from "react-helmet-async";
import { formatMoney } from '../../utils/money';
import { OrderSummary } from './OrderSummary';

export function CheckoutPage({ cart }) {
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
        } catch (e) {
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
    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} selectedDeliveryByProduct={selectedDeliveryByProduct} handleChangeDelivery={handleChangeDelivery} />
    
        
         
  <div className="payment-summary">
    <div className="payment-summary-title">Payment Summary</div>
    {paymentSummary && (
<>
    <div className="payment-summary-row">
      <div>Items ({paymentSummary.totalItems}):</div>
      <div className="payment-summary-money">
        {formatMoney(paymentSummary.productCostCents)}
      </div>
    </div>

    <div className="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div className="payment-summary-money">
        {formatMoney(paymentSummary.shippingCostCents)}
      </div>
    </div>

    <div className="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div className="payment-summary-money">
        {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
      </div>
    </div>

    <div className="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div className="payment-summary-money">
        {formatMoney(paymentSummary.taxCents)}
      </div>
    </div>

    <div className="payment-summary-row total-row">
      <div>Order total:</div>
      <div className="payment-summary-money">
        {formatMoney(paymentSummary.totalCostCents)}
      </div>
    </div>

    <button className="place-order-button button-primary">Place your order</button>
     </>
  
            
)}
       
        </div>
    </div>
</div>
</>

)
}
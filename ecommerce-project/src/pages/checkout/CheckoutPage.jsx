import axios from 'axios';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import './CheckoutPage.css';
import { CheckoutHeader } from "../../components/CheckoutHeader";
import { Helmet } from "react-helmet-async";
import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs';

export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);

    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime').then((response) => {
            setDeliveryOptions(response.data);
        })
        axios.get('/api/payment-summary').then((response) => {
            setPaymentSummary(response.data);
        })
    }, [])

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
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
              const selectedDeliveryOption= deliveryOptions
                    .find((deliveryOption) => {
                        return deliveryOption.id === cartItem.deliveryOptionId;
                    })

                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMS).format('dddd, MMMM D')}
                        </div>

            <div className="cart-item-details-grid">
                <img className="product-image"
                    src={cartItem.product.image} />

                <div className="cart-item-details">
                    <div className="product-name">
                        {cartItem.product.name}
                    </div>
                    <div className="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                    </div>
                    <div className="product-quantity">
                        <span>
                            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                            Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                            Delete
                        </span>
                    </div>
                </div>

                <div className="delivery-options">
                    <div className="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    {deliveryOptions.map((deliveryOption, idx) => {
  // Preis-Label wie gehabt
  let priceString = 'Free Shipping';
  if (deliveryOption.priceCents > 0) {
    priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
  }

  // 🔧 Datum pro Option berechnen
  let ts = deliveryOption.estimatedDeliveryTimeMS;

  // Falls die API Sekunden liefert (10-stellig) -> in Millisekunden umrechnen
  if (typeof ts === 'number' && String(Math.abs(ts)).length === 10) {
    ts = ts * 1000;
  }

  // Falls alle Optionen den gleichen Timestamp haben:
  // - wenn deliveryDays existiert, nimm das
  // - sonst staggere per Index (idx)
  let date = dayjs(ts);
  if (typeof deliveryOption.deliveryDays === 'number') {
    date = dayjs().startOf('day').add(deliveryOption.deliveryDays, 'day');
  } else if (!ts || Number.isNaN(ts)) {
    date = dayjs().startOf('day').add(idx, 'day');
  }

  let dateLabel = date.format('dddd, MMMM D.');

  return (
    <div key={deliveryOption.id} className="delivery-option">
      <input
        type="radio"
        checked={deliveryOption.id === cartItem.deliveryOptionId}
        className="delivery-option-input"
        name={`delivery-option-${cartItem.productId}`}
        readOnly
      />
      <div>
        <div className="delivery-option-date">{dateLabel}</div>
        <div className="delivery-option-price">{priceString}</div>
      </div>
    </div>
  );
})}

                </div>
            </div>
        </div>
    );
})}

        </div>

    
        
         
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
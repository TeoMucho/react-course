import { Header } from "../components/Header";
import { Helmet } from "react-helmet-async";
import "./TrackingPage.css";

export function TrackingPage () {
  return (
<>
     <Helmet>
               <title>Tracking</title>
               <link rel="icon" href="/cart-favicon.png?v=1" type="image/png" />
             </Helmet>

<Header />

    <div className="tracking-page">
      <div className="order-tracking">
        <a className="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div className="delivery-date">
          Arriving on Monday, June 13
        </div>

        <div className="product-info">
          Black and Gray Athletic Cotton Socks - 6 Pairs
        </div>

        <div className="product-info">
          Quantity: 1
        </div>

        <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

        <div className="progress-labels-container">
          <div className="progress-label">
            Preparing
          </div>
          <div className="progress-label current-status">
            Shipped
          </div>
          <div className="progress-label">
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>

</>
  );
};
import React from "react";
import { Header } from "../components/Header";
import { Helmet } from "react-helmet-async";
import "./TrackingPage.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export function TrackingPage() {
  const { orderId } = useParams();
  const [order, setOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`/api/orders/${orderId}`, { signal: controller.signal })
      .then((res) => setOrder(res.data?.order ?? res.data ?? null))
      .catch((e) => {
        if (e.code !== "ERR_CANCELED") setError(e.message || "Load failed");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [orderId]);

  return (
    <>
      <Helmet>
        <title>Tracking</title>
        <link rel="icon" href="/cart-favicon.png?v=1" type="image/png" />
      </Helmet>

      <Header />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          {loading && <div>Loading…</div>}
          {error && <div className="error">Error: {error}</div>}

          {!loading && !error && (
            <>
              <div className="delivery-date">
                Arriving on {order?.arrivalDate || "—"}
              </div>

              <div className="product-info">
                {order?.products?.[0]?.title ||
                  "Black and Gray Athletic Cotton Socks - 6 Pairs"}
              </div>

              <div className="product-info">
                Quantity: {order?.products?.[0]?.quantity ?? 1}
              </div>

              <img
                className="product-image"
                src={
                  order?.products?.[0]?.imageUrl ||
                  "/images/products/athletic-cotton-socks-6-pairs.jpg"
                }
                alt="Product"
              />

              <div className="progress-labels-container">
                <div className="progress-label">Preparing</div>
                <div
                  className={`progress-label${
                    order?.status === "shipped" ? " current-status" : ""
                  }`}
                >
                  Shipped
                </div>
                <div className="progress-label">Delivered</div>
              </div>

              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width:
                      order?.status === "delivered"
                        ? "100%"
                        : order?.status === "shipped"
                        ? "50%"
                        : "15%",
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
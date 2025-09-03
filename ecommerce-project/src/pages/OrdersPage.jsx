import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '../components/Header';
import './OrdersPage.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ordersFavicon from '../assets/images/orders-favicon.png';
import dayjs from 'dayjs';
import { formatMoney } from '../utils/money';

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get('/api/orders?expand=products');
        if (!mounted) return;
        const list = Array.isArray(res?.data) ? res.data : [];
        setOrders(list);
        // TEMP: log the first order to inspect shape (remove in prod)
        if (import.meta?.env?.DEV) {
          // eslint-disable-next-line no-console
          console.log('[OrdersPage] sample order', list[0]);
        }
      } catch (err) {
        console.error('[OrdersPage] /api/orders FAIL', err);
        setError('Could not load your orders. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // --- helpers -------------------------------------------------------------
  const getProductName = (orderProduct) => {
    const p = orderProduct?.product || {};
    return (
      p.name || p.title || p.productName || orderProduct?.name || orderProduct?.title || 'Unnamed product'
    );
  };

  const getProductImage = (orderProduct) => {
    const p = orderProduct?.product || {};
    const raw = (
      p.image || p.imageUrl || p.imageURL || p.thumbnail || p.thumb || p.photo ||
      orderProduct?.image || orderProduct?.imageUrl || orderProduct?.imageURL || ''
    );
    if (!raw) return '';

    // Absolute? return as-is
    if (/^https?:\/\//i.test(raw)) return raw;

    // If your API serves images (e.g. http://localhost:8080/uploads/...)
    // and returns a relative path like "uploads/img.png", prefix with API base if provided.
    const API_BASE = import.meta.env?.VITE_API_BASE_URL || '';

    try {
      if (API_BASE) {
        return new URL(raw, API_BASE).toString();
      }
      // Fallback to current origin
      return new URL(raw.startsWith('/') ? raw : '/' + raw, window.location.origin).toString();
    } catch {
      return raw.startsWith('/') ? raw : '/' + raw;
    }
  };

  const placeholderImg = '/images/placeholders/product.png';

  // ------------------------------------------------------------------------

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Orders</title>
          <link rel="icon" href={`${ordersFavicon}?v=1`} type="image/png" />
        </Helmet>
        <Header cart={cart} />
        <div className="orders-page">
          <div className="page-title">Your Orders</div>
          <p>Loading…</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Orders</title>
          <link rel="icon" href={`${ordersFavicon}?v=1`} type="image/png" />
        </Helmet>
        <Header cart={cart} />
        <div className="orders-page">
          <div className="page-title">Your Orders</div>
          <p className="error">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Orders</title>
        <link rel="icon" href={`${ordersFavicon}?v=1`} type="image/png" />
      </Helmet>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            const placedAt = Number(order?.orderTimeMs ?? order?.orderTimeMS ?? 0);
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{placedAt ? dayjs(placedAt).format('MMMM D') : '—'}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order?.totalCostCents ?? 0)}</div>
                    </div>
                  </div>
                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order?.id ?? '—'}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {(order?.products ?? []).map((orderProduct, index) => {
                    const p = orderProduct?.product ?? {};
                    const deliveryMs = Number(orderProduct?.estimatedDeliveryTimeMs ?? orderProduct?.estimatedDeliveryTimeMS ?? 0);
                    const name = getProductName(orderProduct);
                    const imgSrc = getProductImage(orderProduct);
                    return (
                      <Fragment key={`${order.id}-${p.id || orderProduct.id || index}`}>
                        <div className="product-image-container">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={name}
                              loading="lazy"
                              onError={(e) => { e.currentTarget.src = placeholderImg; }}
                            />
                          ) : (
                            <img src={placeholderImg} alt="No image" />
                          )}
                        </div>

                        <div className="product-details">
                          <div className="product-name">{name}</div>
                          <div className="product-delivery-date">
                            Arriving on: {deliveryMs ? dayjs(deliveryMs).format('MMMM D') : '—'}
                          </div>
                          <div className="product-quantity">Quantity: {orderProduct?.quantity ?? 0}</div>
                          <button
                            className="buy-again-button button-primary"
                            type="button"
                            onClick={() => {
                              try {
                                if (cart?.add) {
                                  cart.add(p, 1);
                                }
                              } catch (e) {
                                console.error('Add to cart failed', e);
                              }
                            }}
                          >
                            <img className="buy-again-icon" src="/images/icons/buy-again.png" alt="" />
                            <span className="buy-again-message">Add to Cart</span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <Link to={`/tracking/${order.id}`} state={{ orderId: order.id, productId: p.id }}>
                            <button className="track-package-button button-secondary" type="button">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

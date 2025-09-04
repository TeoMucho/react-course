import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderSummary({
  cart = [],
  deliveryOptions = [],
  selectedDeliveryByProduct = {},
  onSelectDelivery,
  loadCart,                    // ⬅️ neu
}) {
  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        const selectedId =
          selectedDeliveryByProduct[cartItem.productId] ?? cartItem.deliveryOptionId;

        const selectedDeliveryOption = deliveryOptions.find((opt) => opt.id === selectedId);
        const etaMs = Number(
          selectedDeliveryOption?.estimatedDeliveryTimeMs ??
          selectedDeliveryOption?.estimatedDeliveryTimeMS ??
          0
        );

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {etaMs ? dayjs(etaMs).format("dddd, MMMM D") : "—"}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image" src={cartItem.product.image} alt="" />

              <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">Update</span>
                  <span className="delete-quantity-link link-primary">Delete</span>
                </div>
              </div>

              <DeliveryOptions
                cartItem={cartItem}          
                   deliveryOptions={deliveryOptions}
                  loadCart={loadCart}         />
            </div>
          </div>
        );
      })}
    </div>
  );
}

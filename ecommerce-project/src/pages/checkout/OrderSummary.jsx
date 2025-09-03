import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function OrderSummary({ cart, deliveryOptions, selectedDeliveryByProduct, handleChangeDelivery }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions
                    .find((deliveryOption) => {
                        return deliveryOption.id === (selectedDeliveryByProduct[cartItem.productId] ?? cartItem.deliveryOptionId);
                    })

                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOption?.estimatedDeliveryTimeMS).format('dddd, MMMM D')}
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
                                                checked={deliveryOption.id === (selectedDeliveryByProduct[cartItem.productId] ?? cartItem.deliveryOptionId)} // FIX
                                                className="delivery-option-input"
                                                name={`delivery-option-${cartItem.productId}`}
                                                onChange={() => handleChangeDelivery(cartItem.productId, deliveryOption.id)} // FIX
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
    );
}
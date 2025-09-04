import dayjs from 'dayjs';
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({ deliveryOptions, selectedDeliveryByProduct, handleChangeDelivery, cartItem }) {
    return (
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
    );
}
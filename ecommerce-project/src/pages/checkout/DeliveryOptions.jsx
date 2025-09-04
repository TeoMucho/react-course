import dayjs from 'dayjs';
import axios from 'axios';
import { formatMoney } from '../../utils/money';
import { useState, useEffect } from 'react'; 

export function DeliveryOptions({ cartItem, deliveryOptions = [], loadCart }) {
  // Hooks IMMER zuerst:
  const [selectedId, setSelectedId] = useState(
    cartItem?.deliveryOptionId ?? deliveryOptions?.[0]?.id ?? null
  );

  useEffect(() => {
    setSelectedId(cartItem?.deliveryOptionId ?? deliveryOptions?.[0]?.id ?? null);
  }, [cartItem?.deliveryOptionId, cartItem?.productId, deliveryOptions]);

  // Danach erst ggf. früh beenden
  if (!Array.isArray(deliveryOptions) || deliveryOptions.length === 0) return null;


  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((deliveryOption) => {
        let priceString = 'FREE Shipping';
        if (deliveryOption?.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }

        const updateDeliveryOption = async () => {
          if (!cartItem?.productId) return;    
          setSelectedId(deliveryOption.id) ;              // ← Guard
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id
          });
          await loadCart?.();                                 // ← optional
        };

        const eta = Number(
          deliveryOption?.estimatedDeliveryTimeMs ??
          deliveryOption?.estimatedDeliveryTimeMS ?? 0
        );

        return (
          <div key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOption}>
            <input
              type="radio"
              className="delivery-option-input"
              name={`delivery-option-${cartItem?.productId ?? 'unknown'}-${cartItem?.id ?? cartItem?.cartItemId ?? ''}`}
              value={deliveryOption.id}
               checked={String(deliveryOption.id) === String(selectedId ?? '')}

              onChange={updateDeliveryOption}
            />
            <div>
              <div className="delivery-option-date">
                {eta ? dayjs(eta).format('dddd, MMMM D') : '—'}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

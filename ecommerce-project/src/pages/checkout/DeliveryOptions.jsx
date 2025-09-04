// src/pages/checkout/DeliveryOptions.jsx
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({
  deliveryOptions = [],              // <-- Default: leeres Array
  selectedId,
  onSelect,
  name
}) {
  if (!Array.isArray(deliveryOptions) || deliveryOptions.length === 0) {
    return null;
  }

  return (
    <div className="delivery-options">
      {deliveryOptions.map((opt) => {
        const etaMs = Number(opt?.estimatedDeliveryTimeMs ?? opt?.estimatedDeliveryTimeMS ?? 0);
        return (
          <label key={opt.id} className={`delivery-option ${selectedId === opt.id ? 'selected' : ''}`}>
            <input
              type="radio"
              name={name}
              value={opt.id}
              checked={selectedId === opt.id}
              onChange={() => onSelect?.(opt.id)}
            />
            <div className="delivery-option-date">
              {etaMs ? dayjs(etaMs).format('dddd, MMMM D') : '—'}
            </div>
            <div className="delivery-option-price">
              {opt?.priceCents ? formatMoney(opt.priceCents) : 'FREE'}
            </div>
          </label>
        );
      })}
    </div>
  );
}

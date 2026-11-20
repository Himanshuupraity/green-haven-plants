import { discountPercent, formatPrice } from '../utils/format';

export default function Price({ price, originalPrice, large = false }) {
  const off = discountPercent(price, originalPrice);
  return (
    <div className={`price ${large ? 'price--large' : ''}`}>
      <span className="price__now">{formatPrice(price)}</span>
      {off > 0 && (
        <>
          <span className="price__was">{formatPrice(originalPrice)}</span>
          <span className="price__off">{off}% off</span>
        </>
      )}
    </div>
  );
}

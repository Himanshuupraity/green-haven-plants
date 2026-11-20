import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Sun, Sprout, X } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import Price from './Price';
import QuantitySelector from './QuantitySelector';
import WishlistButton from './WishlistButton';

export default function QuickViewModal() {
  const { quickViewProduct: product, closeQuickView } = useUI();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!product) return undefined;
    setQty(1);
    const onKey = (e) => e.key === 'Escape' && closeQuickView();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [product, closeQuickView]);

  if (!product) return null;
  const soldOut = product.stock === 0;

  return (
    <div className="modal-backdrop" onClick={closeQuickView}>
      <div
        className="modal quick-view"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={closeQuickView} aria-label="Close quick view">
          <X size={20} />
        </button>
        <div className="quick-view__media">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="quick-view__info">
          <span className="eyebrow">{product.subtitle}</span>
          <h2>{product.name}</h2>
          <StarRating rating={product.rating} reviews={product.reviews} showValue />
          <Price price={product.price} originalPrice={product.originalPrice} large />
          <p className="quick-view__desc">{product.description}</p>
          <ul className="care-chips">
            <li><Sun size={16} /> {product.light}</li>
            <li><Droplets size={16} /> {product.water}</li>
            <li><Sprout size={16} /> {product.maintenance}</li>
          </ul>
          <div className="quick-view__actions">
            <QuantitySelector value={qty} onChange={setQty} />
            <button
              className="btn btn--primary btn--grow"
              disabled={soldOut}
              onClick={() => {
                addToCart(product, qty);
                closeQuickView();
              }}
            >
              {soldOut ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <WishlistButton product={product} className="wish-btn--boxed" />
          </div>
          <Link to={`/product/${product.slug}`} className="link-arrow" onClick={closeQuickView}>
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
}

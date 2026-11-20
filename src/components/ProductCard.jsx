import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { discountPercent } from '../utils/format';
import StarRating from './StarRating';
import Price from './Price';
import WishlistButton from './WishlistButton';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { openQuickView } = useUI();
  const [added, setAdded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const off = discountPercent(product.price, product.originalPrice);
  const soldOut = product.stock === 0;

  const handleAdd = () => {
    addToCart(product, 1, { openDrawer: false });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const badge = soldOut ? 'Sold Out' : product.badge || (off >= 20 ? 'Sale' : null);

  return (
    <article className={`product-card ${soldOut ? 'is-soldout' : ''}`}>
      <div className="product-card__media">
        <Link to={`/product/${product.slug}`} className="product-card__img-link" aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={loaded ? 'is-loaded' : ''}
            onLoad={() => setLoaded(true)}
          />
        </Link>
        {badge && (
          <span className={`badge badge--${badge.toLowerCase().replace(/\s/g, '-')}`}>
            {badge === 'New' ? 'New Arrival' : badge}
          </span>
        )}
        <WishlistButton product={product} className="product-card__wish" />
        <button type="button" className="product-card__quick" onClick={() => openQuickView(product)}>
          <Eye size={16} /> Quick View
        </button>
      </div>
      <div className="product-card__body">
        <StarRating rating={product.rating} reviews={product.reviews} size={13} />
        <h3 className="product-card__title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-card__subtitle">{product.subtitle}</p>
        <div className="product-card__footer">
          <Price price={product.price} originalPrice={product.originalPrice} />
          <button
            type="button"
            className={`btn btn--card ${added ? 'is-added' : ''}`}
            onClick={handleAdd}
            disabled={soldOut}
            aria-label={soldOut ? 'Sold out' : `Add ${product.name} to cart`}
          >
            {soldOut ? (
              'Sold Out'
            ) : added ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

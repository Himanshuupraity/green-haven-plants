import { Link } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';
import StarRating from '../components/StarRating';
import Price from '../components/Price';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const available = items.filter((p) => p.stock > 0);

  const moveAll = () => {
    available.forEach((p, i) => addToCart(p, 1, { openDrawer: i === available.length - 1, silent: i !== available.length - 1 }));
  };

  return (
    <div className="container page-pad">
      <Breadcrumb items={[{ label: 'Wishlist' }]} />
      <div className="page-title-row">
        <h1 className="page-title">My Wishlist <span>({items.length})</span></h1>
        {available.length > 1 && (
          <button className="btn btn--primary" onClick={moveAll}><ShoppingBag size={16} /> Add all to cart</button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          text="Tap the heart on any plant to save it here for later."
          actionLabel="Discover Plants"
        />
      ) : (
        <div className="wishlist-grid">
          {items.map((p) => (
            <article key={p.id} className="wish-card">
              <button className="wish-card__remove" onClick={() => removeFromWishlist(p.id)} aria-label={`Remove ${p.name}`}>
                <X size={16} />
              </button>
              <Link to={`/product/${p.slug}`} className="wish-card__img"><img src={p.image} alt={p.name} /></Link>
              <div className="wish-card__body">
                <StarRating rating={p.rating} reviews={p.reviews} size={13} />
                <Link to={`/product/${p.slug}`}><h3>{p.name}</h3></Link>
                <Price price={p.price} originalPrice={p.originalPrice} />
                <button className="btn btn--primary btn--block" disabled={p.stock === 0} onClick={() => addToCart(p)}>
                  {p.stock === 0 ? 'Out of Stock' : (<><ShoppingBag size={16} /> Add to Cart</>)}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

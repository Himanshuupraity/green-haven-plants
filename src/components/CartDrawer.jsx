import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Truck, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '../utils/format';
import QuantitySelector from './QuantitySelector';
import { PlantIllustration } from './EmptyState';

export function ShippingProgress({ subtotal, toFreeShipping }) {
  const pct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  return (
    <div className="ship-progress">
      <p>
        <Truck size={16} />
        {toFreeShipping > 0 ? (
          <>Add <strong>{formatPrice(toFreeShipping)}</strong> more for <strong>FREE delivery</strong></>
        ) : (
          <>You’ve unlocked <strong>FREE delivery</strong> 🎉</>
        )}
      </p>
      <div className="ship-progress__bar"><span style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, updateQty, removeFromCart, subtotal, count, toFreeShipping } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeDrawer();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [drawerOpen, closeDrawer]);

  const go = (path) => {
    closeDrawer();
    navigate(path);
  };

  return (
    <div className={`drawer ${drawerOpen ? 'is-open' : ''}`} aria-hidden={!drawerOpen}>
      <div className="drawer__backdrop" onClick={closeDrawer} />
      <aside className="drawer__panel" role="dialog" aria-label="Shopping cart">
        <div className="drawer__head">
          <h3>Your Cart <span>({count})</span></h3>
          <button className="icon-btn" onClick={closeDrawer} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer__empty">
            <PlantIllustration variant="bag" />
            <h4>Your cart is feeling a little empty</h4>
            <p>Let’s find a green friend for your space.</p>
            <button className="btn btn--primary" onClick={() => go('/shop')}>Start Shopping</button>
          </div>
        ) : (
          <>
            <ShippingProgress subtotal={subtotal} toFreeShipping={toFreeShipping} />
            <ul className="drawer__items">
              {items.map((item) => (
                <li key={item.id} className="drawer-item">
                  <Link to={`/product/${item.slug}`} onClick={closeDrawer}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div className="drawer-item__info">
                    <Link to={`/product/${item.slug}`} onClick={closeDrawer} className="drawer-item__name">
                      {item.name}
                    </Link>
                    <span className="drawer-item__sub">{item.subtitle}</span>
                    <div className="drawer-item__row">
                      <QuantitySelector small value={item.qty} onChange={(q) => updateQty(item.id, q)} />
                      <strong>{formatPrice(item.price * item.qty)}</strong>
                    </div>
                  </div>
                  <button className="icon-btn icon-btn--sm" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="drawer__foot">
              <div className="drawer__subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="drawer__note">Delivery & discounts calculated at checkout.</p>
              <button className="btn btn--primary btn--block" onClick={() => go('/checkout')}>Proceed to Checkout</button>
              <button className="btn btn--outline btn--block" onClick={() => go('/cart')}>View Cart</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

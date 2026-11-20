import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Lock, Tag, Trash2, X } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import QuantitySelector from '../components/QuantitySelector';
import EmptyState from '../components/EmptyState';
import { ShippingProgress } from '../components/CartDrawer';
import RecentlyViewed from '../components/RecentlyViewed';
import { useCart, COUPONS } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/format';

export function OrderSummary({ children, showCoupon = true }) {
  const { subtotal, savings, discount, delivery, total, coupon, applyCoupon, removeCoupon, count } = useCart();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    if (applyCoupon(code)) {
      setCode('');
      setError('');
    } else setError('This code isn’t valid. Try GREEN15.');
  };

  return (
    <aside className="summary">
      <h3>Order Summary</h3>
      <dl>
        <div><dt>Subtotal ({count} item{count !== 1 ? 's' : ''})</dt><dd>{formatPrice(subtotal)}</dd></div>
        {savings > 0 && <div className="summary__save"><dt>You save on MRP</dt><dd>−{formatPrice(savings)}</dd></div>}
        {discount > 0 && <div className="summary__save"><dt>Coupon ({coupon})</dt><dd>−{formatPrice(discount)}</dd></div>}
        <div><dt>Delivery</dt><dd>{delivery === 0 ? <span className="free">FREE</span> : formatPrice(delivery)}</dd></div>
        <div className="summary__total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
      </dl>
      {showCoupon && (
        coupon ? (
          <div className="coupon-applied">
            <Tag size={16} /> <span><strong>{coupon}</strong> — {COUPONS[coupon].label}</span>
            <button onClick={removeCoupon} aria-label="Remove coupon"><X size={14} /></button>
          </div>
        ) : (
          <form className="coupon" onSubmit={submit}>
            <input value={code} onChange={(e) => { setCode(e.target.value); setError(''); }} placeholder="Coupon code" aria-label="Coupon code" />
            <button className="btn btn--outline">Apply</button>
          </form>
        )
      )}
      {error && <p className="form-error">{error}</p>}
      {children}
      <p className="summary__secure"><Lock size={14} /> Safe & secure demo checkout</p>
    </aside>
  );
}

export default function Cart() {
  const { items, updateQty, removeFromCart, subtotal, toFreeShipping } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  return (
    <>
      <div className="container page-pad">
        <Breadcrumb items={[{ label: 'Cart' }]} />
        <h1 className="page-title">Shopping Cart</h1>

        {items.length === 0 ? (
          <EmptyState
            variant="bag"
            title="Your cart is empty"
            text="Looks like you haven’t added any plants yet. Let’s bring some green home!"
            actionLabel="Continue Shopping"
          />
        ) : (
          <div className="cart-layout">
            <div>
              <ShippingProgress subtotal={subtotal} toFreeShipping={toFreeShipping} />
              <div className="cart-table">
                <div className="cart-table__head">
                  <span>Product</span><span>Quantity</span><span>Total</span>
                </div>
                {items.map((item) => (
                  <div key={item.id} className="cart-row">
                    <Link to={`/product/${item.slug}`} className="cart-row__img">
                      <img src={item.image} alt={item.name} />
                    </Link>
                    <div className="cart-row__info">
                      <Link to={`/product/${item.slug}`}><strong>{item.name}</strong></Link>
                      <span>{item.subtitle}</span>
                      <span className="cart-row__unit">{formatPrice(item.price)} each</span>
                      <div className="cart-row__links">
                        <button onClick={() => removeFromCart(item.id)}><Trash2 size={14} /> Remove</button>
                        {!isWishlisted(item.id) && (
                          <button onClick={() => { toggleWishlist(item); removeFromCart(item.id); }}>
                            <Heart size={14} /> Save for later
                          </button>
                        )}
                      </div>
                    </div>
                    <QuantitySelector value={item.qty} onChange={(q) => updateQty(item.id, q)} />
                    <strong className="cart-row__total">{formatPrice(item.price * item.qty)}</strong>
                  </div>
                ))}
              </div>
              <Link to="/shop" className="link-arrow cart-continue"><ArrowLeft size={16} /> Continue Shopping</Link>
            </div>
            <OrderSummary>
              <button className="btn btn--primary btn--lg btn--block" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
            </OrderSummary>
          </div>
        )}
      </div>
      <RecentlyViewed title="You Recently Viewed" />
    </>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Info, PackageCheck } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';
import { OrderSummary } from './Cart';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

const FIELDS = [
  { name: 'name', label: 'Full name', autoComplete: 'name', span: 2 },
  { name: 'phone', label: 'Mobile number', autoComplete: 'tel', inputMode: 'numeric' },
  { name: 'email', label: 'Email', autoComplete: 'email', type: 'email' },
  { name: 'address', label: 'House no., street, area', autoComplete: 'street-address', span: 2 },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
  { name: 'pin', label: 'PIN code', autoComplete: 'postal-code', inputMode: 'numeric' },
];

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name';
  if (!/^[6-9]\d{9}$/.test(v.phone)) e.phone = 'Enter a valid 10-digit mobile number';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email';
  if (v.address.trim().length < 6) e.address = 'Please enter your full address';
  if (!v.city.trim()) e.city = 'Please enter your city';
  if (!/^[1-9]\d{5}$/.test(v.pin)) e.pin = 'Enter a valid 6-digit PIN';
  return e;
};

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [values, setValues] = useState({ name: '', phone: '', email: '', address: '', city: '', pin: '' });
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState('cod');
  const [order, setOrder] = useState(null);
  const [placing, setPlacing] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setPlacing(true);
    setTimeout(() => {
      setOrder({ id: `VRD${Math.floor(100000 + Math.random() * 900000)}`, total, count: items.length, name: values.name.split(' ')[0] });
      clearCart();
      setPlacing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  if (order) {
    return (
      <div className="container page-pad">
        <div className="order-success">
          <span className="order-success__icon"><CheckCircle2 size={44} /></span>
          <h1>Thank you, {order.name}!</h1>
          <p>Your demo order <strong>#{order.id}</strong> for {formatPrice(order.total)} has been placed.</p>
          <div className="order-success__steps">
            <div className="is-done"><PackageCheck size={20} /><span>Order confirmed</span></div>
            <div><span className="dot" /><span>Packed with care</span></div>
            <div><span className="dot" /><span>Out for delivery</span></div>
          </div>
          <p className="demo-note"><Info size={16} /> This is a demo store — no payment was taken and no order will be shipped.</p>
          <Link to="/shop" className="btn btn--primary btn--lg">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container page-pad">
        <EmptyState variant="bag" title="Nothing to check out yet" text="Add a few plants to your cart first." actionLabel="Browse Plants" />
      </div>
    );
  }

  return (
    <div className="container page-pad">
      <Breadcrumb items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="page-title">Checkout</h1>
      <div className="demo-banner"><Info size={18} /> Demo checkout — no real payment details are collected or processed.</div>
      <div className="cart-layout">
        <form className="checkout-form" onSubmit={submit} noValidate>
          <section>
            <h3><span>1</span> Delivery details</h3>
            <div className="form-grid">
              {FIELDS.map((f) => (
                <label key={f.name} className={`field ${f.span === 2 ? 'field--full' : ''} ${errors[f.name] ? 'has-error' : ''}`}>
                  <span>{f.label}</span>
                  <input
                    type={f.type || 'text'}
                    name={f.name}
                    autoComplete={f.autoComplete}
                    inputMode={f.inputMode}
                    value={values[f.name]}
                    onChange={(e) => {
                      setValues({ ...values, [f.name]: e.target.value });
                      if (errors[f.name]) setErrors({ ...errors, [f.name]: undefined });
                    }}
                  />
                  {errors[f.name] && <em>{errors[f.name]}</em>}
                </label>
              ))}
            </div>
          </section>
          <section>
            <h3><span>2</span> Payment method</h3>
            <div className="pay-options">
              {[
                ['cod', 'Cash on Delivery', 'Pay when your plants arrive'],
                ['upi', 'UPI on Delivery', 'Scan & pay with any UPI app at your door'],
              ].map(([key, title, sub]) => (
                <label key={key} className={`pay-option ${payment === key ? 'is-active' : ''}`}>
                  <input type="radio" name="payment" checked={payment === key} onChange={() => setPayment(key)} />
                  <div><strong>{title}</strong><span>{sub}</span></div>
                </label>
              ))}
            </div>
            <p className="form-hint">Online card/net-banking payments are disabled in this demo.</p>
          </section>
          <button className="btn btn--primary btn--lg btn--block" disabled={placing}>
            {placing ? 'Placing order…' : `Place Demo Order · ${formatPrice(total)}`}
          </button>
        </form>

        <OrderSummary>
          <ul className="summary__items">
            {items.map((i) => (
              <li key={i.id}>
                <span className="summary__thumb"><img src={i.image} alt="" /><em>{i.qty}</em></span>
                <span>{i.name}</span>
                <strong>{formatPrice(i.price * i.qty)}</strong>
              </li>
            ))}
          </ul>
        </OrderSummary>
      </div>
    </div>
  );
}

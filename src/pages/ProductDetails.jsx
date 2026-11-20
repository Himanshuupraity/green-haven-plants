import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CheckCircle2, Droplets, Gauge, MapPin, Ruler, RotateCcw, ShieldCheck, Sun, Truck, XCircle, Zap,
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import StarRating from '../components/StarRating';
import Price from '../components/Price';
import QuantitySelector from '../components/QuantitySelector';
import WishlistButton from '../components/WishlistButton';
import ProductGrid from '../components/ProductGrid';
import SectionHeading from '../components/SectionHeading';
import RecentlyViewed from '../components/RecentlyViewed';
import { getProduct, getRelated, sampleReviews } from '../data/products';
import { getCategory } from '../data/categories';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { discountPercent, formatPrice } from '../utils/format';
import NotFound from './NotFound';

const deliveryDate = (days) =>
  new Date(Date.now() + days * 864e5).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

function PinChecker() {
  const [pin, setPin] = useState('');
  const [result, setResult] = useState(null);

  const check = (e) => {
    e.preventDefault();
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      setResult({ ok: false, msg: 'Please enter a valid 6-digit PIN code.' });
      return;
    }
    // Demo rule: PIN codes starting with 9 (Army Postal Service) are not serviceable.
    if (pin.startsWith('9')) {
      setResult({ ok: false, msg: `Sorry, we don’t deliver to ${pin} yet.` });
      return;
    }
    const metro = ['11', '40', '56', '60', '50', '70', '41'].includes(pin.slice(0, 2));
    setResult({
      ok: true,
      msg: `Delivery by ${deliveryDate(metro ? 2 : 5)} to ${pin}`,
      sub: metro ? 'Express delivery available · Cash on Delivery available' : 'Standard delivery · Cash on Delivery available',
    });
  };

  return (
    <div className="pin-checker">
      <h4><MapPin size={16} /> Check delivery availability</h4>
      <form onSubmit={check}>
        <input
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setResult(null); }}
          placeholder="Enter PIN code (e.g. 560038)"
          aria-label="PIN code"
        />
        <button className="btn btn--outline">Check</button>
      </form>
      {result && (
        <p className={`pin-checker__result ${result.ok ? 'is-ok' : 'is-error'}`}>
          {result.ok ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          <span>{result.msg}{result.sub && <small>{result.sub}</small>}</span>
        </p>
      )}
      <p className="pin-checker__note">Demo checker — try any 6-digit PIN.</p>
    </div>
  );
}

function Tabs({ product }) {
  const [tab, setTab] = useState('description');
  const tabs = [
    ['description', 'Description'],
    ['care', 'Plant Care Guide'],
    ['reviews', `Reviews (${product.reviews})`],
  ];
  const isPlant = !product.categories.every((c) => c === 'pots' || c === 'accessories');

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {tabs.map(([key, label]) => (
          <button key={key} role="tab" aria-selected={tab === key} className={tab === key ? 'is-active' : ''} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>
      <div className="tabs__panel" role="tabpanel" key={tab}>
        {tab === 'description' && (
          <div className="tab-description">
            <p>{product.description}</p>
            <ul className="check-list">
              <li><CheckCircle2 size={16} /> Hand-picked & quality checked at our nursery</li>
              <li><CheckCircle2 size={16} /> {isPlant ? 'Ships in a sturdy nursery pot with premium potting mix' : 'Carefully packed in protective, recyclable packaging'}</li>
              <li><CheckCircle2 size={16} /> Includes a printed care card & lifetime WhatsApp support</li>
              <li><CheckCircle2 size={16} /> Size: {product.size}</li>
            </ul>
          </div>
        )}
        {tab === 'care' && (
          <div className="care-guide">
            {isPlant ? (
              <>
                <div><Sun size={22} /><h5>Light</h5><p>{product.light}. Rotate the pot every couple of weeks for even growth.</p></div>
                <div><Droplets size={22} /><h5>Water</h5><p>{product.water}. Always check the top soil before watering and never let the pot sit in water.</p></div>
                <div><Gauge size={22} /><h5>Maintenance</h5><p>{product.maintenance}. Wipe leaves monthly and feed with organic fertiliser in the growing season.</p></div>
                <div><Zap size={22} /><h5>Pro tip</h5><p>Let your plant acclimatise for a week after delivery before repotting — mild leaf droop is normal.</p></div>
              </>
            ) : (
              <>
                <div><Ruler size={22} /><h5>Dimensions</h5><p>{product.size}</p></div>
                <div><Droplets size={22} /><h5>Drainage</h5><p>{product.water}</p></div>
                <div><Gauge size={22} /><h5>Care</h5><p>{product.maintenance}. Clean with a soft, damp cloth.</p></div>
                <div><Zap size={22} /><h5>Pairing tip</h5><p>Pair with any of our plants for a ready-to-gift look. Ask us on WhatsApp for sizing help.</p></div>
              </>
            )}
          </div>
        )}
        {tab === 'reviews' && (
          <div className="reviews">
            <div className="reviews__summary">
              <strong>{product.rating.toFixed(1)}</strong>
              <StarRating rating={product.rating} size={18} />
              <span>Based on {product.reviews} reviews</span>
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = star === 5 ? 72 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 2 : 1;
                return (
                  <div key={star} className="reviews__bar">
                    <span>{star}★</span><div><i style={{ width: `${pct}%` }} /></div><em>{pct}%</em>
                  </div>
                );
              })}
            </div>
            <ul className="reviews__list">
              {sampleReviews.map((r) => (
                <li key={r.name}>
                  <div className="reviews__head">
                    <span className="avatar-initials">{r.name.charAt(0)}</span>
                    <div><strong>{r.name}</strong><span>Verified buyer · {r.date}</span></div>
                    <StarRating rating={r.rating} size={13} />
                  </div>
                  <p>{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addRecentlyViewed } = useUI();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 });

  useEffect(() => {
    setActiveImg(0);
    setQty(1);
    if (product) addRecentlyViewed(product.id);
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!product) return <NotFound />;

  const soldOut = product.stock === 0;
  const primaryCat = getCategory(product.categories[0]);
  const related = getRelated(product);
  const off = discountPercent(product.price, product.originalPrice);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({ active: true, x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <>
      <div className="container pdp">
        <Breadcrumb
          items={[
            { label: 'Shop', to: '/shop' },
            { label: primaryCat.name, to: `/shop?category=${primaryCat.slug}` },
            { label: product.name },
          ]}
        />
        <div className="pdp__grid">
          <div className="gallery">
            <div className="gallery__thumbs">
              {product.images.map((src, i) => (
                <button key={src} className={i === activeImg ? 'is-active' : ''} onClick={() => setActiveImg(i)} aria-label={`View image ${i + 1}`}>
                  <img src={src.replace('w=900&h=1000', 'w=160&h=180')} alt="" />
                </button>
              ))}
            </div>
            <div
              className={`gallery__main ${zoom.active ? 'is-zooming' : ''}`}
              onMouseMove={onMove}
              onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
            >
              <img
                key={activeImg}
                src={product.images[activeImg]}
                alt={product.name}
                style={{ transformOrigin: `${zoom.x}% ${zoom.y}%` }}
              />
              {off > 0 && <span className="badge badge--sale">{off}% OFF</span>}
              {product.isNew && <span className="badge badge--new gallery__badge-new">New Arrival</span>}
            </div>
          </div>

          <div className="pdp__info">
            <span className="eyebrow">{product.subtitle}</span>
            <h1>{product.name}</h1>
            <div className="pdp__rating">
              <StarRating rating={product.rating} showValue size={16} />
              <a href="#product-tabs">{product.reviews} reviews</a>
            </div>
            <Price price={product.price} originalPrice={product.originalPrice} large />
            <p className="pdp__tax">Inclusive of all taxes</p>
            <p className="pdp__desc">{product.description}</p>

            <div className="spec-grid">
              <div><Ruler size={20} /><span>Plant size</span><strong>{product.size}</strong></div>
              <div><Sun size={20} /><span>Sunlight</span><strong>{product.light}</strong></div>
              <div><Droplets size={20} /><span>Watering</span><strong>{product.water}</strong></div>
              <div><Gauge size={20} /><span>Maintenance</span><strong>{product.maintenance}</strong></div>
            </div>

            <p className={`stock ${soldOut ? 'stock--out' : product.stock < 6 ? 'stock--low' : ''}`}>
              <span className="stock__dot" />
              {soldOut ? 'Currently out of stock' : product.stock < 6 ? `Only ${product.stock} left — order soon` : 'In stock, ready to ship'}
            </p>

            <div className="pdp__actions">
              <QuantitySelector value={qty} onChange={setQty} />
              <button className="btn btn--primary btn--lg btn--grow" disabled={soldOut} onClick={() => addToCart(product, qty)}>
                {soldOut ? 'Out of Stock' : `Add to Cart · ${formatPrice(product.price * qty)}`}
              </button>
              <WishlistButton product={product} className="wish-btn--boxed" />
            </div>
            <button
              className="btn btn--gold btn--lg btn--block"
              disabled={soldOut}
              onClick={() => {
                addToCart(product, qty, { openDrawer: false, silent: true });
                navigate('/checkout');
              }}
            >
              Buy Now
            </button>

            <PinChecker />

            <ul className="pdp__perks">
              <li><Truck size={18} /> Free delivery above ₹999</li>
              <li><ShieldCheck size={18} /> 7-day plant guarantee</li>
              <li><RotateCcw size={18} /> Easy replacements</li>
            </ul>
          </div>
        </div>

        <div id="product-tabs">
          <Tabs product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section--white">
          <div className="container">
            <SectionHeading eyebrow="Pairs beautifully with" title="You May Also Like" link={`/shop?category=${primaryCat.slug}`} />
            <ProductGrid products={related} />
          </div>
        </section>
      )}

      <RecentlyViewed excludeId={product.id} />

      <div className="mobile-buy-bar">
        <div>
          <strong>{formatPrice(product.price)}</strong>
          <span>{product.name}</span>
        </div>
        <button className="btn btn--primary" disabled={soldOut} onClick={() => addToCart(product, qty)}>
          {soldOut ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
      <div className="mobile-buy-bar__spacer" />
      <p className="sr-only"><Link to="/shop">Back to shop</Link></p>
    </>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Star } from 'lucide-react';
import { IMAGES } from '../data/content';
import { getProduct } from '../data/products';
import { formatPrice } from '../utils/format';

export default function Hero() {
  const featured = getProduct('monstera-deliciosa');
  return (
    <section className="hero">
      <div className="hero__bg-leaf" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow anim-up" style={{ animationDelay: '0.05s' }}>
            <Leaf size={14} /> New season collection is here
          </span>
          <h1 className="anim-up" style={{ animationDelay: '0.15s' }}>
            Bring Nature Home, <em>One Plant</em> at a Time.
          </h1>
          <p className="anim-up" style={{ animationDelay: '0.28s' }}>
            Discover beautiful indoor and outdoor plants to make your space greener, fresher and more beautiful.
          </p>
          <div className="hero__actions anim-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/shop" className="btn btn--primary btn--lg">
              Shop Plants <ArrowRight size={18} />
            </Link>
            <a href="#categories" className="btn btn--ghost btn--lg">
              Explore Collection
            </a>
          </div>
          <div className="hero__stats anim-up" style={{ animationDelay: '0.52s' }}>
            <div>
              <strong>25k+</strong>
              <span>Happy plant parents</span>
            </div>
            <div>
              <strong>
                4.8 <Star size={16} fill="currentColor" />
              </strong>
              <span>Average rating</span>
            </div>
            <div>
              <strong>200+</strong>
              <span>Plant varieties</span>
            </div>
          </div>
        </div>

        <div className="hero__visual anim-fade" style={{ animationDelay: '0.2s' }}>
          <div className="hero__image">
            <img src={IMAGES.hero} alt="Bright living room styled with indoor plants" fetchpriority="high" />
          </div>
          <Link to={`/product/${featured.slug}`} className="hero__float-card hero__float-card--product">
            <img src={featured.image} alt="" />
            <div>
              <span>Bestseller</span>
              <strong>{featured.name}</strong>
              <em>{formatPrice(featured.price)}</em>
            </div>
          </Link>
          <div className="hero__float-card hero__float-card--badge">
            <ShieldCheck size={22} />
            <div>
              <strong>7-Day Guarantee</strong>
              <span>Healthy plants, or we replace</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

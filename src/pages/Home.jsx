import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgePercent, ChevronLeft, ChevronRight } from 'lucide-react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';
import SectionHeading from '../components/SectionHeading';
import Features from '../components/Features';
import BlogCard from '../components/BlogCard';
import Testimonial from '../components/Testimonial';
import Newsletter from '../components/Newsletter';
import InstagramSection from '../components/InstagramSection';
import RecentlyViewed from '../components/RecentlyViewed';
import Reveal from '../components/Reveal';
import { categories } from '../data/categories';
import { bestsellers, newArrivals } from '../data/products';
import { blogPosts, IMAGES, testimonials } from '../data/content';

const TRUST = ['Free delivery above ₹999', '7-day plant guarantee', 'Secure checkout', '25+ cities across India'];

function PromoBanner() {
  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal className="promo">
          <div className="promo__content">
            <span className="promo__tag"><BadgePercent size={16} /> Limited time offer</span>
            <h2>Make Your Home Greener</h2>
            <p className="promo__offer">Get <strong>15% OFF</strong> on Your First Plant Order</p>
            <p className="promo__code">Use code <span>GREEN15</span> at checkout</p>
            <Link to="/shop?sort=discount" className="btn btn--gold btn--lg">
              Explore Offers <ArrowRight size={18} />
            </Link>
          </div>
          <div className="promo__media">
            <img src={IMAGES.promo} alt="Close-up of a monstera leaf" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="section section--sage">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Loved by plant parents</span>
            <h2>What Our Customers Say</h2>
            <p>Rated 4.8/5 from over 3,200 verified reviews.</p>
          </div>
          <div className="slider-nav">
            <button className="icon-btn icon-btn--round" onClick={() => setPage((p) => (p - 1 + pages) % pages)} aria-label="Previous reviews">
              <ChevronLeft size={20} />
            </button>
            <button className="icon-btn icon-btn--round" onClick={() => setPage((p) => (p + 1) % pages)} aria-label="Next reviews">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="testimonials" key={page}>
          {visible.map((t) => (
            <Testimonial key={t.name} review={t} />
          ))}
        </div>
        <div className="dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} className={i === page ? 'is-active' : ''} onClick={() => setPage(i)} aria-label={`Reviews page ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <div className="trust-strip">
        <div className="trust-strip__track">
          {[...TRUST, ...TRUST, ...TRUST].map((t, i) => (
            <span key={i}>✦ {t}</span>
          ))}
        </div>
      </div>

      <section className="section" id="categories">
        <div className="container">
          <SectionHeading
            eyebrow="Curated collections"
            title="Shop by Category"
            text="From statement floor plants to tiny desk succulents — find the perfect green companion."
            link="/shop"
            linkLabel="Shop all"
          />
          <div className="category-grid">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 90}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Customer favourites"
            title="Bestselling Plants"
            text="Our most-loved plants — easy to care for and guaranteed to make a statement."
            link="/shop?sort=bestselling"
          />
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      <PromoBanner />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Just landed"
            title="New Arrivals"
            text="Fresh from our greenhouse — rare finds and seasonal favourites."
            link="/shop?sort=newest"
          />
          <ProductGrid products={newArrivals.slice(0, 8)} />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHeading eyebrow="The Verdora promise" title="Why Choose Us?" center />
          <Features />
        </div>
      </section>

      <Testimonials />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="The plant journal"
            title="Plant Care Tips"
            text="Simple, expert advice to help your plants live their happiest lives."
            link="/plant-care"
            linkLabel="All articles"
          />
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 90}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewed />

      <InstagramSection />

      <Newsletter />
    </>
  );
}

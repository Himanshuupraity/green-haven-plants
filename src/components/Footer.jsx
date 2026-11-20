import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import Logo from './Logo';
import { categories } from '../data/categories';
import { DEMO_CONTACT } from '../utils/format';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>
            Thoughtfully grown plants, handcrafted planters and honest plant-care advice — delivered with love
            to homes across India.
          </p>
          <div className="footer__social">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Twitter, label: 'Twitter' },
              { Icon: Youtube, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <a key={label} href="#" onClick={(e) => e.preventDefault()} aria-label={`${label} (demo link)`} title={`${label} (demo)`}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/plant-care">Plant Care</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}><Link to={`/shop?category=${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/contact#faq">Shipping & Delivery</Link></li>
            <li><Link to="/contact#faq">Returns & Replacements</Link></li>
            <li><Link to="/contact#faq">FAQs</Link></li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Get in Touch <span className="demo-tag">Demo details</span></h4>
          <ul>
            <li><MapPin size={16} /> {DEMO_CONTACT.address}</li>
            <li><Phone size={16} /> {DEMO_CONTACT.phone}</li>
            <li><Mail size={16} /> {DEMO_CONTACT.email}</li>
          </ul>
          <p className="footer__hours">Mon – Sat · 9:00 AM – 7:00 PM</p>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Verdora Plant Studio. All rights reserved.</p>
          <p className="footer__payments">
            <span>UPI</span><span>Visa</span><span>Mastercard</span><span>COD</span>
          </p>
          <p>Demo storefront · No real orders are processed.</p>
        </div>
      </div>
    </footer>
  );
}

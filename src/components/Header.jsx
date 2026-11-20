import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, X, ChevronRight, Phone } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUI } from '../context/UIContext';
import { DEMO_CONTACT } from '../utils/format';

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Indoor Plants', to: '/shop?category=indoor' },
  { label: 'Outdoor Plants', to: '/shop?category=outdoor' },
  { label: 'Pots & Planters', to: '/shop?category=pots' },
  { label: 'Plant Care', to: '/plant-care' },
  { label: 'About Us', to: '/about' },
];

function isActive(link, location) {
  const [path, query] = link.to.split('?');
  if (path === '/') return location.pathname === '/';
  if (path === '/shop') {
    if (location.pathname !== '/shop') return false;
    const current = new URLSearchParams(location.search).get('category');
    const target = query ? new URLSearchParams(query).get('category') : null;
    return current === target;
  }
  return location.pathname.startsWith(path);
}

export default function Header() {
  const location = useLocation();
  const { count, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const { openSearch } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  // Animate the cart badge whenever the count changes.
  useEffect(() => {
    if (count === 0) return undefined;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header__inner">
          <button className="icon-btn header__menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <Logo />
          <nav className="header__nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className={`nav-link ${isActive(link, location) ? 'is-active' : ''}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header__actions">
            <button className="icon-btn" onClick={openSearch} aria-label="Search products">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="icon-btn header__wish" aria-label={`Wishlist (${wishCount} items)`}>
              <Heart size={20} />
              {wishCount > 0 && <span className="icon-badge">{wishCount}</span>}
            </Link>
            <button className="icon-btn" onClick={openDrawer} aria-label={`Cart (${count} items)`}>
              <ShoppingBag size={20} />
              {count > 0 && <span className={`icon-badge ${bump ? 'is-bumping' : ''}`}>{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__backdrop" onClick={() => setMenuOpen(false)} />
        <aside className="mobile-menu__panel">
          <div className="mobile-menu__head">
            <Logo tagline={false} />
            <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="mobile-menu__nav">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className={isActive(link, location) ? 'is-active' : ''}
                style={{ transitionDelay: menuOpen ? `${80 + i * 40}ms` : '0ms' }}
              >
                {link.label} <ChevronRight size={18} />
              </Link>
            ))}
            <Link to="/wishlist">Wishlist <ChevronRight size={18} /></Link>
            <Link to="/contact">Contact <ChevronRight size={18} /></Link>
          </nav>
          <div className="mobile-menu__foot">
            <p>Need help choosing a plant?</p>
            <a href={`tel:${DEMO_CONTACT.phone.replace(/\s/g, '')}`}>
              <Phone size={16} /> {DEMO_CONTACT.phone} <small>(demo)</small>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}

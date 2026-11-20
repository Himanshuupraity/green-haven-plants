import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { products } from '../data/products';
import { categories, getCategory } from '../data/categories';
import { formatPrice } from '../utils/format';

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const categoryNames = p.categories.map((c) => getCategory(c)?.name || c).join(' ');
    return `${p.name} ${p.subtitle} ${categoryNames} ${p.categories.join(' ')}`.toLowerCase().includes(q);
  });
}

const POPULAR = ['Monstera', 'Snake Plant', 'Succulents', 'Air Purifying', 'Flowering', 'Planters'];

export default function SearchBar() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const results = useMemo(() => searchProducts(query), [query]);

  useEffect(() => {
    if (!searchOpen) return undefined;
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e) => e.key === 'Escape' && closeSearch();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [searchOpen, closeSearch]);

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    closeSearch();
  };

  return (
    <div className={`search-overlay ${searchOpen ? 'is-open' : ''}`} aria-hidden={!searchOpen}>
      <div className="search-overlay__backdrop" onClick={closeSearch} />
      <div className="search-overlay__panel" role="dialog" aria-label="Search products">
        <div className="container">
          <form className="search-form" onSubmit={submit}>
            <Search size={22} />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search plants, pots, categories…"
              aria-label="Search"
            />
            {query && (
              <button type="button" className="search-form__clear" onClick={() => setQuery('')}>
                Clear
              </button>
            )}
            <button type="button" className="icon-btn" onClick={closeSearch} aria-label="Close search">
              <X size={22} />
            </button>
          </form>

          {!query && (
            <div className="search-suggest">
              <h4>Popular searches</h4>
              <div className="chip-row">
                {POPULAR.map((term) => (
                  <button key={term} className="chip" onClick={() => setQuery(term)}>{term}</button>
                ))}
              </div>
              <h4>Browse categories</h4>
              <div className="chip-row">
                {categories.map((c) => (
                  <Link key={c.slug} className="chip chip--outline" to={`/shop?category=${c.slug}`} onClick={closeSearch}>
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="search-results">
              <p className="search-results__meta">{results.length} result{results.length > 1 ? 's' : ''} for “{query}”</p>
              <div className="search-results__list">
                {results.slice(0, 6).map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="search-result" onClick={closeSearch}>
                    <img src={p.image} alt="" />
                    <div>
                      <strong>{p.name}</strong>
                      <span>{p.subtitle}</span>
                    </div>
                    <span className="search-result__price">{formatPrice(p.price)}</span>
                  </Link>
                ))}
              </div>
              <button className="btn btn--outline" onClick={submit}>
                View all {results.length} result{results.length > 1 ? 's' : ''} <ArrowRight size={16} />
              </button>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="search-empty">
              <p>No plants match “{query}”.</p>
              <span>Try “palm”, “succulent” or “planter”.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

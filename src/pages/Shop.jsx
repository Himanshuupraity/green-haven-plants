import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, X } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ProductGrid from '../components/ProductGrid';
import EmptyState from '../components/EmptyState';
import { products } from '../data/products';
import { filterCategories, getCategory } from '../data/categories';
import { discountPercent, formatPrice } from '../utils/format';
import { IMAGES } from '../data/content';

const PRICE_MAX = Math.ceil(Math.max(...products.map((p) => p.price)) / 100) * 100;

const SORTS = {
  featured: { label: 'Featured', fn: (a, b) => a.id - b.id },
  'price-asc': { label: 'Price: Low to High', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: High to Low', fn: (a, b) => b.price - a.price },
  newest: { label: 'Newest', fn: (a, b) => new Date(b.added) - new Date(a.added) },
  bestselling: { label: 'Bestselling', fn: (a, b) => b.popularity - a.popularity },
  discount: { label: 'Biggest Discount', fn: (a, b) => discountPercent(b.price, b.originalPrice) - discountPercent(a.price, a.originalPrice) },
};

const matchesQuery = (p, q) => {
  if (!q) return true;
  const names = p.categories.map((c) => getCategory(c)?.name || c).join(' ');
  return `${p.name} ${p.subtitle} ${names} ${p.categories.join(' ')}`.toLowerCase().includes(q.toLowerCase());
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const query = params.get('q') || '';
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'featured';

  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [searchInput, setSearchInput] = useState(query);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => setSearchInput(query), [query]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  // Short skeleton shimmer to give filtering a sense of feedback.
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(t);
  }, [category, query, sort, maxPrice, inStockOnly, onSaleOnly, minRating]);

  // Debounce the search input into the URL.
  useEffect(() => {
    if (searchInput === query) return undefined;
    const t = setTimeout(() => setParam('q', searchInput.trim()), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    if (!filtersOpen) return undefined;
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [filtersOpen]);

  const filtered = useMemo(
    () =>
      products
        .filter((p) => !category || p.categories.includes(category))
        .filter((p) => matchesQuery(p, query))
        .filter((p) => p.price <= maxPrice)
        .filter((p) => !inStockOnly || p.stock > 0)
        .filter((p) => !onSaleOnly || discountPercent(p.price, p.originalPrice) > 0)
        .filter((p) => p.rating >= minRating)
        .sort(SORTS[sort].fn),
    [category, query, maxPrice, inStockOnly, onSaleOnly, minRating, sort]
  );

  const activeCount =
    (category ? 1 : 0) + (query ? 1 : 0) + (maxPrice < PRICE_MAX ? 1 : 0) + (inStockOnly ? 1 : 0) + (onSaleOnly ? 1 : 0) + (minRating ? 1 : 0);

  const clearAll = () => {
    setMaxPrice(PRICE_MAX);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setMinRating(0);
    setSearchInput('');
    const next = new URLSearchParams();
    if (params.get('sort')) next.set('sort', params.get('sort'));
    setParams(next, { replace: true });
  };

  const currentCategory = getCategory(category);
  const title = query && !category ? `Search results for “${query}”` : currentCategory?.name || 'Shop All Plants';
  const countFor = (slug) => products.filter((p) => p.categories.includes(slug)).length;

  return (
    <div className="shop-page">
      <section className="page-banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(23,59,42,.9), rgba(23,59,42,.4)), url(${IMAGES.shopBanner})` }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Shop', to: '/shop' }, ...(currentCategory ? [{ label: currentCategory.name }] : [])]} />
          <h1>{title}</h1>
          <p>
            {currentCategory?.description ||
              'Healthy, hand-picked plants, planters and gardening essentials — delivered fresh from our greenhouse.'}
          </p>
        </div>
      </section>

      <div className="container shop-layout">
        <div className={`filters-backdrop ${filtersOpen ? 'is-open' : ''}`} onClick={() => setFiltersOpen(false)} />
        <aside className={`filters ${filtersOpen ? 'is-open' : ''}`} aria-label="Product filters">
          <div className="filters__head">
            <h3>Filters {activeCount > 0 && <span className="pill">{activeCount}</span>}</h3>
            <button className="icon-btn filters__close" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
              <X size={20} />
            </button>
          </div>

          <div className="filter-group">
            <h4>Search</h4>
            <div className="filter-search">
              <Search size={16} />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name or category"
                aria-label="Search products"
              />
              {searchInput && (
                <button onClick={() => setSearchInput('')} aria-label="Clear search"><X size={14} /></button>
              )}
            </div>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <ul className="filter-list">
              <li>
                <label className="radio">
                  <input type="radio" name="category" checked={!category} onChange={() => setParam('category', '')} />
                  <span>All Products</span>
                  <em>{products.length}</em>
                </label>
              </li>
              {filterCategories.map((c) => (
                <li key={c.slug}>
                  <label className="radio">
                    <input type="radio" name="category" checked={category === c.slug} onChange={() => setParam('category', c.slug)} />
                    <span>{c.name}</span>
                    <em>{countFor(c.slug)}</em>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h4>Price</h4>
            <input
              type="range"
              className="range"
              min={200}
              max={PRICE_MAX}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ '--pct': `${((maxPrice - 200) / (PRICE_MAX - 200)) * 100}%` }}
              aria-label="Maximum price"
            />
            <div className="range-labels">
              <span>{formatPrice(200)}</span>
              <strong>Up to {formatPrice(maxPrice)}</strong>
            </div>
          </div>

          <div className="filter-group">
            <h4>Availability</h4>
            <label className="checkbox">
              <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
              <span>In stock only</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" checked={onSaleOnly} onChange={(e) => setOnSaleOnly(e.target.checked)} />
              <span>On sale</span>
            </label>
          </div>

          <div className="filter-group">
            <h4>Customer Rating</h4>
            {[4.5, 4, 0].map((r) => (
              <label key={r} className="radio">
                <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} />
                <span className="rating-option">
                  {r ? (<>{r}<Star size={13} fill="currentColor" /> & above</>) : 'Any rating'}
                </span>
              </label>
            ))}
          </div>

          <div className="filters__foot">
            <button className="btn btn--outline btn--block" onClick={clearAll} disabled={activeCount === 0}>
              Clear All Filters
            </button>
            <button className="btn btn--primary btn--block filters__apply" onClick={() => setFiltersOpen(false)}>
              Show {filtered.length} products
            </button>
          </div>
        </aside>

        <div className="shop-main">
          <div className="shop-toolbar">
            <button className="btn btn--outline shop-toolbar__filter" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal size={16} /> Filters {activeCount > 0 && <span className="pill">{activeCount}</span>}
            </button>
            <p className="shop-toolbar__count">
              Showing <strong>{filtered.length}</strong> of {products.length} products
            </p>
            <label className="select">
              <span>Sort by</span>
              <select value={sort} onChange={(e) => setParam('sort', e.target.value === 'featured' ? '' : e.target.value)}>
                {Object.entries(SORTS).map(([key, s]) => (
                  <option key={key} value={key}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {activeCount > 0 && (
            <div className="active-filters">
              {currentCategory && <button onClick={() => setParam('category', '')}>{currentCategory.name} <X size={13} /></button>}
              {query && <button onClick={() => { setSearchInput(''); setParam('q', ''); }}>“{query}” <X size={13} /></button>}
              {maxPrice < PRICE_MAX && <button onClick={() => setMaxPrice(PRICE_MAX)}>Under {formatPrice(maxPrice)} <X size={13} /></button>}
              {inStockOnly && <button onClick={() => setInStockOnly(false)}>In stock <X size={13} /></button>}
              {onSaleOnly && <button onClick={() => setOnSaleOnly(false)}>On sale <X size={13} /></button>}
              {minRating > 0 && <button onClick={() => setMinRating(0)}>{minRating}★ & up <X size={13} /></button>}
              <button className="active-filters__clear" onClick={clearAll}>Clear all</button>
            </div>
          )}

          {!loading && filtered.length === 0 ? (
            <EmptyState
              title="No plants found"
              text={query ? `We couldn’t find anything matching “${query}”. Try a different word or clear your filters.` : 'No products match these filters. Try widening your selection.'}
              actionLabel="Clear All Filters"
              onAction={clearAll}
            />
          ) : (
            <ProductGrid products={filtered} loading={loading} columns={3} skeletons={6} animate={false} />
          )}
        </div>
      </div>
    </div>
  );
}

import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import Reveal from './Reveal';

export default function ProductGrid({ products, loading = false, skeletons = 8, columns = 4, animate = true }) {
  return (
    <div className={`product-grid product-grid--${columns}`}>
      {loading
        ? Array.from({ length: skeletons }).map((_, i) => <SkeletonCard key={i} />)
        : products.map((p, i) =>
            animate ? (
              <Reveal key={p.id} delay={(i % columns) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ) : (
              <ProductCard key={p.id} product={p} />
            )
          )}
    </div>
  );
}

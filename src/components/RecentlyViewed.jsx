import { useUI } from '../context/UIContext';
import ProductGrid from './ProductGrid';
import SectionHeading from './SectionHeading';

export default function RecentlyViewed({ excludeId, title = 'Recently Viewed' }) {
  const { recentlyViewed } = useUI();
  const list = recentlyViewed.filter((p) => p.id !== excludeId).slice(0, 4);
  if (list.length === 0) return null;
  return (
    <section className="section section--tight">
      <div className="container">
        <SectionHeading eyebrow="Pick up where you left off" title={title} />
        <ProductGrid products={list} />
      </div>
    </section>
  );
}

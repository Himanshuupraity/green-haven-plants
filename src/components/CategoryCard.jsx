import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { products } from '../data/products';

export default function CategoryCard({ category }) {
  const count = products.filter((p) => p.categories.includes(category.slug)).length;
  return (
    <Link to={`/shop?category=${category.slug}`} className="category-card">
      <img src={category.image} alt={category.name} loading="lazy" />
      <div className="category-card__overlay" />
      <div className="category-card__content">
        <span className="category-card__count">{count} products</span>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <span className="category-card__cta">
          Shop now <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}

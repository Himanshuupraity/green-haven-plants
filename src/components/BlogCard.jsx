import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

export default function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <Link to={`/plant-care/${post.slug}`} className="blog-card__media">
        <img src={post.image} alt={post.title} loading="lazy" />
        <span className="blog-card__tag">{post.category}</span>
      </Link>
      <div className="blog-card__body">
        <span className="blog-card__meta">
          {post.date} · <Clock size={13} /> {post.readTime}
        </span>
        <h3>
          <Link to={`/plant-care/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <Link to={`/plant-care/${post.slug}`} className="link-arrow">
          Read More <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

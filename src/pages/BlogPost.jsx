import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import BlogCard from '../components/BlogCard';
import ProductGrid from '../components/ProductGrid';
import { blogPosts } from '../data/content';
import { bestsellers } from '../data/products';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;
  const others = blogPosts.filter((p) => p.slug !== slug);

  return (
    <>
      <article className="container article">
        <Breadcrumb items={[{ label: 'Plant Care', to: '/plant-care' }, { label: post.title }]} />
        <header className="article__head">
          <span className="eyebrow">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="article__meta">{post.date} · <Clock size={14} /> {post.readTime} · By the Verdora Plant Team</p>
        </header>
        <img src={post.image.replace('w=900&h=640', 'w=1400&h=700')} alt={post.title} className="article__img" />
        <div className="article__body">
          <p className="lead">{post.excerpt}</p>
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <Link to="/plant-care" className="link-arrow"><ArrowLeft size={16} /> Back to all articles</Link>
        </div>
      </article>

      <section className="section section--white">
        <div className="container">
          <h2 className="section-title">Plants Mentioned & Loved</h2>
          <ProductGrid products={bestsellers.slice(0, 4)} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Keep Reading</h2>
          <div className="blog-grid blog-grid--2">
            {others.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}

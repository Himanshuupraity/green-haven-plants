import { Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import BlogCard from '../components/BlogCard';
import Reveal from '../components/Reveal';
import Newsletter from '../components/Newsletter';
import { blogPosts, IMAGES } from '../data/content';

const BASICS = [
  { Icon: Sun, title: 'Light', text: 'Bright, indirect light suits most houseplants. Succulents love direct sun.' },
  { Icon: Droplets, title: 'Water', text: 'Water when the top 3–5 cm of soil is dry. Drainage holes are a must.' },
  { Icon: Thermometer, title: 'Temperature', text: 'Keep plants between 18–30°C and away from AC vents and heaters.' },
  { Icon: Wind, title: 'Humidity', text: 'Group plants together or use a pebble tray in dry, air-conditioned rooms.' },
];

export default function PlantCare() {
  return (
    <>
      <section className="page-banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(23,59,42,.9), rgba(23,59,42,.45)), url(${IMAGES.careHero})` }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Plant Care' }]} />
          <h1>The Plant Care Journal</h1>
          <p>Expert guides, seasonal tips and styling ideas from the Verdora horticulture team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="care-basics">
            {BASICS.map(({ Icon, title, text }, i) => (
              <Reveal key={title} className="care-basic" delay={i * 80}>
                <Icon size={26} strokeWidth={1.6} />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 90}><BlogCard post={post} /></Reveal>
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}

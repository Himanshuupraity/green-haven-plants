import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Sprout, Users } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Features from '../components/Features';
import Reveal from '../components/Reveal';
import Newsletter from '../components/Newsletter';
import { IMAGES } from '../data/content';

const STATS = [
  ['2016', 'Founded in Bengaluru'],
  ['25k+', 'Happy customers'],
  ['200+', 'Plant varieties'],
  ['4.8★', 'Average rating'],
];

const VALUES = [
  { Icon: Sprout, title: 'Grown with care', text: 'Every plant is nurtured in our own greenhouse for weeks before it is ready for your home.' },
  { Icon: Recycle, title: 'Kind to the planet', text: 'Plastic-free packaging, recycled nursery pots and peat-free potting mixes wherever possible.' },
  { Icon: Users, title: 'Community first', text: 'Free workshops, plant swaps and lifetime care support for every customer.' },
];

export default function About() {
  return (
    <>
      <div className="container page-pad">
        <Breadcrumb items={[{ label: 'About Us' }]} />
        <section className="about-hero">
          <Reveal className="about-hero__text">
            <span className="eyebrow">Our story</span>
            <h1>Rooted in a love for <em>living things</em>.</h1>
            <p>
              Verdora began as a small rooftop nursery with a simple belief: every home deserves a little piece of nature.
              Today, our team of horticulturists and plant lovers grows, nurtures and hand-delivers thousands of plants
              each month — each one chosen to thrive in Indian homes and climates.
            </p>
            <p>
              We work closely with local growers and artisan potters, so every purchase supports skilled craftspeople
              and sustainable farming communities.
            </p>
            <Link to="/shop" className="btn btn--primary btn--lg">Shop the Collection <ArrowRight size={18} /></Link>
          </Reveal>
          <Reveal className="about-hero__media" delay={120}>
            <img src={IMAGES.about} alt="Inside a flower and plant shop" />
            <img src={IMAGES.aboutSecondary} alt="Gardener holding a potted plant" className="about-hero__inset" />
          </Reveal>
        </section>
      </div>

      <section className="stats-band">
        <div className="container stats-band__grid">
          {STATS.map(([n, l]) => (
            <div key={l}><strong>{n}</strong><span>{l}</span></div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="values">
            <Reveal className="values__media">
              <img src={IMAGES.aboutTeam} alt="Hands planting seedlings" />
            </Reveal>
            <div>
              <span className="eyebrow">What we believe</span>
              <h2>Good plants. Good people. Good planet.</h2>
              <ul className="values__list">
                {VALUES.map(({ Icon, title, text }, i) => (
                  <Reveal as="li" key={title} delay={i * 90}>
                    <span className="feature__icon"><Icon size={22} /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <Features />
        </div>
      </section>

      <Newsletter />
    </>
  );
}

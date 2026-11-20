import { Instagram } from 'lucide-react';
import { instagramPosts } from '../data/content';
import Reveal from './Reveal';

export default function InstagramSection() {
  return (
    <section className="section insta">
      <div className="container">
        <Reveal className="section-heading section-heading--center">
          <div>
            <span className="eyebrow">#GrowWithVerdora</span>
            <h2>Spaces Our Community Loves</h2>
            <p>Tag @verdora.plants to be featured. Real homes, real plants, real joy.</p>
          </div>
        </Reveal>
      </div>
      <div className="insta__grid">
        {instagramPosts.map((src, i) => (
          <a key={src} href="#" onClick={(e) => e.preventDefault()} className="insta__item" aria-label={`Community photo ${i + 1} (demo)`}>
            <img src={src} alt="" loading="lazy" />
            <span className="insta__overlay"><Instagram size={26} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

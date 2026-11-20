import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, text, link, linkLabel = 'View all', center = false }) {
  return (
    <Reveal className={`section-heading ${center ? 'section-heading--center' : ''}`}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {link && (
        <Link to={link} className="link-arrow">
          {linkLabel} <ArrowRight size={16} />
        </Link>
      )}
    </Reveal>
  );
}

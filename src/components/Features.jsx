import { Headphones, Leaf, PackageCheck, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';

const FEATURES = [
  { Icon: Leaf, title: 'Healthy & Fresh Plants', text: 'Nurtured in our own greenhouse and hand-inspected before they leave.' },
  { Icon: PackageCheck, title: 'Carefully Packed Delivery', text: 'Custom, eco-friendly packaging that keeps every leaf safe in transit.' },
  { Icon: Headphones, title: 'Expert Plant Care Support', text: 'Free lifetime advice from our horticulturists over chat and WhatsApp.' },
  { Icon: ShieldCheck, title: 'Quality Guaranteed', text: '7-day healthy plant guarantee — or we’ll replace it, free of charge.' },
];

export default function Features({ compact = false }) {
  return (
    <div className={`features ${compact ? 'features--compact' : ''}`}>
      {FEATURES.map(({ Icon, title, text }, i) => (
        <Reveal key={title} className="feature" delay={i * 90}>
          <span className="feature__icon"><Icon size={26} strokeWidth={1.6} /></span>
          <h3>{title}</h3>
          <p>{text}</p>
        </Reveal>
      ))}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Leaf, Truck, Gift } from 'lucide-react';

const MESSAGES = [
  { icon: Truck, text: 'Free Delivery on Orders Above ₹999' },
  { icon: Gift, text: 'Get 15% OFF your first order — use code GREEN15' },
  { icon: Leaf, text: '7-Day Healthy Plant Guarantee on every order' },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const { icon: Icon, text } = MESSAGES[index];
  return (
    <div className="announcement">
      <p key={index} className="announcement__msg">
        <Icon size={14} /> {text}
      </p>
    </div>
  );
}

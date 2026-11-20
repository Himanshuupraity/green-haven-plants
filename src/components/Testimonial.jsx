import { Quote } from 'lucide-react';
import StarRating from './StarRating';

export default function Testimonial({ review }) {
  return (
    <figure className="testimonial">
      <Quote size={28} className="testimonial__quote" />
      <StarRating rating={review.rating} size={15} />
      <blockquote>{review.text}</blockquote>
      <figcaption>
        <img src={review.avatar} alt={review.name} loading="lazy" />
        <div>
          <strong>{review.name}</strong>
          <span>{review.city} · Bought {review.product}</span>
        </div>
      </figcaption>
    </figure>
  );
}

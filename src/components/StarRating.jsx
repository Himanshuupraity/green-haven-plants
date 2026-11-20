import { Star } from 'lucide-react';

export default function StarRating({ rating, reviews, size = 14, showValue = false }) {
  return (
    <div className="stars" aria-label={`Rated ${rating} out of 5`}>
      <span className="stars__icons">
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.max(0, Math.min(1, rating - (i - 1)));
          return (
            <span key={i} className="stars__star" style={{ width: size, height: size }}>
              <Star size={size} className="stars__empty" />
              <span className="stars__fill" style={{ width: `${fill * 100}%` }}>
                <Star size={size} />
              </span>
            </span>
          );
        })}
      </span>
      {showValue && <span className="stars__value">{rating.toFixed(1)}</span>}
      {reviews !== undefined && <span className="stars__count">({reviews})</span>}
    </div>
  );
}

import { Link } from 'react-router-dom';

/** Line-art illustration of a little potted sprout, used for empty states. */
export function PlantIllustration({ variant = 'pot' }) {
  return (
    <svg className="empty-illustration" viewBox="0 0 200 180" aria-hidden="true">
      <ellipse cx="100" cy="165" rx="70" ry="8" fill="#E8EFE8" />
      {variant === 'bag' ? (
        <>
          <path d="M55 70h90l-8 92H63z" fill="#F8F7F0" stroke="#234D36" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M78 70V58a22 22 0 0 1 44 0v12" fill="none" stroke="#234D36" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M100 128v-28" stroke="#234D36" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M100 104c0-12 8-20 20-21 0 12-8 20-20 21z" fill="#C6A76B" />
          <path d="M100 114c0-10-7-17-17-18 0 10 7 17 17 18z" fill="#234D36" />
        </>
      ) : (
        <>
          <path d="M66 112h68l-9 50H75z" fill="#C6A76B" opacity=".9" />
          <rect x="60" y="104" width="80" height="12" rx="3" fill="#234D36" />
          <path d="M100 104V58" stroke="#234D36" strokeWidth="3" strokeLinecap="round" />
          <path d="M100 66c0-16 11-28 28-29 0 16-11 28-28 29z" fill="#234D36" />
          <path d="M100 84c0-14-10-24-25-25 0 14 10 24 25 25z" fill="#5f8a6c" />
          <circle cx="146" cy="40" r="4" fill="#C6A76B" opacity=".5" />
          <circle cx="54" cy="56" r="3" fill="#234D36" opacity=".25" />
        </>
      )}
    </svg>
  );
}

export default function EmptyState({ title, text, actionLabel = 'Continue Shopping', actionTo = '/shop', variant, onAction }) {
  return (
    <div className="empty-state">
      <PlantIllustration variant={variant} />
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {onAction ? (
        <button className="btn btn--primary" onClick={onAction}>{actionLabel}</button>
      ) : (
        <Link to={actionTo} className="btn btn--primary">{actionLabel}</Link>
      )}
    </div>
  );
}

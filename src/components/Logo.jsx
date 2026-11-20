import { Link } from 'react-router-dom';

export default function Logo({ light = false, tagline = true }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label="Verdora home">
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M20 31V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 19c0-6 4-10 10-10.5C30 14.5 26 18.5 20 19z" fill="#C6A76B" />
        <path d="M20 24c0-5.5-3.5-9-9-9.5 0 5.5 3.5 9 9 9.5z" fill="currentColor" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">VERDORA</span>
        {tagline && <span className="logo__tagline">Bring Nature Home</span>}
      </span>
    </Link>
  );
}

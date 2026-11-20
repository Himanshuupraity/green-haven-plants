import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistButton({ product, className = '', withLabel = false }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [pop, setPop] = useState(false);
  const active = isWishlisted(product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    setPop(true);
    setTimeout(() => setPop(false), 450);
  };

  return (
    <button
      type="button"
      className={`wish-btn ${active ? 'is-active' : ''} ${pop ? 'is-popping' : ''} ${className}`}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
    >
      <Heart size={withLabel ? 18 : 17} fill={active ? 'currentColor' : 'none'} />
      {withLabel && <span>{active ? 'Wishlisted' : 'Add to Wishlist'}</span>}
    </button>
  );
}

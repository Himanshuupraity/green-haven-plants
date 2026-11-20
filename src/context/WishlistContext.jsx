import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { products } from '../data/products';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage('verdora-wishlist', []);
  const showToast = useToast();

  const items = useMemo(
    () => ids.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [ids]
  );

  const isWishlisted = useCallback((id) => ids.includes(id), [ids]);

  const toggleWishlist = useCallback(
    (product) => {
      const exists = ids.includes(product.id);
      setIds(exists ? ids.filter((i) => i !== product.id) : [product.id, ...ids]);
      showToast({
        type: 'wishlist',
        title: exists ? 'Removed from wishlist' : 'Saved to wishlist',
        message: product.name,
      });
    },
    [ids, setIds, showToast]
  );

  const removeFromWishlist = useCallback(
    (id) => setIds((prev) => prev.filter((i) => i !== id)),
    [setIds]
  );

  return (
    <WishlistContext.Provider
      value={{ items, count: items.length, isWishlisted, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { products } from '../data/products';

const UIContext = createContext(null);

/** Quick-view modal, search overlay and recently-viewed products. */
export function UIProvider({ children }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [recentIds, setRecentIds] = useLocalStorage('verdora-recent', []);

  const addRecentlyViewed = useCallback(
    (id) => setRecentIds((prev) => [id, ...prev.filter((i) => i !== id)].slice(0, 8)),
    [setRecentIds]
  );

  const recentlyViewed = useMemo(
    () => recentIds.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [recentIds]
  );

  return (
    <UIContext.Provider
      value={{
        quickViewProduct,
        openQuickView: setQuickViewProduct,
        closeQuickView: () => setQuickViewProduct(null),
        searchOpen,
        openSearch: () => setSearchOpen(true),
        closeSearch: () => setSearchOpen(false),
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);

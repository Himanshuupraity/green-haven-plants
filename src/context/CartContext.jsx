import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { products } from '../data/products';
import { DELIVERY_CHARGE, FREE_SHIPPING_THRESHOLD } from '../utils/format';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const COUPONS = {
  GREEN15: { label: '15% off your first order', percent: 15 },
};

export function CartProvider({ children }) {
  // Stored as [{ id, qty }] so product data stays the single source of truth.
  const [lines, setLines] = useLocalStorage('verdora-cart', []);
  const [coupon, setCoupon] = useLocalStorage('verdora-coupon', null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const showToast = useToast();

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = products.find((p) => p.id === line.id);
          return product ? { ...product, qty: line.qty } : null;
        })
        .filter(Boolean),
    [lines]
  );

  const addToCart = useCallback(
    (product, qty = 1, { openDrawer = true, silent = false } = {}) => {
      if (product.stock === 0) return;
      setLines((prev) => {
        const existing = prev.find((l) => l.id === product.id);
        if (existing) {
          return prev.map((l) =>
            l.id === product.id ? { ...l, qty: Math.min(l.qty + qty, 10) } : l
          );
        }
        return [...prev, { id: product.id, qty }];
      });
      if (!silent) {
        showToast({
          title: 'Added to cart',
          message: `${product.name}${qty > 1 ? ` × ${qty}` : ''}`,
          image: product.image,
        });
      }
      if (openDrawer) setDrawerOpen(true);
    },
    [setLines, showToast]
  );

  const updateQty = useCallback(
    (id, qty) => {
      setLines((prev) =>
        qty < 1
          ? prev.filter((l) => l.id !== id)
          : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 10) } : l))
      );
    },
    [setLines]
  );

  const removeFromCart = useCallback(
    (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
    [setLines]
  );

  const clearCart = useCallback(() => {
    setLines([]);
    setCoupon(null);
  }, [setLines, setCoupon]);

  const applyCoupon = useCallback(
    (code) => {
      const key = code.trim().toUpperCase();
      if (COUPONS[key]) {
        setCoupon(key);
        return true;
      }
      return false;
    },
    [setCoupon]
  );

  const totals = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const mrp = items.reduce((sum, i) => sum + (i.originalPrice || i.price) * i.qty, 0);
    const discount = coupon && COUPONS[coupon] ? Math.round((subtotal * COUPONS[coupon].percent) / 100) : 0;
    const delivery = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_CHARGE;
    return {
      count,
      subtotal,
      savings: mrp - subtotal,
      discount,
      delivery,
      total: subtotal - discount + delivery,
      toFreeShipping: Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0),
    };
  }, [items, coupon]);

  const value = {
    items,
    ...totals,
    coupon,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon: () => setCoupon(null),
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);

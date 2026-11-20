export const img = (id, w = 800, h = w, extra = '') =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80${extra}`;

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const formatPrice = (value) => inr.format(value);

export const discountPercent = (price, original) =>
  original && original > price ? Math.round(((original - price) / original) * 100) : 0;

export const FREE_SHIPPING_THRESHOLD = 999;
export const DELIVERY_CHARGE = 79;

export const DEMO_CONTACT = {
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'hello@verdora.demo',
  address: '42 Greenway Lane, Indiranagar, Bengaluru 560038',
};

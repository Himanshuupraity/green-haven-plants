# VERDORA — Bring Nature Home 🌱

A premium plant e-commerce **frontend demo** built with React + Vite. There is no backend: all products are static sample data, and the cart, wishlist and recently-viewed lists are saved in `localStorage`.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Features

- **Homepage:** rotating announcement bar, sticky header, animated hero, category cards, bestsellers, a promo banner, new arrivals, a "Why Choose Us" section, a reviews slider, care-tip articles, recently viewed products, a community photo grid and a newsletter signup.
- **Shop** (`/shop`): category, price, availability, on-sale and rating filters; 6 sort options; live search; active-filter chips; skeleton loading; a slide-out filter drawer on mobile. Filters can be set from the URL (`?category=indoor&q=palm&sort=newest`).
- **Product page** (`/product/:slug`): image gallery with hover zoom; size, light, water and care specs; quantity selector; Add to Cart; Buy Now; demo PIN-code delivery checker; Description, Care Guide and Reviews tabs; related products; a sticky buy bar on mobile.
- **Cart drawer and cart page:** change quantities, remove items, save for later, a free-delivery progress bar (free above ₹999, otherwise ₹79), and coupon `GREEN15` for 15% off.
- **Checkout** (demo only): validated address form with Cash on Delivery or UPI on Delivery, and an order-confirmation screen. No payment details are collected.
- **Also included:** wishlist, quick-view modal, search overlay, toasts, WhatsApp button, back-to-top button, About, Contact (with FAQ), Plant Care journal with article pages, and a 404 page.

## Structure

```
src/
  components/   Header, Footer, ProductCard, CategoryCard, Hero, CartDrawer, SearchBar, QuickViewModal, …
  pages/        Home, Shop, ProductDetails, Cart, Checkout, Wishlist, About, Contact, PlantCare, BlogPost, NotFound
  context/      CartContext, WishlistContext, UIContext (quick view, search, recently viewed), ToastContext
  data/         products.js, categories.js, content.js (blog, testimonials, images)
  styles/       global.css (tokens), layout.css, components.css, pages.css
```

## Notes for the demo

- Contact details, the WhatsApp number and social links are **placeholders** and are labelled "demo" in the UI.
- Photos come from Unsplash's CDN. The **Areca Palm** and **Jade Plant** listings use stand-in photos (tropical palm foliage and a generic succulent). Swap them for the shop's own photos before going live. Each product's photo ID is in `src/data/products.js`.
- To edit products, change `src/data/products.js`. Each entry needs a unique `slug` and `id`.

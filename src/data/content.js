import { img } from '../utils/format';

export const IMAGES = {
  hero: img('1618220179428-22790b461013', 1400, 1200),
  promo: img('1545165375-1b744b9ed444', 1200, 900),
  shopBanner: img('1497250681960-ef046c08a56e', 1800, 500),
  about: img('1487070183336-b863922373d4', 1000, 1200),
  aboutSecondary: img('1438109382753-8368e7e1e7cf', 800, 800),
  aboutTeam: img('1530836369250-ef72a3f5cda8', 1000, 700),
  careHero: img('1523348837708-15d4a09cfac2', 1800, 600),
  contact: img('1601985705806-5b9a71f6004f', 1000, 1100),
};

export const blogPosts = [
  {
    slug: 'indoor-plant-care-guide',
    title: 'How to Take Care of Indoor Plants',
    excerpt:
      'Light, water, humidity and feeding — the four essentials that keep your houseplants thriving all year round.',
    image: img('1598880940371-c756e015fea1', 900, 640),
    category: 'Plant Care',
    readTime: '6 min read',
    date: '12 Nov 2026',
    sections: [
      {
        heading: 'Start with the right light',
        body: 'Most houseplants originate from tropical forest floors where sunlight is bright but filtered. A spot one to two metres from an east- or west-facing window is ideal for the majority of foliage plants. If leaves stretch towards the window or lose their variegation, your plant is asking for more light.',
      },
      {
        heading: 'Water deeply, but less often',
        body: 'Overwatering is the most common reason indoor plants struggle. Push a finger 3–5 cm into the soil: if it is dry, water slowly until it drains from the bottom, then empty the saucer. In Indian summers you may water weekly; in winter, every 10–14 days is often enough.',
      },
      {
        heading: 'Boost humidity naturally',
        body: 'Air-conditioning dries the air. Group plants together, place them on a tray of pebbles and water, or mist tropical varieties like Calatheas in the morning.',
      },
      {
        heading: 'Feed during the growing season',
        body: 'From March to October, feed with a balanced liquid fertiliser or a sprinkle of vermicompost once a month. Pause feeding during the cooler months when growth slows.',
      },
    ],
  },
  {
    slug: 'best-plants-for-bedroom',
    title: 'Best Plants for Your Bedroom',
    excerpt:
      'Calming, low-maintenance plants that purify the air and help you sleep better — and where to place them.',
    image: img('1586105251261-72a756497a11', 900, 640),
    category: 'Styling',
    readTime: '4 min read',
    date: '28 Oct 2026',
    sections: [
      {
        heading: 'Snake Plant',
        body: 'Unlike most plants, the Snake Plant releases oxygen at night. It tolerates low light and infrequent watering, making it the perfect bedside companion.',
      },
      {
        heading: 'Peace Lily',
        body: 'Its graceful white blooms add serenity, and it helps raise humidity — a welcome effect in air-conditioned rooms.',
      },
      {
        heading: 'English Lavender',
        body: 'Place a pot on a sunny bedroom windowsill. Its gentle fragrance has long been associated with relaxation and restful sleep.',
      },
      {
        heading: 'Styling tip',
        body: 'Mix heights: a tall plant in a corner, a trailing plant on a shelf and a small succulent on the nightstand create a layered, restful look.',
      },
    ],
  },
  {
    slug: 'how-often-to-water-plants',
    title: 'How Often Should You Water Your Plants?',
    excerpt:
      'There is no one-size-fits-all schedule. Here is a simple, season-by-season watering cheat sheet.',
    image: img('1515150144380-bca9f1650ed9', 900, 640),
    category: 'Watering',
    readTime: '5 min read',
    date: '15 Oct 2026',
    sections: [
      {
        heading: 'Check the soil, not the calendar',
        body: 'The finger test is your best tool. Most foliage plants want water when the top few centimetres are dry; succulents prefer the soil to dry out completely.',
      },
      {
        heading: 'Summer (March – June)',
        body: 'Foliage plants: every 4–6 days. Flowering plants: every 2–3 days. Succulents: every 10 days.',
      },
      {
        heading: 'Monsoon (July – September)',
        body: 'Humidity is high, so reduce watering. Ensure pots drain freely to avoid root rot.',
      },
      {
        heading: 'Winter (October – February)',
        body: 'Growth slows down. Water foliage plants every 8–12 days and succulents every 3 weeks.',
      },
    ],
  },
];

export const testimonials = [
  {
    name: 'Priya Sharma',
    city: 'Bengaluru',
    rating: 5,
    avatar: img('1438761681033-6461ffad8d80', 120, 120),
    text: 'My Monstera arrived in perfect condition — not a single torn leaf. The packaging was thoughtful and the plant was much bigger than I expected. Verdora is now my go-to plant shop.',
    product: 'Monstera Deliciosa',
  },
  {
    name: 'Arjun Mehta',
    city: 'Mumbai',
    rating: 5,
    avatar: img('1507003211169-0a1dd7228f2d', 120, 120),
    text: 'I have killed many plants before. The care card and WhatsApp support made all the difference. Three months on, my Snake Plant and ZZ are thriving.',
    product: 'Snake Plant',
  },
  {
    name: 'Neha Kapoor',
    city: 'Delhi NCR',
    rating: 4,
    avatar: img('1494790108377-be9c29b29330', 120, 120),
    text: 'Gorgeous ceramic planters and very healthy plants. Delivery took a day longer than expected but the team kept me updated throughout.',
    product: 'Speckled Ceramic Planters',
  },
  {
    name: 'Rahul Iyer',
    city: 'Chennai',
    rating: 5,
    avatar: img('1500648767791-00dcc994a43e', 120, 120),
    text: 'Ordered a Fiddle Leaf Fig for my studio. It looks like it came straight out of a design magazine. Fantastic quality for the price.',
    product: 'Fiddle Leaf Fig',
  },
  {
    name: 'Sneha Reddy',
    city: 'Hyderabad',
    rating: 5,
    avatar: img('1544005313-94ddf0286df2', 120, 120),
    text: 'Gifted the Magenta Orchid to my mother and she loved it. The blooms lasted for weeks. Beautiful presentation too!',
    product: 'Magenta Moth Orchid',
  },
  {
    name: 'Ishita Malhotra',
    city: 'Pune',
    rating: 4,
    avatar: img('1534528741775-53994a69daeb', 120, 120),
    text: 'Set up my whole balcony garden with Verdora. Great variety, honest advice and the plants have adapted really well.',
    product: 'English Lavender',
  },
];

export const instagramPosts = [
  img('1567225557594-88d73e55f2cb', 500, 500),
  img('1558603668-6570496b66f8', 500, 500),
  img('1545241047-6083a3684587', 500, 500),
  img('1518335935020-cfd6580c1ab4', 500, 500),
  img('1462530260150-162092dbf011', 500, 500),
  img('1563241527-3004b7be0ffd', 500, 500),
];

export const faqs = [
  {
    q: 'How are plants packed for delivery?',
    a: 'Every plant is watered, its soil secured with breathable wrap, and it travels upright in a custom-fit, recyclable box with cushioning around the leaves.',
  },
  {
    q: 'What if my plant arrives damaged?',
    a: 'Share a photo with us within 48 hours of delivery and we will send a free replacement — no questions asked.',
  },
  {
    q: 'Do plants come with pots?',
    a: 'Plants ship in a sturdy nursery pot unless the listing mentions a ceramic planter. You can add any planter from our Pots & Planters range.',
  },
  {
    q: 'Which cities do you deliver to?',
    a: 'We currently deliver to 25+ cities across India. Use the PIN code checker on any product page to see delivery estimates.',
  },
];

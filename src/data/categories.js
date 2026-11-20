import { img } from '../utils/format';

export const categories = [
  {
    slug: 'indoor',
    name: 'Indoor Plants',
    description: 'Lush greens that thrive in homes, offices and cosy corners.',
    image: img('1604762524889-3e2fcc145683', 700, 860),
  },
  {
    slug: 'outdoor',
    name: 'Outdoor Plants',
    description: 'Hardy beauties for balconies, terraces and gardens.',
    image: img('1585320806297-9794b3e4eeae', 700, 860),
  },
  {
    slug: 'flowering',
    name: 'Flowering Plants',
    description: 'Seasonal colour and blooms that brighten every day.',
    image: img('1468327768560-75b778cbb551', 700, 860),
  },
  {
    slug: 'air-purifying',
    name: 'Air Purifying Plants',
    description: 'NASA-studied plants that freshen the air you breathe.',
    image: img('1592150621744-aca64f48394a', 700, 860),
  },
  {
    slug: 'succulents',
    name: 'Succulents & Cactus',
    description: 'Sculptural, low-water plants for sunny windowsills.',
    image: img('1459156212016-c812468e2115', 700, 860),
  },
  {
    slug: 'pots',
    name: 'Pots & Planters',
    description: 'Handcrafted ceramic, clay and concrete homes for plants.',
    image: img('1595351298020-038700609878', 700, 860),
  },
];

// Accessories appear as a filter in the shop but not as a homepage card.
export const filterCategories = [
  ...categories,
  { slug: 'accessories', name: 'Gardening Tools' },
];

export const getCategory = (slug) => filterCategories.find((c) => c.slug === slug);

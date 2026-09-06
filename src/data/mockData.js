// Mock data source for the 1Fi Marketplace.
//
// IMPORTANT: This is intentionally shaped like a real backend response
// (flat entities, ids, no UI-specific fields) so that swapping this file
// out for a real `fetch('/api/marketplace/products')` later requires zero
// changes to any component — only src/api/marketplaceApi.js changes.

// EMI tenure options offered by 1Fi (site copy: "3 months to 10 years",
// 0% interest / no-cost EMI). We generate the actual plan objects per
// product below since the monthly amount depends on price.
export const AVAILABLE_TENURES_MONTHS = [3, 6, 9, 12, 18, 24];

const buildEmiPlans = (price, maxTenure) => {
  return AVAILABLE_TENURES_MONTHS.filter((m) => m <= maxTenure).map((months) => ({
    id: `emi-${months}m`,
    tenureMonths: months,
    interestRate: 0, // 1Fi's core offering is 0% / no-cost EMI
    monthlyAmount: Math.round(price / months),
    totalPayable: price, // 0% interest => total payable equals sticker price
    processingFee: 0,
    isNoCost: true,
  }));
};

export const PRODUCTS = [
  {
    id: 'p1',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    category: 'Smartphones',
    heroImage: 'https://1fi.in/iphone_pro_home.webp',
    rating: 4.8,
    ratingCount: 1240,
    maxEmiTenureMonths: 24,
    description:
      "Apple's flagship iPhone with the A19 Pro chip, a titanium frame, and the most capable camera system yet. Buy now, pledge mutual funds, and pay later at 0% interest.",
    variants: [
      { id: 'v1', label: '256GB · Deep Blue', price: 159900 },
      { id: 'v2', label: '256GB · Silver', price: 159900 },
      { id: 'v3', label: '512GB · Deep Blue', price: 179900 },
      { id: 'v4', label: '1TB · Deep Blue', price: 209900 },
    ],
  },
  {
    id: 'p2',
    name: 'iPhone 17',
    brand: 'Apple',
    category: 'Smartphones',
    heroImage: 'https://1fi.in/iphone17_home.webp',
    rating: 4.7,
    ratingCount: 980,
    maxEmiTenureMonths: 12,
    description:
      'The latest iPhone 17 with all-day battery life and a brighter Super Retina display. Available on no-cost EMI for up to 12 months.',
    variants: [
      { id: 'v1', label: '128GB · Lavender', price: 79900 },
      { id: 'v2', label: '256GB · Lavender', price: 89900 },
      { id: 'v3', label: '256GB · Black', price: 89900 },
    ],
  },
  {
    id: 'p3',
    name: 'Galaxy S25 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    heroImage: 'https://1fi.in/samsungs25_home.webp',
    rating: 4.6,
    ratingCount: 760,
    maxEmiTenureMonths: 24,
    description:
      'Samsung\u2019s most powerful Galaxy yet, with a built-in S Pen and a 200MP camera. Instant approval, zero downpayment on 1Fi.',
    variants: [
      { id: 'v1', label: '256GB · Titanium Black', price: 129999 },
      { id: 'v2', label: '512GB · Titanium Gray', price: 144999 },
    ],
  },
  {
    id: 'p4',
    name: 'MacBook Pro',
    brand: 'Apple',
    category: 'Laptops',
    heroImage: 'https://1fi.in/macbook.webp',
    rating: 4.9,
    ratingCount: 540,
    maxEmiTenureMonths: 24,
    description:
      'MacBook Pro with the M5 chip \u2014 built for demanding workflows, with a stunning Liquid Retina XDR display and all-day battery.',
    variants: [
      { id: 'v1', label: '14-inch · 512GB', price: 199900 },
      { id: 'v2', label: '14-inch · 1TB', price: 229900 },
      { id: 'v3', label: '16-inch · 1TB', price: 269900 },
    ],
  },
  {
    id: 'p5',
    name: 'OnePlus 15',
    brand: 'OnePlus',
    category: 'Smartphones',
    heroImage: 'https://1fi.in/oneplus15_home.webp',
    rating: 4.5,
    ratingCount: 410,
    maxEmiTenureMonths: 18,
    description:
      'OnePlus 15 with Snapdragon flagship performance and 100W fast charging. Get instant approval and shop with your mutual fund limit.',
    variants: [
      { id: 'v1', label: '256GB · Storm Black', price: 64999 },
      { id: 'v2', label: '512GB · Storm Black', price: 69999 },
    ],
  },
];

// Attach computed EMI plans per variant lazily via a helper rather than
// baking them into the static array, since price varies by variant.
export const getEmiPlansForPrice = (price, maxTenureMonths) =>
  buildEmiPlans(price, maxTenureMonths);

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id);

import { PRODUCTS, getProductById, getEmiPlansForPrice } from '../data/mockData';

const NETWORK_DELAY_MS = { min: 500, max: 1100 };
const SIMULATED_ERROR_RATE = 0.08; 

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () =>
  wait(
    NETWORK_DELAY_MS.min +
      Math.random() * (NETWORK_DELAY_MS.max - NETWORK_DELAY_MS.min)
  );

const maybeFail = (context) => {
  if (Math.random() < SIMULATED_ERROR_RATE) {
    const error = new Error(
      `Unable to reach 1Fi Marketplace servers while ${context}. Please check your connection and try again.`
    );
    error.code = 'NETWORK_ERROR';
    throw error;
  }
};

/**
 * Fetch the product listing for the Marketplace tab.
 * @param {{ query?: string, category?: string }} params
 */
export async function fetchProducts({ query = '', category = null } = {}) {
  await randomDelay();
  maybeFail('loading products');

  let results = PRODUCTS;

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (query.trim().length > 0) {
    const q = query.trim().toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }

  // Return listing-friendly shape: cheapest variant price as "starting from"
  return results.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    heroImage: p.heroImage,
    rating: p.rating,
    startingPrice: Math.min(...p.variants.map((v) => v.price)),
    maxEmiTenureMonths: p.maxEmiTenureMonths,
  }));
}

/**
 * Fetch full product detail (variants, description, images) by id.
 */
export async function fetchProductDetail(productId) {
  await randomDelay();
  maybeFail('loading product details');

  const product = getProductById(productId);
  if (!product) {
    const error = new Error('This product could not be found.');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return product;
}

export async function fetchEmiPlans(price, maxTenureMonths) {
  await randomDelay();
  maybeFail('loading EMI plans');
  return getEmiPlansForPrice(price, maxTenureMonths);
}

export async function submitOrderIntent({ productId, variantId, emiPlanId }) {
  await randomDelay();
  maybeFail('submitting your selection');
  return {
    orderIntentId: `intent_${Date.now()}`,
    productId,
    variantId,
    emiPlanId,
    nextStep: 'ELIGIBILITY_CHECK',
  };
}

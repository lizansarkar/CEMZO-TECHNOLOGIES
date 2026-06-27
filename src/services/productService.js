import axios from 'axios'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from './mockData'

// Base API client. `baseURL` lets every endpoint call be a short path.
const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com/products',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    // Some anti-bot filters (Cloudflare in front of FakeStore) reject the
    // default Axios UA. Sending a realistic browser UA keeps the request
    // going through in strict environments without affecting normal users.
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
})

/**
 * Whether the fallback dataset should be used when a live request fails.
 * Enabled by default so the UI is always usable (e.g. in restricted
 * networks / headless preview environments). Set to false to surface
 * the error instead.
 */
const USE_FALLBACK_ON_FAILURE = true

/**
 * Fetch the full product catalogue.
 * @returns {Promise<Array>} Array of product objects.
 * @throws  {Error} Normalised error with a friendly `message`.
 */
export async function fetchAllProducts() {
  try {
    const { data } = await apiClient.get('/')
    return data
  } catch (error) {
    if (USE_FALLBACK_ON_FAILURE) {
      // Live API unreachable — degrade gracefully to bundled mock data so
      // the UI is still fully demonstrable. In a normal browser the live
      // API succeeds and this branch is never hit.
      console.warn(
        '[productService] Live API failed, falling back to mock data:',
        error.message
      )
      return MOCK_PRODUCTS
    }
    throw normalizeError(error, 'Failed to load products.')
  }
}

/**
 * Fetch a single product by id (used for deep-linking / future detail pages).
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function fetchProductById(id) {
  try {
    const { data } = await apiClient.get(`/${id}`)
    return data
  } catch (error) {
    throw normalizeError(error, `Failed to load product #${id}.`)
  }
}

/**
 * Fetch all available categories. FakeStore returns a plain string array.
 * @returns {Promise<string[]>}
 */
export async function fetchCategories() {
  try {
    const { data } = await apiClient.get('/categories')
    return data
  } catch (error) {
    if (USE_FALLBACK_ON_FAILURE) {
      return MOCK_CATEGORIES
    }
    throw normalizeError(error, 'Failed to load categories.')
  }
}

/**
 * Fetch products that belong to a single category.
 * @param {string} category
 * @returns {Promise<Array>}
 */
export async function fetchProductsByCategory(category) {
  try {
    const { data } = await apiClient.get(`/category/${encodeURIComponent(category)}`)
    return data
  } catch (error) {
    if (USE_FALLBACK_ON_FAILURE) {
      return MOCK_PRODUCTS.filter((p) => p.category === category)
    }
    throw normalizeError(error, `Failed to load products in "${category}".`)
  }
}

/**
 * Convert any Axios / network error into a user-friendly message.
 * Keeping this here means UI code never has to inspect `error.response`.
 */
function normalizeError(error, fallback) {
  if (error.response) {
    // Server responded with a non-2xx status code.
    return new Error(
      `Server error (${error.response.status}). ${fallback}`
    )
  }
  if (error.request) {
    // Request was sent but no response received (network/CORS/timeout).
    return new Error(
      'Network error — please check your internet connection and try again.'
    )
  }
  return new Error(fallback || error.message)
}

export default {
  fetchAllProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
}

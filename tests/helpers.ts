import { Page, expect } from '@playwright/test';

/** Application base URL (deployed on GitHub Pages) */
export const BASE_URL = 'https://nagarjunreddykasu.github.io/NDigital';

/** Valid login credentials for NDigital */
export const CREDENTIALS = {
  username: 'nagarjun',
  password: 'Test@2026',
};

/** Category route map */
export const CATEGORY_ROUTES = {
  smartphones: '/category/smartphones',
  laptops: '/category/laptops',
  tvs: '/category/tvs',
  audio: '/category/audio',
  cameras: '/category/cameras',
  gaming: '/category/gaming',
};

/**
 * Log in to NDigital using default credentials.
 * Navigates to the home page, clicks Sign In link, fills credentials, and waits for redirect.
 */
export async function loginAs(page: Page, username = CREDENTIALS.username, password = CREDENTIALS.password) {
  await page.goto(BASE_URL);
  await page.waitForSelector('[data-testid="header"]');
  await page.click('[data-testid="user-menu-button"]');
  await page.click('[data-testid="sign-in-link"]');
  await page.waitForSelector('[data-testid="login-form"]');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('[data-testid="login-submit-button"]');
  // Wait until redirected away from /login
  await page.waitForURL((url) => !url.toString().includes('/login'), { timeout: 15000 });
}

/**
 * Add a product to cart by navigating to its detail page via SPA routing and clicking "Add to Cart".
 */
export async function addProductToCart(page: Page, productId: number, quantity = 1) {
  await navigateToProductPage(page, productId);

  // Set quantity if > 1
  for (let i = 1; i < quantity; i++) {
    await page.click('[data-testid="increase-quantity-button"]');
  }

  await page.click('[data-testid="add-to-cart-button"]');
  // Cart sidebar should open
  await page.waitForSelector('[data-testid="cart-sidebar"]', { timeout: 8000 });
}

/**
 * Navigate to a product detail page via SPA routing (avoids GitHub Pages 404).
 * Loads the home page first, then uses React Router's client-side navigation.
 */
export async function navigateToProductPage(page: Page, productId: number) {
  // If already on the SPA, use client-side navigation
  const currentUrl = page.url();
  if (currentUrl.includes('/NDigital')) {
    await page.evaluate((id) => {
      window.history.pushState({}, '', `/NDigital/product/${id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, productId);
  } else {
    await page.goto(BASE_URL);
    await page.waitForSelector('[data-testid="header"]');
    await page.evaluate((id) => {
      window.history.pushState({}, '', `/NDigital/product/${id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, productId);
  }
  await page.waitForSelector('[data-testid="product-detail-page"]', { timeout: 15000 });
}

/**
 * Navigate to the login page via SPA routing.
 */
export async function navigateToLogin(page: Page) {
  const currentUrl = page.url();
  if (currentUrl.includes('/NDigital')) {
    await page.evaluate(() => {
      window.history.pushState({}, '', '/NDigital/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  } else {
    await page.goto(BASE_URL);
    await page.waitForSelector('[data-testid="header"]');
    await page.evaluate(() => {
      window.history.pushState({}, '', '/NDigital/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }
  await page.waitForSelector('[data-testid="login-form"]', { timeout: 15000 });
}

/**
 * Navigate to the cart page via SPA routing.
 */
export async function navigateToCart(page: Page) {
  const currentUrl = page.url();
  if (currentUrl.includes('/NDigital')) {
    await page.evaluate(() => {
      window.history.pushState({}, '', '/NDigital/cart');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  } else {
    await page.goto(BASE_URL);
    await page.waitForSelector('[data-testid="header"]');
    await page.evaluate(() => {
      window.history.pushState({}, '', '/NDigital/cart');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }
  await page.waitForSelector('[data-testid="cart-page"], [data-testid="cart-page-empty"]', { timeout: 15000 });
}

/**
 * Navigate to the checkout page via SPA routing.
 */
export async function navigateToCheckout(page: Page) {
  const currentUrl = page.url();
  if (currentUrl.includes('/NDigital')) {
    await page.evaluate(() => {
      window.history.pushState({}, '', '/NDigital/checkout');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  } else {
    await page.goto(BASE_URL);
    await page.waitForSelector('[data-testid="header"]');
    await page.evaluate(() => {
      window.history.pushState({}, '', '/NDigital/checkout');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }
  await page.waitForSelector('[data-testid="checkout-page"], .checkout-page', { timeout: 15000 });
}

/**
 * Format a number into INR string for comparison (e.g. 144900 → "₹1,44,900")
 */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Fill in the checkout shipping form with sample valid data.
 */
export async function fillShippingForm(page: Page) {
  await page.fill('[name="firstName"]', 'Test');
  await page.fill('[name="lastName"]', 'User');
  await page.fill('[name="email"]', 'testuser@example.com');
  await page.fill('[name="phone"]', '9876543210');
  await page.fill('[name="address"]', '123 MG Road, Koramangala');
  await page.fill('[name="city"]', 'Bengaluru');
  await page.fill('[name="state"]', 'Karnataka');
  await page.fill('[name="zipCode"]', '560034');
}

/**
 * Fill in the checkout payment form with sample valid card data.
 */
export async function fillPaymentForm(page: Page) {
  await page.fill('[name="cardNumber"]', '4111 1111 1111 1111');
  await page.fill('[name="cardName"]', 'Test User');
  await page.fill('[name="expiry"]', '12/28');
  await page.fill('[name="cvv"]', '123');
}

/**
 * Navigate to a category page by clicking the category nav link from the home page.
 */
export async function navigateToCategory(page: Page, categoryId: string) {
  await page.goto(BASE_URL);
  await page.waitForSelector('[data-testid="main-navigation"]', { timeout: 15000 });
  await page.click(`[data-testid="nav-category-${categoryId}"]`);
  await page.waitForURL(`**/category/${categoryId}**`, { timeout: 20000 });
  await page.waitForSelector('[data-testid="products-grid"], [data-testid="products-list"]', { timeout: 20000 });
}

/**
 * Assert that the category page title is visible and contains expected text.
 */
export async function verifyCategoryPageLoadedCorrectly(page: Page, expectedTitle: string) {
  const heading = page.locator('h1, [data-testid="category-title"]').first();
  await expect(heading).toBeVisible();
  const headingText = await heading.textContent();
  expect(headingText?.toLowerCase()).toContain(expectedTitle.toLowerCase());
}

/**
 * Assert that at least one product card is rendered on the page.
 */
export async function verifyProductCardsPresent(page: Page) {
  const cards = page.locator('[data-testid^="product-card"]');
  await expect(cards.first()).toBeVisible();
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  return count;
}

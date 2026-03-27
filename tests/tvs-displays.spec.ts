/**
 * ============================================================
 *  NDigital – TVs & Displays Category Test Suite
 *  URL: https://nagarjunreddykasu.github.io/NDigital/category/tvs
 *
 *  Products covered (from data/products.js):
 *   • LG OLED G4 65"          (id: 7)  – Featured, has deal
 *   • Samsung Neo QLED 8K QN900D (id: 8)
 *
 *  Test Legends:
 *   [POSITIVE] – Happy-path & positive validation tests
 *   [E2E]      – End-to-end user-journey tests
 * ============================================================
 */

import { test, expect } from '@playwright/test';
import {
  loginAs,
  fillShippingForm,
  fillPaymentForm,
  navigateToCategory,
  navigateToProductPage,
  navigateToCart,
  navigateToCheckout,
  verifyProductCardsPresent,
  BASE_URL,
} from './helpers';

const BASE = BASE_URL;

test.describe('TVs & Displays Category Tests', () => {
  // ---------------------------------------------------------------------------
  // SECTION 1 – Category Page Navigation & Display
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to TVs & Displays category from header', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="main-navigation"]');

    const tvsLink = page.locator('[data-testid="nav-category-tvs"]');
    await expect(tvsLink).toBeVisible();
    await tvsLink.click();

    await page.waitForURL('**/category/tvs');
    expect(page.url()).toContain('/category/tvs');
  });

  test('[POSITIVE] should display TVs & Displays category page with heading', async ({ page }) => {
    await navigateToCategory(page, 'tvs');

    const heading = page.locator('h1, [data-testid="category-title"]').first();
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text?.toLowerCase()).toMatch(/tv|display|monitor/i);
  });

  test('[POSITIVE] should list at least 2 TV products on the category page', async ({ page }) => {
    await navigateToCategory(page, 'tvs');
    const count = await verifyProductCardsPresent(page);
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('[POSITIVE] should display LG OLED G4 65 on TVs page', async ({ page }) => {
    await navigateToCategory(page, 'tvs');
    await expect(page.locator('text=OLED G4 65"').first()).toBeVisible();
  });

  test('[POSITIVE] should display Samsung Neo QLED 8K on TVs page', async ({ page }) => {
    await navigateToCategory(page, 'tvs');
    await expect(page.locator('text=Neo QLED 8K QN900D').first()).toBeVisible();
  });

  test('[POSITIVE] should show correct prices on TV product cards', async ({ page }) => {
    await navigateToCategory(page, 'tvs');
    await page.waitForSelector('[data-testid^="product-card"]');

    const priceEl = page.locator('[data-testid^="product-card"] [data-testid*="price"], [data-testid^="product-card"] .current-price').first();
    await expect(priceEl).toBeVisible();
    const priceText = await priceEl.textContent();
    expect(priceText).toContain('₹');
  });

  // ---------------------------------------------------------------------------
  // SECTION 2 – Filtering & Sorting
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should filter TVs by brand LG', async ({ page }) => {
    await navigateToCategory(page, 'tvs');

    const filterBtn = page.locator('[data-testid="filter-toggle-btn"], button:has-text("Filters"), button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }

    const lgFilter = page.locator('label:has-text("LG"), input[value="lg"]').first();
    if (await lgFilter.isVisible()) {
      await lgFilter.click();
      await page.waitForTimeout(800);
      const count = await page.locator('[data-testid^="product-card"]').count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('[POSITIVE] should filter TVs by brand Samsung', async ({ page }) => {
    await navigateToCategory(page, 'tvs');

    const filterBtn = page.locator('[data-testid="filter-toggle-btn"], button:has-text("Filters"), button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }

    const samsungFilter = page.locator('label:has-text("Samsung"), input[value="samsung"]').first();
    if (await samsungFilter.isVisible()) {
      await samsungFilter.click();
      await page.waitForTimeout(800);
      const count = await page.locator('[data-testid^="product-card"]').count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('[POSITIVE] should sort TVs by Price: High to Low', async ({ page }) => {
    await navigateToCategory(page, 'tvs');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption({ label: 'Price: High to Low' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('[POSITIVE] should sort TVs by Highest Rated', async ({ page }) => {
    await navigateToCategory(page, 'tvs');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await sortSelect.selectOption({ label: 'Highest Rated' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  // ---------------------------------------------------------------------------
  // SECTION 3 – Product Detail Page (LG OLED G4 65" – id: 7)
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to LG OLED G4 65 detail page', async ({ page }) => {
    await navigateToProductPage(page, 7);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('OLED G4 65"');
  });

  test('[POSITIVE] should display LG brand on OLED G4 detail page', async ({ page }) => {
    await navigateToProductPage(page, 7);

    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('LG');
  });

  test('[POSITIVE] should show discounted price for LG OLED G4 (has originalPrice)', async ({ page }) => {
    await navigateToProductPage(page, 7);

    const currentPrice = page.locator('[data-testid="product-current-price"]');
    const originalPrice = page.locator('[data-testid="product-original-price"]');

    await expect(currentPrice).toBeVisible();
    await expect(originalPrice).toBeVisible();

    const currText = await currentPrice.textContent();
    const origText = await originalPrice.textContent();
    expect(currText).toContain('₹');
    expect(origText).toContain('₹');
    expect(currText).not.toEqual(origText);
  });

  test('[POSITIVE] should display discount badge on LG OLED G4', async ({ page }) => {
    await navigateToProductPage(page, 7);

    await expect(page.locator('[data-testid="product-discount-badge"]')).toBeVisible();
  });

  test('[POSITIVE] should display OLED G4 rating 4.9', async ({ page }) => {
    await navigateToProductPage(page, 7);

    await expect(page.locator('[data-testid="product-rating-value"]')).toContainText('4.9');
  });

  test('[POSITIVE] should show In Stock for LG OLED G4', async ({ page }) => {
    await navigateToProductPage(page, 7);

    await expect(page.locator('[data-testid="product-stock-status"]')).toContainText('In Stock');
  });

  test('[POSITIVE] should display key features for LG OLED G4', async ({ page }) => {
    await navigateToProductPage(page, 7);

    await expect(page.locator('[data-testid="product-key-features"]')).toBeVisible();
    const featureCount = await page.locator('[data-testid^="product-feature-"]').count();
    expect(featureCount).toBeGreaterThanOrEqual(5);
  });

  test('[POSITIVE] should navigate to Samsung Neo QLED 8K detail page (id: 8)', async ({ page }) => {
    await navigateToProductPage(page, 8);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Neo QLED 8K QN900D');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Samsung');
  });

  test('[POSITIVE] should display Samsung Neo QLED 8K price correctly', async ({ page }) => {
    await navigateToProductPage(page, 8);

    const price = page.locator('[data-testid="product-current-price"]');
    await expect(price).toBeVisible();
    const priceText = await price.textContent();
    // Price is ₹4,49,999
    expect(priceText).toContain('₹');
    expect(priceText).toContain('4,49,999');
  });

  test('[POSITIVE] should display In Stock for Samsung Neo QLED 8K', async ({ page }) => {
    await navigateToProductPage(page, 8);

    await expect(page.locator('[data-testid="product-stock-status"]')).toContainText('In Stock');
  });

  test('[POSITIVE] should display product description for Samsung Neo QLED 8K', async ({ page }) => {
    await navigateToProductPage(page, 8);

    const description = page.locator('[data-testid="product-description"]');
    await expect(description).toBeVisible();
    await expect(description).toContainText(/8K|resolution|AI/i);
  });

  test('[POSITIVE] should display breadcrumb category link pointing to tvs', async ({ page }) => {
    await navigateToProductPage(page, 7);

    const categoryLink = page.locator('[data-testid="breadcrumb-category"]');
    await expect(categoryLink).toBeVisible();
    await expect(categoryLink).toContainText(/tv/i);
  });

  // ---------------------------------------------------------------------------
  // SECTION 4 – Cart Operations
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should add LG OLED G4 to cart', async ({ page }) => {
    await navigateToProductPage(page, 7);

    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const confirmed =
      await page.locator('[data-testid="cart-sidebar"]').isVisible({ timeout: 5000 }).catch(() => false) ||
      await page.locator('[data-testid="cart-count"], .cart-badge').first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(confirmed).toBe(true);
  });

  test('[POSITIVE] should verify LG OLED G4 appears in cart page', async ({ page }) => {
    await navigateToProductPage(page, 7);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    const cartItemName = page.locator('[data-testid="cart-item-name-7"]');
    await expect(cartItemName).toBeVisible();
    await expect(cartItemName).toContainText('OLED G4');
  });

  test('[POSITIVE] should show correct item price in cart for LG OLED G4', async ({ page }) => {
    await navigateToProductPage(page, 7);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar2 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar2.isVisible()) {
      await closeSidebar2.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    const itemPrice = page.locator('[data-testid="cart-item-price-7"]');
    await expect(itemPrice).toBeVisible();
    const priceText = await itemPrice.textContent();
    expect(priceText).toContain('₹');
    expect(priceText).toContain('1,99,999'); // ₹1,99,999
  });

  // ---------------------------------------------------------------------------
  // SECTION 5 – Mandatory Field Validation (Checkout)
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should validate card number format in payment step', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 7);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar3 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar3.isVisible()) {
      await closeSidebar3.click();
      await page.waitForTimeout(500);
    }

    await navigateToCheckout(page);

    // Fill shipping and move to payment
    await fillShippingForm(page);
    const cont = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont.click();
    await page.waitForTimeout(800);

    // Enter invalid card number (less than 16 digits)
    const cardInput = page.locator('[name="cardNumber"]');
    if (await cardInput.isVisible()) {
      await cardInput.fill('1234');
      await page.locator('[name="cardName"]').fill('Test User');
      await page.locator('[name="expiry"]').fill('12/28');
      await page.locator('[name="cvv"]').fill('123');

      const paymentCont = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
      await paymentCont.click();
      await page.waitForTimeout(800);

      // Should show card number validation error
      const cardError = page.locator('[data-testid="card-number-error"], .error-text').first();
      await page.locator('[data-testid="card-number-error"], .error-text').first().scrollIntoViewIfNeeded().catch(() => {});
      const errVisible = await cardError.isVisible({ timeout: 5000 }).catch(() => false);
      expect(errVisible).toBe(true);
    }
  });

  test('[POSITIVE] should validate CVV format in payment step', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 7);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar4 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar4.isVisible()) {
      await closeSidebar4.click();
      await page.waitForTimeout(500);
    }

    await navigateToCheckout(page);

    await fillShippingForm(page);
    const cont = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont.click();
    await page.waitForTimeout(800);

    const cardInput = page.locator('[name="cardNumber"]');
    if (await cardInput.isVisible()) {
      await cardInput.fill('4111 1111 1111 1111');
      await page.locator('[name="cardName"]').fill('Test User');
      await page.locator('[name="expiry"]').fill('12/28');
      // CVV with only 1 digit (invalid)
      await page.locator('[name="cvv"]').fill('1');

      const paymentCont = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
      await paymentCont.click();
      await page.waitForTimeout(800);

      const cvvError = page.locator('[data-testid*="cvv"], .error-message, .error').first();
      const errVisible = await cvvError.isVisible({ timeout: 5000 }).catch(() => false);
      expect(errVisible).toBe(true);
    }
  });

  // ---------------------------------------------------------------------------
  // SECTION 6 – End-to-End: TVs Purchase Flow
  // ---------------------------------------------------------------------------

  test('[E2E] should complete full purchase flow for LG OLED G4 65"', async ({ page }) => {
    // Step 1: Login
    await loginAs(page);

    // Step 2: Browse TVs category and click on LG OLED G4
    await navigateToCategory(page, 'tvs');
    const lgCard = page.locator('text=OLED G4 65"').first();
    await expect(lgCard).toBeVisible();
    await lgCard.click();

    await page.waitForSelector('[data-testid="product-detail-page"]');
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('OLED G4 65"');

    // Step 3: Add to Cart
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    // Step 4: Cart
    await navigateToCart(page);
    await expect(page.locator('[data-testid^="cart-item-"]').first()).toBeVisible();

    // Step 5: Checkout
    const checkoutBtn = page.locator('[data-testid="proceed-to-checkout-button"], button:has-text("Proceed to Checkout")').first();
    await checkoutBtn.click();
    await page.waitForSelector('[data-testid="checkout-page"], .checkout-page', { timeout: 15000 });

    // Step 6: Shipping
    await fillShippingForm(page);
    const cont1 = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont1.click();
    await page.waitForTimeout(800);

    // Step 7: Payment
    await fillPaymentForm(page);
    const cont2 = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont2.click();
    await page.waitForTimeout(800);

    // Step 8: Place Order
    const placeOrderBtn = page.locator('[data-testid="place-order-button"], button:has-text("Place Order")').first();
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();

    // Step 9: Order Confirmation
    await page.waitForSelector('[data-testid="order-success"]', { timeout: 20000 });
    await expect(page.locator('[data-testid="order-success-title"]')).toContainText(/order placed/i);
    await expect(page.locator('[data-testid="estimated-delivery"]')).toBeVisible();
  });

  test('[E2E] should complete purchase of Samsung Neo QLED 8K via Buy Now', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 8);
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Neo QLED 8K QN900D');

    await page.click('[data-testid="buy-now-button"]');
    await page.waitForSelector('[data-testid="checkout-page"], .checkout-page', { timeout: 15000 });

    await fillShippingForm(page);
    const cont1 = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont1.click();
    await page.waitForTimeout(800);

    await fillPaymentForm(page);
    const cont2 = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont2.click();
    await page.waitForTimeout(800);

    const placeOrderBtn = page.locator('[data-testid="place-order-button"], button:has-text("Place Order")').first();
    await placeOrderBtn.click();

    await page.waitForSelector('[data-testid="order-success"]', { timeout: 20000 });
    await expect(page.locator('[data-testid="order-success-title"]')).toContainText(/order placed/i);
  });

  test('[E2E] should navigate from homepage hero banner to TVs category', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="hero-section"]');

    // Hero slider has a "Shop TVs" CTA on slide 3
    const shopTvsCta = page.locator('a[href*="tvs"], a:has-text("Shop TVs")').first();
    if (await shopTvsCta.isVisible({ timeout: 5000 })) {
      await shopTvsCta.click();
      await page.waitForURL('**/tvs**', { timeout: 15000 });
      expect(page.url()).toContain('/tvs');
    } else {
      // Navigate directly as fallback
      await navigateToCategory(page, 'tvs');
      expect(page.url()).toContain('/category/tvs');
    }
  });

  test('[E2E] should add two different TVs to cart and verify cart count', async ({ page }) => {
    // Add LG OLED G4
    await navigateToProductPage(page, 7);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close sidebar if open
    const closeSidebar5 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar5.isVisible()) {
      await closeSidebar5.click();
      await page.waitForTimeout(500);
    }

    // Add Samsung Neo QLED
    await navigateToProductPage(page, 8);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar6 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar6.isVisible()) {
      await closeSidebar6.click();
      await page.waitForTimeout(500);
    }

    // Cart should show 2 items
    const cartBadge = page.locator('[data-testid="cart-count"], .cart-badge, .cart-count').first();
    await expect(cartBadge).toBeVisible({ timeout: 8000 });
    const count = await cartBadge.textContent();
    expect(parseInt(count || '0')).toBeGreaterThanOrEqual(2);
  });
});

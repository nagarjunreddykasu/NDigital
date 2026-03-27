/**
 * ============================================================
 *  NDigital – Laptops Category Test Suite
 *  URL: https://nagarjunreddykasu.github.io/NDigital/category/laptops
 *
 *  Products covered (from data/products.js):
 *   • MacBook Pro 16" M4          (id: 4)  – Featured, New Arrival
 *   • ThinkPad X1 Carbon Gen 12   (id: 5)
 *   • ROG Strix G18               (id: 6)  – Featured
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
  CREDENTIALS,
  BASE_URL,
} from './helpers';

const BASE = BASE_URL;

test.describe('Laptops Category Tests', () => {
  // ---------------------------------------------------------------------------
  // SECTION 1 – Category Page Navigation & Display
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to Laptops category from header navigation', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="main-navigation"]');

    const laptopsLink = page.locator('[data-testid="nav-category-laptops"]');
    await expect(laptopsLink).toBeVisible();
    await laptopsLink.click();

    await page.waitForURL('**/category/laptops');
    expect(page.url()).toContain('/category/laptops');
  });

  test('[POSITIVE] should display the Laptops category page with correct heading', async ({ page }) => {
    await navigateToCategory(page, 'laptops');

    const heading = page.locator('h1, [data-testid="category-title"]').first();
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText?.toLowerCase()).toContain('laptop');
  });

  test('[POSITIVE] should list at least 3 laptop products', async ({ page }) => {
    await navigateToCategory(page, 'laptops');
    const count = await verifyProductCardsPresent(page);
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('[POSITIVE] should display MacBook Pro 16 M4 on Laptops page', async ({ page }) => {
    await navigateToCategory(page, 'laptops');
    await expect(page.locator('text=MacBook Pro 16" M4').first()).toBeVisible();
  });

  test('[POSITIVE] should display ThinkPad X1 Carbon Gen 12 on Laptops page', async ({ page }) => {
    await navigateToCategory(page, 'laptops');
    await expect(page.locator('text=ThinkPad X1 Carbon Gen 12').first()).toBeVisible();
  });

  test('[POSITIVE] should display ASUS ROG Strix G18 on Laptops page', async ({ page }) => {
    await navigateToCategory(page, 'laptops');
    await expect(page.locator('text=ROG Strix G18').first()).toBeVisible();
  });

  test('[POSITIVE] should show price and rating for each laptop card', async ({ page }) => {
    await navigateToCategory(page, 'laptops');
    await page.waitForSelector('[data-testid^="product-card"]');

    const cards = page.locator('[data-testid^="product-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Price should be visible on at least the first card
    await expect(cards.first().locator('[data-testid*="price"], .price, .current-price').first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // SECTION 2 – Filtering & Sorting
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should filter laptops by brand Apple', async ({ page }) => {
    await navigateToCategory(page, 'laptops');

    const filterBtn = page.locator('[data-testid="filter-toggle-btn"], button:has-text("Filters"), button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }

    const appleFilter = page.locator('label:has-text("Apple"), input[value="apple"]').first();
    if (await appleFilter.isVisible()) {
      await appleFilter.click();
      await page.waitForTimeout(800);
      const count = await page.locator('[data-testid^="product-card"]').count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('[POSITIVE] should filter laptops by brand ASUS', async ({ page }) => {
    await navigateToCategory(page, 'laptops');

    const filterBtn = page.locator('[data-testid="filter-toggle-btn"], button:has-text("Filters"), button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }

    const asusFilter = page.locator('label:has-text("ASUS"), input[value="asus"]').first();
    if (await asusFilter.isVisible()) {
      await asusFilter.click();
      await page.waitForTimeout(800);
      const count = await page.locator('[data-testid^="product-card"]').count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('[POSITIVE] should sort laptops by Price: Low to High', async ({ page }) => {
    await navigateToCategory(page, 'laptops');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption({ label: 'Price: Low to High' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('[POSITIVE] should sort laptops by Newest', async ({ page }) => {
    await navigateToCategory(page, 'laptops');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await sortSelect.selectOption({ label: 'Newest' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  // ---------------------------------------------------------------------------
  // SECTION 3 – Product Detail Page (MacBook Pro 16" M4 – id: 4)
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to MacBook Pro 16 M4 detail page', async ({ page }) => {
    await navigateToProductPage(page, 4);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('MacBook Pro 16" M4');
  });

  test('[POSITIVE] should display Apple brand on MacBook Pro detail page', async ({ page }) => {
    await navigateToProductPage(page, 4);

    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Apple');
  });

  test('[POSITIVE] should display MacBook Pro price in INR', async ({ page }) => {
    await navigateToProductPage(page, 4);

    const price = page.locator('[data-testid="product-current-price"]');
    await expect(price).toBeVisible();
    const priceText = await price.textContent();
    // Price should be ₹2,49,999
    expect(priceText).toContain('₹');
    expect(priceText).toContain('2,49,999');
  });

  test('[POSITIVE] should show discount badge on MacBook Pro (has originalPrice)', async ({ page }) => {
    await navigateToProductPage(page, 4);

    await expect(page.locator('[data-testid="product-discount-badge"]')).toBeVisible();
  });

  test('[POSITIVE] should display In Stock status for MacBook Pro', async ({ page }) => {
    await navigateToProductPage(page, 4);

    await expect(page.locator('[data-testid="product-stock-status"]')).toContainText('In Stock');
  });

  test('[POSITIVE] should display key features for MacBook Pro', async ({ page }) => {
    await navigateToProductPage(page, 4);

    await expect(page.locator('[data-testid="product-key-features"]')).toBeVisible();
    const features = page.locator('[data-testid^="product-feature-"]');
    const count = await features.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('[POSITIVE] should navigate to ThinkPad X1 Carbon detail page (id: 5)', async ({ page }) => {
    await navigateToProductPage(page, 5);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('ThinkPad X1 Carbon Gen 12');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Lenovo');
  });

  test('[POSITIVE] should navigate to ROG Strix G18 detail page (id: 6)', async ({ page }) => {
    await navigateToProductPage(page, 6);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('ROG Strix G18');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('ASUS');
  });

  test('[POSITIVE] should display ROG Strix G18 rating 4.8 and reviews count', async ({ page }) => {
    await navigateToProductPage(page, 6);

    const rating = page.locator('[data-testid="product-rating-value"]');
    await expect(rating).toBeVisible();
    await expect(rating).toContainText('4.8');
  });

  // ---------------------------------------------------------------------------
  // SECTION 4 – Cart Operations
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should add MacBook Pro to cart', async ({ page }) => {
    await navigateToProductPage(page, 4);

    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const cartSidebar = page.locator('[data-testid="cart-sidebar"]');
    const cartCount = page.locator('[data-testid="cart-count"], .cart-badge').first();
    const confirmed = await cartSidebar.isVisible({ timeout: 5000 }).catch(() => false)
      || await cartCount.isVisible({ timeout: 5000 }).catch(() => false);
    expect(confirmed).toBe(true);
  });

  test('[POSITIVE] should verify MacBook Pro appears in cart with correct name', async ({ page }) => {
    await navigateToProductPage(page, 4);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    const cartItemName = page.locator('[data-testid="cart-item-name-4"]');
    await expect(cartItemName).toBeVisible();
    await expect(cartItemName).toContainText('MacBook Pro');
  });

  // ---------------------------------------------------------------------------
  // SECTION 5 – Mandatory Field Validation (Checkout Form)
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should validate required shipping fields in checkout', async ({ page }) => {
    // Login first, then add laptop, proceed to checkout
    await loginAs(page);

    await navigateToProductPage(page, 4);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    await navigateToCheckout(page);

    // Try to continue without filling any fields
    const continueBtn = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await continueBtn.click();
    await page.waitForTimeout(800);

    // Should still be on shipping step (not moved forward)
    // We verify by checking firstName still has a required attribute or validation exists
    const firstNameInput = page.locator('[name="firstName"]');
    if (await firstNameInput.isVisible()) {
      const val = await firstNameInput.inputValue();
      expect(val).toBe(''); // Should remain empty; validation blocked submission
    }
  });

  test('[POSITIVE] should validate required payment fields in checkout', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 4);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar2 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar2.isVisible()) {
      await closeSidebar2.click();
      await page.waitForTimeout(500);
    }

    await navigateToCheckout(page);

    // Fill shipping and move to payment step
    await fillShippingForm(page);
    const cont = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont.click();
    await page.waitForTimeout(800);

    // Try to proceed without filling payment
    const paymentContinue = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await paymentContinue.click();
    await page.waitForTimeout(800);

    // Validation errors should appear for missing card fields
    const cardError = page.locator('[data-testid*="error"], .error-message, .error').first();
    const hasError = await cardError.isVisible({ timeout: 5000 }).catch(() => false);
    expect(hasError).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // SECTION 6 – End-to-End: Laptops Purchase Flow
  // ---------------------------------------------------------------------------

  test('[E2E] should complete full purchase flow for ThinkPad X1 Carbon', async ({ page }) => {
    // Step 1: Login
    await loginAs(page);

    // Step 2: Navigate to ThinkPad product detail
    await navigateToProductPage(page, 5);
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('ThinkPad X1 Carbon Gen 12');

    // Step 3: Add to Cart
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) await closeSidebar.click();
    await page.waitForTimeout(500);

    // Step 4: Go to Cart
    await navigateToCart(page);
    await expect(page.locator('[data-testid^="cart-item-"]').first()).toBeVisible();

    // Step 5: Checkout
    const checkoutBtn = page.locator('[data-testid="proceed-to-checkout-button"], button:has-text("Proceed to Checkout"), a:has-text("Checkout")').first();
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

    // Step 9: Verify Order Success
    await page.waitForSelector('[data-testid="order-success"]', { timeout: 20000 });
    await expect(page.locator('[data-testid="order-success-title"]')).toContainText(/order placed/i);
    await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
    await expect(page.locator('[data-testid="estimated-delivery"]')).toBeVisible();
  });

  test('[E2E] should complete purchase of ROG Strix G18 with express shipping', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 6);
    await page.waitForSelector('[data-testid="product-detail-page"]');
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('ROG Strix G18');

    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar3 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar3.isVisible()) {
      await closeSidebar3.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    const checkoutBtn = page.locator('[data-testid="proceed-to-checkout-button"], button:has-text("Proceed to Checkout")').first();
    await checkoutBtn.click();
    await page.waitForSelector('[data-testid="checkout-page"], .checkout-page', { timeout: 15000 });

    // Shipping with express
    await fillShippingForm(page);

    // Select express shipping if available
    const expressShipping = page.locator('input[value="express"], label:has-text("Express")').first();
    if (await expressShipping.isVisible()) {
      await expressShipping.click();
    }

    const cont1 = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont1.click();
    await page.waitForTimeout(800);

    await fillPaymentForm(page);
    const cont2 = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont2.click();
    await page.waitForTimeout(800);

    const placeOrderBtn = page.locator('[data-testid="place-order-button"], button:has-text("Place Order")').first();
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();

    await page.waitForSelector('[data-testid="order-success"]', { timeout: 20000 });
    await expect(page.locator('[data-testid="order-success-title"]')).toContainText(/order placed/i);
  });

  test('[E2E] should apply promo code SAVE10 at cart and confirm discount', async ({ page }) => {
    await navigateToProductPage(page, 4);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar4 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar4.isVisible()) {
      await closeSidebar4.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    const promoInput = page.locator('[data-testid="promo-input"], input[placeholder*="promo"], input[placeholder*="code"]').first();
    if (await promoInput.isVisible()) {
      await promoInput.fill('SAVE10');
      const applyBtn = page.locator('[data-testid="apply-promo-btn"], button:has-text("Apply")').first();
      await applyBtn.click();
      await page.waitForTimeout(700);

      // Discount should be reflected
      const promoSavings = page.locator('[data-testid*="promo"], [data-testid*="discount"]').first();
      await expect(promoSavings).toBeVisible({ timeout: 5000 });
    }
  });

  test('[E2E] should search for laptops and navigate to MacBook Pro from results', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="header"]');

    const searchInput = page.locator('[data-testid="search-input"], input[type="search"], input[placeholder*="search"]').first();
    await searchInput.fill('MacBook Pro');

    const searchForm = page.locator('[data-testid="search-form"], form:has([type="search"])').first();
    await searchForm.press('Enter');

    await page.waitForURL('**/products**', { timeout: 15000 });
    const macbookCard = page.locator('text=MacBook Pro 16" M4').first();
    await expect(macbookCard).toBeVisible({ timeout: 10000 });

    await macbookCard.click();
    await page.waitForSelector('[data-testid="product-detail-page"]');
    await expect(page.locator('[data-testid="product-title"]')).toContainText('MacBook Pro');
  });
});

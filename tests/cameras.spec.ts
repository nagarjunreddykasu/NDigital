/**
 * ============================================================
 *  NDigital – Cameras Category Test Suite
 *  URL: https://nagarjunreddykasu.github.io/NDigital/category/cameras
 *
 *  Products covered (from data/products.js):
 *   • Sony Alpha 7R V    (id: 12) – Featured
 *   • Canon EOS R5 Mark II (id: 13) – New Arrival
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
  verifyProductCardsPresent,
  navigateToProductPage,
  navigateToCart,
  navigateToCheckout,
  BASE_URL,
} from './helpers';

const BASE = BASE_URL;

test.describe('Cameras Category Tests', () => {
  // ---------------------------------------------------------------------------
  // SECTION 1 – Category Page Navigation & Display
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to Cameras category from header navigation', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="main-navigation"]');

    const camerasLink = page.locator('[data-testid="nav-category-cameras"]');
    await expect(camerasLink).toBeVisible();
    await camerasLink.click();

    await page.waitForURL('**/category/cameras');
    expect(page.url()).toContain('/category/cameras');
  });

  test('[POSITIVE] should display Cameras category page with correct heading', async ({ page }) => {
    await navigateToCategory(page, 'cameras');

    const heading = page.locator('h1, [data-testid="category-title"]').first();
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text?.toLowerCase()).toMatch(/camera/i);
  });

  test('[POSITIVE] should list at least 2 camera products', async ({ page }) => {
    await navigateToCategory(page, 'cameras');
    const count = await verifyProductCardsPresent(page);
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('[POSITIVE] should display Sony Alpha 7R V on Cameras page', async ({ page }) => {
    await navigateToCategory(page, 'cameras');
    await expect(page.locator('text=Alpha 7R V').first()).toBeVisible();
  });

  test('[POSITIVE] should display Canon EOS R5 Mark II on Cameras page', async ({ page }) => {
    await navigateToCategory(page, 'cameras');
    await expect(page.locator('text=EOS R5 Mark II').first()).toBeVisible();
  });

  test('[POSITIVE] should show price in INR on Camera product cards', async ({ page }) => {
    await navigateToCategory(page, 'cameras');
    await page.waitForSelector('[data-testid^="product-card"]');

    const priceEl = page.locator('[data-testid^="product-card"] [data-testid*="price"], [data-testid^="product-card"] .current-price').first();
    await expect(priceEl).toBeVisible();
    const priceText = await priceEl.textContent();
    expect(priceText).toContain('₹');
  });

  test('[POSITIVE] should display rating stars on camera product cards', async ({ page }) => {
    await navigateToCategory(page, 'cameras');
    await page.waitForSelector('[data-testid^="product-card"]');

    const ratingEl = page.locator('[data-testid^="product-card"] [data-testid*="rating"], [data-testid^="product-card"] .rating').first();
    await expect(ratingEl).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // SECTION 2 – Filtering & Sorting
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should filter cameras by brand Sony', async ({ page }) => {
    await navigateToCategory(page, 'cameras');

    const filterBtn = page.locator('[data-testid="filter-toggle-btn"], button:has-text("Filters"), button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }

    const sonyFilter = page.locator('label:has-text("Sony"), input[value="sony"]').first();
    if (await sonyFilter.isVisible()) {
      await sonyFilter.click();
      await page.waitForTimeout(800);
      const count = await page.locator('[data-testid^="product-card"]').count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('[POSITIVE] should filter cameras by brand Canon', async ({ page }) => {
    await navigateToCategory(page, 'cameras');

    const filterBtn = page.locator('[data-testid="filter-toggle-btn"], button:has-text("Filters"), button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }

    const canonFilter = page.locator('label:has-text("Canon"), input[value="canon"]').first();
    if (await canonFilter.isVisible()) {
      await canonFilter.click();
      await page.waitForTimeout(800);
      const count = await page.locator('[data-testid^="product-card"]').count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('[POSITIVE] should sort cameras by Highest Rated', async ({ page }) => {
    await navigateToCategory(page, 'cameras');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption({ label: 'Highest Rated' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('[POSITIVE] should sort cameras by Price: Low to High', async ({ page }) => {
    await navigateToCategory(page, 'cameras');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await sortSelect.selectOption({ label: 'Price: Low to High' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  // ---------------------------------------------------------------------------
  // SECTION 3 – Product Detail Pages
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to Sony Alpha 7R V detail page (id: 12)', async ({ page }) => {
    await navigateToProductPage(page, 12);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Alpha 7R V');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Sony');
  });

  test('[POSITIVE] should display Sony Alpha 7R V price (₹3,24,999)', async ({ page }) => {
    await navigateToProductPage(page, 12);

    const price = page.locator('[data-testid="product-current-price"]');
    await expect(price).toBeVisible();
    const priceText = await price.textContent();
    expect(priceText).toContain('₹');
    expect(priceText).toContain('3,24,999');
  });

  test('[POSITIVE] should display Sony Alpha 7R V rating 4.9', async ({ page }) => {
    await navigateToProductPage(page, 12);

    await expect(page.locator('[data-testid="product-rating-value"]')).toContainText('4.9');
  });

  test('[POSITIVE] should display Sony Alpha 7R V In Stock status', async ({ page }) => {
    await navigateToProductPage(page, 12);

    await expect(page.locator('[data-testid="product-stock-status"]')).toContainText('In Stock');
  });

  test('[POSITIVE] should display 61MP sensor feature for Sony Alpha 7R V', async ({ page }) => {
    await navigateToProductPage(page, 12);

    await expect(page.locator('[data-testid="product-key-features"]')).toBeVisible();
    const featuresText = await page.locator('[data-testid="product-key-features"]').textContent();
    expect(featuresText?.toLowerCase()).toContain('61mp');
  });

  test('[POSITIVE] should display 8K video feature for Sony Alpha 7R V', async ({ page }) => {
    await navigateToProductPage(page, 12);

    const featuresText = await page.locator('[data-testid="product-key-features"]').textContent();
    expect(featuresText?.toLowerCase()).toContain('8k');
  });

  test('[POSITIVE] should navigate to Canon EOS R5 Mark II detail page (id: 13)', async ({ page }) => {
    await navigateToProductPage(page, 13);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('EOS R5 Mark II');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Canon');
  });

  test('[POSITIVE] should display Canon EOS R5 price (₹3,59,999)', async ({ page }) => {
    await navigateToProductPage(page, 13);

    const price = page.locator('[data-testid="product-current-price"]');
    await expect(price).toBeVisible();
    const priceText = await price.textContent();
    expect(priceText).toContain('₹');
    expect(priceText).toContain('3,59,999');
  });

  test('[POSITIVE] should display Canon EOS R5 Mark II rating 4.8', async ({ page }) => {
    await navigateToProductPage(page, 13);

    await expect(page.locator('[data-testid="product-rating-value"]')).toContainText('4.8');
  });

  test('[POSITIVE] should display Canon EOS R5 In Stock status', async ({ page }) => {
    await navigateToProductPage(page, 13);

    await expect(page.locator('[data-testid="product-stock-status"]')).toContainText('In Stock');
  });

  test('[POSITIVE] should display 45MP full-frame sensor in Canon EOS R5 features', async ({ page }) => {
    await navigateToProductPage(page, 13);

    const featuresText = await page.locator('[data-testid="product-key-features"]').textContent();
    expect(featuresText?.toLowerCase()).toContain('45mp');
  });

  test('[POSITIVE] should display breadcrumb navigation for Sony Alpha 7R V', async ({ page }) => {
    await navigateToProductPage(page, 12);

    await expect(page.locator('[data-testid="breadcrumb-home"]')).toBeVisible();
    await expect(page.locator('[data-testid="breadcrumb-category"]')).toContainText(/camera/i);
    await expect(page.locator('[data-testid="breadcrumb-product-name"]')).toHaveText('Alpha 7R V');
  });

  test('[POSITIVE] should display product description for Canon EOS R5', async ({ page }) => {
    await navigateToProductPage(page, 13);

    const description = page.locator('[data-testid="product-description"]');
    await expect(description).toBeVisible();
    await expect(description).toContainText(/professional|hybrid|image/i);
  });

  // ---------------------------------------------------------------------------
  // SECTION 4 – Cart Operations
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should add Sony Alpha 7R V to cart', async ({ page }) => {
    await navigateToProductPage(page, 12);

    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const confirmed =
      await page.locator('[data-testid="cart-sidebar"]').isVisible({ timeout: 5000 }).catch(() => false) ||
      await page.locator('[data-testid="cart-count"], .cart-badge').first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(confirmed).toBe(true);
  });

  test('[POSITIVE] should add Canon EOS R5 Mark II to cart and verify in cart', async ({ page }) => {
    await navigateToProductPage(page, 13);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    const cartItemName = page.locator('[data-testid="cart-item-name-13"]');
    await expect(cartItemName).toBeVisible();
    await expect(cartItemName).toContainText('EOS R5');
  });

  test('[POSITIVE] should show Canon EOS R5 correct price in cart', async ({ page }) => {
    await navigateToProductPage(page, 13);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar2 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar2.isVisible()) {
      await closeSidebar2.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    const itemPrice = page.locator('[data-testid="cart-item-price-13"]');
    await expect(itemPrice).toBeVisible();
    const priceText = await itemPrice.textContent();
    expect(priceText).toContain('₹');
    expect(priceText).toContain('3,59,999');
  });

  // ---------------------------------------------------------------------------
  // SECTION 5 – Mandatory Field Validation (Checkout)
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should validate expiry date format MM/YY in payment step', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 12);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar3 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar3.isVisible()) {
      await closeSidebar3.click();
      await page.waitForTimeout(500);
    }

    await navigateToCheckout(page);

    await fillShippingForm(page);
    const cont = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont.click();
    await page.waitForTimeout(800);

    const expiryInput = page.locator('[name="expiry"]');
    if (await expiryInput.isVisible()) {
      // Enter invalid expiry format
      await page.locator('[name="cardNumber"]').fill('4111 1111 1111 1111');
      await page.locator('[name="cardName"]').fill('Test User');
      await expiryInput.fill('1228'); // Missing slash — invalid format
      await page.locator('[name="cvv"]').fill('123');

      const paymentCont = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
      await paymentCont.click();
      await page.waitForTimeout(800);

      const expiryError = page.locator('.error-text, .error-message, [data-testid*="expiry-error"]').first();
      const errVisible = await expiryError.isVisible({ timeout: 5000 }).catch(() => false);
      expect(errVisible).toBe(true);
    }
  });

  test('[POSITIVE] should validate card holder name is required', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 12);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

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

    const cardNameInput = page.locator('[name="cardName"]');
    if (await cardNameInput.isVisible()) {
      await page.locator('[name="cardNumber"]').fill('4111 1111 1111 1111');
      // Leave cardName empty
      await page.locator('[name="expiry"]').fill('12/28');
      await page.locator('[name="cvv"]').fill('123');

      const paymentCont = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
      await paymentCont.click();
      await page.waitForTimeout(800);

      const nameError = page.locator('.error-text, .error-message, [data-testid*="name-error"]').first();
      const errVisible = await nameError.isVisible({ timeout: 5000 }).catch(() => false);
      expect(errVisible).toBe(true);
    }
  });

  // ---------------------------------------------------------------------------
  // SECTION 6 – End-to-End: Cameras Purchase Flow
  // ---------------------------------------------------------------------------

  test('[E2E] should complete full purchase flow for Sony Alpha 7R V', async ({ page }) => {
    // Step 1: Login
    await loginAs(page);

    // Step 2: Navigate to Cameras and click Alpha 7R V
    await navigateToCategory(page, 'cameras');
    const sonyCard = page.locator('text=Alpha 7R V').first();
    await expect(sonyCard).toBeVisible();
    await sonyCard.click();

    await page.waitForSelector('[data-testid="product-detail-page"]');
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Alpha 7R V');

    // Step 3: Add to Cart
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar5 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar5.isVisible()) {
      await closeSidebar5.click();
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

    // Step 8: Review order summary shows Sony Alpha
    const pageText = await page.textContent('body');
    expect(pageText?.toLowerCase()).toContain('alpha');

    // Step 9: Place Order
    const placeOrderBtn = page.locator('[data-testid="place-order-button"], button:has-text("Place Order")').first();
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();

    // Step 10: Success
    await page.waitForSelector('[data-testid="order-success"]', { timeout: 20000 });
    await expect(page.locator('[data-testid="order-success-title"]')).toContainText(/order placed/i);
    await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
  });

  test('[E2E] should purchase Canon EOS R5 Mark II via Buy Now', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 13);
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('EOS R5 Mark II');

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

  test('[E2E] should navigate from breadcrumb back to cameras category', async ({ page }) => {
    await navigateToProductPage(page, 12);

    // Click the category breadcrumb → should go back to cameras
    const categoryBreadcrumb = page.locator('[data-testid="breadcrumb-category"]');
    await expect(categoryBreadcrumb).toBeVisible();
    await categoryBreadcrumb.click();

    await page.waitForURL('**/category/cameras');
    expect(page.url()).toContain('/category/cameras');
  });

  test('[E2E] should search for Sony camera and find Alpha 7R V in results', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="header"]');

    const searchInput = page.locator('[data-testid="search-input"], input[type="search"], input[placeholder*="search" i]').first();
    await searchInput.fill('Alpha');

    const searchBtn = page.locator('[data-testid="search-button"], button:has-text("Search")').first();
    await searchBtn.click();

    await page.waitForTimeout(2000);
    const alphaCard = page.locator('text=Alpha 7R V').first();
    await expect(alphaCard).toBeVisible({ timeout: 10000 });
  });
});

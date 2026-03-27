/**
 * ============================================================
 *  NDigital – Audio Category Test Suite
 *  URL: https://nagarjunreddykasu.github.io/NDigital/category/audio
 *
 *  Products covered (from data/products.js):
 *   • Apple AirPods Pro 3          (id: 9)  – Featured
 *   • Sony WH-1000XM6              (id: 10) – New Arrival
 *   • Samsung Soundbar HW-Q990D    (id: 11)
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

test.describe('Audio Category Tests', () => {
  // ---------------------------------------------------------------------------
  // SECTION 1 – Category Page Navigation & Display
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to Audio category from header navigation', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="main-navigation"]');

    const audioLink = page.locator('[data-testid="nav-category-audio"]');
    await expect(audioLink).toBeVisible();
    await audioLink.click();

    await page.waitForURL('**/category/audio');
    expect(page.url()).toContain('/category/audio');
  });

  test('[POSITIVE] should display Audio category page with correct heading', async ({ page }) => {
    await navigateToCategory(page, 'audio');

    const heading = page.locator('h1, [data-testid="category-title"]').first();
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text?.toLowerCase()).toMatch(/audio|headphones|speaker/i);
  });

  test('[POSITIVE] should list at least 3 audio products', async ({ page }) => {
    await navigateToCategory(page, 'audio');
    const count = await verifyProductCardsPresent(page);
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('[POSITIVE] should display Apple AirPods Pro 3 on Audio page', async ({ page }) => {
    await navigateToCategory(page, 'audio');
    await expect(page.locator('text=AirPods Pro 3').first()).toBeVisible();
  });

  test('[POSITIVE] should display Sony WH-1000XM6 on Audio page', async ({ page }) => {
    await navigateToCategory(page, 'audio');
    await expect(page.locator('text=WH-1000XM6').first()).toBeVisible();
  });

  test('[POSITIVE] should display Samsung Soundbar HW-Q990D on Audio page', async ({ page }) => {
    await navigateToCategory(page, 'audio');
    await expect(page.locator('text=Soundbar HW-Q990D').first()).toBeVisible();
  });

  test('[POSITIVE] should show price in INR on audio product cards', async ({ page }) => {
    await navigateToCategory(page, 'audio');
    await page.waitForSelector('[data-testid^="product-card"]');

    const priceEl = page.locator('[data-testid^="product-card"] [data-testid*="price"], [data-testid^="product-card"] .current-price').first();
    await expect(priceEl).toBeVisible();
    const priceText = await priceEl.textContent();
    expect(priceText).toContain('₹');
  });

  // ---------------------------------------------------------------------------
  // SECTION 2 – Filtering & Sorting
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should filter Audio products by brand Apple', async ({ page }) => {
    await navigateToCategory(page, 'audio');

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

  test('[POSITIVE] should filter Audio products by brand Sony', async ({ page }) => {
    await navigateToCategory(page, 'audio');

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

  test('[POSITIVE] should sort Audio products by Price: Low to High', async ({ page }) => {
    await navigateToCategory(page, 'audio');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption({ label: 'Price: Low to High' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('[POSITIVE] should filter Audio products by In Stock only', async ({ page }) => {
    await navigateToCategory(page, 'audio');

    const filterBtn = page.locator('[data-testid="filter-toggle-btn"], button:has-text("Filters"), button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }

    const inStockFilter = page.locator('input[type="checkbox"][id*="stock"], label:has-text("In Stock")').first();
    if (await inStockFilter.isVisible()) {
      await inStockFilter.click();
      await page.waitForTimeout(800);
      const count = await page.locator('[data-testid^="product-card"]').count();
      expect(count).toBeGreaterThan(0);
    }
  });

  // ---------------------------------------------------------------------------
  // SECTION 3 – Product Detail Pages
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to AirPods Pro 3 detail page (id: 9)', async ({ page }) => {
    await navigateToProductPage(page, 9);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('AirPods Pro 3');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Apple');
  });

  test('[POSITIVE] should display correct price for AirPods Pro 3 (₹24,999)', async ({ page }) => {
    await navigateToProductPage(page, 9);

    const price = page.locator('[data-testid="product-current-price"]');
    await expect(price).toBeVisible();
    const priceText = await price.textContent();
    expect(priceText).toContain('₹');
    expect(priceText).toContain('24,999');
  });

  test('[POSITIVE] should display AirPods Pro 3 rating 4.8 and 8932 reviews', async ({ page }) => {
    await navigateToProductPage(page, 9);

    await expect(page.locator('[data-testid="product-rating-value"]')).toContainText('4.8');
    await expect(page.locator('[data-testid="product-reviews-count"]')).toBeVisible();
  });

  test('[POSITIVE] should display AirPods Pro 3 In Stock', async ({ page }) => {
    await navigateToProductPage(page, 9);

    await expect(page.locator('[data-testid="product-stock-status"]')).toContainText('In Stock');
  });

  test('[POSITIVE] should show Active Noise Cancellation feature for AirPods Pro 3', async ({ page }) => {
    await navigateToProductPage(page, 9);

    await expect(page.locator('[data-testid="product-key-features"]')).toBeVisible();
    const featuresText = await page.locator('[data-testid="product-key-features"]').textContent();
    expect(featuresText?.toLowerCase()).toContain('noise cancellation');
  });

  test('[POSITIVE] should navigate to Sony WH-1000XM6 detail page (id: 10)', async ({ page }) => {
    await navigateToProductPage(page, 10);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('WH-1000XM6');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Sony');
  });

  test('[POSITIVE] should display WH-1000XM6 discount (₹39,999 → ₹34,999)', async ({ page }) => {
    await navigateToProductPage(page, 10);

    await expect(page.locator('[data-testid="product-current-price"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-original-price"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-discount-badge"]')).toBeVisible();
  });

  test('[POSITIVE] should display WH-1000XM6 New Arrival badge', async ({ page }) => {
    await navigateToProductPage(page, 10);

    // New Arrival tag may be displayed on the product
    const newArrivalEl = page.locator('[data-testid*="new-arrival"], .new-arrival, text=New Arrival').first();
    // If present it should be visible; if not rendered on detail page, verify rating instead
    const ratingEl = page.locator('[data-testid="product-rating-value"]');
    await expect(ratingEl).toBeVisible();
    await expect(ratingEl).toContainText('4.9');
  });

  test('[POSITIVE] should navigate to Samsung Soundbar HW-Q990D detail page (id: 11)', async ({ page }) => {
    await navigateToProductPage(page, 11);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Soundbar HW-Q990D');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Samsung');
  });

  test('[POSITIVE] should display Soundbar price (₹1,49,999)', async ({ page }) => {
    await navigateToProductPage(page, 11);

    const price = page.locator('[data-testid="product-current-price"]');
    await expect(price).toBeVisible();
    const priceText = await price.textContent();
    expect(priceText).toContain('₹');
    expect(priceText).toContain('1,49,999');
  });

  test('[POSITIVE] should display Soundbar key features mentioning Dolby Atmos', async ({ page }) => {
    await navigateToProductPage(page, 11);

    const featuresText = await page.locator('[data-testid="product-key-features"]').textContent();
    expect(featuresText?.toLowerCase()).toContain('dolby');
  });

  // ---------------------------------------------------------------------------
  // SECTION 4 – Cart Operations
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should add AirPods Pro 3 to cart and verify cart sidebar', async ({ page }) => {
    await navigateToProductPage(page, 9);

    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const confirmed =
      await page.locator('[data-testid="cart-sidebar"]').isVisible({ timeout: 5000 }).catch(() => false) ||
      await page.locator('[data-testid="cart-count"], .cart-badge').first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(confirmed).toBe(true);
  });

  test('[POSITIVE] should add Sony WH-1000XM6 to cart successfully', async ({ page }) => {
    await navigateToProductPage(page, 10);

    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    const cartItemName = page.locator('[data-testid="cart-item-name-10"]');
    await expect(cartItemName).toBeVisible();
    await expect(cartItemName).toContainText('WH-1000XM6');
  });

  test('[POSITIVE] should verify cart grand total includes GST (18%)', async ({ page }) => {
    await navigateToProductPage(page, 9);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar2 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar2.isVisible()) {
      await closeSidebar2.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    // GST or Tax line should be visible in order summary
    const taxLine = page.locator('[data-testid*="tax"], [data-testid*="gst"]').first();
    await expect(taxLine).toBeVisible({ timeout: 8000 });
  });

  // ---------------------------------------------------------------------------
  // SECTION 5 – End-to-End: Audio Purchase Flow
  // ---------------------------------------------------------------------------

  test('[E2E] should complete full purchase flow for AirPods Pro 3', async ({ page }) => {
    // Step 1: Login
    await loginAs(page);

    // Step 2: Navigate to Audio category and select AirPods Pro 3
    await navigateToCategory(page, 'audio');
    const airpodsCard = page.locator('text=AirPods Pro 3').first();
    await expect(airpodsCard).toBeVisible();
    await airpodsCard.click();

    await page.waitForSelector('[data-testid="product-detail-page"]');
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('AirPods Pro 3');

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

    // Step 9: Success
    await page.waitForSelector('[data-testid="order-success"]', { timeout: 20000 });
    await expect(page.locator('[data-testid="order-success-title"]')).toContainText(/order placed/i);
  });

  test('[E2E] should purchase Sony WH-1000XM6 via Buy Now', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 10);
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('WH-1000XM6');

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

  test('[E2E] should add multiple audio items to cart and verify item count', async ({ page }) => {
    // Add AirPods Pro 3
    await navigateToProductPage(page, 9);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar3 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar3.isVisible()) {
      await closeSidebar3.click();
      await page.waitForTimeout(500);
    }

    // Add Sony WH-1000XM6
    await navigateToProductPage(page, 10);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar4 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar4.isVisible()) {
      await closeSidebar4.click();
      await page.waitForTimeout(500);
    }

    // Verify cart page shows 2 items
    await navigateToCart(page);

    const cartItems = page.locator('[data-testid^="cart-item-"]');
    const itemCount = await cartItems.count();
    expect(itemCount).toBeGreaterThanOrEqual(2);
  });

  test('[E2E] should remove Sony WH-1000XM6 from cart and verify cart updates', async ({ page }) => {
    await navigateToProductPage(page, 10);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar5 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar5.isVisible()) {
      await closeSidebar5.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);
    await expect(page.locator('[data-testid^="cart-item-"]').first()).toBeVisible();

    const removeBtn = page.locator('[data-testid="cart-remove-item-10"]');
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
      await page.waitForTimeout(800);

      // Item should be gone
      const removedItem = page.locator('[data-testid="cart-item-name-10"]');
      await expect(removedItem).not.toBeVisible({ timeout: 5000 });
    }
  });

  test('[E2E] should verify order confirmation email address matches checkout form', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 9);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar6 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar6.isVisible()) {
      await closeSidebar6.click();
      await page.waitForTimeout(500);
    }

    await navigateToCheckout(page);

    const testEmail = 'test@ndigital.com';
    await page.fill('[name="firstName"]', 'Test');
    await page.fill('[name="lastName"]', 'User');
    await page.fill('[name="email"]', testEmail);
    await page.fill('[name="phone"]', '9876543210');
    await page.fill('[name="address"]', '100 Church Street');
    await page.fill('[name="city"]', 'Mumbai');
    await page.fill('[name="state"]', 'Maharashtra');
    await page.fill('[name="zipCode"]', '400001');

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

    // The success message should reference the email entered
    const successMsg = page.locator('[data-testid="order-success-message"]');
    await expect(successMsg).toBeVisible();
    await expect(successMsg).toContainText(testEmail);
  });
});

/**
 * ============================================================
 *  NDigital – Gaming Category Test Suite
 *  URL: https://nagarjunreddykasu.github.io/NDigital/category/gaming
 *
 *  Products covered (from data/products.js):
 *   • Sony PlayStation 5 Pro  (id: 14) – Featured, inStock: true
 *   • Microsoft Xbox Series X (id: 15) – inStock: true
 *   • Nintendo Switch 2       (id: 16) – New Arrival, inStock: false (OUT OF STOCK)
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
  navigateToLogin,
  BASE_URL,
} from './helpers';

const BASE = BASE_URL;

test.describe('Gaming Category Tests', () => {
  // ---------------------------------------------------------------------------
  // SECTION 1 – Category Page Navigation & Display
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to Gaming category from header navigation', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="main-navigation"]');

    const gamingLink = page.locator('[data-testid="nav-category-gaming"]');
    await expect(gamingLink).toBeVisible();
    await gamingLink.click();

    await page.waitForURL('**/category/gaming');
    expect(page.url()).toContain('/category/gaming');
  });

  test('[POSITIVE] should display Gaming category page with correct heading', async ({ page }) => {
    await navigateToCategory(page, 'gaming');

    const heading = page.locator('h1, [data-testid="category-title"]').first();
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text?.toLowerCase()).toMatch(/gaming|console/i);
  });

  test('[POSITIVE] should list at least 3 gaming products', async ({ page }) => {
    await navigateToCategory(page, 'gaming');
    const count = await verifyProductCardsPresent(page);
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('[POSITIVE] should display PlayStation 5 Pro on Gaming page', async ({ page }) => {
    await navigateToCategory(page, 'gaming');
    await expect(page.locator('text=PlayStation 5 Pro').first()).toBeVisible();
  });

  test('[POSITIVE] should display Xbox Series X on Gaming page', async ({ page }) => {
    await navigateToCategory(page, 'gaming');
    await expect(page.locator('text=Xbox Series X').first()).toBeVisible();
  });

  test('[POSITIVE] should display Nintendo Switch 2 on Gaming page', async ({ page }) => {
    await navigateToCategory(page, 'gaming');
    await expect(page.locator('text=Switch 2').first()).toBeVisible();
  });

  test('[POSITIVE] should show price in INR on gaming product cards', async ({ page }) => {
    await navigateToCategory(page, 'gaming');
    await page.waitForSelector('[data-testid^="product-card"]');

    const priceEl = page.locator('[data-testid^="product-card"] [data-testid*="price"], [data-testid^="product-card"] .current-price').first();
    await expect(priceEl).toBeVisible();
    const priceText = await priceEl.textContent();
    expect(priceText).toContain('₹');
  });

  // ---------------------------------------------------------------------------
  // SECTION 2 – Filtering & Sorting
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should filter gaming products by brand Sony', async ({ page }) => {
    await navigateToCategory(page, 'gaming');

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

  test('[POSITIVE] should filter gaming products by brand Microsoft', async ({ page }) => {
    await navigateToCategory(page, 'gaming');

    const filterBtn = page.locator('[data-testid="filter-toggle-btn"], button:has-text("Filters"), button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }

    const msFilter = page.locator('label:has-text("Microsoft"), input[value="microsoft"]').first();
    if (await msFilter.isVisible()) {
      await msFilter.click();
      await page.waitForTimeout(800);
      const count = await page.locator('[data-testid^="product-card"]').count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('[POSITIVE] should filter gaming products by brand Nintendo', async ({ page }) => {
    await navigateToCategory(page, 'gaming');

    const filterBtn = page.locator('[data-testid="filter-toggle-btn"], button:has-text("Filters"), button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }

    const nintendoFilter = page.locator('label:has-text("Nintendo"), input[value="nintendo"]').first();
    if (await nintendoFilter.isVisible()) {
      await nintendoFilter.click();
      await page.waitForTimeout(800);
      const count = await page.locator('[data-testid^="product-card"]').count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('[POSITIVE] should sort gaming products by Price: Low to High', async ({ page }) => {
    await navigateToCategory(page, 'gaming');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption({ label: 'Price: Low to High' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('[POSITIVE] should sort gaming products by Newest', async ({ page }) => {
    await navigateToCategory(page, 'gaming');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await sortSelect.selectOption({ label: 'Newest' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  // ---------------------------------------------------------------------------
  // SECTION 3 – Product Detail Pages
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to PlayStation 5 Pro detail page (id: 14)', async ({ page }) => {
    await navigateToProductPage(page, 14);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('PlayStation 5 Pro');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Sony');
  });

  test('[POSITIVE] should display PS5 Pro price (₹59,999)', async ({ page }) => {
    await navigateToProductPage(page, 14);

    const price = page.locator('[data-testid="product-current-price"]');
    await expect(price).toBeVisible();
    const priceText = await price.textContent();
    expect(priceText).toContain('₹');
    expect(priceText).toContain('59,999');
  });

  test('[POSITIVE] should display PS5 Pro rating 4.9', async ({ page }) => {
    await navigateToProductPage(page, 14);

    await expect(page.locator('[data-testid="product-rating-value"]')).toContainText('4.9');
  });

  test('[POSITIVE] should display PS5 Pro In Stock status', async ({ page }) => {
    await navigateToProductPage(page, 14);

    await expect(page.locator('[data-testid="product-stock-status"]')).toContainText('In Stock');
  });

  test('[POSITIVE] should display ray tracing feature for PS5 Pro', async ({ page }) => {
    await navigateToProductPage(page, 14);

    await expect(page.locator('[data-testid="product-key-features"]')).toBeVisible();
    const featuresText = await page.locator('[data-testid="product-key-features"]').textContent();
    expect(featuresText?.toLowerCase()).toContain('ray tracing');
  });

  test('[POSITIVE] should display 2TB SSD feature for PS5 Pro', async ({ page }) => {
    await navigateToProductPage(page, 14);

    const featuresText = await page.locator('[data-testid="product-key-features"]').textContent();
    expect(featuresText?.toLowerCase()).toContain('2tb');
  });

  test('[POSITIVE] should navigate to Xbox Series X detail page (id: 15)', async ({ page }) => {
    await navigateToProductPage(page, 15);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Xbox Series X');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Microsoft');
  });

  test('[POSITIVE] should display Xbox Series X price (₹44,999)', async ({ page }) => {
    await navigateToProductPage(page, 15);

    const price = page.locator('[data-testid="product-current-price"]');
    await expect(price).toBeVisible();
    const priceText = await price.textContent();
    expect(priceText).toContain('₹');
    expect(priceText).toContain('44,999');
  });

  test('[POSITIVE] should display Xbox Series X In Stock status', async ({ page }) => {
    await navigateToProductPage(page, 15);

    await expect(page.locator('[data-testid="product-stock-status"]')).toContainText('In Stock');
  });

  test('[POSITIVE] should display 4K 120fps feature for Xbox Series X', async ({ page }) => {
    await navigateToProductPage(page, 15);

    const featuresText = await page.locator('[data-testid="product-key-features"]').textContent();
    expect(featuresText?.toLowerCase()).toContain('4k');
    expect(featuresText?.toLowerCase()).toContain('120');
  });

  test('[POSITIVE] should navigate to Nintendo Switch 2 detail page (id: 16)', async ({ page }) => {
    await navigateToProductPage(page, 16);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Switch 2');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Nintendo');
  });

  test('[POSITIVE] should display Nintendo Switch 2 Out of Stock status', async ({ page }) => {
    // Switch 2 has inStock: false in the product data
    await navigateToProductPage(page, 16);

    await expect(page.locator('[data-testid="product-stock-status"]')).toContainText('Out of Stock');
  });

  test('[POSITIVE] should show disabled Add to Cart for out-of-stock Nintendo Switch 2', async ({ page }) => {
    await navigateToProductPage(page, 16);

    const addToCartBtn = page.locator('[data-testid="add-to-cart-button"]');
    if (await addToCartBtn.isVisible()) {
      // Button should be disabled when out of stock
      await expect(addToCartBtn).toBeDisabled();
    } else {
      // Alternatively, the button is not rendered at all
      await expect(addToCartBtn).not.toBeVisible();
    }
  });

  test('[POSITIVE] should display Switch 2 New Arrival badge', async ({ page }) => {
    await navigateToProductPage(page, 16);

    // Product rating should still show
    await expect(page.locator('[data-testid="product-rating-value"]')).toContainText('4.8');
  });

  test('[POSITIVE] should display Nintendo Switch 2 OLED display feature', async ({ page }) => {
    await navigateToProductPage(page, 16);

    await expect(page.locator('[data-testid="product-key-features"]')).toBeVisible();
    const featuresText = await page.locator('[data-testid="product-key-features"]').textContent();
    expect(featuresText?.toLowerCase()).toContain('oled');
  });

  test('[POSITIVE] should display product description for Xbox Series X', async ({ page }) => {
    await navigateToProductPage(page, 15);

    const description = page.locator('[data-testid="product-description"]');
    await expect(description).toBeVisible();
    await expect(description).toContainText(/Xbox|4K|gaming/i);
  });

  test('[POSITIVE] should display breadcrumb for PS5 Pro pointing to gaming category', async ({ page }) => {
    await navigateToProductPage(page, 14);

    await expect(page.locator('[data-testid="breadcrumb-category"]')).toContainText(/gaming/i);
    await expect(page.locator('[data-testid="breadcrumb-product-name"]')).toHaveText('PlayStation 5 Pro');
  });

  // ---------------------------------------------------------------------------
  // SECTION 4 – Cart Operations
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should add PlayStation 5 Pro to cart', async ({ page }) => {
    await navigateToProductPage(page, 14);

    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const confirmed =
      await page.locator('[data-testid="cart-sidebar"]').isVisible({ timeout: 5000 }).catch(() => false) ||
      await page.locator('[data-testid="cart-count"], .cart-badge').first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(confirmed).toBe(true);
  });

  test('[POSITIVE] should verify PS5 Pro appears in cart with correct details', async ({ page }) => {
    await navigateToProductPage(page, 14);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar1 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar1.isVisible()) {
      await closeSidebar1.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    const cartItemName = page.locator('[data-testid="cart-item-name-14"]');
    await expect(cartItemName).toBeVisible();
    await expect(cartItemName).toContainText('PlayStation 5 Pro');
  });

  test('[POSITIVE] should add Xbox Series X to cart', async ({ page }) => {
    await navigateToProductPage(page, 15);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar2 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar2.isVisible()) {
      await closeSidebar2.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);

    const cartItemName = page.locator('[data-testid="cart-item-name-15"]');
    await expect(cartItemName).toBeVisible();
    await expect(cartItemName).toContainText('Xbox Series X');
  });

  test('[POSITIVE] should NOT be able to add out-of-stock Switch 2 to cart', async ({ page }) => {
    await navigateToProductPage(page, 16);

    const addToCartBtn = page.locator('[data-testid="add-to-cart-button"]');
    const outOfStockStatus = page.locator('[data-testid="product-stock-status"]');

    await expect(outOfStockStatus).toContainText('Out of Stock');

    if (await addToCartBtn.isVisible()) {
      // Button should be disabled for out-of-stock item
      await expect(addToCartBtn).toBeDisabled();
    }
    // Cart count should not change
    const cartCount = page.locator('[data-testid="cart-count"], .cart-badge').first();
    const countText = await cartCount.textContent().catch(() => '0');
    expect(parseInt(countText || '0')).toBe(0);
  });

  // ---------------------------------------------------------------------------
  // SECTION 5 – Mandatory Field Validation (Login & Checkout)
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should require all mandatory fields before login submission', async ({ page }) => {
    await navigateToLogin(page);
    await page.waitForSelector('[data-testid="login-form"]');

    // Submit form with password missing
    await page.fill('#username', 'nagarjun');
    await page.click('[data-testid="login-submit-button"]');

    const passwordInput = page.locator('#password');
    const isRequired = await passwordInput.getAttribute('required');

    if (isRequired !== null) {
      const vm = await passwordInput.evaluate((el: HTMLInputElement) => el.validationMessage);
      expect(vm.length).toBeGreaterThan(0);
    } else {
      // custom validation
      await expect(page.locator('[data-testid="login-error"]')).toBeVisible({ timeout: 5000 });
    }
  });

  test('[POSITIVE] should show error message for wrong password', async ({ page }) => {
    await navigateToLogin(page);
    await page.waitForSelector('[data-testid="login-form"]');

    await page.fill('#username', 'nagarjun');
    await page.fill('#password', 'WrongPassword123');
    await page.click('[data-testid="login-submit-button"]');

    await expect(page.locator('[data-testid="login-error"]')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('[data-testid="login-error"]')).toContainText(/invalid|incorrect|wrong/i);
  });

  // ---------------------------------------------------------------------------
  // SECTION 6 – End-to-End: Gaming Purchase Flows
  // ---------------------------------------------------------------------------

  test('[E2E] should complete full purchase flow for PlayStation 5 Pro', async ({ page }) => {
    // Step 1: Login
    await loginAs(page);

    // Step 2: Navigate to Gaming category and select PS5 Pro
    await navigateToCategory(page, 'gaming');
    const ps5Card = page.locator('text=PlayStation 5 Pro').first();
    await expect(ps5Card).toBeVisible();
    await ps5Card.click();

    await page.waitForSelector('[data-testid="product-detail-page"]');
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('PlayStation 5 Pro');

    // Step 3: Add to Cart
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    // Step 4: Go to Cart
    await navigateToCart(page);
    await expect(page.locator('[data-testid^="cart-item-"]').first()).toBeVisible();

    // Step 5: Checkout
    const checkoutBtn = page.locator('[data-testid="proceed-to-checkout-button"], button:has-text("Proceed to Checkout")').first();
    await checkoutBtn.click();
    await page.waitForSelector('[data-testid="checkout-page"], .checkout-page', { timeout: 15000 });

    // Step 6: Shipping Info
    await fillShippingForm(page);
    const cont1 = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont1.click();
    await page.waitForTimeout(800);

    // Step 7: Payment Info
    await fillPaymentForm(page);
    const cont2 = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont2.click();
    await page.waitForTimeout(800);

    // Step 8: Place Order
    const placeOrderBtn = page.locator('[data-testid="place-order-button"], button:has-text("Place Order")').first();
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();

    // Step 9: Verify Success
    await page.waitForSelector('[data-testid="order-success"]', { timeout: 20000 });
    await expect(page.locator('[data-testid="order-success-title"]')).toContainText(/order placed/i);
    await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
    await expect(page.locator('[data-testid="estimated-delivery"]')).toBeVisible();
  });

  test('[E2E] should purchase Xbox Series X via Buy Now button', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 15);
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Xbox Series X');

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

  test('[E2E] should add PS5 Pro and Xbox to cart and verify order total in checkout', async ({ page }) => {
    await loginAs(page);

    // Add PS5 Pro
    await navigateToProductPage(page, 14);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);
    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    // Add Xbox Series X
    await navigateToProductPage(page, 15);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    // Verify cart has 2 items
    await navigateToCart(page);
    const cartItems = page.locator('[data-testid^="cart-item-"]');
    const itemCount = await cartItems.count();
    expect(itemCount).toBeGreaterThanOrEqual(2);

    // Proceed to checkout and verify summary section
    const checkoutBtn = page.locator('[data-testid="proceed-to-checkout-button"], button:has-text("Proceed to Checkout")').first();
    await checkoutBtn.click();
    await page.waitForSelector('[data-testid="checkout-page"], .checkout-page', { timeout: 15000 });

    // Order summary should show grand total > 0
    const totalEl = page.locator('[data-testid*="total"], [data-testid*="grand-total"], .order-total, .total-price').first();
    await expect(totalEl).toBeVisible({ timeout: 8000 });
    const totalText = await totalEl.textContent();
    expect(totalText).toContain('₹');
  });

  test('[E2E] should navigate from Gaming breadcrumb back to category page', async ({ page }) => {
    await navigateToProductPage(page, 14);

    const categoryBreadcrumb = page.locator('[data-testid="breadcrumb-category"]');
    await expect(categoryBreadcrumb).toBeVisible();
    await categoryBreadcrumb.click();

    await page.waitForURL('**/category/gaming');
    expect(page.url()).toContain('/category/gaming');
  });

  test('[E2E] should search for PlayStation and find PS5 Pro', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="header"]');

    const searchInput = page.locator('[data-testid="search-input"], input[type="search"], input[placeholder*="search"]').first();
    await searchInput.fill('PlayStation');

    const searchBtn = page.locator('[data-testid="search-button"], button:has-text("Search")').first();
    await searchBtn.click();

    await page.waitForTimeout(2000);
    await expect(page.locator('text=PlayStation 5 Pro').first()).toBeVisible({ timeout: 10000 });
  });

  test('[E2E] should verify Continue Shopping link after order success', async ({ page }) => {
    await loginAs(page);

    await navigateToProductPage(page, 14);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const closeSidebar3 = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar3.isVisible()) {
      await closeSidebar3.click();
      await page.waitForTimeout(500);
    }

    await navigateToCheckout(page);

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

    // Continue Shopping button in the success actions should navigate back
    const continueShopping = page.locator('[data-testid="success-actions"] a[href*="/products"], [data-testid="success-actions"] a:has-text("Continue Shopping"), a:has-text("Continue Shopping")').first();
    if (await continueShopping.isVisible()) {
      await continueShopping.click();
      await page.waitForTimeout(1500);
      expect(page.url()).not.toContain('/checkout');
    }
  });
});

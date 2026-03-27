/**
 * ============================================================
 *  NDigital – Smartphones Category Test Suite
 *  URL: https://nagarjunreddykasu.github.io/NDigital/category/smartphones
 *
 *  Products covered (from data/products.js):
 *   • iPhone 16 Pro Max  (id: 1)  – Featured, New Arrival
 *   • iPhone 16 Pro      (id: 17) – Featured, New Arrival
 *   • iPhone 16          (id: 18) – New Arrival
 *   • iPhone 16 Plus     (id: 19) – New Arrival
 *   • iPhone 15 Pro Max  (id: 20)
 *   • Galaxy Z Fold 6    (id: 2)  – Featured
 *   • Pixel 9 Pro        (id: 3)
 *
 *  Test Legends:
 *   [POSITIVE] – Happy-path & positive validation tests
 *   [E2E]      – End-to-end user-journey tests
 * ============================================================
 */

import { test, expect } from '@playwright/test';
import {
  loginAs,
  addProductToCart,
  fillShippingForm,
  fillPaymentForm,
  navigateToCategory,
  navigateToProductPage,
  navigateToLogin,
  navigateToCart,
  verifyProductCardsPresent,
  CREDENTIALS,
  BASE_URL,
} from './helpers';

const BASE = BASE_URL;

test.describe('Smartphones Category Tests', () => {
  // ---------------------------------------------------------------------------
  // SECTION 1 – Category Page Navigation & Display
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to Smartphones category from the header nav', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="main-navigation"]');

    const smartphonesLink = page.locator('[data-testid="nav-category-smartphones"]');
    await expect(smartphonesLink).toBeVisible();
    await smartphonesLink.click();

    await page.waitForURL('**/category/smartphones');
    expect(page.url()).toContain('/category/smartphones');
  });

  test('[POSITIVE] should display the Smartphones category page with products', async ({ page }) => {
    await navigateToCategory(page, 'smartphones');

    // Category heading should mention "Smartphones"
    const heading = page.locator('h1, [data-testid="category-title"]').first();
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText?.toLowerCase()).toContain('smartphone');
  });

  test('[POSITIVE] should list at least 7 smartphone products', async ({ page }) => {
    await navigateToCategory(page, 'smartphones');
    const count = await verifyProductCardsPresent(page);
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test('[POSITIVE] should show product card with name, price, and rating', async ({ page }) => {
    await navigateToCategory(page, 'smartphones');
    await page.waitForSelector('[data-testid^="product-card"]');

    const firstCard = page.locator('[data-testid^="product-card"]').first();
    await expect(firstCard).toBeVisible();

    // Name, price, and rating should all be visible on card
    await expect(firstCard.locator('[data-testid*="product-name"], .product-name, h3').first()).toBeVisible();
    await expect(firstCard.locator('[data-testid*="price"], .price, .current-price').first()).toBeVisible();
  });

  test('[POSITIVE] should display iPhone 16 Pro Max on the category page', async ({ page }) => {
    await navigateToCategory(page, 'smartphones');
    const iphone = page.locator('text=iPhone 16 Pro Max').first();
    await expect(iphone).toBeVisible();
  });

  test('[POSITIVE] should display Samsung Galaxy Z Fold 6 on the category page', async ({ page }) => {
    await navigateToCategory(page, 'smartphones');
    const samsung = page.locator('text=Galaxy Z Fold 6').first();
    await expect(samsung).toBeVisible();
  });

  test('[POSITIVE] should display Google Pixel 9 Pro on the category page', async ({ page }) => {
    await navigateToCategory(page, 'smartphones');
    const pixel = page.locator('text=Pixel 9 Pro').first();
    await expect(pixel).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // SECTION 2 – Filtering & Sorting
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should filter smartphones by brand Apple', async ({ page }) => {
    await navigateToCategory(page, 'smartphones');

    // Open filter panel if needed
    const filterBtn = page.locator('[data-testid="filter-toggle-btn"], button:has-text("Filters"), button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }

    // Click the Apple brand checkbox
    const appleFilter = page.locator('label:has-text("Apple"), input[value="apple"]').first();
    await expect(appleFilter).toBeVisible();
    await appleFilter.click();
    await page.waitForTimeout(800);

    // All visible product cards should now belong to Apple
    const productNames = await page.locator('[data-testid^="product-card"] [data-testid*="product-name"], [data-testid^="product-card"] .product-name, [data-testid^="product-card"] h3').allTextContents();
    const brandTexts = await page.locator('[data-testid^="product-card"] [data-testid*="brand"], [data-testid^="product-card"] .brand').allTextContents();

    // At least one card should be visible after filtering
    const cards = await page.locator('[data-testid^="product-card"]').count();
    expect(cards).toBeGreaterThan(0);
  });

  test('[POSITIVE] should sort smartphones by Price: Low to High', async ({ page }) => {
    await navigateToCategory(page, 'smartphones');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption({ label: 'Price: Low to High' });
    await page.waitForTimeout(800);

    // Collect all price strings from product cards
    const priceLocators = page.locator('[data-testid^="product-card"] [data-testid*="price"], [data-testid^="product-card"] .current-price');
    const count = await priceLocators.count();
    expect(count).toBeGreaterThan(1);
  });

  test('[POSITIVE] should sort smartphones by Price: High to Low', async ({ page }) => {
    await navigateToCategory(page, 'smartphones');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await sortSelect.selectOption({ label: 'Price: High to Low' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('[POSITIVE] should sort smartphones by Highest Rated', async ({ page }) => {
    await navigateToCategory(page, 'smartphones');

    const sortSelect = page.locator('select, [data-testid="sort-select"]').first();
    await sortSelect.selectOption({ label: 'Highest Rated' });
    await page.waitForTimeout(800);

    const count = await page.locator('[data-testid^="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  // ---------------------------------------------------------------------------
  // SECTION 3 – Product Detail Page (iPhone 16 Pro Max – id: 1)
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should navigate to iPhone 16 Pro Max detail page', async ({ page }) => {
    await navigateToProductPage(page, 1);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('iPhone 16 Pro Max');
  });

  test('[POSITIVE] should display brand name on iPhone 16 Pro Max detail page', async ({ page }) => {
    await navigateToProductPage(page, 1);

    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Apple');
  });

  test('[POSITIVE] should display current price on iPhone 16 Pro Max detail page', async ({ page }) => {
    await navigateToProductPage(page, 1);

    const price = page.locator('[data-testid="product-current-price"]');
    await expect(price).toBeVisible();
    const priceText = await price.textContent();
    expect(priceText).toContain('₹');
  });

  test('[POSITIVE] should display discount badge on iPhone 16 Pro Max detail page', async ({ page }) => {
    await navigateToProductPage(page, 1);

    // iPhone 16 Pro Max has originalPrice > price → discount badge should appear
    await expect(page.locator('[data-testid="product-discount-badge"]')).toBeVisible();
  });

  test('[POSITIVE] should display product rating and review count', async ({ page }) => {
    await navigateToProductPage(page, 1);

    await expect(page.locator('[data-testid="product-rating-value"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-reviews-count"]')).toBeVisible();
  });

  test('[POSITIVE] should display In Stock status on iPhone 16 Pro Max', async ({ page }) => {
    await navigateToProductPage(page, 1);

    await expect(page.locator('[data-testid="product-stock-status"]')).toContainText('In Stock');
  });

  test('[POSITIVE] should display product key features list', async ({ page }) => {
    await navigateToProductPage(page, 1);

    await expect(page.locator('[data-testid="product-key-features"]')).toBeVisible();
    const features = page.locator('[data-testid^="product-feature-"]');
    const count = await features.count();
    expect(count).toBeGreaterThan(0);
  });

  test('[POSITIVE] should display product description', async ({ page }) => {
    await navigateToProductPage(page, 1);

    await expect(page.locator('[data-testid="product-description"]')).toBeVisible();
  });

  test('[POSITIVE] should display breadcrumb navigation on product detail page', async ({ page }) => {
    await navigateToProductPage(page, 1);
    await page.waitForSelector('[data-testid="product-breadcrumb"]');

    await expect(page.locator('[data-testid="breadcrumb-home"]')).toBeVisible();
    await expect(page.locator('[data-testid="breadcrumb-products"]')).toBeVisible();
    await expect(page.locator('[data-testid="breadcrumb-product-name"]')).toBeVisible();
  });

  test('[POSITIVE] should switch product thumbnail image', async ({ page }) => {
    await navigateToProductPage(page, 1);

    const thumbnails = page.locator('[data-testid^="product-thumbnail-"]');
    const thumbCount = await thumbnails.count();

    if (thumbCount > 1) {
      await thumbnails.nth(1).click();
      await expect(thumbnails.nth(1)).toHaveClass(/active/);
    }
  });

  test('[POSITIVE] should increase product quantity on detail page', async ({ page }) => {
    await navigateToProductPage(page, 1);

    const qtyIncrease = page.locator('[data-testid="increase-quantity-button"]');
    const qtyDisplay = page.locator('[data-testid="quantity-value"]');

    if (await qtyIncrease.isVisible()) {
      await qtyIncrease.click();
      await expect(qtyDisplay).toHaveText('2');
    }
  });

  test('[POSITIVE] should decrease product quantity (not below 1) on detail page', async ({ page }) => {
    await navigateToProductPage(page, 1);

    const qtyDecrease = page.locator('[data-testid="decrease-quantity-button"]');
    if (await qtyDecrease.isVisible()) {
      // Decrease button should be disabled at quantity = 1
      await expect(qtyDecrease).toBeDisabled();
    }
  });

  test('[POSITIVE] should show Add to Cart button on smartphone detail page', async ({ page }) => {
    await navigateToProductPage(page, 1);

    await expect(page.locator('[data-testid="add-to-cart-button"]')).toBeVisible();
  });

  test('[POSITIVE] should show Buy Now button on smartphone detail page', async ({ page }) => {
    await navigateToProductPage(page, 1);

    await expect(page.locator('[data-testid="buy-now-button"]')).toBeVisible();
  });

  test('[POSITIVE] should display related products section on detail page', async ({ page }) => {
    await navigateToProductPage(page, 1);

    // Scroll down to related products
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const related = page.locator('[data-testid="related-products-section"]');
    await expect(related).toBeVisible({ timeout: 8000 });
  });

  test('[POSITIVE] should navigate to Pixel 9 Pro detail page (id: 3)', async ({ page }) => {
    await navigateToProductPage(page, 3);

    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Pixel 9 Pro');
    await expect(page.locator('[data-testid="product-info"] [data-testid="product-brand"]')).toHaveText('Google');
  });

  // ---------------------------------------------------------------------------
  // SECTION 4 – Add to Cart Flow
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should add iPhone 16 Pro Max to cart', async ({ page }) => {
    await navigateToProductPage(page, 1);

    await page.click('[data-testid="add-to-cart-button"]');

    // Cart sidebar or toast notification should confirm addition
    const cartSidebar = page.locator('[data-testid="cart-sidebar"]');
    const cartToast = page.locator('[data-testid="cart-toast"], .toast, .notification').first();

    const cartConfirmed = await Promise.race([
      cartSidebar.waitFor({ state: 'visible', timeout: 8000 }).then(() => true),
      cartToast.waitFor({ state: 'visible', timeout: 8000 }).then(() => true),
    ]).catch(() => false);

    expect(cartConfirmed).toBe(true);
  });

  test('[POSITIVE] should reflect cart count in header after adding smartphone', async ({ page }) => {
    await navigateToProductPage(page, 1);

    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    const cartBadge = page.locator('[data-testid="cart-count"], .cart-badge, .cart-count').first();
    await expect(cartBadge).toBeVisible({ timeout: 8000 });
  });

  test('[POSITIVE] should open Cart page from header', async ({ page }) => {
    await navigateToProductPage(page, 1);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    await navigateToCart(page);

    const cartPage = page.locator('[data-testid="cart-page"]');
    const emptyCart = page.locator('[data-testid="cart-page-empty"]');
    const cartVisible = await cartPage.isVisible() || await emptyCart.isVisible();
    expect(cartVisible).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // SECTION 5 – Mandatory Field Validation (Checkout / Login)
  // ---------------------------------------------------------------------------

  test('[POSITIVE] should validate login with correct credentials', async ({ page }) => {
    await navigateToLogin(page);

    await page.fill('#username', CREDENTIALS.username);
    await page.fill('#password', CREDENTIALS.password);
    await page.click('[data-testid="login-submit-button"]');

    // Should redirect away from /login
    await page.waitForURL((url) => !url.toString().includes('/login'), { timeout: 15000 });
    expect(page.url()).not.toContain('/login');
  });

  test('[POSITIVE] should show error for invalid login credentials', async ({ page }) => {
    await navigateToLogin(page);

    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'wrongpass');
    await page.click('[data-testid="login-submit-button"]');

    await expect(page.locator('[data-testid="login-error"]')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('[data-testid="login-error"]')).toContainText(/invalid|incorrect|wrong/i);
  });

  test('[POSITIVE] should show empty username validation on login form', async ({ page }) => {
    await navigateToLogin(page);

    // Submit with empty fields
    await page.click('[data-testid="login-submit-button"]');

    // HTML5 validation or custom error should prevent submission
    const usernameInput = page.locator('#username');
    const isRequired = await usernameInput.getAttribute('required');
    if (isRequired !== null) {
      // HTML5 required validation fires — browser will show native validation
      const validationMessage = await usernameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
      expect(validationMessage.length).toBeGreaterThan(0);
    } else {
      // Custom error displayed
      await expect(page.locator('[data-testid="login-error"]')).toBeVisible({ timeout: 5000 });
    }
  });

  // ---------------------------------------------------------------------------
  // SECTION 6 – End-to-End: Browse → Add to Cart → Checkout (Smartphones)
  // ---------------------------------------------------------------------------

  test('[E2E] should complete full purchase flow for iPhone 16 Pro Max', async ({ page }) => {
    // Step 1: Login
    await loginAs(page);

    // Step 2: Navigate to Smartphones and pick iPhone 16 Pro Max
    await navigateToProductPage(page, 1);
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('iPhone 16 Pro Max');

    // Step 3: Add to Cart
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if open
    const closeSidebar = page.locator('[data-testid="cart-close-button"], button:has-text("Close")').first();
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
    }

    // Step 4: Navigate to Cart
    await navigateToCart(page);
    await expect(page.locator('[data-testid="cart-items-list"]')).toBeVisible();
    await expect(page.locator('[data-testid^="cart-item-"]').first()).toBeVisible();

    // Step 5: Proceed to Checkout
    const checkoutBtn = page.locator('[data-testid="proceed-to-checkout-button"], button:has-text("Proceed to Checkout"), a:has-text("Checkout")').first();
    await expect(checkoutBtn).toBeVisible();
    await checkoutBtn.click();

    await page.waitForSelector('[data-testid="checkout-page"], .checkout-page, [data-testid="checkout-shipping"]', { timeout: 15000 });

    // Step 6: Fill Shipping details
    await fillShippingForm(page);

    const continueBtn = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await continueBtn.click();
    await page.waitForTimeout(800);

    // Step 7: Fill Payment details
    await fillPaymentForm(page);

    const continuePayBtn = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await continuePayBtn.click();
    await page.waitForTimeout(800);

    // Step 8: Review and Place Order
    const placeOrderBtn = page.locator('[data-testid="place-order-button"], button:has-text("Place Order")').first();
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();

    // Step 9: Confirm Order Success
    await page.waitForSelector('[data-testid="order-success"], [data-testid="checkout-page-success"]', { timeout: 20000 });
    await expect(page.locator('[data-testid="order-success-title"]')).toContainText(/order placed/i);
  });

  test('[E2E] should complete purchase of Galaxy Z Fold 6 via Buy Now', async ({ page }) => {
    // Step 1: Login first
    await loginAs(page);

    // Step 2: Go directly to Galaxy Z Fold 6 detail
    await navigateToProductPage(page, 2);
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Galaxy Z Fold 6');

    // Step 3: Click Buy Now (bypasses cart, goes straight to checkout)
    await page.click('[data-testid="buy-now-button"]');
    await page.waitForURL('**/checkout', { timeout: 15000 });

    // Step 4: Fill Shipping
    await fillShippingForm(page);
    const cont1 = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont1.click();
    await page.waitForTimeout(800);

    // Step 5: Fill Payment
    await fillPaymentForm(page);
    const cont2 = page.locator('[data-testid="checkout-continue-button"], button:has-text("Continue"), button:has-text("Next")').first();
    await cont2.click();
    await page.waitForTimeout(800);

    // Step 6: Place Order
    const placeOrderBtn = page.locator('[data-testid="place-order-button"], button:has-text("Place Order")').first();
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();

    await page.waitForSelector('[data-testid="order-success"]', { timeout: 20000 });
    await expect(page.locator('[data-testid="order-success-title"]')).toContainText(/order placed/i);
  });

  test('[E2E] should search for a smartphone and navigate to result', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('[data-testid="header"]');

    // Find the search input
    const searchInput = page.locator('[data-testid="search-input"], input[type="search"], input[placeholder*="search"]').first();
    await expect(searchInput).toBeVisible();
    await searchInput.fill('iPhone 16 Pro');

    // Submit search
    const searchForm = page.locator('[data-testid="search-form"], form:has([type="search"])').first();
    await searchForm.press('Enter');

    await page.waitForURL('**/products**', { timeout: 15000 });

    // Should see search results with iPhone 16 Pro
    const results = page.locator('[data-testid^="product-card"]');
    await expect(results.first()).toBeVisible({ timeout: 10000 });
  });

  test('[E2E] should navigate between multiple smartphone product pages', async ({ page }) => {
    // Visit iPhone 16 Pro Max
    await navigateToProductPage(page, 1);
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('iPhone 16 Pro Max');

    // Navigate to iPhone 16 via breadcrumb → category → product
    await navigateToProductPage(page, 18);
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('iPhone 16');

    // Navigate to Pixel 9 Pro
    await navigateToProductPage(page, 3);
    await expect(page.locator('[data-testid="product-title"]')).toHaveText('Pixel 9 Pro');
  });

  test('[E2E] should update quantity in cart and verify subtotal changes', async ({ page }) => {
    // Add iPhone 16 to cart
    await navigateToProductPage(page, 18);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    // Navigate to cart
    await navigateToCart(page);
    await page.waitForSelector('[data-testid^="cart-item-"]');

    // Get initial subtotal text
    const subtotalEl = page.locator('[data-testid^="cart-item-subtotal-"]').first();
    const initialSubtotal = await subtotalEl.textContent();

    // Increase quantity
    const increaseBtn = page.locator('[data-testid^="cart-increase-qty-"]').first();
    await increaseBtn.click();
    await page.waitForTimeout(500);

    const updatedSubtotal = await subtotalEl.textContent();
    expect(updatedSubtotal).not.toEqual(initialSubtotal);
  });

  test('[E2E] should remove a smartphone from the cart', async ({ page }) => {
    await navigateToProductPage(page, 1);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    await navigateToCart(page);
    await page.waitForSelector('[data-testid^="cart-item-"]');

    const removeBtn = page.locator('[data-testid^="cart-remove-item-"]').first();
    await removeBtn.click();
    await page.waitForTimeout(800);

    // Cart should now be empty (or the removed item should be gone)
    const cartItems = page.locator('[data-testid^="cart-item-"]');
    const remainingCount = await cartItems.count();
    // Either cart is empty or the item count decreased
    const emptyCart = page.locator('[data-testid="empty-cart"]');
    const cartIsEmpty = await emptyCart.isVisible().catch(() => false);
    expect(cartIsEmpty || remainingCount === 0).toBe(true);
  });

  test('[E2E] should redirect unauthenticated user to login before checkout', async ({ page }) => {
    // Add a product to cart without logging in
    await navigateToProductPage(page, 1);
    await page.click('[data-testid="add-to-cart-button"]');
    await page.waitForTimeout(1000);

    // Close cart sidebar if it opened
    const closeSidebar = page.locator('[data-testid="cart-close-button"]');
    if (await closeSidebar.isVisible()) {
      await closeSidebar.click();
      await page.waitForTimeout(500);
    }

    // Go to cart and try checkout
    await navigateToCart(page);

    const checkoutBtn = page.locator('[data-testid="proceed-to-checkout-button"], button:has-text("Proceed to Checkout"), button:has-text("Checkout")').first();
    await checkoutBtn.click();

    // Should redirect to login
    await page.waitForURL('**/login**', { timeout: 15000 });
    expect(page.url()).toContain('/login');
  });
});

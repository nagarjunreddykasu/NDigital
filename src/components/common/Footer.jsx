import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Youtube, Linkedin,
  Mail, Phone, MapPin, CreditCard, Shield, Truck, RotateCcw
} from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" data-testid="footer">
      {/* Features Bar */}
      <div className="footer-features" data-testid="footer-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item" data-testid="footer-feature-shipping">
              <Truck size={32} />
              <div>
                <strong>Free Shipping</strong>
                <span>On orders over $99</span>
              </div>
            </div>
            <div className="feature-item" data-testid="footer-feature-returns">
              <RotateCcw size={32} />
              <div>
                <strong>Easy Returns</strong>
                <span>30-day return policy</span>
              </div>
            </div>
            <div className="feature-item" data-testid="footer-feature-security">
              <Shield size={32} />
              <div>
                <strong>Secure Shopping</strong>
                <span>256-bit SSL encryption</span>
              </div>
            </div>
            <div className="feature-item" data-testid="footer-feature-payments">
              <CreditCard size={32} />
              <div>
                <strong>Flexible Payments</strong>
                <span>Multiple payment options</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main" data-testid="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section" data-testid="footer-company-section">
              <Link to="/" className="footer-logo" data-testid="footer-logo">
                <span className="logo-icon">N</span>
                <span className="logo-text">Digital</span>
              </Link>
              <p className="footer-description">
                Your trusted destination for premium electronics. 
                We offer the latest tech products with unbeatable prices 
                and exceptional customer service.
              </p>
              <div className="footer-contact" data-testid="footer-contact">
                <a href="mailto:support@ndigital.com" data-testid="footer-email">
                  <Mail size={18} /> support@ndigital.com
                </a>
                <a href="tel:1-800-NDIGITAL" data-testid="footer-phone">
                  <Phone size={18} /> 1-800-NDIGITAL
                </a>
                <span data-testid="footer-address">
                  <MapPin size={18} /> San Francisco, CA 94102
                </span>
              </div>
            </div>

            {/* Shop */}
            <div className="footer-section" data-testid="footer-shop-section">
              <h4>Shop</h4>
              <ul>
                <li><Link to="/category/smartphones" data-testid="footer-link-smartphones">Smartphones</Link></li>
                <li><Link to="/category/laptops" data-testid="footer-link-laptops">Laptops</Link></li>
                <li><Link to="/category/tvs" data-testid="footer-link-tvs">TVs & Displays</Link></li>
                <li><Link to="/category/audio" data-testid="footer-link-audio">Audio</Link></li>
                <li><Link to="/category/cameras" data-testid="footer-link-cameras">Cameras</Link></li>
                <li><Link to="/category/gaming" data-testid="footer-link-gaming">Gaming</Link></li>
                <li><Link to="/deals" data-testid="footer-link-deals">Today's Deals</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section" data-testid="footer-service-section">
              <h4>Customer Service</h4>
              <ul>
                <li><Link to="/contact" data-testid="footer-link-contact">Contact Us</Link></li>
                <li><Link to="/faq" data-testid="footer-link-faq">FAQs</Link></li>
                <li><Link to="/shipping" data-testid="footer-link-shipping">Shipping Information</Link></li>
                <li><Link to="/returns" data-testid="footer-link-returns">Returns & Exchanges</Link></li>
                <li><Link to="/warranty" data-testid="footer-link-warranty">Warranty Information</Link></li>
                <li><Link to="/track-order" data-testid="footer-link-track">Track Your Order</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div className="footer-section" data-testid="footer-account-section">
              <h4>My Account</h4>
              <ul>
                <li><Link to="/account" data-testid="footer-link-account">My Account</Link></li>
                <li><Link to="/orders" data-testid="footer-link-orders">Order History</Link></li>
                <li><Link to="/wishlist" data-testid="footer-link-wishlist">Wishlist</Link></li>
                <li><Link to="/addresses" data-testid="footer-link-addresses">Addresses</Link></li>
                <li><Link to="/payment-methods" data-testid="footer-link-payment">Payment Methods</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-section" data-testid="footer-newsletter-section">
              <h4>Stay Connected</h4>
              <p className="newsletter-text">
                Subscribe to our newsletter for exclusive deals and tech news.
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()} data-testid="footer-newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="newsletter-input"
                  data-testid="footer-newsletter-input"
                  aria-label="Newsletter email"
                />
                <button type="submit" className="newsletter-btn" data-testid="footer-newsletter-button">Subscribe</button>
              </form>
              <div className="social-links" data-testid="footer-social-links">
                <a href="#" aria-label="Facebook" data-testid="social-facebook"><Facebook size={20} /></a>
                <a href="#" aria-label="Twitter" data-testid="social-twitter"><Twitter size={20} /></a>
                <a href="#" aria-label="Instagram" data-testid="social-instagram"><Instagram size={20} /></a>
                <a href="#" aria-label="YouTube" data-testid="social-youtube"><Youtube size={20} /></a>
                <a href="#" aria-label="LinkedIn" data-testid="social-linkedin"><Linkedin size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom" data-testid="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p data-testid="footer-copyright">&copy; {currentYear} NDigital. All rights reserved.</p>
            <div className="footer-links" data-testid="footer-legal-links">
              <Link to="/privacy" data-testid="footer-link-privacy">Privacy Policy</Link>
              <Link to="/terms" data-testid="footer-link-terms">Terms of Service</Link>
              <Link to="/accessibility" data-testid="footer-link-accessibility">Accessibility</Link>
              <Link to="/sitemap" data-testid="footer-link-sitemap">Sitemap</Link>
            </div>
            <div className="payment-icons" data-testid="footer-payment-icons">
              <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" data-testid="payment-visa" />
              <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" data-testid="payment-mastercard" />
              <img src="https://img.icons8.com/color/48/amex.png" alt="American Express" data-testid="payment-amex" />
              <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" data-testid="payment-paypal" />
              <img src="https://img.icons8.com/color/48/apple-pay.png" alt="Apple Pay" data-testid="payment-applepay" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

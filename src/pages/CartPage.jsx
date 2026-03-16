import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Trash2, Plus, Minus, ShoppingBag, ChevronRight, 
  Tag, ArrowRight, Shield, Truck, RotateCcw
} from 'lucide-react';
import { 
  selectCartItems, 
  selectCartTotal, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from '../store/cartSlice';
import './CartPage.css';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Format price in INR
  const formatINR = (amount) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;

  const shipping = subtotal >= 7999 ? 0 : 799;
  const tax = subtotal * 0.18; // 18% GST
  const discount = promoApplied ? subtotal * (promoDiscount / 100) : 0;
  const total = subtotal + shipping + tax - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      setPromoDiscount(10);
    }
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setPromoDiscount(0);
    setPromoCode('');
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page empty" data-testid="cart-page-empty">
        <div className="container">
          <div className="empty-cart" data-testid="empty-cart">
            <ShoppingBag size={80} />
            <h1 data-testid="empty-cart-title">Your Cart is Empty</h1>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn btn-primary btn-lg" data-testid="start-shopping-link">
              Start Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" data-testid="cart-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb" data-testid="cart-breadcrumb">
        <div className="container">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <ChevronRight size={16} />
          <span>Shopping Cart</span>
        </div>
      </nav>

      <div className="container">
        <h1 className="page-title" data-testid="cart-page-title">Shopping Cart (<span data-testid="cart-items-count">{items.length}</span> items)</h1>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items-section" data-testid="cart-items-section">
            <div className="cart-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span></span>
            </div>

            <div className="cart-items" data-testid="cart-items-list">
              {items.map(item => (
                <div key={item.id} className="cart-item" data-testid={`cart-item-${item.id}`} data-product-id={item.id}>
                  <div className="item-product">
                    <img src={item.image} alt={item.name} data-testid={`cart-item-image-${item.id}`} />
                    <div className="item-details">
                      <Link to={`/product/${item.id}`} className="item-name" data-testid={`cart-item-name-${item.id}`}>
                        {item.name}
                      </Link>
                      <span className="item-brand" data-testid={`cart-item-brand-${item.id}`}>{item.brand}</span>
                      {item.inStock ? (
                        <span className="in-stock" data-testid={`cart-item-in-stock-${item.id}`}>In Stock</span>
                      ) : (
                        <span className="out-stock" data-testid={`cart-item-out-stock-${item.id}`}>Out of Stock</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="item-price" data-testid={`cart-item-price-${item.id}`}>
                    {formatINR(item.price)}
                  </div>
                  
                  <div className="item-quantity">
                    <div className="quantity-controls" data-testid={`cart-quantity-controls-${item.id}`}>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        disabled={item.quantity <= 1}
                        data-testid={`cart-decrease-qty-${item.id}`}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span data-testid={`cart-item-qty-${item.id}`}>{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        data-testid={`cart-increase-qty-${item.id}`}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-subtotal" data-testid={`cart-item-subtotal-${item.id}`}>
                    {formatINR(item.price * item.quantity)}
                  </div>
                  
                  <button 
                    className="item-remove"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    data-testid={`cart-remove-item-${item.id}`}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions" data-testid="cart-actions">
              <Link to="/products" className="btn btn-secondary" data-testid="continue-shopping-link">
                Continue Shopping
              </Link>
              <button 
                className="btn btn-secondary"
                onClick={() => dispatch(clearCart())}
                data-testid="clear-cart-button"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary" data-testid="order-summary">
            <h2>Order Summary</h2>

            {/* Promo Code */}
            <div className="promo-section" data-testid="promo-section">
              <label>Promo Code</label>
              {promoApplied ? (
                <div className="promo-applied" data-testid="promo-applied">
                  <Tag size={16} />
                  <span data-testid="promo-discount-text">{promoCode.toUpperCase()} - {promoDiscount}% off</span>
                  <button onClick={handleRemovePromo} data-testid="remove-promo-button">Remove</button>
                </div>
              ) : (
                <div className="promo-input" data-testid="promo-input-section">
                  <input 
                    type="text" 
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    data-testid="promo-code-input"
                    aria-label="Promo code"
                  />
                  <button onClick={handleApplyPromo} data-testid="apply-promo-button">Apply</button>
                </div>
              )}
              <p className="promo-hint" data-testid="promo-hint">Try "SAVE10" for 10% off</p>
            </div>

            {/* Summary Details */}
            <div className="summary-details" data-testid="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span data-testid="cart-subtotal">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount ({promoDiscount}%)</span>
                  <span data-testid="cart-discount">-{formatINR(discount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span data-testid="cart-shipping">{shipping === 0 ? 'FREE' : formatINR(shipping)}</span>
              </div>
              <div className="summary-row">
                <span>GST (18%)</span>
                <span data-testid="cart-tax">{formatINR(tax)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span data-testid="cart-total">{formatINR(total)}</span>
              </div>
            </div>

            {shipping === 0 && (
              <div className="free-shipping-notice" data-testid="free-shipping-notice">
                <Truck size={18} />
                You qualify for free shipping!
              </div>
            )}

            <button 
              className="btn btn-primary btn-lg btn-block"
              onClick={handleCheckout}
              data-testid="proceed-to-checkout-button"
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>

            {/* Trust Badges */}
            <div className="trust-badges" data-testid="trust-badges">
              <div className="badge">
                <Shield size={18} />
                <span>Secure Checkout</span>
              </div>
              <div className="badge">
                <RotateCcw size={18} />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

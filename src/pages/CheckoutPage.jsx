import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ChevronRight, CreditCard, Building, Check, Lock,
  Truck, Shield, ArrowRight
} from 'lucide-react';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';
import './CheckoutPage.css';

const steps = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const { user } = useSelector(state => state.auth);

  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [shippingData, setShippingData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  const [paymentErrors, setPaymentErrors] = useState({});

  const [paymentData, setPaymentData] = useState({
    method: 'card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  // Currency formatting for INR
  const formatINR = (amount) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  
  const shipping = shippingMethod === 'express' ? 1499 : (subtotal >= 7999 ? 0 : 799);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const validatePayment = () => {
    const errors = {};
    if (paymentData.method === 'card') {
      if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 16) {
        errors.cardNumber = 'Valid card number is required';
      }
      if (!paymentData.cardName || paymentData.cardName.trim().length < 2) {
        errors.cardName = 'Name on card is required';
      }
      if (!paymentData.expiry || !/^\d{2}\/\d{2}$/.test(paymentData.expiry)) {
        errors.expiry = 'Valid expiry date (MM/YY) is required';
      }
      if (!paymentData.cvv || paymentData.cvv.length < 3) {
        errors.cvv = 'Valid CVV is required';
      }
    }
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      // Validate payment before proceeding
      if (!validatePayment()) {
        return;
      }
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = () => {
    // Create new order object
    const newOrder = {
      id: `ND-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing', // New orders start as Processing
      total: total,
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        qty: item.quantity,
        price: item.price * item.quantity,
        image: item.image,
      })),
    };
    
    // Save to localStorage
    const existingOrders = localStorage.getItem('ndigital_orders');
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.unshift(newOrder); // Add new order at the beginning
    localStorage.setItem('ndigital_orders', JSON.stringify(orders));
    
    // Simulate order placement
    setTimeout(() => {
      setOrderPlaced(true);
      dispatch(clearCart());
    }, 1500);
  };

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page" data-testid="checkout-page-success">
        <div className="container">
          <div className="order-success" data-testid="order-success">
            <div className="success-icon">
              <Check size={48} />
            </div>
            <h1 data-testid="order-success-title">Order Placed Successfully!</h1>
            <p data-testid="order-success-message">Thank you for your purchase. Your order confirmation has been sent to {shippingData.email}</p>
            <div className="order-details" data-testid="order-details">
              <p><strong>Order Number:</strong> <span data-testid="order-number">ND-{Date.now().toString().slice(-8)}</span></p>
              <p><strong>Estimated Delivery:</strong> <span data-testid="estimated-delivery">{shippingMethod === 'express' ? '2-3' : '5-7'} business days</span></p>
            </div>
            <div className="success-actions" data-testid="success-actions">
              <Link to="/orders" className="btn btn-primary" data-testid="view-orders-link">
                View Orders
              </Link>
              <Link to="/" className="btn btn-secondary" data-testid="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page" data-testid="checkout-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb" data-testid="checkout-breadcrumb">
        <div className="container">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <ChevronRight size={16} />
          <Link to="/cart" data-testid="breadcrumb-cart">Cart</Link>
          <ChevronRight size={16} />
          <span>Checkout</span>
        </div>
      </nav>

      <div className="container">
        {/* Progress Steps */}
        <div className="checkout-progress" data-testid="checkout-progress">
          {steps.map((step, index) => (
            <div 
              key={step}
              className={`progress-step ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              data-testid={`progress-step-${step.toLowerCase()}`}
            >
              <div className="step-number">
                {index < currentStep ? <Check size={16} /> : index + 1}
              </div>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          {/* Main Content */}
          <div className="checkout-main">
            {/* Step 1: Shipping */}
            {currentStep === 0 && (
              <div className="checkout-section" data-testid="shipping-section">
                <h2>Shipping Information</h2>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      className="form-input"
                      value={shippingData.firstName}
                      onChange={handleShippingChange}
                      required
                      data-testid="shipping-first-name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      className="form-input"
                      value={shippingData.lastName}
                      onChange={handleShippingChange}
                      required
                      data-testid="shipping-last-name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      className="form-input"
                      value={shippingData.email}
                      onChange={handleShippingChange}
                      required
                      data-testid="shipping-email"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="form-input"
                      value={shippingData.phone}
                      onChange={handleShippingChange}
                      required
                      data-testid="shipping-phone"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Address</label>
                    <input 
                      type="text" 
                      name="address"
                      className="form-input"
                      value={shippingData.address}
                      onChange={handleShippingChange}
                      required
                      data-testid="shipping-address"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input 
                      type="text" 
                      name="city"
                      className="form-input"
                      value={shippingData.city}
                      onChange={handleShippingChange}
                      required
                      data-testid="shipping-city"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input 
                      type="text" 
                      name="state"
                      className="form-input"
                      value={shippingData.state}
                      onChange={handleShippingChange}
                      required
                      data-testid="shipping-state"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP Code</label>
                    <input 
                      type="text" 
                      name="zipCode"
                      className="form-input"
                      value={shippingData.zipCode}
                      onChange={handleShippingChange}
                      required
                      data-testid="shipping-zip-code"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <select 
                      name="country"
                      className="form-input"
                      value={shippingData.country}
                      onChange={handleShippingChange}
                      data-testid="shipping-country"
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>

                <h3 className="subsection-title">Shipping Method</h3>
                <div className="shipping-options" data-testid="shipping-options">
                  <label className={`shipping-option ${shippingMethod === 'standard' ? 'selected' : ''}`} data-testid="shipping-standard">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      data-testid="shipping-standard-radio"
                    />
                    <div className="option-content">
                      <Truck size={24} />
                      <div>
                        <strong>Standard Shipping</strong>
                        <span>5-7 business days</span>
                      </div>
                    </div>
                    <span className="option-price" data-testid="shipping-standard-price">
                      {subtotal >= 7999 ? 'FREE' : '₹799'}
                    </span>
                  </label>
                  <label className={`shipping-option ${shippingMethod === 'express' ? 'selected' : ''}`} data-testid="shipping-express">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      data-testid="shipping-express-radio"
                    />
                    <div className="option-content">
                      <Truck size={24} />
                      <div>
                        <strong>Express Shipping</strong>
                        <span>2-3 business days</span>
                      </div>
                    </div>
                    <span className="option-price" data-testid="shipping-express-price">₹1,499</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 1 && (
              <div className="checkout-section" data-testid="payment-section">
                <h2>Payment Method</h2>

                <div className="payment-methods" data-testid="payment-methods">
                  <label className={`payment-option ${paymentData.method === 'card' ? 'selected' : ''}`} data-testid="payment-card-option">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="card"
                      checked={paymentData.method === 'card'}
                      onChange={() => setPaymentData({ ...paymentData, method: 'card' })}
                      data-testid="payment-card-radio"
                    />
                    <CreditCard size={24} />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className={`payment-option ${paymentData.method === 'paypal' ? 'selected' : ''}`} data-testid="payment-paypal-option">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="paypal"
                      checked={paymentData.method === 'paypal'}
                      onChange={() => setPaymentData({ ...paymentData, method: 'paypal' })}
                      data-testid="payment-paypal-radio"
                    />
                    <Building size={24} />
                    <span>PayPal</span>
                  </label>
                </div>

                {paymentData.method === 'card' && (
                  <div className="card-form" data-testid="card-form">
                    <div className="form-group full-width">
                      <label className="form-label">Card Number <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="cardNumber"
                        className={`form-input ${paymentErrors.cardNumber ? 'input-error' : ''}`}
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        required
                        data-testid="payment-card-number"
                      />
                      {paymentErrors.cardNumber && <span className="error-text" data-testid="card-number-error">{paymentErrors.cardNumber}</span>}
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">Name on Card <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="cardName"
                        className={`form-input ${paymentErrors.cardName ? 'input-error' : ''}`}
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        required
                        data-testid="payment-card-name"
                      />
                      {paymentErrors.cardName && <span className="error-text" data-testid="card-name-error">{paymentErrors.cardName}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Expiry Date <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="expiry"
                        className={`form-input ${paymentErrors.expiry ? 'input-error' : ''}`}
                        placeholder="MM/YY"
                        value={paymentData.expiry}
                        onChange={handlePaymentChange}
                        required
                        data-testid="payment-card-expiry"
                      />
                      {paymentErrors.expiry && <span className="error-text" data-testid="card-expiry-error">{paymentErrors.expiry}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="cvv"
                        className={`form-input ${paymentErrors.cvv ? 'input-error' : ''}`}
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={handlePaymentChange}
                        required
                        data-testid="payment-card-cvv"
                      />
                      {paymentErrors.cvv && <span className="error-text" data-testid="card-cvv-error">{paymentErrors.cvv}</span>}
                    </div>
                  </div>
                )}

                <div className="security-note" data-testid="security-note">
                  <Lock size={18} />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 2 && (
              <div className="checkout-section" data-testid="review-section">
                <h2>Review Your Order</h2>

                <div className="review-section" data-testid="review-shipping-address">
                  <h3>Shipping Address</h3>
                  <p data-testid="review-address-text">
                    {shippingData.firstName} {shippingData.lastName}<br />
                    {shippingData.address}<br />
                    {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
                    {shippingData.country}
                  </p>
                  <button className="edit-btn" onClick={() => setCurrentStep(0)} data-testid="edit-shipping-button">Edit</button>
                </div>

                <div className="review-section" data-testid="review-payment-method">
                  <h3>Payment Method</h3>
                  <p data-testid="review-payment-text">
                    {paymentData.method === 'card' 
                      ? `Card ending in ${paymentData.cardNumber.slice(-4) || '****'}`
                      : 'PayPal'
                    }
                  </p>
                  <button className="edit-btn" onClick={() => setCurrentStep(1)} data-testid="edit-payment-button">Edit</button>
                </div>

                <div className="review-section" data-testid="review-order-items">
                  <h3>Order Items</h3>
                  <div className="review-items" data-testid="review-items-list">
                    {items.map(item => (
                      <div key={item.id} className="review-item" data-testid={`review-item-${item.id}`}>
                        <img src={item.image} alt={item.name} data-testid={`review-item-image-${item.id}`} />
                        <div className="review-item-info">
                          <span className="review-item-name" data-testid={`review-item-name-${item.id}`}>{item.name}</span>
                          <span className="review-item-qty" data-testid={`review-item-qty-${item.id}`}>Qty: {item.quantity}</span>
                        </div>
                        <span className="review-item-price" data-testid={`review-item-price-${item.id}`}>
                          {formatINR(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="checkout-nav" data-testid="checkout-nav">
              {currentStep > 0 && (
                <button className="btn btn-secondary" onClick={handleBack} data-testid="checkout-back-button">
                  Back
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button className="btn btn-primary" onClick={handleContinue} data-testid="checkout-continue-button">
                  Continue
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button className="btn btn-primary btn-lg" onClick={handlePlaceOrder} data-testid="place-order-button">
                  Place Order
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="checkout-sidebar" data-testid="checkout-sidebar">
            <div className="order-summary" data-testid="checkout-order-summary">
              <h3>Order Summary</h3>
              
              <div className="summary-items" data-testid="checkout-summary-items">
                {items.slice(0, 3).map(item => (
                  <div key={item.id} className="summary-item" data-testid={`summary-item-${item.id}`}>
                    <img src={item.image} alt={item.name} data-testid={`summary-item-image-${item.id}`} />
                    <div>
                      <span className="item-name" data-testid={`summary-item-name-${item.id}`}>{item.name}</span>
                      <span className="item-qty" data-testid={`summary-item-qty-${item.id}`}>x{item.quantity}</span>
                    </div>
                    <span className="item-price" data-testid={`summary-item-price-${item.id}`}>{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
                {items.length > 3 && (
                  <p className="more-items" data-testid="summary-more-items">+{items.length - 3} more items</p>
                )}
              </div>

              <div className="summary-totals" data-testid="checkout-summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span data-testid="checkout-subtotal">{formatINR(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span data-testid="checkout-shipping">{shipping === 0 ? 'FREE' : formatINR(shipping)}</span>
                </div>
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span data-testid="checkout-tax">{formatINR(tax)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span data-testid="checkout-total">{formatINR(total)}</span>
                </div>
              </div>

              <div className="trust-badges" data-testid="checkout-trust-badges">
                <div className="badge">
                  <Shield size={16} />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

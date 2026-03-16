import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { 
  closeCart, 
  removeFromCart, 
  updateQuantity,
  selectCartItems,
  selectCartTotal 
} from '../../store/cartSlice';
import './CartSidebar.css';

export default function CartSidebar() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(state => state.cart.isOpen);

  // Format price in INR
  const formatINR = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="cart-overlay" 
        onClick={() => dispatch(closeCart())}
        data-testid="cart-overlay"
      />
      <div className="cart-sidebar" data-testid="cart-sidebar">
        {/* Header */}
        <div className="cart-header" data-testid="cart-sidebar-header">
          <h2>
            <ShoppingBag size={24} />
            Shopping Cart
          </h2>
          <button 
            className="cart-close" 
            onClick={() => dispatch(closeCart())}
            data-testid="cart-close-button"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="cart-items" data-testid="cart-items-container">
          {items.length === 0 ? (
            <div className="cart-empty" data-testid="cart-empty-state">
              <ShoppingBag size={64} />
              <h3>Your cart is empty</h3>
              <p>Discover amazing electronics and add them to your cart!</p>
              <Link 
                to="/products" 
                className="btn btn-primary"
                onClick={() => dispatch(closeCart())}
                data-testid="start-shopping-button"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div 
                key={item.id} 
                className="cart-item"
                data-testid={`cart-item-${item.id}`}
                data-product-id={item.id}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-image"
                  data-testid={`cart-item-image-${item.id}`}
                />
                <div className="cart-item-info">
                  <Link 
                    to={`/product/${item.id}`}
                    className="cart-item-name"
                    onClick={() => dispatch(closeCart())}
                    data-testid={`cart-item-name-${item.id}`}
                  >
                    {item.name}
                  </Link>
                  <p className="cart-item-brand" data-testid={`cart-item-brand-${item.id}`}>{item.brand}</p>
                  <p className="cart-item-price" data-testid={`cart-item-price-${item.id}`}>{formatINR(item.price)}</p>
                  <div className="cart-item-actions">
                    <div className="quantity-controls" data-testid={`quantity-controls-${item.id}`}>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        disabled={item.quantity <= 1}
                        data-testid={`decrease-quantity-${item.id}`}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span data-testid={`item-quantity-${item.id}`}>{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        data-testid={`increase-quantity-${item.id}`}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      data-testid={`remove-item-${item.id}`}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer" data-testid="cart-sidebar-footer">
            <div className="cart-subtotal" data-testid="cart-subtotal">
              <span>Subtotal (<span data-testid="cart-items-count">{items.reduce((sum, i) => sum + i.quantity, 0)}</span> items)</span>
              <strong data-testid="cart-total-amount">{formatINR(total)}</strong>
            </div>
            <p className="cart-shipping">Shipping calculated at checkout</p>
            <Link 
              to="/checkout" 
              className="btn btn-primary btn-lg btn-block"
              onClick={() => dispatch(closeCart())}
              data-testid="checkout-button"
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/cart" 
              className="btn btn-secondary btn-block"
              onClick={() => dispatch(closeCart())}
              data-testid="view-cart-button"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

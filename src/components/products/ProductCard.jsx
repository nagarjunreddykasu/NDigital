import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart, openCart } from '../../store/cartSlice';
import './ProductCard.css';

export default function ProductCard({ product, showAddToCart = true }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(openCart());
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Format price in INR
  const formatINR = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="product-card"
      data-testid={`product-card-${product.id}`}
      data-product-id={product.id}
      data-product-name={product.name}
    >
      {/* Badges */}
      <div className="product-badges" data-testid="product-badges">
        {discount > 0 && (
          <span className="product-badge badge-sale" data-testid="discount-badge">-{discount}%</span>
        )}
        {product.isNewArrival && (
          <span className="product-badge badge-new" data-testid="new-badge">New</span>
        )}
        {!product.inStock && (
          <span className="product-badge badge-out" data-testid="out-of-stock-badge">Out of Stock</span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        className="product-wishlist" 
        onClick={(e) => e.preventDefault()}
        data-testid={`wishlist-button-${product.id}`}
        aria-label={`Add ${product.name} to wishlist`}
      >
        <Heart size={20} />
      </button>

      {/* Image */}
      <div className="product-image" data-testid="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          data-testid={`product-image-${product.id}`}
        />
      </div>

      {/* Content */}
      <div className="product-content" data-testid="product-content">
        <p className="product-brand" data-testid="product-brand">{product.brand}</p>
        <h3 className="product-name" data-testid="product-name">{product.name}</h3>
        
        {/* Rating */}
        <div className="product-rating" data-testid="product-rating">
          <div className="stars" data-testid="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                fill={star <= Math.round(product.rating) ? '#fbbf24' : 'none'}
                stroke={star <= Math.round(product.rating) ? '#fbbf24' : '#cbd5e1'}
              />
            ))}
          </div>
          <span className="rating-text" data-testid="rating-text">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="product-price" data-testid="product-price">
          <span className="current-price" data-testid="current-price">{formatINR(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price" data-testid="original-price">{formatINR(product.originalPrice)}</span>
          )}
        </div>

        {/* Features Preview */}
        {product.features && product.features.length > 0 && (
          <ul className="product-features" data-testid="product-features">
            {product.features.slice(0, 2).map((feature, i) => (
              <li key={i} data-testid={`feature-${i}`}>{feature}</li>
            ))}
          </ul>
        )}

        {/* Add to Cart */}
        {showAddToCart && product.inStock && (
          <button 
            className="product-add-btn" 
            onClick={handleAddToCart}
            data-testid={`add-to-cart-${product.id}`}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        )}
      </div>
    </Link>
  );
}

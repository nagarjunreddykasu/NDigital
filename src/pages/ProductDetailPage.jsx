import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  ChevronRight, Star, Heart, Share2, ShoppingCart, 
  Truck, Shield, RotateCcw, Check, Minus, Plus, ChevronDown
} from 'lucide-react';
import { addToCart, openCart } from '../store/cartSlice';
import { getProductById, getProductsByCategory } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = getProductById(productId);
  
  if (!product) {
    return (
      <div className="product-not-found" data-testid="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn btn-primary" data-testid="browse-products-link">Browse Products</Link>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Format price in INR
  const formatINR = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    dispatch(openCart());
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/checkout');
  };

  return (
    <div className="product-detail-page" data-testid="product-detail-page" data-product-id={product.id}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" data-testid="product-breadcrumb">
        <div className="container">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <ChevronRight size={16} />
          <Link to="/products" data-testid="breadcrumb-products">Products</Link>
          <ChevronRight size={16} />
          <Link to={`/category/${product.category}`} data-testid="breadcrumb-category">{product.category}</Link>
          <ChevronRight size={16} />
          <span data-testid="breadcrumb-product-name">{product.name}</span>
        </div>
      </nav>

      <div className="container">
        {/* Product Main Section */}
        <section className="product-main" data-testid="product-main-section">
          {/* Images */}
          <div className="product-images" data-testid="product-images">
            <div className="main-image">
              <img 
                src={product.images?.[selectedImage] || product.image} 
                alt={product.name}
                data-testid="product-main-image"
              />
              {discount > 0 && (
                <span className="discount-badge" data-testid="product-discount-badge">-{discount}%</span>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-list" data-testid="product-thumbnails">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumbnail ${idx === selectedImage ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                    data-testid={`product-thumbnail-${idx}`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info" data-testid="product-info">
            <div className="product-header">
              <span className="product-brand" data-testid="product-brand">{product.brand}</span>
              <h1 className="product-title" data-testid="product-title">{product.name}</h1>
              
              <div className="product-meta" data-testid="product-meta">
                <div className="rating" data-testid="product-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      fill={star <= Math.round(product.rating) ? '#fbbf24' : 'none'}
                      stroke={star <= Math.round(product.rating) ? '#fbbf24' : '#cbd5e1'}
                    />
                  ))}
                  <span className="rating-text" data-testid="product-rating-value">{product.rating}</span>
                </div>
                <span className="reviews-count" data-testid="product-reviews-count">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
                <span className="divider">|</span>
                <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-stock'}`} data-testid="product-stock-status">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="product-price-section" data-testid="product-price-section">
              <div className="price-row">
                <span className="current-price" data-testid="product-current-price">{formatINR(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="original-price" data-testid="product-original-price">{formatINR(product.originalPrice)}</span>
                    <span className="save-amount" data-testid="product-save-amount">Save {formatINR(product.originalPrice - product.price)}</span>
                  </>
                )}
              </div>
            </div>

            <p className="product-description" data-testid="product-description">{product.description}</p>

            {/* Key Features */}
            {product.features && (
              <div className="key-features" data-testid="product-key-features">
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature, idx) => (
                    <li key={idx} data-testid={`product-feature-${idx}`}>
                      <Check size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Purchase Actions */}
            <div className="purchase-section" data-testid="purchase-section">
              <div className="quantity-selector" data-testid="quantity-selector">
                <label>Quantity</label>
                <div className="quantity-controls" data-testid="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="decrease-quantity-button"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span data-testid="quantity-value">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stockCount || 99, quantity + 1))}
                    disabled={quantity >= (product.stockCount || 99)}
                    data-testid="increase-quantity-button"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {product.stockCount && (
                  <span className="stock-count" data-testid="product-stock-count">{product.stockCount} available</span>
                )}
              </div>

              <div className="action-buttons" data-testid="action-buttons">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  data-testid="add-to-cart-button"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button 
                  className="btn btn-outline btn-lg"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  data-testid="buy-now-button"
                >
                  Buy Now
                </button>
              </div>

              <div className="secondary-actions" data-testid="secondary-actions">
                <button className="icon-btn" data-testid="add-to-wishlist-button" aria-label="Add to wishlist">
                  <Heart size={20} />
                  Add to Wishlist
                </button>
                <button className="icon-btn" data-testid="share-button" aria-label="Share">
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="delivery-info" data-testid="delivery-info">
              <div className="info-item" data-testid="delivery-free">
                <Truck size={20} />
                <div>
                  <strong>Free Delivery</strong>
                  <span>Orders over $99</span>
                </div>
              </div>
              <div className="info-item" data-testid="delivery-warranty">
                <Shield size={20} />
                <div>
                  <strong>2 Year Warranty</strong>
                  <span>Extended protection</span>
                </div>
              </div>
              <div className="info-item" data-testid="delivery-returns">
                <RotateCcw size={20} />
                <div>
                  <strong>30-Day Returns</strong>
                  <span>Hassle-free</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="product-tabs" data-testid="product-tabs-section">
          <div className="tabs-header" data-testid="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
              data-testid="tab-description"
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
              data-testid="tab-specifications"
            >
              Specifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
              data-testid="tab-reviews"
            >
              Reviews ({product.reviews.toLocaleString()})
            </button>
          </div>

          <div className="tabs-content" data-testid="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-panel" data-testid="tab-panel-description">
                <p>{product.description}</p>
                {product.features && (
                  <ul className="feature-list">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel" data-testid="tab-panel-specifications">
                {product.specs ? (
                  <table className="specs-table" data-testid="specs-table">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key} data-testid={`spec-row-${key}`}>
                          <th>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel reviews-panel" data-testid="tab-panel-reviews">
                <div className="reviews-summary" data-testid="reviews-summary">
                  <div className="rating-large">
                    <span className="rating-number" data-testid="reviews-rating-number">{product.rating}</span>
                    <div>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={20}
                            fill={star <= Math.round(product.rating) ? '#fbbf24' : 'none'}
                            stroke={star <= Math.round(product.rating) ? '#fbbf24' : '#cbd5e1'}
                          />
                        ))}
                      </div>
                      <span data-testid="reviews-total-count">Based on {product.reviews.toLocaleString()} reviews</span>
                    </div>
                  </div>
                </div>
                
                {/* Sample Reviews */}
                <div className="reviews-list" data-testid="reviews-list">
                  {[
                    { name: 'John D.', rating: 5, date: '2 days ago', comment: 'Excellent product! Exceeded my expectations. The build quality is premium and performance is outstanding.' },
                    { name: 'Sarah M.', rating: 4, date: '1 week ago', comment: 'Great value for money. Would definitely recommend to anyone looking for quality electronics.' },
                    { name: 'Mike R.', rating: 5, date: '2 weeks ago', comment: 'Fast shipping and the product works perfectly. Very happy with my purchase!' },
                  ].map((review, idx) => (
                    <div key={idx} className="review-item" data-testid={`review-item-${idx}`}>
                      <div className="review-header">
                        <div className="reviewer-info">
                          <strong data-testid={`reviewer-name-${idx}`}>{review.name}</strong>
                          <span className="review-date" data-testid={`review-date-${idx}`}>{review.date}</span>
                        </div>
                        <div className="review-rating" data-testid={`review-rating-${idx}`}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={14}
                              fill={star <= review.rating ? '#fbbf24' : 'none'}
                              stroke={star <= review.rating ? '#fbbf24' : '#cbd5e1'}
                            />
                          ))}
                        </div>
                      </div>
                      <p data-testid={`review-comment-${idx}`}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products" data-testid="related-products-section">
            <div className="section-header">
              <h2 className="section-title" data-testid="related-products-title">Related Products</h2>
              <Link to={`/category/${product.category}`} className="section-link" data-testid="view-all-related-link">
                View All <ChevronRight size={18} />
              </Link>
            </div>
            <div className="products-grid" data-testid="related-products-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

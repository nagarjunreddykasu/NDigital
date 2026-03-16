import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, ShoppingCart, User, Menu, X, ChevronDown,
  Smartphone, Laptop, Monitor, Headphones, Camera, Gamepad2, Heart
} from 'lucide-react';
import { setSearchQuery } from '../../store/productSlice';
import { selectCartCount, toggleCart } from '../../store/cartSlice';
import { logout } from '../../store/authSlice';
import './Header.css';

const categoryIcons = {
  smartphones: Smartphone,
  laptops: Laptop,
  tvs: Monitor,
  audio: Headphones,
  cameras: Camera,
  gaming: Gamepad2,
};

export default function Header() {
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const cartCount = useSelector(selectCartCount);
  const { categories, searchQuery } = useSelector(state => state.products);

  // Sync search input with store's searchQuery
  useEffect(() => {
    if (!searchQuery) {
      setSearchInput('');
    }
  }, [searchQuery]);

  // Clear search when navigating away from products page
  useEffect(() => {
    if (!location.pathname.includes('/products') && !location.pathname.includes('/category')) {
      if (searchInput) {
        setSearchInput('');
        dispatch(setSearchQuery(''));
      }
    }
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput));
      navigate('/products');
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    // Clear search results when input is cleared
    if (value === '') {
      dispatch(setSearchQuery(''));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="header" data-testid="header">
      {/* Top Bar */}
      <div className="header-top" data-testid="header-top-bar">
        <div className="container">
          <div className="header-top-content">
            <span data-testid="free-shipping-text">Free shipping on orders over $99</span>
            <div className="header-top-links">
              <Link to="/support" data-testid="support-link">Support</Link>
              <Link to="/track-order" data-testid="track-order-link">Track Order</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main" data-testid="header-main">
        <div className="container">
          <div className="header-content">
            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="logo" data-testid="logo-link">
              <span className="logo-icon">N</span>
              <span className="logo-text">Digital</span>
            </Link>

            {/* Search Bar */}
            <form className="search-form" onSubmit={handleSearch} data-testid="search-form">
              <div className="search-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search for electronics, brands, and more..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  data-testid="search-input"
                  aria-label="Search products"
                />
                <button type="submit" className="search-btn" data-testid="search-button">Search</button>
              </div>
            </form>

            {/* Header Actions */}
            <div className="header-actions" data-testid="header-actions">
              {/* Wishlist */}
              <Link to="/wishlist" className="header-action" data-testid="wishlist-link">
                <Heart size={22} />
                <span className="header-action-label">Wishlist</span>
              </Link>

              {/* User Account */}
              <div className="user-menu-wrapper" data-testid="user-menu-wrapper">
                <button 
                  className="header-action"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  data-testid="user-menu-button"
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                >
                  <User size={22} />
                  <span className="header-action-label" data-testid="user-menu-label">
                    {isAuthenticated ? user?.firstName || 'Account' : 'Sign In'}
                  </span>
                  <ChevronDown size={16} />
                </button>
                
                {userMenuOpen && (
                  <div className="user-menu" data-testid="user-dropdown-menu">
                    {isAuthenticated ? (
                      <>
                        <div className="user-menu-header" data-testid="user-greeting">
                          <strong>Hello, {user?.firstName}</strong>
                        </div>
                        <Link to="/account" onClick={() => setUserMenuOpen(false)} data-testid="my-account-link">My Account</Link>
                        <Link to="/orders" onClick={() => setUserMenuOpen(false)} data-testid="orders-link">Orders</Link>
                        <Link to="/wishlist" onClick={() => setUserMenuOpen(false)} data-testid="wishlist-menu-link">Wishlist</Link>
                        <hr />
                        <button onClick={handleLogout} data-testid="sign-out-button">Sign Out</button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="user-menu-btn primary" onClick={() => setUserMenuOpen(false)} data-testid="sign-in-link">
                          Sign In
                        </Link>
                        <p className="user-menu-text">
                          New customer? <Link to="/register" onClick={() => setUserMenuOpen(false)} data-testid="register-link">Start here</Link>
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button 
                className="header-action cart-action" 
                onClick={() => dispatch(toggleCart())}
                data-testid="cart-button"
                aria-label="Shopping cart"
              >
                <div className="cart-icon-wrapper">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && <span className="cart-badge" data-testid="cart-count">{cartCount}</span>}
                </div>
                <span className="header-action-label">Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`} data-testid="main-navigation">
        <div className="container">
          <ul className="nav-list" data-testid="nav-list">
            <li className="nav-item">
              <Link to="/deals" className="nav-link nav-highlight" data-testid="nav-deals">
                Today's Deals
              </Link>
            </li>
            {categories.map(category => {
              const Icon = categoryIcons[category.id];
              return (
                <li key={category.id} className="nav-item">
                  <Link 
                    to={`/category/${category.id}`} 
                    className="nav-link"
                    data-testid={`nav-category-${category.id}`}
                  >
                    {Icon && <Icon size={18} />}
                    {category.name}
                  </Link>
                </li>
              );
            })}
            <li className="nav-item">
              <Link to="/products" className="nav-link" data-testid="nav-all-products">
                All Products
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

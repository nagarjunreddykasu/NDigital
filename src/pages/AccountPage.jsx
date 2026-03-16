import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  User, Package, Heart, MapPin, CreditCard, Settings, 
  LogOut, ChevronRight, Edit2, Camera
} from 'lucide-react';
import { logout, updateProfile } from '../store/authSlice';
import { getProductById } from '../data/products';
import './AccountPage.css';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Sample orders data with realistic images and product IDs
const sampleOrders = [
  {
    id: 'ND-12345678',
    date: '2026-03-10',
    status: 'Delivered',
    total: 207499,
    items: [
      { productId: 4, name: 'MacBook Pro 16" M4', qty: 1, price: 207499, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop' },
    ],
  },
  {
    id: 'ND-12345679',
    date: '2026-03-05',
    status: 'Shipped',
    total: 33299,
    items: [
      { productId: 10, name: 'Sony WH-1000XM6', qty: 1, price: 33299, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=100&fit=crop' },
    ],
  },
  {
    id: 'ND-12345680',
    date: '2026-02-28',
    status: 'Processing',
    total: 99999,
    items: [
      { productId: 1, name: 'ProMax Ultra 15', qty: 1, price: 99999, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&h=100&fit=crop' },
    ],
  },
];

// Function to get orders from localStorage
const getStoredOrders = () => {
  const stored = localStorage.getItem('ndigital_orders');
  return stored ? JSON.parse(stored) : [];
};

export default function AccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  // Determine initial tab based on URL
  const getInitialTab = () => {
    if (location.pathname === '/orders') return 'orders';
    if (location.pathname === '/wishlist') return 'wishlist';
    return 'profile';
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
  });
  
  // Combine stored orders with sample orders
  const [allOrders, setAllOrders] = useState([...getStoredOrders(), ...sampleOrders]);
  
  // Update tab when URL changes
  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname]);
  
  // Format INR currency
  const formatINR = (amount) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;

  if (!isAuthenticated) {
    navigate('/login', { state: { from: { pathname: '/account' } } });
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
    }));
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'Shipped': return 'info';
      case 'Processing': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="account-page" data-testid="account-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb" data-testid="account-breadcrumb">
        <div className="container">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <ChevronRight size={16} />
          <span>My Account</span>
        </div>
      </nav>

      <div className="container">
        <div className="account-layout">
          {/* Sidebar */}
          <aside className="account-sidebar" data-testid="account-sidebar">
            <div className="user-card" data-testid="user-card">
              <div className="user-avatar">
                <img src={user?.avatar || 'https://picsum.photos/seed/avatar/100/100'} alt="Avatar" data-testid="user-avatar" />
                <button className="avatar-edit" data-testid="avatar-edit-button" aria-label="Edit avatar">
                  <Camera size={16} />
                </button>
              </div>
              <div className="user-info">
                <h3 data-testid="user-full-name">{user?.firstName} {user?.lastName}</h3>
                <p data-testid="user-email">{user?.email}</p>
              </div>
            </div>

            <nav className="account-nav" data-testid="account-nav">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    data-testid={`account-tab-${tab.id}`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
              <button className="nav-item logout" onClick={handleLogout} data-testid="logout-button">
                <LogOut size={20} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="account-main" data-testid="account-main">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="account-section" data-testid="profile-section">
                <div className="section-header">
                  <h1 data-testid="profile-title">Profile Information</h1>
                  {!isEditing && (
                    <button className="btn btn-secondary" onClick={() => setIsEditing(true)} data-testid="edit-profile-button">
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form className="profile-form" onSubmit={handleProfileUpdate} data-testid="profile-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          data-testid="profile-first-name"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          data-testid="profile-last-name"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-input"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          data-testid="profile-email"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input 
                          type="tel" 
                          className="form-input"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          data-testid="profile-phone"
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary" data-testid="save-profile-button">Save Changes</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)} data-testid="cancel-edit-button">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-info" data-testid="profile-info">
                    <div className="info-row">
                      <span className="info-label">Full Name</span>
                      <span className="info-value" data-testid="profile-fullname-display">{user?.firstName} {user?.lastName}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email</span>
                      <span className="info-value" data-testid="profile-email-display">{user?.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Phone</span>
                      <span className="info-value" data-testid="profile-phone-display">Not provided</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Member Since</span>
                      <span className="info-value" data-testid="profile-member-since">March 2026</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="account-section" data-testid="orders-section">
                <div className="section-header">
                  <h1 data-testid="orders-title">Order History</h1>
                </div>

                <div className="orders-list" data-testid="orders-list">
                  {allOrders.map(order => (
                    <div key={order.id} className="order-card" data-testid={`order-card-${order.id}`}>
                      <div className="order-header">
                        <div>
                          <span className="order-id" data-testid={`order-id-${order.id}`}>{order.id}</span>
                          <span className="order-date" data-testid={`order-date-${order.id}`}>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <span className={`order-status ${getStatusColor(order.status)}`} data-testid={`order-status-${order.id}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="order-items" data-testid={`order-items-${order.id}`}>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item" data-testid={`order-item-${order.id}-${idx}`}>
                            <img src={item.image} alt={item.name} data-testid={`order-item-image-${order.id}-${idx}`} />
                            <div className="item-details">
                              <span className="item-name" data-testid={`order-item-name-${order.id}-${idx}`}>{item.name}</span>
                              <span className="item-qty" data-testid={`order-item-qty-${order.id}-${idx}`}>Qty: {item.qty}</span>
                            </div>
                            <span className="item-price" data-testid={`order-item-price-${order.id}-${idx}`}>{formatINR(item.price)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="order-footer">
                        <span className="order-total" data-testid={`order-total-${order.id}`}>
                          Total: <strong>{formatINR(order.total)}</strong>
                        </span>
                        <div className="order-actions" data-testid={`order-actions-${order.id}`}>
                          <button className="btn btn-sm btn-secondary" data-testid={`track-order-${order.id}`}>Track Order</button>
                          <button 
                            className="btn btn-sm btn-secondary"
                            data-testid={`view-details-${order.id}`}
                            onClick={() => {
                              const productId = order.items[0]?.productId;
                              if (productId) {
                                navigate(`/product/${productId}`);
                              }
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="account-section" data-testid="wishlist-section">
                <div className="section-header">
                  <h1 data-testid="wishlist-title">My Wishlist</h1>
                </div>
                <div className="empty-state" data-testid="wishlist-empty">
                  <Heart size={64} />
                  <h3>Your wishlist is empty</h3>
                  <p>Save items you love to your wishlist and they'll appear here.</p>
                  <Link to="/products" className="btn btn-primary" data-testid="browse-products-button">
                    Browse Products
                  </Link>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="account-section" data-testid="addresses-section">
                <div className="section-header">
                  <h1 data-testid="addresses-title">Saved Addresses</h1>
                  <button className="btn btn-primary" data-testid="add-address-button">Add New Address</button>
                </div>
                <div className="address-card" data-testid="address-card">
                  <div className="address-badge" data-testid="address-badge">Default</div>
                  <h4 data-testid="address-label">Home</h4>
                  <p data-testid="address-details">
                    {user?.firstName} {user?.lastName}<br />
                    123 Main Street<br />
                    San Francisco, CA 94102<br />
                    United States
                  </p>
                  <div className="address-actions">
                    <button className="btn btn-sm btn-secondary" data-testid="edit-address-button">Edit</button>
                    <button className="btn btn-sm btn-secondary" data-testid="delete-address-button">Delete</button>
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="account-section" data-testid="payments-section">
                <div className="section-header">
                  <h1 data-testid="payments-title">Payment Methods</h1>
                  <button className="btn btn-primary" data-testid="add-payment-button">Add Payment Method</button>
                </div>
                <div className="payment-card" data-testid="payment-card">
                  <div className="card-icon">
                    <CreditCard size={32} />
                  </div>
                  <div className="card-info">
                    <span className="card-type" data-testid="card-type">Visa ending in 4242</span>
                    <span className="card-expiry" data-testid="card-expiry">Expires 12/27</span>
                  </div>
                  <div className="card-badge" data-testid="card-badge">Default</div>
                  <div className="card-actions">
                    <button className="btn btn-sm btn-secondary" data-testid="edit-card-button">Edit</button>
                    <button className="btn btn-sm btn-secondary" data-testid="remove-card-button">Remove</button>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="account-section" data-testid="settings-section">
                <div className="section-header">
                  <h1 data-testid="settings-title">Account Settings</h1>
                </div>
                
                <div className="settings-group" data-testid="notification-settings">
                  <h3>Notifications</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>Email Notifications</strong>
                      <span>Receive order updates and promotions</span>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked data-testid="email-notifications-toggle" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>SMS Notifications</strong>
                      <span>Get shipping updates via text</span>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" data-testid="sms-notifications-toggle" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-group" data-testid="security-settings">
                  <h3>Security</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>Change Password</strong>
                      <span>Update your password</span>
                    </div>
                    <button className="btn btn-sm btn-secondary" data-testid="change-password-button">Change</button>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>Two-Factor Authentication</strong>
                      <span>Add an extra layer of security</span>
                    </div>
                    <button className="btn btn-sm btn-secondary" data-testid="enable-2fa-button">Enable</button>
                  </div>
                </div>

                <div className="settings-group danger" data-testid="danger-zone">
                  <h3>Danger Zone</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>Delete Account</strong>
                      <span>Permanently delete your account and all data</span>
                    </div>
                    <button className="btn btn-sm btn-danger" data-testid="delete-account-button">Delete</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

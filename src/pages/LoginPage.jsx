import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, User, Lock, ArrowRight, Check } from 'lucide-react';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import './Auth.css';

// Default credentials
const DEFAULT_USERNAME = 'nagarjun';
const DEFAULT_PASSWORD = 'Test@2026';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector(state => state.auth);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // Simulate API call with credential validation
    setTimeout(() => {
      if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        // Successful login with valid credentials
        dispatch(loginSuccess({
          id: 1,
          username,
          email: 'nagarjun@ndigital.com',
          firstName: 'Nagarjun',
          lastName: 'Reddy',
          avatar: 'https://ui-avatars.com/api/?name=Nagarjun+Reddy&background=0066cc&color=fff&size=100',
        }));
        navigate(from, { replace: true });
      } else {
        dispatch(loginFailure('Invalid username or password. Please try again.'));
      }
    }, 1000);
  };

  return (
    <div className="auth-page" data-testid="login-page">
      <div className="auth-container">
        {/* Left Side - Form */}
        <div className="auth-form-section" data-testid="login-form-section">
          <div className="auth-form-wrapper">
            <Link to="/" className="auth-logo" data-testid="login-logo">
              <span className="logo-icon">N</span>
              <span className="logo-text">Digital</span>
            </Link>

            <div className="auth-header">
              <h1 data-testid="login-title">Welcome back</h1>
              <p data-testid="login-subtitle">Sign in to your account to continue shopping</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} data-testid="login-form">
              {error && (
                <div className="auth-error" data-testid="login-error">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-input with-icon"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    data-testid="username-input"
                    aria-label="Username"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label" htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="form-link" data-testid="forgot-password-link">Forgot password?</Link>
                </div>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="form-input with-icon"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    data-testid="password-input"
                    aria-label="Password"
                  />
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="toggle-password-visibility"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-checkbox">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  data-testid="remember-me-checkbox"
                />
                <label htmlFor="remember">Remember me for 30 days</label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg btn-block"
                disabled={loading}
                data-testid="login-submit-button"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="social-login" data-testid="social-login-section">
              <button className="social-btn" data-testid="google-login-button">
                <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" />
                Google
              </button>
              <button className="social-btn" data-testid="apple-login-button">
                <img src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="Apple" />
                Apple
              </button>
            </div>

            <p className="auth-footer-text" data-testid="create-account-text">
              Don't have an account? <Link to="/register" data-testid="create-account-link">Create account</Link>
            </p>

            <div className="demo-credentials" data-testid="demo-credentials">
              <p><strong>Demo Credentials:</strong></p>
              <p>Username: <code data-testid="demo-username">nagarjun</code></p>
              <p>Password: <code data-testid="demo-password">Test@2026</code></p>
            </div>
          </div>
        </div>

        {/* Right Side - Promo */}
        <div className="auth-promo-section" data-testid="login-promo-section">
          <div className="auth-promo-content">
            <h2>Shop the Latest Tech</h2>
            <p>Access exclusive deals and track your orders in one place</p>
            <ul className="auth-benefits" data-testid="auth-benefits-list">
              <li><Check size={20} /> Free shipping on orders over $99</li>
              <li><Check size={20} /> Exclusive member-only deals</li>
              <li><Check size={20} /> Easy returns within 30 days</li>
              <li><Check size={20} /> 24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

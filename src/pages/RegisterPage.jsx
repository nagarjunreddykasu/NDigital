import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { loginSuccess } from '../store/authSlice';
import './Auth.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      dispatch(loginSuccess({
        id: Date.now(),
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        avatar: 'https://picsum.photos/seed/avatar/100/100',
      }));
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    return { strength, label: labels[strength] };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="auth-page" data-testid="register-page">
      <div className="auth-container">
        {/* Left Side - Promo */}
        <div className="auth-promo-section" data-testid="register-promo-section">
          <div className="auth-promo-content">
            <h2>Join NDigital</h2>
            <p>Create an account and unlock exclusive benefits</p>
            <ul className="auth-benefits" data-testid="register-benefits-list">
              <li><Check size={20} /> Save your favorite products</li>
              <li><Check size={20} /> Track orders easily</li>
              <li><Check size={20} /> Get personalized recommendations</li>
              <li><Check size={20} /> Early access to sales</li>
            </ul>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-section" data-testid="register-form-section">
          <div className="auth-form-wrapper">
            <Link to="/" className="auth-logo" data-testid="register-logo">
              <span className="logo-icon">N</span>
              <span className="logo-text">Digital</span>
            </Link>

            <div className="auth-header">
              <h1 data-testid="register-title">Create Account</h1>
              <p data-testid="register-subtitle">Fill in your details to get started</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} data-testid="register-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">First Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={20} />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`form-input with-icon ${errors.firstName ? 'error' : ''}`}
                      placeholder="Nagarjun"
                      value={formData.firstName}
                      onChange={handleChange}
                      data-testid="firstname-input"
                      aria-label="First name"
                    />
                  </div>
                  {errors.firstName && <span className="form-error" data-testid="firstname-error">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">Last Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={20} />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`form-input with-icon ${errors.lastName ? 'error' : ''}`}
                      placeholder="Kasu"
                      value={formData.lastName}
                      onChange={handleChange}
                      data-testid="lastname-input"
                      aria-label="Last name"
                    />
                  </div>
                  {errors.lastName && <span className="form-error" data-testid="lastname-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input with-icon ${errors.email ? 'error' : ''}`}
                    placeholder="nagarjun@ndigital.com"
                    value={formData.email}
                    onChange={handleChange}
                    data-testid="email-input"
                    aria-label="Email address"
                  />
                </div>
                {errors.email && <span className="form-error" data-testid="email-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`form-input with-icon ${errors.password ? 'error' : ''}`}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
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
                {formData.password && (
                  <div className="password-strength" data-testid="password-strength">
                    <div className="strength-bars">
                      {[1, 2, 3, 4].map(level => (
                        <div 
                          key={level} 
                          className={`strength-bar ${level <= passwordStrength.strength ? `level-${passwordStrength.strength}` : ''}`}
                          data-testid={`strength-bar-${level}`}
                        />
                      ))}
                    </div>
                    <span className={`strength-label level-${passwordStrength.strength}`} data-testid="strength-label">
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
                {errors.password && <span className="form-error" data-testid="password-error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-input with-icon ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    data-testid="confirm-password-input"
                    aria-label="Confirm password"
                  />
                </div>
                {errors.confirmPassword && <span className="form-error" data-testid="confirm-password-error">{errors.confirmPassword}</span>}
              </div>

              <div className="form-checkbox">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  data-testid="terms-checkbox"
                />
                <label htmlFor="terms">
                  I agree to the <Link to="/terms" data-testid="terms-link">Terms of Service</Link> and <Link to="/privacy" data-testid="privacy-link">Privacy Policy</Link>
                </label>
              </div>
              {errors.terms && <span className="form-error" data-testid="terms-error">{errors.terms}</span>}

              <button 
                type="submit" 
                className="btn btn-primary btn-lg btn-block"
                disabled={loading}
                data-testid="register-submit-button"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="auth-divider">
              <span>or sign up with</span>
            </div>

            <div className="social-login" data-testid="social-signup-section">
              <button className="social-btn" data-testid="google-signup-button">
                <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" />
                Google
              </button>
              <button className="social-btn" data-testid="apple-signup-button">
                <img src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="Apple" />
                Apple
              </button>
            </div>

            <p className="auth-footer-text" data-testid="signin-text">
              Already have an account? <Link to="/login" data-testid="signin-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

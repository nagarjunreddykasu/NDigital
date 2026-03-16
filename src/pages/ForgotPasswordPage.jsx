import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Check, ArrowRight } from 'lucide-react';
import './Auth.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email) {
        setSubmitted(true);
      } else {
        setError('Please enter a valid email address');
      }
      setLoading(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="auth-page" data-testid="forgot-password-success-page">
        <div className="auth-container single">
          <div className="auth-form-section">
            <div className="auth-form-wrapper">
              <Link to="/" className="auth-logo" data-testid="forgot-password-logo">
                <span className="logo-icon">N</span>
                <span className="logo-text">Digital</span>
              </Link>

              <div className="success-state" data-testid="success-state">
                <div className="success-icon" data-testid="success-icon">
                  <Check size={40} />
                </div>
                <h1 data-testid="success-title">Check Your Email</h1>
                <p data-testid="success-message">
                  We've sent a password reset link to <strong data-testid="submitted-email">{email}</strong>
                </p>
                <p className="text-muted">
                  Didn't receive the email? Check your spam folder or try again with a different email address.
                </p>
                
                <button 
                  className="btn btn-secondary btn-block"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                  data-testid="try-another-email-button"
                >
                  Try Another Email
                </button>
                
                <Link to="/login" className="btn btn-primary btn-block" data-testid="back-to-signin-button">
                  <ArrowLeft size={20} />
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page" data-testid="forgot-password-page">
      <div className="auth-container single">
        <div className="auth-form-section" data-testid="forgot-password-form-section">
          <div className="auth-form-wrapper">
            <Link to="/" className="auth-logo" data-testid="forgot-password-logo">
              <span className="logo-icon">N</span>
              <span className="logo-text">Digital</span>
            </Link>

            <div className="auth-header">
              <h1 data-testid="forgot-password-title">Forgot Password?</h1>
              <p data-testid="forgot-password-subtitle">No worries! Enter your email and we'll send you reset instructions.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} data-testid="forgot-password-form">
              {error && (
                <div className="auth-error" data-testid="forgot-password-error">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="reset-email">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    id="reset-email"
                    name="email"
                    className="form-input with-icon"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-testid="reset-email-input"
                    aria-label="Email address"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg btn-block"
                disabled={loading}
                data-testid="send-reset-link-button"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
                <ArrowRight size={20} />
              </button>
            </form>

            <Link to="/login" className="back-link" data-testid="back-to-login-link">
              <ArrowLeft size={18} />
              Back to Sign In
            </Link>

            <div className="demo-credentials" data-testid="demo-note">
              <p><strong>Note:</strong> This is a demo. No actual email will be sent.</p>
              <p>Use credentials: <code data-testid="demo-username">nagarjun</code> / <code data-testid="demo-password">Test@2026</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

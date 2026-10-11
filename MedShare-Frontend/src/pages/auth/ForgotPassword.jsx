import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to your "send reset link" API call here
    setSubmitted(true);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-wrap">
        {/* Header */}
        <div className="forgot-header">
          <h1 className="forgot-title">MedShare</h1>
          <p className="forgot-subtitle">Clinical Clarity</p>
        </div>

        {/* Forgot Password Card */}
        <div className="glass-card forgot-card">
          {!submitted ? (
            <>
              <h2 className="forgot-heading">Forgot Password?</h2>
              <p className="forgot-description">
                Enter the email address linked to your account and we'll send you a link to reset your password.
              </p>

              <form className="forgot-form" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="field">
                  <label className="field-label" htmlFor="email">Email Address</label>
                  <div className="input-wrap">
                    <span className="material-symbols-outlined input-icon">mail</span>
                    <input
                      className="text-input"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button className="submit-btn" type="submit">
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="success-state">
              <div className="success-icon">
                <span className="material-symbols-outlined">mark_email_read</span>
              </div>
              <h2 className="forgot-heading">Check Your Email</h2>
              <p className="forgot-description">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
              </p>
            </div>
          )}

          <div className="back-row">
            <Link className="link link--strong" to="/login">
              <span className="material-symbols-outlined back-icon">arrow_back</span>
              Back to Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
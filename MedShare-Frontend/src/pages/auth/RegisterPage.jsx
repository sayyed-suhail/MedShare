import { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
  const [activeRole, setActiveRole] = useState('donor');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roles = [
    { id: 'donor', label: 'Donor' },
    { id: 'ngo', label: 'NGO/Pharma' },
    { id: 'patient', label: 'Patient' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to your register API call here
  };

  return (
    <div className="register-page">
      <div className="register-wrap">
        {/* Header */}
        <div className="register-header">
          <h1 className="register-title">MedShare</h1>
          <p className="register-subtitle">Clinical Clarity</p>
        </div>

        {/* Register Card */}
        <div className="glass-card register-card">
          <h2 className="register-heading">Create Account</h2>

          {/* Segmented Control for Roles */}
          <div className="role-tabs">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                className={`role-tab ${activeRole === role.id ? 'role-tab--active' : ''}`}
                onClick={() => setActiveRole(role.id)}
              >
                {role.label}
              </button>
            ))}
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div className="field">
              <label className="field-label" htmlFor="fullName">Full Name</label>
              <div className="input-wrap">
                <span className="material-symbols-outlined input-icon">person</span>
                <input
                  className="text-input"
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="field">
              <label className="field-label" htmlFor="password">Password</label>
              <div className="input-wrap">
                <span className="material-symbols-outlined input-icon">lock</span>
                <input
                  className="text-input"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="visibility-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="field">
              <label className="field-label" htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrap">
                <span className="material-symbols-outlined input-icon">lock</span>
                <input
                  className="text-input"
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  className="visibility-toggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined">
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button className="submit-btn" type="submit">
              Sign Up
            </button>
          </form>

          <div className="login-row">
            Already have an account? 
            <Link className="link link--strong" to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
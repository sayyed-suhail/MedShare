import { useState } from 'react';
import './LoginPage.css';
import './RegisterPage.jsx'

import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState('donor');
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    { id: 'donor', label: 'Donor' },
    { id: 'ngo', label: 'NGO/Pharma' },
    { id: 'patient', label: 'Patient' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to your login API call here
  };

  return (
    <div className="login-page">
      <div className="login-wrap">
        {/* Header */}
        <div className="login-header">
          <h1 className="login-title">MedShare</h1>
          <p className="login-subtitle">Clinical Clarity</p>
        </div>

        {/* Login Card */}
        <div className="glass-card login-card">
          <h2 className="login-heading">Sign In</h2>

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

          <form className="login-form" onSubmit={handleSubmit}>
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
              <div className="field-label-row">
                <label className="field-label" htmlFor="password">Password</label>
                <a className="link" href="/ForgotPassword">Forgot Password?</a>
              </div>
              <div className="input-wrap">
                <span className="material-symbols-outlined input-icon">lock</span>
                <input
                  className="text-input"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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

            {/* Action Button */}
            <button className="submit-btn" type="submit">
              Log In
            </button>
          </form>

          <div className="signup-row">
            Don't have an account? 
            <Link className="link link--strong" to="/RegisterPage">Sign Up</Link>


          </div>
        </div>
      </div>
      
      
      
    </div>
  );
}
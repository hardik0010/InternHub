import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('user_token', res.data.token);
      // Redirect based on user role
      if (res.data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <form className="auth-form login-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your InternHub account</p>
        </div>
        
        {error && <div className="error-msg">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope className="input-icon" />
            Email Address <span className="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">
            <FaLock className="input-icon" />
            Password <span className="required">*</span>
          </label>
          <div className="password-input">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        <button className="btn primary submit-btn" type="submit" disabled={loading}>
          {loading ? 'Signing In...' : (
            <>
              <FaSignInAlt style={{ marginRight: '8px' }} />
              Sign In
            </>
          )}
        </button>
        
        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <span>Don't have an account? <Link to="/register">Sign Up</Link></span>
        </div>
      </form>
    </div>
  );
}

export default Login; 
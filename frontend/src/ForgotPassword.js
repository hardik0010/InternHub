import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await axios.post('/api/users/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset email');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}
        <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
        <div className="auth-links" style={{ justifyContent: 'center' }}>
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword; 
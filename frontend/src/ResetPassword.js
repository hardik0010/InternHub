import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './App.css';

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`/api/users/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    }
    setLoading(false);
  };

  const strength = getPasswordStrength(password);
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength];
  const strengthColors = ['#e53e3e', '#fbbf24', '#fbbf24', '#22c55e', '#2563eb', '#4f8cff'];

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}
        <input type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <div className="password-strength" style={{ color: strengthColors[strength], marginBottom: 8 }}>
          Password Strength: {strengthText}
        </div>
        <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
        <div className="auth-links" style={{ justifyContent: 'center' }}>
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword; 
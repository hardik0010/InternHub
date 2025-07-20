import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import './App.css';

function EmailVerification() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log('Attempting to verify email with token:', token);
        const response = await axios.get(`/api/users/verify-email/${token}`);
        console.log('Verification response:', response.data);
        
        if (response.data.success) {
          setStatus('success');
          setMessage(response.data.message);
        } else {
          setStatus('error');
          setMessage(response.data.message || 'Email verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage(error.response?.data?.message || 'Email verification failed. Please try again.');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="verification-content">
            <FaSpinner className="verification-icon spinning" />
            <h2>Verifying Your Email</h2>
            <p>Please wait while we verify your email address...</p>
          </div>
        );
      
      case 'success':
        return (
          <div className="verification-content">
            <FaCheckCircle className="verification-icon success" />
            <h2>Email Verified Successfully!</h2>
            <p>{message}</p>
            <div className="verification-actions">
              <Link to="/login" className="btn primary">Login Now</Link>
              <Link to="/" className="btn secondary">Go to Home</Link>
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="verification-content">
            <FaTimesCircle className="verification-icon error" />
            <h2>Verification Failed</h2>
            <p>{message}</p>
            <div className="verification-actions">
              <Link to="/register" className="btn primary">Register Again</Link>
              <Link to="/" className="btn secondary">Go to Home</Link>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="auth-container">
      <div className="verification-container">
        {renderContent()}
      </div>
    </div>
  );
}

export default EmailVerification; 
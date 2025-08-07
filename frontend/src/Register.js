import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaIdCard, FaGraduationCap, FaCalendarAlt, FaStar, FaLock, FaCamera } from 'react-icons/fa';
import './App.css';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', collegeId: '', branch: '', batch: '', cgpa: '', password: '', confirmPassword: '', acceptTerms: false
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) return 'Invalid email format.';
    if (!/^\d{10}$/.test(form.phone)) return 'Phone number must be 10 digits.';
    if (form.cgpa < 0 || form.cgpa > 10) return 'CGPA must be between 0 and 10.';
    if (form.collegeId.length !== 14) return 'College ID must be 14 characters.';
    if (!form.acceptTerms) return 'You must accept the terms and conditions.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return '';
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = e => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMessage('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (profilePic) data.append('profilePic', profilePic);
      const res = await axios.post('/api/users/register', data);
      setMessage(res.data.message);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <form className="auth-form register-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Create Your Account</h2>
          <p>Join InternHub to explore internship and placement opportunities</p>
        </div>
        
        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}
        
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                <FaUser className="input-icon" />
                Full Name <span className="required">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope className="input-icon" />
                Email Address <span className="required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone className="input-icon" />
                Phone Number <span className="required">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                maxLength={10}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="collegeId">
                <FaIdCard className="input-icon" />
                Enrollment Number <span className="required">*</span>
              </label>
              <input
                id="collegeId"
                name="collegeId"
                type="text"
                value={form.collegeId}
                onChange={handleChange}
                placeholder="Enter your 14-digit enrollment number"
                maxLength={14}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Academic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="branch">
                <FaGraduationCap className="input-icon" />
                Branch <span className="required">*</span>
              </label>
              <select
                id="branch"
                name="branch"
                value={form.branch}
                onChange={handleChange}
                required
              >
                <option value="">Select your branch</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="batch">
                <FaCalendarAlt className="input-icon" />
                Batch Year <span className="required">*</span>
              </label>
              <select
                id="batch"
                name="batch"
                value={form.batch}
                onChange={handleChange}
                required
              >
                <option value="">Select your batch year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cgpa">
                <FaStar className="input-icon" />
                CGPA <span className="required">*</span>
              </label>
              <input
                id="cgpa"
                name="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={form.cgpa}
                onChange={handleChange}
                placeholder="Enter your CGPA (0-10)"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Security</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="input-icon" />
                Password <span className="required">*</span>
              </label>
              <div className="password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
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
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <FaLock className="input-icon" />
                Confirm Password <span className="required">*</span>
              </label>
              <div className="password-input">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Profile Picture (Optional)</h3>
          <div className="form-group">
            <label htmlFor="profilePic" className="file-input-label">
              <FaCamera className="input-icon" />
              Upload Profile Picture
            </label>
            <input
              id="profilePic"
              name="profilePic"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            {profilePic && (
              <div className="file-preview">
                <span>Selected: {profilePic.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                name="acceptTerms"
                type="checkbox"
                checked={form.acceptTerms}
                onChange={handleChange}
                required
              />
              <span className="checkmark"></span>
              I accept the <Link to="/terms-conditions" target="_blank">Terms and Conditions</Link> and <Link to="/privacy-policy" target="_blank">Privacy Policy</Link> <span className="required">*</span>
            </label>
          </div>
        </div>

        <button className="btn primary submit-btn" type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <div className="auth-links">
          <span>Already have an account? <Link to="/login">Sign In</Link></span>
        </div>
      </form>
    </div>
  );
}

export default Register; 
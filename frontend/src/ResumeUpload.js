import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUpload, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import './App.css';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(false);
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setUploading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = localStorage.getItem('user_token');
      if (!token) {
        navigate('/login');
        return;
      }
      const formData = new FormData();
      formData.append('resume', file);
      const response = await axios.post('/api/student/upload-resume', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      setResumeUrl(response.data.resumeUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-header-left">
            <button className="btn secondary back-btn" onClick={() => navigate('/student/dashboard')}>
              <FaArrowLeft />
              Back to Dashboard
            </button>
            <h1>Upload Resume</h1>
            <p>Upload your latest resume in PDF format for applications and analysis.</p>
          </div>
        </div>
      </header>
      <main className="dashboard-main">
        <form className="resume-upload-form" onSubmit={handleUpload}>
          <label htmlFor="resume" className="file-input-label">
            <FaUpload />
            {file ? file.name : 'Choose PDF file'}
            <input
              id="resume"
              type="file"
              accept="application/pdf"
              className="file-input"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
          <button className="btn primary" type="submit" disabled={uploading}>
            {uploading ? <FaSpinner className="spinning" /> : 'Upload Resume'}
          </button>
        </form>
        {success && (
          <div className="success-msg">
            <FaCheckCircle style={{ marginRight: 8 }} /> Resume uploaded successfully!
            {resumeUrl && (
              <div style={{ marginTop: 8 }}>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn secondary">
                  View Uploaded Resume
                </a>
              </div>
            )}
          </div>
        )}
        {error && (
          <div className="error-msg">
            <FaExclamationTriangle style={{ marginRight: 8 }} /> {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default ResumeUpload; 
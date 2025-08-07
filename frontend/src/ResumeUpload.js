import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUpload, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import './ResumeUpload.css';

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
    <div className="resume-upload-page">
      <header className="resume-header">
        <div className="container">
          <div className="header-content">
            <button className="back-btn" onClick={() => navigate('/student/dashboard')}>
              <FaArrowLeft /> Back to Dashboard
            </button>
            <div>
              <h1 className="header-title">Upload Resume</h1>
              <p className="header-subtitle">Upload your latest resume in PDF format for applications and analysis.</p>
            </div>
          </div>
        </div>
      </header>
      <main className="main-content">
        <form className="upload-form" onSubmit={handleUpload}>
          <label htmlFor="resume" className="file-label">
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
          <button className="upload-btn" type="submit" disabled={uploading}>
            {uploading ? <FaSpinner className="spinning" /> : 'Upload Resume'}
          </button>
        </form>
        {success && (
          <div className="success-message">
            <FaCheckCircle style={{ marginRight: 8 }} /> Resume uploaded successfully!
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="view-link">
                View Uploaded Resume
              </a>
            )}
          </div>
        )}
        {error && (
          <div className="error-message">
            <FaExclamationTriangle style={{ marginRight: 8 }} /> {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default ResumeUpload;
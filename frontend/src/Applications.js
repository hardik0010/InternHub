import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaSpinner, 
  FaCalendarAlt, 
  FaBuilding,
  FaFileAlt,
  FaCheckCircle,
  FaTimes,
  FaClock,
  FaChartLine,
  FaExclamationTriangle
} from 'react-icons/fa';
import axios from 'axios';
import './App.css';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchApplications();
  }, [navigate, currentPage, statusFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/student/applications?page=${currentPage}&status=${statusFilter}`);
      setApplications(response.data.applications);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'selected': return '#10b981';
      case 'shortlisted': return '#3b82f6';
      case 'interviewed': return '#f59e0b';
      case 'applied': return '#8b5cf6';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'selected': return <FaCheckCircle />;
      case 'shortlisted': return <FaChartLine />;
      case 'interviewed': return <FaCalendarAlt />;
      case 'applied': return <FaFileAlt />;
      case 'rejected': return <FaTimes />;
      default: return <FaClock />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'selected': return 'Selected';
      case 'shortlisted': return 'Shortlisted';
      case 'interviewed': return 'Interviewed';
      case 'applied': return 'Applied';
      case 'rejected': return 'Rejected';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="verification-content">
          <FaSpinner className="verification-icon spinning" />
          <h2>Loading Applications...</h2>
          <p>Please wait while we fetch your application history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-header-left">
            <button 
              className="btn secondary back-btn"
              onClick={() => navigate('/student/dashboard')}
            >
              <FaArrowLeft />
              Back to Dashboard
            </button>
            <h1>My Applications</h1>
            <p>Track your application status and progress</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-controls">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interviewed">Interviewed</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Applications List */}
        <div className="applications-list">
          {applications.map(application => (
            <div key={application._id} className="application-card">
              <div className="application-header">
                <div className="application-info">
                  <h3>{application.companyId.name}</h3>
                  <p className="application-role">{application.companyId.role}</p>
                </div>
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(application.status) }}
                >
                  {getStatusIcon(application.status)}
                  {getStatusText(application.status)}
                </div>
              </div>

              <div className="application-details">
                <div className="detail-item">
                  <FaCalendarAlt />
                  <span>Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
                </div>
                
                {application.deadline && (
                  <div className="detail-item">
                    <FaClock />
                    <span>Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
                  </div>
                )}

                {application.interviewDate && (
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>Interview: {new Date(application.interviewDate).toLocaleDateString()}</span>
                  </div>
                )}

                {application.interviewLocation && (
                  <div className="detail-item">
                    <FaBuilding />
                    <span>Location: {application.interviewLocation}</span>
                  </div>
                )}
              </div>

              {application.notes && (
                <div className="application-notes">
                  <h4>Notes:</h4>
                  <p>{application.notes}</p>
                </div>
              )}

              {application.feedback && (
                <div className="application-feedback">
                  <h4>Feedback:</h4>
                  <p>{application.feedback}</p>
                </div>
              )}

              <div className="application-actions">
                <button 
                  className="btn secondary"
                  onClick={() => navigate(`/company/${application.companyId._id}`)}
                >
                  View Company
                </button>
                
                {application.resumeUrl && (
                  <a 
                    href={application.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn primary"
                  >
                    View Resume
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="btn secondary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              className="btn secondary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {applications.length === 0 && !loading && (
          <div className="no-applications">
            <FaFileAlt className="no-applications-icon" />
            <h3>No applications found</h3>
            <p>
              {statusFilter === 'all' 
                ? "You haven't applied to any companies yet. Start by browsing available companies!"
                : `No applications with status "${getStatusText(statusFilter)}" found.`
              }
            </p>
            {statusFilter === 'all' && (
              <button 
                className="btn primary"
                onClick={() => navigate('/companies')}
              >
                Browse Companies
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Applications; 
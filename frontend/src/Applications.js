import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  FaExclamationTriangle,
  FaSearch
} from 'react-icons/fa';
import axios from 'axios';
import './Applications.css';
import logo from './logo.png';

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

  // Render loading skeleton
  if (loading && applications.length === 0) {
    return (
      <div className="applications-page">
        <header className="applications-header">
          <div className="container">
            <div className="header-content">
              <Link to="/" className="logo">
                <img src={logo} alt="InternHub logo" style={{width:'60px'}}/>
                <div className="logo-text">InternHub</div>
              </Link>
              <button 
                className="back-button"
                onClick={() => navigate('/student/dashboard')}
              >
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </header>

        <div className="applications-container">
          <h2 className="section-title">My Applications</h2>
          
          <div className="filter-section">
            <div className="filter-controls">
              <div className="loading-skeleton" style={{ height: '36px', width: '200px', borderRadius: '0.5rem' }}></div>
            </div>
          </div>

          <div className="applications-list">
            {[1, 2, 3].map(i => (
              <div key={i} className="application-card">
                <div className="application-header">
                  <div className="application-info">
                    <div className="loading-skeleton" style={{ height: '20px', width: '80%', marginBottom: '6px' }}></div>
                    <div className="loading-skeleton" style={{ height: '16px', width: '60%' }}></div>
                  </div>
                  <div className="loading-skeleton" style={{ height: '24px', width: '100px', borderRadius: '4px' }}></div>
                </div>
                
                <div className="application-details">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="detail-item">
                      <div className="loading-skeleton" style={{ width: '16px', height: '16px', borderRadius: '50%' }}></div>
                      <div className="loading-skeleton" style={{ height: '16px', width: '70%' }}></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-page">
      {/* Header */}
      <header className="applications-header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <img src={logo} alt="InternHub logo" style={{width:'60px'}}/>
              <div className="logo-text">InternHub</div>
            </Link>
            <button 
              className="back-button"
              onClick={() => navigate('/student/dashboard')}
            >
              <FaArrowLeft /> Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="applications-container">
        <h2 className="section-title">My Applications</h2>
        
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
            <FaExclamationTriangle />
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
          <div className="empty-state">
            <FaFileAlt className="empty-icon" />
            <h3>No Applications Found</h3>
            <p>
              {statusFilter === 'all' 
                ? "You haven't applied to any companies yet. Start by browsing available companies!"
                : `No applications with status "${getStatusText(statusFilter)}" found.`
              }
            </p>
            {statusFilter === 'all' && (
              <button 
                className="action-button primary-button"
                onClick={() => navigate('/companies')}
              >
                Browse Companies
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaArrowLeft /> Previous
            </button>
            
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
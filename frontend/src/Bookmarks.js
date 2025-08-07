import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaSpinner, 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBookmark,
  FaTrash,
  FaEye,
  FaBuilding,
  FaSearch,
  FaExclamationTriangle
} from 'react-icons/fa';
import axios from 'axios';
import './Bookmarks.css';
import logo from './logo.png';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchBookmarks();
  }, [navigate, currentPage]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/student/bookmarks?page=${currentPage}`);
      setBookmarks(response.data.bookmarks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      setError('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (companyId) => {
    try {
      await axios.delete(`/api/student/bookmarks/${companyId}`);
      setBookmarks(bookmarks.filter(bookmark => bookmark.companyId._id !== companyId));
    } catch (error) {
      console.error('Error removing bookmark:', error);
      alert('Failed to remove bookmark');
    }
  };

  const applyToCompany = async (companyId) => {
    try {
      await axios.post('/api/student/applications', { companyId });
      alert('Application submitted successfully!');
      // Refresh bookmarks to update application status
      fetchBookmarks();
    } catch (error) {
      console.error('Error applying to company:', error);
      alert(error.response?.data?.error || 'Failed to submit application');
    }
  };

  // Render loading skeleton
  if (loading && bookmarks.length === 0) {
    return (
      <div className="bookmarks-page">
        <header className="bookmarks-header">
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

        <div className="bookmarks-container">
          <h2 className="section-title">Bookmarked Companies</h2>
          
          <div className="bookmarks-list">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bookmark-card skeleton">
                <div className="bookmark-header">
                  <div className="company-logo skeleton-circle"></div>
                  <div className="bookmark-info">
                    <div className="skeleton-text skeleton-title"></div>
                    <div className="skeleton-text skeleton-subtitle"></div>
                  </div>
                  <div className="bookmark-button skeleton-circle"></div>
                </div>
                
                <div className="bookmark-role-section">
                  <div className="skeleton-text skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text"></div>
                </div>

                <div className="bookmark-details">
                  <div className="detail-item">
                    <div className="skeleton-circle skeleton-icon"></div>
                    <div className="skeleton-text"></div>
                  </div>
                  <div className="detail-item">
                    <div className="skeleton-circle skeleton-icon"></div>
                    <div className="skeleton-text"></div>
                  </div>
                </div>

                <div className="bookmark-actions-footer">
                  <div className="skeleton-button"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bookmarks-page">
      {/* Header */}
      <header className="bookmarks-header">
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
      <div className="bookmarks-container">
        <h2 className="section-title">Bookmarked Companies</h2>
        
        {error && (
          <div className="error-message">
            <FaExclamationTriangle />
            {error}
          </div>
        )}

        <div className="bookmarks-list"> {/* Bookmarks Grid */}
          {bookmarks.map(bookmark => (
            <div key={bookmark._id} className="bookmark-card">
              <div className="bookmark-header">
                <div className="bookmark-info">
                  <h3>{bookmark.companyId.name}</h3>
                  <p className="bookmark-role">{bookmark.companyId.role}</p>
                </div>
                <div className="bookmark-actions">
                  <button
                    className="bookmark-remove-btn"
                    onClick={() => removeBookmark(bookmark.companyId._id)}
                    title="Remove bookmark"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="bookmark-details">
                <div className="detail-item">
                  <FaCalendarAlt />
                  <span>Visit Date: {new Date(bookmark.companyId.visitDate).toLocaleDateString()}</span>
                </div>
                
                {bookmark.companyId.eligibility && (
                  <div className="detail-item">
                    <FaGraduationCap />
                    <span>CGPA: {bookmark.companyId.eligibility.cgpa || 'Not specified'}</span>
                  </div>
                )}

                {bookmark.companyId.eligibility?.branch && bookmark.companyId.eligibility.branch.length > 0 && (
                  <div className="detail-item">
                    <FaMapMarkerAlt />
                    <span>Branches: {bookmark.companyId.eligibility.branch.join(', ')}</span>
                  </div>
                )}
              </div>

              <p className="bookmark-description">
                {bookmark.companyId.description.length > 150 
                  ? `${bookmark.companyId.description.substring(0, 150)}...` 
                  : bookmark.companyId.description
                }
              </p>

              {bookmark.notes && (
                <div className="bookmark-notes">
                  <h4>Your Notes:</h4>
                  <p>{bookmark.notes}</p>
                </div>
              )}

              <div className="bookmark-actions-bottom">
                {bookmark.companyId.hasApplied ? (
                  <button className="btn secondary" disabled>
                    Already Applied
                  </button>
                ) : (
                  <button 
                    className="btn primary"
                    onClick={() => applyToCompany(bookmark.companyId._id)}
                  >
                    Apply Now
                  </button>
                )}
                
                <button 
                  className="btn secondary"
                  onClick={() => navigate(`/company/${bookmark.companyId._id}`)}
                >
                  <FaEye />
                  View Details
                </button>
              </div>

              <div className="bookmark-date">
                <small>Bookmarked on {new Date(bookmark.addedAt).toLocaleDateString()}</small>
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

        {bookmarks.length === 0 && !loading && (
          <div className="no-bookmarks">
            <FaBookmark className="no-bookmarks-icon" />
            <h3>No bookmarks found</h3>
            <p>You haven't bookmarked any companies yet. Start by browsing available companies!</p>
            <button 
              className="btn primary"
              onClick={() => navigate('/companies')}
            >
              Browse Companies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
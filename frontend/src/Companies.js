import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaBookmark, 
  FaRegBookmark, 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaGraduationCap,
  FaStar,
  FaSpinner,
  FaArrowLeft
} from 'react-icons/fa';
import axios from 'axios';
import './App.css';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchCompanies();
    fetchBookmarks();
  }, [navigate, currentPage, searchTerm]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/student/companies?page=${currentPage}&search=${searchTerm}`);
      setCompanies(response.data.companies);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get('/api/student/bookmarks');
      setBookmarks(response.data.bookmarks.map(b => b.companyId._id));
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const toggleBookmark = async (companyId) => {
    try {
      if (bookmarks.includes(companyId)) {
        await axios.delete(`/api/student/bookmarks/${companyId}`);
        setBookmarks(bookmarks.filter(id => id !== companyId));
      } else {
        await axios.post('/api/student/bookmarks', { companyId });
        setBookmarks([...bookmarks, companyId]);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const applyToCompany = async (companyId) => {
    try {
      await axios.post('/api/student/applications', { companyId });
      alert('Application submitted successfully!');
      fetchCompanies(); // Refresh to update application status
    } catch (error) {
      console.error('Error applying to company:', error);
      alert(error.response?.data?.error || 'Failed to submit application');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCompanies();
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="verification-content">
          <FaSpinner className="verification-icon spinning" />
          <h2>Loading Companies...</h2>
          <p>Please wait while we fetch the latest company listings.</p>
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
            <h1>Browse Companies</h1>
            <p>Find and apply to your dream companies</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Search Bar */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search companies or roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button type="submit" className="btn primary">
              Search
            </button>
          </form>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Companies Grid */}
        <div className="companies-grid">
          {companies.map(company => (
            <div key={company._id} className="company-card">
              <div className="company-header">
                <div className="company-info">
                  <h3>{company.name}</h3>
                  <p className="company-role">{company.role}</p>
                </div>
                <button
                  className="bookmark-btn"
                  onClick={() => toggleBookmark(company._id)}
                >
                  {bookmarks.includes(company._id) ? (
                    <FaBookmark className="bookmarked" />
                  ) : (
                    <FaRegBookmark />
                  )}
                </button>
              </div>

              <div className="company-details">
                <div className="detail-item">
                  <FaCalendarAlt />
                  <span>Visit Date: {new Date(company.visitDate).toLocaleDateString()}</span>
                </div>
                
                {company.eligibility && (
                  <div className="detail-item">
                    <FaGraduationCap />
                    <span>CGPA: {company.eligibility.cgpa || 'Not specified'}</span>
                  </div>
                )}

                {company.eligibility?.branch && company.eligibility.branch.length > 0 && (
                  <div className="detail-item">
                    <FaMapMarkerAlt />
                    <span>Branches: {company.eligibility.branch.join(', ')}</span>
                  </div>
                )}
              </div>

              <p className="company-description">
                {company.description.length > 150 
                  ? `${company.description.substring(0, 150)}...` 
                  : company.description
                }
              </p>

              <div className="company-actions">
                {company.hasApplied ? (
                  <button className="btn secondary" disabled>
                    Already Applied
                  </button>
                ) : (
                  <button 
                    className="btn primary"
                    onClick={() => applyToCompany(company._id)}
                  >
                    Apply Now
                  </button>
                )}
                
                <button 
                  className="btn secondary"
                  onClick={() => navigate(`/company/${company._id}`)}
                >
                  View Details
                </button>
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

        {companies.length === 0 && !loading && (
          <div className="no-companies">
            <h3>No companies found</h3>
            <p>Try adjusting your search criteria or check back later for new listings.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Companies; 
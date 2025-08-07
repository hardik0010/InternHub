import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaBookmark, 
  FaRegBookmark, 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaGraduationCap,
  FaStar,
  FaSpinner,
  FaArrowLeft,
  FaBuilding,
  FaBriefcase,
  FaUsers,
  FaGlobe,
  FaCheck,
  FaRocket
} from 'react-icons/fa';
import axios from 'axios';
import './Companies.css';
import logo from './logo.png';

// Loading Skeleton Component
const CompanyCardSkeleton = () => (
  <div className="company-card skeleton-card">
    <div className="company-card-header">
      <div className="company-logo loading-skeleton" style={{ width: '48px', height: '48px', borderRadius: '0.5rem' }}></div>
      <div className="company-title" style={{ flex: 1 }}>
        <div className="loading-skeleton" style={{ height: '20px', width: '80%', marginBottom: '6px' }}></div>
        <div className="loading-skeleton" style={{ height: '16px', width: '60%' }}></div>
      </div>
      <div className="loading-skeleton" style={{ width: '28px', height: '28px', borderRadius: '50%' }}></div>
    </div>
    
    <div className="company-role-section">
      <div className="loading-skeleton" style={{ height: '18px', width: '70%', marginBottom: '8px' }}></div>
      <div className="loading-skeleton" style={{ height: '14px', width: '100%', marginBottom: '6px' }}></div>
      <div className="loading-skeleton" style={{ height: '14px', width: '90%' }}></div>
    </div>

    <div className="company-details">
      {[1, 2, 3].map(i => (
        <div key={i} className="detail-item">
          <div className="loading-skeleton" style={{ width: '14px', height: '14px', borderRadius: '50%' }}></div>
          <div className="loading-skeleton" style={{ height: '14px', width: '50px' }}></div>
          <div className="loading-skeleton" style={{ height: '14px', width: '40%' }}></div>
        </div>
      ))}
    </div>

    <div className="company-actions">
      <div className="loading-skeleton" style={{ height: '36px', flex: 1 }}></div>
      <div className="loading-skeleton" style={{ height: '36px', flex: 1 }}></div>
    </div>
  </div>
);

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');
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
  }, [navigate, currentPage, searchTerm, filterType]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/student/companies?page=${currentPage}&search=${searchTerm}&filter=${filterType}`);
      setCompanies(response.data.companies);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError('Failed to load companies. Please try again.');
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

  const handleFilterChange = (newFilter) => {
    setFilterType(newFilter);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setCurrentPage(1);
  };

  // Render loading skeleton
  if (loading && companies.length === 0) {
    return (
      <div className="companies-page">
        <header className="companies-header">
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

        <div className="search-filter-container">
          <div className="search-container">
            <div className="search-form">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <div className="loading-skeleton" style={{ height: '48px', width: '100%', borderRadius: '0.75rem' }}></div>
              </div>
              <div className="loading-skeleton" style={{ height: '48px', width: '120px', borderRadius: '0.75rem' }}></div>
            </div>
          </div>
        </div>

        <div className="companies-container">
          <div className="companies-grid">
            {[1, 2, 3].map(i => (
              <CompanyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="companies-page">
      {/* Header */}
      <header className="companies-header">
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

      {/* Search and Filter Section */}
      <div className="search-filter-container">
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search companies, roles, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>
        
        <div className="filter-container">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All Companies
            </button>
            <button 
              className={`filter-btn ${filterType === 'bookmarked' ? 'active' : ''}`}
              onClick={() => handleFilterChange('bookmarked')}
            >
              <FaRocket />
              Bookmarked
            </button>
            <button 
              className={`filter-btn ${filterType === 'applied' ? 'active' : ''}`}
              onClick={() => handleFilterChange('applied')}
            >
              <FaCheck />
              Applied
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <FaStar />
          {error}
        </div>
      )}

      {/* Companies Grid */}
      <div className="companies-container">
        <div className="section-header">
          <h2 className="section-title">Available Opportunities</h2>
        </div>
        <div className="companies-grid">
          {loading ? (
            <>
              {companies.map(company => (
                <div key={company._id} className="company-card">
                  <div className="company-card-header">
                    <div className="company-logo">
                      {company.name === 'TCS' ? 'TCS' : company.name === 'Wipro' ? 'W' : 'MS'}
                    </div>
                    <div className="company-title">
                      <h3>{company.name}</h3>
                      <span className="company-category">TECHNOLOGY</span>
                    </div>
                    <button
                      className={`bookmark-btn ${bookmarks.includes(company._id) ? 'bookmarked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(company._id);
                      }}
                      title={bookmarks.includes(company._id) ? 'Remove Bookmark' : 'Add Bookmark'}
                    >
                      {bookmarks.includes(company._id) ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                  </div>
                  
                  <div className="company-role-section">
                    <h4 className="role-title">{company.role}</h4>
                    <p className="role-description">
                      {company.description || 'Join our dynamic team to develop cutting-edge solutions and gain hands-on experience in modern technologies.'}
                    </p>
                  </div>

                  <div className="company-details">
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <span className="detail-label">Visit:</span>
                      <span className="detail-value">
                        {company.visitDate ? new Date(company.visitDate).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span className="detail-label">All Branches</span>
                    </div>
                    <div className="detail-item">
                      <FaGraduationCap className="detail-icon" />
                      <span className="detail-label">CGPA:</span>
                      <span className="detail-value">{company.cgpa || 'Not specified'}</span>
                    </div>
                  </div>

                  <div className="company-tags">
                    <span className="tag">Internship</span>
                    <span className="tag">Technology</span>
                  </div>

                  <div className="company-actions">
                    {company.hasApplied ? (
                      <button className="btn applied-btn" disabled>
                        <FaCheck />
                        Already Applied
                      </button>
                    ) : (
                      <button 
                        className="btn apply-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          applyToCompany(company._id);
                        }}
                      >
                        Apply Now
                      </button>
                    )}
                    <button 
                      className="btn view-btn"
                      onClick={() => navigate(`/company/${company._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
              {[1, 2, 3].map(i => (
                <CompanyCardSkeleton key={`skeleton-${i}`} />
              ))}
            </>
          ) : (
            companies.map(company => (
              <div key={company._id} className="company-card">
                <div className="company-card-header">
                  <div className="company-logo">
                    {company.name === 'TCS' ? 'TCS' : company.name === 'Wipro' ? 'W' : 'MS'}
                  </div>
                  <div className="company-title">
                    <h3>{company.name}</h3>
                    <span className="company-category">TECHNOLOGY</span>
                  </div>
                  <button
                    className={`bookmark-btn ${bookmarks.includes(company._id) ? 'bookmarked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(company._id);
                    }}
                    title={bookmarks.includes(company._id) ? 'Remove Bookmark' : 'Add Bookmark'}
                  >
                    {bookmarks.includes(company._id) ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
                
                <div className="company-role-section">
                  <h4 className="role-title">{company.role}</h4>
                  <p className="role-description">
                    {company.description || 'Join our dynamic team to develop cutting-edge solutions and gain hands-on experience in modern technologies.'}
                  </p>
                </div>

                <div className="company-details">
                  <div className="detail-item">
                    <FaCalendarAlt className="detail-icon" />
                    <span className="detail-label">Visit:</span>
                    <span className="detail-value">
                      {company.visitDate ? new Date(company.visitDate).toLocaleDateString() : 'TBD'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span className="detail-label">All Branches</span>
                  </div>
                  <div className="detail-item">
                    <FaGraduationCap className="detail-icon" />
                    <span className="detail-label">CGPA:</span>
                    <span className="detail-value">{company.cgpa || 'Not specified'}</span>
                  </div>
                </div>

                <div className="company-tags">
                  <span className="tag">Internship</span>
                  <span className="tag">Technology</span>
                </div>

                <div className="company-actions">
                  {company.hasApplied ? (
                    <button className="btn applied-btn" disabled>
                      <FaCheck />
                      Already Applied
                    </button>
                  ) : (
                    <button 
                      className="btn apply-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        applyToCompany(company._id);
                      }}
                    >
                      Apply Now
                    </button>
                  )}
                  <button 
                    className="btn view-btn"
                    onClick={() => navigate(`/company/${company._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn pagination-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
            Previous
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="btn pagination-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      )}

      {companies.length === 0 && !loading && (
        <div className="no-companies">
          <div className="no-companies-icon">
            <FaBuilding />
          </div>
          <h3>No companies found</h3>
          <p>Try adjusting your search criteria or check back later for new listings.</p>
          <button 
            className="btn primary"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Companies;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaSignOutAlt, 
  FaSearch, 
  FaBookmark, 
  FaBell, 
  FaFileAlt, 
  FaUpload, 
  FaEye, 
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaTimes,
  FaSpinner,
  FaBriefcase
} from 'react-icons/fa';
import io from 'socket.io-client';
import axios from 'axios';
import './StudentDashboard.css';
import ProfileMenu from './ProfileMenu';

const ITEMS_PER_PAGE = 3;

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [deadlinesLoading, setDeadlinesLoading] = useState(true);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    applicationsCount: 0,
    bookmarksCount: 0,
    profileCompletion: 0,
    unreadNotifications: 0
  });
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activitiesPage, setActivitiesPage] = useState(1);
  const [deadlinesPage, setDeadlinesPage] = useState(1);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Set up axios defaults
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Initialize socket connection
    const newSocket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000');
    setSocket(newSocket);

    // Fetch user data and dashboard stats
    fetchDashboardData();

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [navigate]);

  useEffect(() => {
    if (socket && user) {
      // Join student room for notifications
      socket.emit('join-student', user.id);

      // Listen for real-time notifications
      socket.on('notification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
        setStats(prev => ({
          ...prev,
          unreadNotifications: prev.unreadNotifications + 1
        }));
      });

      return () => {
        socket.off('notification');
      };
    }
  }, [socket, user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setActivitiesLoading(true);
      setDeadlinesLoading(true);
      setError(null);

      // Fetch dashboard stats
      const statsResponse = await axios.get('/api/student/dashboard/stats');
      setStats(statsResponse.data.stats);
      
      // Check if upcomingDeadlines exists in the response
      if (statsResponse.data.upcomingDeadlines) {
        console.log('Upcoming deadlines:', statsResponse.data.upcomingDeadlines);
        setUpcomingDeadlines(statsResponse.data.upcomingDeadlines);
      } else {
        console.error('No upcomingDeadlines in response:', statsResponse.data);
        setUpcomingDeadlines([]);
      }
      
      // Check if recentActivities exists in the response
      if (statsResponse.data.recentActivities) {
        setRecentActivities(statsResponse.data.recentActivities);
      } else {
        console.error('No recentActivities in response:', statsResponse.data);
        setRecentActivities([]);
      }
      
      // Set loading states to false after data is loaded
      setActivitiesLoading(false);
      setDeadlinesLoading(false);

      // Fetch recent notifications
      const notificationsResponse = await axios.get('/api/student/notifications?limit=5');
      setNotifications(notificationsResponse.data.notifications);

      // Fetch user data
      const userResponse = await axios.get('/api/users/profile');
      setUser(userResponse.data.user);

    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setError('Failed to load dashboard data');
      setActivitiesLoading(false);
      setDeadlinesLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    if (socket) {
      socket.disconnect();
    }
    navigate('/');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.patch(`/api/student/notifications/${notificationId}/read`);
      setNotifications(prev => 
        prev.map(notif => 
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
      setStats(prev => ({
        ...prev,
        unreadNotifications: Math.max(0, prev.unreadNotifications - 1)
      }));
    } catch (error) {
      console.error('Error marking notification as read:', error);
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

const handleEditProfile = async (updatedData) => {
  try {
    setErrorMsg('');
    setSuccessMsg('');

    const res = await axios.patch('/api/users/profile', updatedData);
    setUser(res.data.user);
    setSuccessMsg('Profile updated successfully!');

    // Automatically clear the success message after 2 seconds
    setTimeout(() => {
      setSuccessMsg('');
    }, 2000);
  } catch (err) {
    setErrorMsg(err.response?.data?.error || 'Failed to update profile.');

    // Automatically clear the error message after 2 seconds
    setTimeout(() => {
      setErrorMsg('');
    }, 2000);
  }
};


  const handleChangePassword = async (passwordData) => {
    try {
      setErrorMsg('');
      setSuccessMsg('');
      await axios.post('/api/users/change-password', passwordData);
      setSuccessMsg('Password changed successfully!');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to change password.');
    }
  };

  const handleProfilePicChange = async (file) => {
    try {
      setErrorMsg('');
      setSuccessMsg('');
      const formData = new FormData();
      formData.append('profilePic', file);
      const res = await axios.post('/api/users/profile-pic', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(res.data.user);
      setSuccessMsg('Profile picture updated!');
      setTimeout(() => {
        setSuccessMsg('');
      }, 2000);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to update profile picture.');
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
    }
  };

  // We don't need this useEffect anymore since we're handling loading states in fetchDashboardData
  // useEffect(() => {
  //   if (recentActivities.length > 0) {
  //     setActivitiesLoading(false);
  //   }
    
  //   if (upcomingDeadlines.length > 0) {
  //     setDeadlinesLoading(false);
  //   }
  // }, [recentActivities, upcomingDeadlines]);

  // Calculate paginated activities
  const startActivityIndex = (activitiesPage - 1) * ITEMS_PER_PAGE;
  const paginatedActivities = recentActivities.slice(
    startActivityIndex,
    startActivityIndex + ITEMS_PER_PAGE
  );
  const totalActivitiesPages = Math.ceil(recentActivities.length / ITEMS_PER_PAGE);

  // Calculate paginated deadlines
  const startDeadlineIndex = (deadlinesPage - 1) * ITEMS_PER_PAGE;
  const paginatedDeadlines = upcomingDeadlines.slice(
    startDeadlineIndex,
    startDeadlineIndex + ITEMS_PER_PAGE
  );
  const totalDeadlinesPages = Math.ceil(upcomingDeadlines.length / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="auth-container">
        <div className="verification-content">
          <FaSpinner className="verification-icon spinning" />
          <h2>Loading Dashboard...</h2>
          <p>Please wait while we load your personalized dashboard.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-container">
        <div className="verification-content">
          <FaExclamationTriangle className="verification-icon error" />
          <h2>Error Loading Dashboard</h2>
          <p>{error}</p>
          <button className="btn primary" onClick={fetchDashboardData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <a href="/" className="logo-container">
            <img src="/image.png" alt="LJIET Logo" style={{ height: 50, width: 50, objectFit: 'contain' }} />
            <span className="logo-text">InternHub</span>
          </a>
          <div className="user-nav">
            <div className="notifications-container">
              <button 
                className="icon-button"
                onClick={toggleNotifications}
                aria-label="Notifications"
              >
                <FaBell />
                {stats.unreadNotifications > 0 && (
                  <span className="notification-badge">{stats.unreadNotifications}</span>
                )}
              </button>
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <button 
                      className="close-button"
                      onClick={() => setShowNotifications(false)}
                      aria-label="Close notifications"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="notifications-list">
                    {notificationsLoading ? (
                      <div className="loading-container">
                        <div className="spinner"></div>
                        <span>Loading notifications...</span>
                      </div>
                    ) : notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification._id} 
                          className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                          onClick={() => markNotificationAsRead(notification._id)}
                        >
                          <div className="notification-title">{notification.title}</div>
                          <div className="notification-message">{notification.message}</div>
                          <div className="notification-time">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-notification">No notifications yet</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="user-info">
              <button 
                className="profile-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="User profile"
              >
                {user?.profilePicUrl ? (
                  <img src={user.profilePicUrl} alt="Profile" className="avatar-img" />
                ) : (
                  <div className="user-avatar">
                    {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <span className="profile-name">{user?.name}</span>
              </button>
              {showProfileMenu && (
                <ProfileMenu 
                  user={user} 
                  onLogout={handleLogout} 
                  onEdit={handleEditProfile}
                  onChangePassword={handleChangePassword}
                  onProfilePicChange={handleProfilePicChange}
                  onClose={() => setShowProfileMenu(false)}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <h1 className="dashboard-title">
            Welcome back, <span style={{ color: '#2563eb' }}>{user?.name}</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '2rem' }}>
            Here's an overview of your internship applications and opportunities.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalCompanies}</div>
            <div className="stat-label">Available Companies</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.applicationsCount}</div>
            <div className="stat-label">Applications</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.bookmarksCount}</div>
            <div className="stat-label">Bookmarked</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.profileCompletion}%</div>
            <div className="stat-label">Profile Completion</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-grid" style={{ margin: '32px 0' }}>
          <button className="quick-action-btn" onClick={() => navigate('/companies')}>
            <FaSearch />
            <span>Browse Companies</span>
          </button>
          <button className="quick-action-btn" onClick={() => navigate('/upload-resume')}>
            <FaUpload />
            <span>Upload Resume</span>
          </button>
          <button className="quick-action-btn" onClick={() => navigate('/applications')}>
            <FaFileAlt />
            <span>View Applications</span>
          </button>
          <button className="quick-action-btn" onClick={() => navigate('/bookmarks')}>
            <FaBookmark />
            <span>Bookmarked Companies</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-content-grid">
          {/* Recent Activities */}
          <div className="dashboard-section">
            <div className="section-header">
                <h2 className="section-title">Recent Activity</h2>
                {/* <button className="btn btn-outline" onClick={() => navigate('/history')}>
                    View All Activity
                </button> */}
            </div>

            {activitiesLoading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <span>Loading activities...</span>
                </div>
            ) : recentActivities.length === 0 ? (
              <div className="empty-state">
                <FaClock className="empty-state-icon" />
                <h3>No Recent Activities</h3>
                <p>Your recent activities will be shown here.</p>
              </div>
            ) : paginatedActivities.length > 0 ? (
                <div className="activity-list">
                    {paginatedActivities.map(activity => (
                        <div key={activity._id} className="activity-item">
                            <div className="activity-icon">
                                {activity.type === 'application_submitted' && <FaFileAlt />}
                                {activity.type === 'bookmark_added' && <FaBookmark />}
                                {activity.type === 'profile_updated' && <FaUser />}
                                {activity.type === 'resume_uploaded' && <FaUpload />}
                            </div>
                            <div className="activity-content">
                                <div className="activity-title">{activity.title}</div>
                                <div className="activity-description">{activity.description}</div>
                                <div className="activity-time">{new Date(activity.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    ))}
                    {totalActivitiesPages > 1 && (
                        <div className="pagination">
                            <button
                                className="btn btn-outline"
                                onClick={() => setActivitiesPage(p => Math.max(1, p - 1))}
                                disabled={activitiesPage === 1}
                            >
                                Previous
                            </button>
                            <span className="pagination-info">
                                Page {activitiesPage} of {totalActivitiesPages}
                            </span>
                            <button
                                className="btn btn-outline"
                                onClick={() => setActivitiesPage(p => Math.min(totalActivitiesPages, p + 1))}
                                disabled={activitiesPage === totalActivitiesPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="empty-state">
                    <FaClock className="empty-state-icon" />
                    <h3>No Recent Activities</h3>
                    <p>Your recent activities will be shown here.</p>
                </div>
            )}
        </div>

          {/* Upcoming Deadlines */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Upcoming Deadlines</h2>
              {/* <button className="btn btn-outline" onClick={() => navigate('/companies')}>
                View All Companies
              </button> */}
            </div>
            
            {deadlinesLoading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <span>Loading deadlines...</span>
              </div>
            ) : upcomingDeadlines.length === 0 ? (
              <div className="empty-state">
                <FaClock className="empty-state-icon" />
                <h3>No Upcoming Deadlines</h3>
                <p>There are currently no application deadlines approaching.</p>
              </div>
            ) : (
              <div className="deadlines-list">
                {paginatedDeadlines.map((application) => (
                    <div key={application._id} className="deadline-item">
                      <div className="deadline-item-header">
                        <h3 className="company-name">{application.companyId.name}</h3>
                        <span className={`status-badge status-${application.status}`}>
                          {application.status}
                        </span>
                      </div>
                      <div className="deadline-item-content">
                        <div className="deadline-info">
                          <FaCalendarAlt />
                          <span>Application Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
                        </div>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/companies/${application.companyId._id}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                
                {totalDeadlinesPages > 1 && (
                  <div className="pagination">
                    <button 
                      className="btn btn-outline"
                      onClick={() => setDeadlinesPage(p => Math.max(1, p - 1))}
                      disabled={deadlinesPage === 1}
                    >
                      Previous
                    </button>
                    <span className="pagination-info">
                      Page {deadlinesPage} of {totalDeadlinesPages}
                    </span>
                    <button 
                      className="btn btn-outline"
                      onClick={() => setDeadlinesPage(p => Math.min(totalDeadlinesPages, p + 1))}
                      disabled={deadlinesPage === totalDeadlinesPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Show global success/error messages */}
      {successMsg && <div className="success-msg" style={{ position: 'fixed', top: 80, right: 24, zIndex: 3000 }}>{successMsg}</div>}
      {errorMsg && <div className="error-msg" style={{ position: 'fixed', top: 80, right: 24, zIndex: 3000 }}>{errorMsg}</div>}
    </div>
  );
};

export default StudentDashboard;
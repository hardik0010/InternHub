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
  FaSpinner
} from 'react-icons/fa';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
      setError(null);

      // Fetch dashboard stats
      const statsResponse = await axios.get('/api/student/dashboard/stats');
      setStats(statsResponse.data.stats);
      setUpcomingDeadlines(statsResponse.data.upcomingDeadlines);
      setRecentActivities(statsResponse.data.recentActivities);

      // Fetch recent notifications
      const notificationsResponse = await axios.get('/api/student/notifications?limit=5');
      setNotifications(notificationsResponse.data.notifications);

      // Fetch user data
      const userResponse = await axios.get('/api/users/profile');
      setUser(userResponse.data.user);

    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setError('Failed to load dashboard data');
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
        <div className="dashboard-header-content">
          <div className="dashboard-header-left">
            <h1>Welcome, {user?.name}!</h1>
            <p>Your InternHub Student Dashboard</p>
          </div>
          <div className="dashboard-header-right">
            <div className="notification-wrapper">
              <button 
                className="btn secondary notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell />
                {stats.unreadNotifications > 0 && (
                  <span className="notification-badge">{stats.unreadNotifications}</span>
                )}
              </button>
              
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Notifications</h4>
                    <button 
                      className="mark-all-read"
                      onClick={() => {
                        axios.patch('/api/student/notifications/read-all');
                        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
                        setStats(prev => ({ ...prev, unreadNotifications: 0 }));
                      }}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="notification-list">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification._id} 
                          className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                          onClick={() => markNotificationAsRead(notification._id)}
                        >
                          <div className="notification-content">
                            <h5>{notification.title}</h5>
                            <p>{notification.message}</p>
                            <small>{new Date(notification.createdAt).toLocaleDateString()}</small>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-notifications">No notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button className="btn secondary" onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: '8px' }} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Stats Cards */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="dashboard-card-icon">
              <FaSearch />
            </div>
            <div className="dashboard-card-content">
              <h3>Available Companies</h3>
              <p className="dashboard-card-number">{stats.totalCompanies}</p>
              <p className="dashboard-card-description">Active listings for your profile</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">
              <FaFileAlt />
            </div>
            <div className="dashboard-card-content">
              <h3>Applications</h3>
              <p className="dashboard-card-number">{stats.applicationsCount}</p>
              <p className="dashboard-card-description">Applications submitted</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">
              <FaBookmark />
            </div>
            <div className="dashboard-card-content">
              <h3>Bookmarked</h3>
              <p className="dashboard-card-number">{stats.bookmarksCount}</p>
              <p className="dashboard-card-description">Companies you've saved</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">
              <FaUser />
            </div>
            <div className="dashboard-card-content">
              <h3>Profile Completion</h3>
              <p className="dashboard-card-number">{stats.profileCompletion}%</p>
              <p className="dashboard-card-description">Complete your profile</p>
            </div>
          </div>
        </div>

        {/* Quick Actions and Content Grid */}
        <div className="dashboard-content-grid">
          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions-grid">
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
          </div>

          {/* Upcoming Deadlines */}
          <div className="deadlines-section">
            <h3>Upcoming Deadlines</h3>
            <div className="deadlines-list">
              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map(application => (
                  <div key={application._id} className="deadline-item">
                    <div className="deadline-info">
                      <h4>{application.companyId.name}</h4>
                      <p>{application.companyId.role}</p>
                      <small>Deadline: {new Date(application.deadline).toLocaleDateString()}</small>
                    </div>
                    <div 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(application.status) }}
                    >
                      {getStatusIcon(application.status)}
                      {application.status}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-deadlines">No upcoming deadlines</p>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="activities-section">
            <h3>Recent Activities</h3>
            <div className="activities-list">
              {recentActivities.length > 0 ? (
                recentActivities.map(activity => (
                  <div key={activity._id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'application_submitted' && <FaFileAlt />}
                      {activity.type === 'bookmark_added' && <FaBookmark />}
                      {activity.type === 'profile_updated' && <FaUser />}
                      {activity.type === 'resume_uploaded' && <FaUpload />}
                    </div>
                    <div className="activity-content">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                      <small>{new Date(activity.createdAt).toLocaleDateString()}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-activities">No recent activities</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard; 
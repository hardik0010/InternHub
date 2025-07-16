import React from 'react';
import './App.css';
import { FaBuilding, FaUserGraduate, FaChartBar, FaClipboardCheck, FaRegClock, FaSearch, FaCloudUploadAlt, FaUserShield, FaBell, FaBookmark, FaFileAlt, FaUserCircle, FaPlus } from 'react-icons/fa';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AddCompany from './AddCompany';

function RequireAdminAuth({ children }) {
  const isAuthenticated = !!localStorage.getItem('admin_token');
  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={
        <RequireAdminAuth>
          <AdminDashboard />
        </RequireAdminAuth>
      } />
      <Route path="/admin/companies/add" element={<AddCompany />} />
      <Route path="/" element={
          <div className="app-container">
            {/* Hero Section */}
            <header className="hero-section">
              <div className="hero-content">
                <h1>Welcome to InternHub</h1>
                <p>Your one-stop platform for campus placements and internship opportunities.</p>
                <div className="hero-buttons">
                  <a href="#login" className="btn primary">Login</a>
                  <a href="#register" className="btn secondary">Register</a>
                </div>
              </div>
            </header>

            {/* LJIET Exclusive Section */}
            <section className="ljiet-section">
              <div className="ljiet-content">
                <FaBuilding size={48} className="ljiet-icon" />
                <h2>Exclusively for LJIET</h2>
                <p>This platform is dedicated to the students and administration of <b>LJ Institute of Engineering & Technology (LJIET)</b> for campus placements and internships.</p>
              </div>
            </section>

            {/* Features Overview */}
            <section className="features-section">
              <h2>Features</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <FaSearch size={32} />
                  <h3>Company Listings</h3>
                  <p>Browse and filter companies visiting your campus. View roles, dates, and more.</p>
                </div>
                <div className="feature-card">
                  <FaCloudUploadAlt size={32} />
                  <h3>Resume Analyzer</h3>
                  <p>Upload your resume and get instant feedback powered by ML to boost your chances.</p>
                </div>
                <div className="feature-card">
                  <FaClipboardCheck size={32} />
                  <h3>Track Applications</h3>
                  <p>Bookmark companies, track your application status, and never miss a deadline.</p>
                </div>
                <div className="feature-card">
                  <FaUserShield size={32} />
                  <h3>Admin/College Panel</h3>
                  <p>Admins can add companies, set criteria, post updates, and manage applicants easily.</p>
                </div>
                <div className="feature-card">
                  <FaUserGraduate size={32} />
                  <h3>Student Dashboard</h3>
                  <p>Personalized dashboard with stats, quick actions, and real-time notifications.</p>
                </div>
                <div className="feature-card">
                  <FaBookmark size={32} />
                  <h3>Bookmarked Companies</h3>
                  <p>Save and quickly access your favorite companies and apply with one click.</p>
                </div>
                <div className="feature-card">
                  <FaFileAlt size={32} />
                  <h3>Application Receipts</h3>
                  <p>Download application receipts and keep track of your submissions.</p>
                </div>
                <div className="feature-card">
                  <FaBell size={32} />
                  <h3>Real-time Notifications</h3>
                  <p>Stay updated with instant notifications about deadlines, results, and announcements.</p>
                </div>
                <div className="feature-card">
                  <FaChartBar size={32} />
                  <h3>Analytics & Reports</h3>
                  <p>Admins can view application trends, placement stats, and generate reports.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="footer">
              <div className="footer-content">
                <p>Contact: support@internhub.com | &copy; {new Date().getFullYear()} InternHub</p>
              </div>
            </footer>
          </div>
        } />
    </Routes>
  );
}

export default App;

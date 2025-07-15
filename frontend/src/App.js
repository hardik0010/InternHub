import React from 'react';
import './App.css';

function App() {
  return (
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

      {/* Features Overview */}
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Company Listings</h3>
            <p>Browse and filter companies visiting your campus. View roles, dates, and more.</p>
          </div>
          <div className="feature-card">
            <h3>Resume Analyzer</h3>
            <p>Upload your resume and get instant feedback powered by ML to boost your chances.</p>
          </div>
          <div className="feature-card">
            <h3>Track Applications</h3>
            <p>Bookmark companies, track your application status, and never miss a deadline.</p>
          </div>
          <div className="feature-card">
            <h3>Admin/College Panel</h3>
            <p>Admins can add companies, set criteria, post updates, and manage applicants easily.</p>
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
  );
}

export default App;

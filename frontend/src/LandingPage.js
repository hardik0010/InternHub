import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
 import logo from './logo.png';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              {/* <div className="logo-icon">IH</div> */}
              <img src={logo} alt="ljlogo" style={{width:'60px'}}/>
              <div className="logo-text">InternHub</div>
            </Link>
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Campus Placement & Internship Platform</h1>
            <p className="hero-subtitle">Streamline your career journey with our comprehensive platform designed for students, colleges, and recruiters. Access opportunities, track applications, and build your professional future.</p>
            
            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-large">Get Started</Link>
              <a href="#features" className="btn btn-secondary btn-large">Learn More</a>
            </div>

            <div className="college-info">
              <div className="college-header">
                <div className="college-logo">🎓</div>
                <div>
                  <div className="college-subtitle">Exclusively for</div>
                  <h2 className="college-title">LJIET Students</h2>
                </div>
              </div>
              <p className="college-description">This platform is specifically designed for students and administration of LJ Institute of Engineering & Technology (LJIET) to manage campus placements and internship opportunities efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Students Registered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">300+</div>
              <div className="stat-label">Placements</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Platform Features</h2>
            <p className="section-subtitle">Comprehensive tools and features designed to simplify the placement process for students, administrators, and recruiters.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">🏢</div>
                <h3 className="feature-title">Company Listings</h3>
              </div>
              <p className="feature-description">Browse comprehensive company profiles, view available positions, eligibility criteria, application deadlines, and detailed job descriptions all in one place.</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">📄</div>
                <h3 className="feature-title">Resume Analyzer</h3>
              </div>
              <p className="feature-description">Upload your resume and receive AI-powered feedback and suggestions to optimize your profile and increase your chances of selection.</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Application Tracking</h3>
              </div>
              <p className="feature-description">Monitor your application status in real-time, track submission deadlines, and receive updates on your placement journey.</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">⚙️</div>
                <h3 className="feature-title">Administrative Panel</h3>
              </div>
              <p className="feature-description">Complete administrative control to manage company registrations, student profiles, placement schedules, and generate comprehensive reports.</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">Student Dashboard</h3>
              </div>
              <p className="feature-description">Personalized dashboard with placement statistics, upcoming deadlines, application history, and quick access to all platform features.</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">⭐</div>
                <h3 className="feature-title">Saved Opportunities</h3>
              </div>
              <p className="feature-description">Bookmark interesting companies and positions, create personalized lists, and apply quickly when the right opportunity arises.</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">🧾</div>
                <h3 className="feature-title">Application Records</h3>
              </div>
              <p className="feature-description">Download detailed application receipts, maintain complete records of all submissions, and track your placement activities.</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">🔔</div>
                <h3 className="feature-title">Smart Notifications</h3>
              </div>
              <p className="feature-description">Receive instant notifications about new opportunities, application deadlines, interview schedules, and important announcements.</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">📈</div>
                <h3 className="feature-title">Analytics & Insights</h3>
              </div>
              <p className="feature-description">Access detailed analytics on placement trends, student performance, company preferences, and generate insightful reports for decision making.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>InternHub</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/how-it-works">How It Works</Link></li>
                <li><Link to="/success-stories">Success Stories</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>For Students</h3>
              <ul>
                <li><a href="/register">Browse Jobs</a></li>
                <li><a href="/register">Resume Builder</a></li>
                <li><a href="/register">Interview Tips</a></li>
                <li><a href="/register">Career Guidance</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>For Colleges</h3>
              <ul>
                <li><Link to="/admin-login">Admin Panel</Link></li>
                <li><Link to="/admin-login">Manage Students</Link></li>
                <li><Link to="/admin-login">Company Relations</Link></li>
                <li><Link to="/admin-login">Reports</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><Link to="/help-center">Help Center</Link></li>
                <li><Link to="/documentation">Documentation</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>Contact: <a href="mailto:support@internhub.com">support@internhub.com</a> | © 2025 InternHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
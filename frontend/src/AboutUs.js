import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';
 import logo from './logo.png';

const AboutUs = () => {
  return (
    <div className="about-page">
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
            <h1 className="hero-title">About InternHub</h1>
            <p className="hero-subtitle">InternHub is committed to bridging the gap between academic excellence and professional opportunities. We provide a comprehensive digital platform that streamlines the campus placement process, ensuring students at LJ Institute of Engineering & Technology have access to the best career opportunities while enabling organizations to connect with top-tier talent.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-subtitle">Bridging the gap between education and industry through innovative technology</p>
          </div>
          
          <div className="mission-content">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Empowering Students</h3>
              <p>We provide students with comprehensive tools to discover opportunities, build their profiles, and track their placement journey with confidence and clarity.</p>
            </div>
            
            <div className="mission-card">
              <div className="mission-icon">🏢</div>
              <h3>Streamlining Recruitment</h3>
              <p>We help companies connect with talented students efficiently, reducing the complexity of campus recruitment while maximizing the quality of hires.</p>
            </div>
            
            <div className="mission-card">
              <div className="mission-icon">🎓</div>
              <h3>Supporting Institutions</h3>
              <p>We enable educational institutions to manage placements effectively, track student progress, and maintain strong industry relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="overview-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Project Overview</h2>
            <p className="section-subtitle">A comprehensive MERN stack solution designed for modern campus placement needs</p>
          </div>
          
          <div className="overview-grid">
            <div className="overview-card">
              <h3>Technology Stack</h3>
              <ul>
                <li><strong>Frontend:</strong> React.js with modern CSS and responsive design</li>
                <li><strong>Backend:</strong> Node.js with Express.js framework</li>
                <li><strong>Database:</strong> MongoDB Atlas with Mongoose ODM and Cloudinary</li>
                <li><strong>Authentication:</strong> JWT-based secure authentication</li>
                <li><strong>Email:</strong> Sendgrid for automated communications</li>
              </ul>
            </div>
            
            <div className="overview-card">
              <h3>Key Features</h3>
              <ul>
                <li>Multi-role user management (Students, Admins, Companies)</li>
                <li>AI-powered resume analysis and optimization</li>
                <li>Real-time application tracking and notifications</li>
                <li>Comprehensive analytics and reporting</li>
                <li>Secure file upload and document management</li>
                <li>Advanced search and filtering capabilities</li>
              </ul>
            </div>
            
            <div className="overview-card">
              <h3>Security & Performance</h3>
              <ul>
                <li>JWT-based authentication and authorization</li>
                <li>Password encryption and secure storage</li>
                <li>Input validation and sanitization</li>
                <li>Responsive design for all devices</li>
                <li>Optimized database queries and indexing</li>
                <li>Error handling and logging systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Development Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Development Team</h2>
            <p className="section-subtitle">Meet the minds behind InternHub</p>
          </div>
          
          <div className="team-content">
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Gajjar Hardik</h3>
              <p className="member-role">Full Stack Developer</p>
              <p className="member-description">
                A passionate developer with expertise in modern web technologies. 
                Specialized in creating scalable, user-friendly applications that solve real-world problems.
                Committed to delivering high-quality software solutions that make a difference.
              </p>
              <div className="member-skills">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">Express.js</span>
                <span className="skill-tag">JavaScript</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institution Partnership */}
      <section className="partnership-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Institution Partnership</h2>
            <p className="section-subtitle">Exclusively designed for LJ Institute of Engineering & Technology</p>
          </div>
          
          <div className="partnership-content">
            <div className="institution-info">
              <div className="institution-logo">🎓</div>
              <div className="institution-details">
                <h3>LJ Institute of Engineering & Technology</h3>
                <p className="institution-description">
                  A premier engineering institution committed to academic excellence and industry collaboration. 
                  LJ Institute provides cutting-edge education and fosters innovation through practical learning approaches.
                </p>
                <div className="institution-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">🏆</span>
                    <span>NAAC Accredited Institution</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🔬</span>
                    <span>State-of-the-art Laboratories</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🤝</span>
                    <span>Strong Industry Partnerships</span>
                  </div>
                </div>
              </div>
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
                <li><Link to="/register">Browse Jobs</Link></li>
                <li><Link to="/register">Resume Builder</Link></li>
                <li><Link to="/help-center">Interview Tips</Link></li>
                <li><Link to="/help-center">Career Guidance</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/documentation">Documentation</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Contact Info</h3>
              <ul>
                <li>📧 support@internhub.com</li>
                <li>📞 +91 98765 43210</li>
                <li>📍 LJIET Campus, Gujarat</li>
                <li>🕒 Mon-Fri: 9AM-6PM</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 InternHub. All rights reserved. | Developed with ❤️ for LJIET</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs; 
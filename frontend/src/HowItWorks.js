import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';
 import logo from './logo.png';

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
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
            <h1 className="hero-title">How InternHub Works</h1>
            <p className="hero-subtitle">A comprehensive guide to understanding how our platform streamlines the campus placement process</p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Platform Overview</h2>
            <p className="section-subtitle">InternHub connects students, companies, and institutions through a seamless digital platform</p>
          </div>
          
          <div className="overview-cards">
            <div className="overview-card">
              <div className="card-icon">👨‍🎓</div>
              <h3>For Students</h3>
              <p>Discover opportunities, build profiles, and track applications with ease</p>
            </div>
            
            <div className="overview-card">
              <div className="card-icon">🏢</div>
              <h3>For Companies</h3>
              <p>Connect with talented students and streamline recruitment processes</p>
            </div>
            
            <div className="overview-card">
              <div className="card-icon">🎓</div>
              <h3>For Institutions</h3>
              <p>Manage placements, track progress, and maintain industry relationships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Workflow */}
      <section className="workflow-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Student Journey</h2>
            <p className="section-subtitle">Step-by-step process for students to maximize their placement opportunities</p>
          </div>
          
          <div className="workflow-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Registration & Profile Setup</h3>
                <p>Create your account with basic information and academic details. Upload your resume and complete your profile with skills, projects, and achievements.</p>
                <ul>
                  <li>Personal information and contact details</li>
                  <li>Academic background and CGPA</li>
                  <li>Skills, certifications, and projects</li>
                  <li>Resume upload and optimization</li>
                </ul>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Browse Opportunities</h3>
                <p>Explore available companies and positions. Use advanced filters to find opportunities that match your skills, location preferences, and career goals.</p>
                <ul>
                  <li>Company profiles and job descriptions</li>
                  <li>Eligibility criteria and requirements</li>
                  <li>Application deadlines and interview dates</li>
                  <li>Salary packages and benefits</li>
                </ul>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Resume Analysis & Optimization</h3>
                <p>Get AI-powered feedback on your resume. Receive suggestions for improvement to increase your chances of selection.</p>
                <ul>
                  <li>AI-powered resume analysis</li>
                  <li>Keyword optimization suggestions</li>
                  <li>Format and structure improvements</li>
                  <li>Skills gap identification</li>
                </ul>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Application Submission</h3>
                <p>Apply to companies with a single click. Your profile and resume are automatically shared with the selected companies.</p>
                <ul>
                  <li>One-click application process</li>
                  <li>Automatic profile sharing</li>
                  <li>Application confirmation and receipt</li>
                  <li>Bookmark companies for later</li>
                </ul>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Track Applications</h3>
                <p>Monitor your application status in real-time. Receive notifications about interview schedules, results, and important updates.</p>
                <ul>
                  <li>Real-time application status</li>
                  <li>Interview schedule notifications</li>
                  <li>Result updates and feedback</li>
                  <li>Application history and analytics</li>
                </ul>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h3>Interview & Selection</h3>
                <p>Participate in interviews and selection processes. Track your performance and receive detailed feedback for improvement.</p>
                <ul>
                  <li>Interview schedule management</li>
                  <li>Preparation resources and tips</li>
                  <li>Performance tracking and feedback</li>
                  <li>Offer letter and documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Workflow */}
      <section className="company-workflow-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Company Process</h2>
            <p className="section-subtitle">How companies can efficiently recruit talented students through our platform</p>
          </div>
          
          <div className="company-steps">
            <div className="company-step">
              <div className="step-icon">📋</div>
              <h3>Registration & Verification</h3>
              <p>Companies register with their business details and get verified by the institution. This ensures only legitimate companies participate in the placement process.</p>
            </div>
            
            <div className="company-step">
              <div className="step-icon">📝</div>
              <h3>Job Posting</h3>
              <p>Create detailed job postings with requirements, responsibilities, and benefits. Set eligibility criteria and application deadlines.</p>
            </div>
            
            <div className="company-step">
              <div className="step-icon">👥</div>
              <h3>Candidate Review</h3>
              <p>Review student applications, resumes, and profiles. Use advanced filtering to shortlist candidates based on your requirements.</p>
            </div>
            
            <div className="company-step">
              <div className="step-icon">📞</div>
              <h3>Interview Process</h3>
              <p>Schedule and conduct interviews through the platform. Track candidate performance and provide feedback.</p>
            </div>
            
            <div className="company-step">
              <div className="step-icon">✅</div>
              <h3>Selection & Onboarding</h3>
              <p>Make final selections and initiate the onboarding process. Generate offer letters and manage documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Institution Management */}
      <section className="institution-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Institution Management</h2>
            <p className="section-subtitle">Comprehensive tools for educational institutions to manage the entire placement process</p>
          </div>
          
          <div className="institution-features">
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <h3>Student Management</h3>
                <p>Manage student profiles, track academic performance, and monitor placement statistics.</p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🏢</div>
                <h3>Company Management</h3>
                <p>Verify and manage company registrations, track recruitment activities, and maintain relationships.</p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h3>Analytics & Reports</h3>
                <p>Generate comprehensive reports on placement trends, student performance, and company engagement.</p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📅</div>
                <h3>Event Management</h3>
                <p>Schedule placement drives, interviews, and career fairs with automated notifications.</p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📢</div>
                <h3>Communication</h3>
                <p>Send announcements, updates, and notifications to students and companies through the platform.</p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📋</div>
                <h3>Documentation</h3>
                <p>Manage offer letters, contracts, and other placement-related documents securely.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Key Platform Features</h2>
            <p className="section-subtitle">Advanced tools and capabilities that make InternHub the preferred choice</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Resume Analysis</h3>
              <p>Advanced AI algorithms analyze resumes and provide personalized suggestions for optimization.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Real-time Notifications</h3>
              <p>Instant updates on application status, interview schedules, and important announcements.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Search & Filters</h3>
              <p>Powerful search capabilities with multiple filters to find the perfect opportunities.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Comprehensive analytics and insights for students, companies, and institutions.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Data Management</h3>
              <p>Enterprise-grade security with encrypted data storage and secure file handling.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Responsive</h3>
              <p>Fully responsive design that works seamlessly across all devices and screen sizes.</p>
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

export default HowItWorks; 
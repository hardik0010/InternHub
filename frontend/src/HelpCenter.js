import React from 'react';
import { Link } from 'react-router-dom';
import './HelpCenter.css';
 import logo from './logo.png';

const HelpCenter = () => {
  return (
    <div className="help-center-page">
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
            <h1 className="hero-title">Help Center</h1>
            <p className="hero-subtitle">Comprehensive support and resources for LJIET students and partners</p>
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="help-categories">
        <div className="container">
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">👨‍🎓</div>
              <h3>For Students</h3>
              <p>Registration, profile setup, and application guidance</p>
              <Link to="#student-help" className="category-link">Get Help →</Link>
            </div>
            
            <div className="category-card">
              <div className="category-icon">🏢</div>
              <h3>For Companies</h3>
              <p>Registration, job posting, and recruitment process</p>
              <Link to="#company-help" className="category-link">Get Help →</Link>
            </div>
            
            <div className="category-card">
              <div className="category-icon">🎓</div>
              <h3>For Institutions</h3>
              <p>Administrative tools and placement management</p>
              <Link to="#institution-help" className="category-link">Get Help →</Link>
            </div>
            
            <div className="category-card">
              <div className="category-icon">🔧</div>
              <h3>Technical Support</h3>
              <p>Platform issues, bugs, and technical assistance</p>
              <Link to="#technical-help" className="category-link">Get Help →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* LJIET Information */}
      <section className="ljiet-info-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">LJ Institute of Engineering & Technology</h2>
            <p className="section-subtitle">Comprehensive information about our institution</p>
          </div>
          
          <div className="ljiet-content">
            <div className="ljiet-overview">
              <div className="institution-logo">🎓</div>
              <div className="institution-details">
                <h3>About LJIET</h3>
                <p>
                  LJ Institute of Engineering & Technology (LJIET) is a premier engineering institution 
                  located in Ahmedabad, Gujarat. Established with a vision to provide quality technical 
                  education, LJIET has been at the forefront of academic excellence and innovation.
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
                  <div className="highlight-item">
                    <span className="highlight-icon">📚</span>
                    <span>Comprehensive Library Resources</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="academic-programs">
              <h3>Academic Programs</h3>
              <div className="programs-grid">
                <div className="program-card">
                  <h4>Computer Engineering</h4>
                  <p>Comprehensive program covering software development, algorithms, and computer systems</p>
                </div>
                <div className="program-card">
                  <h4>Information Technology</h4>
                  <p>Focus on IT infrastructure, databases, and information systems management</p>
                </div>
                <div className="program-card">
                  <h4>Electronics & Communication</h4>
                  <p>Study of electronic devices, communication systems, and signal processing</p>
                </div>
                <div className="program-card">
                  <h4>Mechanical Engineering</h4>
                  <p>Design, analysis, and manufacturing of mechanical systems and components</p>
                </div>
                <div className="program-card">
                  <h4>Civil Engineering</h4>
                  <p>Infrastructure development, structural analysis, and construction management</p>
                </div>
                <div className="program-card">
                  <h4>Electrical Engineering</h4>
                  <p>Power systems, electrical machines, and control systems engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Help Section */}
      <section id="student-help" className="student-help-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Student Resources</h2>
            <p className="section-subtitle">Everything you need to know about using InternHub as a student</p>
          </div>
          
          <div className="help-content">
            <div className="help-grid">
              <div className="help-item">
                <h3>Getting Started</h3>
                <ul>
                  <li><strong>Registration:</strong> Create your account with your LJIET email address</li>
                  <li><strong>Profile Setup:</strong> Complete your profile with academic details and skills</li>
                  <li><strong>Resume Upload:</strong> Upload and optimize your resume using our AI tools</li>
                  <li><strong>Verification:</strong> Verify your email address to activate your account</li>
                </ul>
              </div>
              
              <div className="help-item">
                <h3>Finding Opportunities</h3>
                <ul>
                  <li><strong>Browse Companies:</strong> Explore available companies and their requirements</li>
                  <li><strong>Filter Options:</strong> Use filters for location, salary, and job type</li>
                  <li><strong>Eligibility Check:</strong> Review company criteria before applying</li>
                  <li><strong>Bookmark Companies:</strong> Save interesting opportunities for later</li>
                </ul>
              </div>
              
              <div className="help-item">
                <h3>Application Process</h3>
                <ul>
                  <li><strong>One-Click Apply:</strong> Submit applications with a single click</li>
                  <li><strong>Application Tracking:</strong> Monitor your application status in real-time</li>
                  <li><strong>Interview Preparation:</strong> Access resources and tips for interviews</li>
                  <li><strong>Result Updates:</strong> Receive notifications about selection results</li>
                </ul>
              </div>
              
              <div className="help-item">
                <h3>Resume Optimization</h3>
                <ul>
                  <li><strong>AI Analysis:</strong> Get personalized feedback on your resume</li>
                  <li><strong>Keyword Optimization:</strong> Improve ATS compatibility</li>
                  <li><strong>Format Suggestions:</strong> Professional formatting recommendations</li>
                  <li><strong>Skills Gap Analysis:</strong> Identify areas for improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Help Section */}
      <section id="company-help" className="company-help-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Company Resources</h2>
            <p className="section-subtitle">Guidance for companies using InternHub for recruitment</p>
          </div>
          
          <div className="help-content">
            <div className="help-grid">
              <div className="help-item">
                <h3>Company Registration</h3>
                <ul>
                  <li><strong>Business Verification:</strong> Submit company documents for verification</li>
                  <li><strong>Profile Creation:</strong> Set up your company profile and branding</li>
                  <li><strong>Contact Information:</strong> Provide accurate contact details</li>
                  <li><strong>Approval Process:</strong> Wait for institutional approval</li>
                </ul>
              </div>
              
              <div className="help-item">
                <h3>Job Posting</h3>
                <ul>
                  <li><strong>Detailed Descriptions:</strong> Create comprehensive job descriptions</li>
                  <li><strong>Eligibility Criteria:</strong> Set clear requirements and qualifications</li>
                  <li><strong>Salary Information:</strong> Provide competitive compensation details</li>
                  <li><strong>Application Deadlines:</strong> Set realistic application timelines</li>
                </ul>
              </div>
              
              <div className="help-item">
                <h3>Candidate Management</h3>
                <ul>
                  <li><strong>Application Review:</strong> Review and shortlist candidates</li>
                  <li><strong>Resume Analysis:</strong> Access detailed candidate profiles</li>
                  <li><strong>Interview Scheduling:</strong> Coordinate interview sessions</li>
                  <li><strong>Selection Process:</strong> Manage the entire selection workflow</li>
                </ul>
              </div>
              
              <div className="help-item">
                <h3>Analytics & Reporting</h3>
                <ul>
                  <li><strong>Application Analytics:</strong> Track application metrics</li>
                  <li><strong>Candidate Insights:</strong> Analyze candidate demographics</li>
                  <li><strong>Performance Reports:</strong> Generate recruitment reports</li>
                  <li><strong>Trend Analysis:</strong> Monitor recruitment trends</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Support */}
      <section id="technical-help" className="technical-help-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Technical Support</h2>
            <p className="section-subtitle">Resolve technical issues and get platform assistance</p>
          </div>
          
          <div className="support-content">
            <div className="support-grid">
              <div className="support-card">
                <div className="support-icon">🔧</div>
                <h3>Common Issues</h3>
                <ul>
                  <li>Login problems and password reset</li>
                  <li>File upload issues</li>
                  <li>Email verification problems</li>
                  <li>Browser compatibility issues</li>
                </ul>
              </div>
              
              <div className="support-card">
                <div className="support-icon">📱</div>
                <h3>Platform Compatibility</h3>
                <ul>
                  <li>Supported browsers: Chrome, Firefox, Safari, Edge</li>
                  <li>Mobile responsive design</li>
                  <li>Minimum screen resolution: 320px</li>
                  <li>Internet connection requirements</li>
                </ul>
              </div>
              
              <div className="support-card">
                <div className="support-icon">📧</div>
                <h3>Contact Support</h3>
                <ul>
                  <li>Email: support@internhub.com</li>
                  <li>Phone: +91 98765 43210</li>
                  <li>Response time: 24-48 hours</li>
                  <li>Emergency: +91 98765 43211</li>
                </ul>
              </div>
              
              <div className="support-card">
                <div className="support-icon">📚</div>
                <h3>Documentation</h3>
                <ul>
                  <li>User guides and tutorials</li>
                  <li>Video demonstrations</li>
                  <li>FAQ section</li>
                  <li>API documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Quick answers to common questions</p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I reset my password?</h3>
              <p>Click on "Forgot Password" on the login page and follow the instructions sent to your registered email address.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I update my profile after registration?</h3>
              <p>Yes, you can update your profile, resume, and other information at any time through your dashboard.</p>
            </div>
            
            <div className="faq-item">
              <h3>How do I know if my application was received?</h3>
              <p>You'll receive an email confirmation immediately after applying, and you can track the status in your dashboard.</p>
            </div>
            
            <div className="faq-item">
              <h3>What file formats are supported for resume upload?</h3>
              <p>We support PDF, DOC, and DOCX formats. PDF is recommended for best compatibility.</p>
            </div>
            
            <div className="faq-item">
              <h3>How long does the verification process take?</h3>
              <p>Email verification is instant. Company verification typically takes 1-2 business days.</p>
            </div>
            
            <div className="faq-item">
              <h3>Is my data secure on the platform?</h3>
              <p>Yes, we use enterprise-grade security measures including encryption and secure data storage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="contact-support-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Still Need Help?</h2>
            <p className="section-subtitle">Our support team is here to assist you</p>
          </div>
          
          <div className="support-options">
            <div className="support-option">
              <div className="option-icon">📧</div>
              <h3>Email Support</h3>
              <p>Send us a detailed message and we'll get back to you within 24 hours</p>
              <a href="mailto:support@internhub.com" className="support-link">Send Email</a>
            </div>
            
            <div className="support-option">
              <div className="option-icon">📞</div>
              <h3>Phone Support</h3>
              <p>Call us during business hours for immediate assistance</p>
              <a href="tel:+919876543210" className="support-link">Call Now</a>
            </div>
            
            <div className="support-option">
              <div className="option-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Chat with our support team in real-time (available during business hours)</p>
              <Link to="/contact" className="support-link">Start Chat</Link>
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
                <li><Link to="/help-center">Help Center</Link></li>
                <li><Link to="/documentation">Documentation</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions">Terms of Service</Link></li>
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

export default HelpCenter; 
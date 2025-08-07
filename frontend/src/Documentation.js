import React from 'react';
import { Link } from 'react-router-dom';
import './Documentation.css';
 import logo from './logo.png';

const Documentation = () => {
  return (
    <div className="documentation-page">
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
            <h1 className="hero-title">Documentation</h1>
            <p className="hero-subtitle">Comprehensive guides, API documentation, and technical resources for InternHub</p>
          </div>
        </div>
      </section>

      {/* Documentation Navigation */}
      <section className="doc-nav-section">
        <div className="container">
          <div className="doc-nav">
            <a href="#getting-started" className="nav-item">Getting Started</a>
            <a href="#user-guides" className="nav-item">User Guides</a>
            <a href="#api-docs" className="nav-item">API Documentation</a>
            <a href="#technical-specs" className="nav-item">Technical Specs</a>
            <a href="#deployment" className="nav-item">Deployment</a>
            <a href="#troubleshooting" className="nav-item">Troubleshooting</a>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="getting-started-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Getting Started</h2>
            <p className="section-subtitle">Quick start guide for InternHub platform</p>
          </div>
          
          <div className="doc-content">
            <div className="doc-card">
              <h3>Platform Overview</h3>
              <p>
                InternHub is a comprehensive campus placement platform built with modern web technologies. 
                The platform connects students, companies, and educational institutions through a seamless digital experience.
              </p>
              
              <div className="tech-stack">
                <h4>Technology Stack</h4>
                <div className="tech-grid">
                  <div className="tech-item">
                    <strong>Frontend:</strong> React.js 18.x, CSS3, HTML5
                  </div>
                  <div className="tech-item">
                    <strong>Backend:</strong> Node.js, Express.js 4.x
                  </div>
                  <div className="tech-item">
                    <strong>Database:</strong> MongoDB Atlas, Mongoose ODM
                  </div>
                  <div className="tech-item">
                    <strong>Authentication:</strong> JWT, bcrypt
                  </div>
                  <div className="tech-item">
                    <strong>Email:</strong> SendGrid API
                  </div>
                  <div className="tech-item">
                    <strong>File Storage:</strong> Cloudinary
                  </div>
                </div>
              </div>
            </div>
            
            <div className="doc-card">
              <h3>System Requirements</h3>
              <div className="requirements-grid">
                <div className="requirement-item">
                  <h4>Server Requirements</h4>
                  <ul>
                    <li>Node.js 16.x or higher</li>
                    <li>MongoDB 5.x or higher</li>
                    <li>Minimum 2GB RAM</li>
                    <li>10GB storage space</li>
                  </ul>
                </div>
                
                <div className="requirement-item">
                  <h4>Client Requirements</h4>
                  <ul>
                    <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                    <li>JavaScript enabled</li>
                    <li>Minimum screen resolution: 320px</li>
                    <li>Stable internet connection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Guides */}
      <section id="user-guides" className="user-guides-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">User Guides</h2>
            <p className="section-subtitle">Step-by-step guides for different user types</p>
          </div>
          
          <div className="guides-grid">
            <div className="guide-card">
              <div className="guide-icon">👨‍🎓</div>
              <h3>Student Guide</h3>
              <div className="guide-content">
                <h4>Registration Process</h4>
                <ol>
                  <li>Visit the registration page</li>
                  <li>Fill in personal and academic details</li>
                  <li>Upload your resume (PDF recommended)</li>
                  <li>Verify your email address</li>
                  <li>Complete your profile setup</li>
                </ol>
                
                <h4>Profile Management</h4>
                <ul>
                  <li>Update personal information</li>
                  <li>Add skills and certifications</li>
                  <li>Upload project portfolios</li>
                  <li>Set career preferences</li>
                </ul>
              </div>
            </div>
            
            <div className="guide-card">
              <div className="guide-icon">🏢</div>
              <h3>Company Guide</h3>
              <div className="guide-content">
                <h4>Company Registration</h4>
                <ol>
                  <li>Submit company verification documents</li>
                  <li>Create company profile</li>
                  <li>Set up admin accounts</li>
                  <li>Wait for institutional approval</li>
                </ol>
                
                <h4>Job Posting Process</h4>
                <ul>
                  <li>Create detailed job descriptions</li>
                  <li>Set eligibility criteria</li>
                  <li>Define salary packages</li>
                  <li>Set application deadlines</li>
                </ul>
              </div>
            </div>
            
            <div className="guide-card">
              <div className="guide-icon">🎓</div>
              <h3>Institution Guide</h3>
              <div className="guide-content">
                <h4>Administrative Setup</h4>
                <ol>
                  <li>Configure institution settings</li>
                  <li>Set up placement policies</li>
                  <li>Create admin accounts</li>
                  <li>Configure notification systems</li>
                </ol>
                
                <h4>Management Features</h4>
                <ul>
                  <li>Student data management</li>
                  <li>Company verification process</li>
                  <li>Analytics and reporting</li>
                  <li>Communication tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section id="api-docs" className="api-docs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">API Documentation</h2>
            <p className="section-subtitle">RESTful API endpoints and integration guides</p>
          </div>
          
          <div className="api-content">
            <div className="api-overview">
              <h3>API Overview</h3>
              <p>
                InternHub provides a comprehensive REST API for integration with external systems. 
                All API endpoints require authentication using JWT tokens.
              </p>
              
              <div className="api-info">
                <div className="info-item">
                  <strong>Base URL:</strong> <code>https://api.internhub.com/v1</code>
                </div>
                <div className="info-item">
                  <strong>Authentication:</strong> Bearer Token (JWT)
                </div>
                <div className="info-item">
                  <strong>Content-Type:</strong> application/json
                </div>
                <div className="info-item">
                  <strong>Rate Limit:</strong> 100 requests per minute
                </div>
              </div>
            </div>
            
            <div className="endpoints-grid">
              <div className="endpoint-card">
                <h4>Authentication</h4>
                <div className="endpoint-item">
                  <code>POST /auth/login</code>
                  <p>User login and token generation</p>
                </div>
                <div className="endpoint-item">
                  <code>POST /auth/register</code>
                  <p>User registration</p>
                </div>
                <div className="endpoint-item">
                  <code>POST /auth/refresh</code>
                  <p>Refresh access token</p>
                </div>
              </div>
              
              <div className="endpoint-card">
                <h4>Students</h4>
                <div className="endpoint-item">
                  <code>GET /students/profile</code>
                  <p>Get student profile</p>
                </div>
                <div className="endpoint-item">
                  <code>PUT /students/profile</code>
                  <p>Update student profile</p>
                </div>
                <div className="endpoint-item">
                  <code>POST /students/applications</code>
                  <p>Submit job application</p>
                </div>
              </div>
              
              <div className="endpoint-card">
                <h4>Companies</h4>
                <div className="endpoint-item">
                  <code>GET /companies</code>
                  <p>List all companies</p>
                </div>
                <div className="endpoint-item">
                  <code>GET /companies/:id</code>
                  <p>Get company details</p>
                </div>
                <div className="endpoint-item">
                  <code>POST /companies/jobs</code>
                  <p>Create job posting</p>
                </div>
              </div>
              
              <div className="endpoint-card">
                <h4>Applications</h4>
                <div className="endpoint-item">
                  <code>GET /applications</code>
                  <p>List applications</p>
                </div>
                <div className="endpoint-item">
                  <code>GET /applications/:id</code>
                  <p>Get application details</p>
                </div>
                <div className="endpoint-item">
                  <code>PUT /applications/:id/status</code>
                  <p>Update application status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section id="technical-specs" className="technical-specs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Technical Specifications</h2>
            <p className="section-subtitle">Detailed technical information and architecture</p>
          </div>
          
          <div className="specs-content">
            <div className="specs-grid">
              <div className="spec-card">
                <h3>Database Schema</h3>
                <div className="schema-item">
                  <h4>Users Collection</h4>
                  <pre><code>{`{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  role: String (student|company|admin),
  profile: {
    name: String,
    phone: String,
    avatar: String
  },
  createdAt: Date,
  updatedAt: Date
}`}</code></pre>
                </div>
                
                <div className="schema-item">
                  <h4>Companies Collection</h4>
                  <pre><code>{`{
  _id: ObjectId,
  name: String,
  description: String,
  logo: String,
  website: String,
  location: String,
  verified: Boolean,
  jobs: [ObjectId]
}`}</code></pre>
                </div>
              </div>
              
              <div className="spec-card">
                <h3>Security Features</h3>
                <ul>
                  <li><strong>Authentication:</strong> JWT-based token system</li>
                  <li><strong>Password Security:</strong> bcrypt hashing with salt</li>
                  <li><strong>Input Validation:</strong> Comprehensive sanitization</li>
                  <li><strong>CORS Protection:</strong> Configured for specific domains</li>
                  <li><strong>Rate Limiting:</strong> API request throttling</li>
                  <li><strong>Data Encryption:</strong> TLS/SSL for data in transit</li>
                </ul>
              </div>
              
              <div className="spec-card">
                <h3>Performance Optimization</h3>
                <ul>
                  <li><strong>Database Indexing:</strong> Optimized queries</li>
                  <li><strong>Caching:</strong> Redis for session management</li>
                  <li><strong>CDN:</strong> Static asset delivery</li>
                  <li><strong>Compression:</strong> Gzip compression enabled</li>
                  <li><strong>Image Optimization:</strong> Cloudinary integration</li>
                  <li><strong>Lazy Loading:</strong> Component-level optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Guide */}
      <section id="deployment" className="deployment-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Deployment Guide</h2>
            <p className="section-subtitle">Step-by-step deployment instructions</p>
          </div>
          
          <div className="deployment-content">
            <div className="deployment-steps">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Environment Setup</h3>
                <div className="step-content">
                  <h4>Prerequisites</h4>
                  <ul>
                    <li>Node.js 16.x or higher</li>
                    <li>MongoDB Atlas account</li>
                    <li>Cloudinary account</li>
                    <li>SendGrid account</li>
                  </ul>
                  
                  <h4>Environment Variables</h4>
                  <pre><code>{`MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@internhub.com`}</code></pre>
                </div>
              </div>
              
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Backend Deployment</h3>
                <div className="step-content">
                  <h4>Installation</h4>
                  <pre><code>{`cd backend
npm install
npm run build`}</code></pre>
                  
                  <h4>Production Start</h4>
                  <pre><code>{`npm start
# or using PM2
pm2 start server.js`}</code></pre>
                </div>
              </div>
              
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Frontend Deployment</h3>
                <div className="step-content">
                  <h4>Build Process</h4>
                  <pre><code>{`cd frontend
npm install
npm run build`}</code></pre>
                  
                  <h4>Deploy to Production</h4>
                  <pre><code>{`# Using nginx
sudo cp -r build/* /var/www/html/
sudo systemctl restart nginx`}</code></pre>
                </div>
              </div>
              
              <div className="step-card">
                <div className="step-number">4</div>
                <h3>SSL Configuration</h3>
                <div className="step-content">
                  <h4>Let's Encrypt Setup</h4>
                  <pre><code>{`sudo certbot --nginx -d internhub.com
sudo systemctl reload nginx`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="troubleshooting-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Troubleshooting</h2>
            <p className="section-subtitle">Common issues and their solutions</p>
          </div>
          
          <div className="troubleshooting-content">
            <div className="issue-grid">
              <div className="issue-card">
                <h3>Database Connection Issues</h3>
                <div className="issue-solution">
                  <h4>Problem:</h4>
                  <p>Unable to connect to MongoDB Atlas</p>
                  <h4>Solution:</h4>
                  <ul>
                    <li>Check network connectivity</li>
                    <li>Verify MongoDB URI format</li>
                    <li>Ensure IP whitelist includes server IP</li>
                    <li>Check database user credentials</li>
                  </ul>
                </div>
              </div>
              
              <div className="issue-card">
                <h3>Email Delivery Problems</h3>
                <div className="issue-solution">
                  <h4>Problem:</h4>
                  <p>Emails not being sent or received</p>
                  <h4>Solution:</h4>
                  <ul>
                    <li>Verify SendGrid API key</li>
                    <li>Check sender email verification</li>
                    <li>Review email templates</li>
                    <li>Monitor SendGrid dashboard</li>
                  </ul>
                </div>
              </div>
              
              <div className="issue-card">
                <h3>File Upload Issues</h3>
                <div className="issue-solution">
                  <h4>Problem:</h4>
                  <p>Resume uploads failing</p>
                  <h4>Solution:</h4>
                  <ul>
                    <li>Check Cloudinary credentials</li>
                    <li>Verify file size limits</li>
                    <li>Ensure supported file formats</li>
                    <li>Check network connectivity</li>
                  </ul>
                </div>
              </div>
              
              <div className="issue-card">
                <h3>Authentication Errors</h3>
                <div className="issue-solution">
                  <h4>Problem:</h4>
                  <p>JWT token validation failing</p>
                  <h4>Solution:</h4>
                  <ul>
                    <li>Verify JWT_SECRET environment variable</li>
                    <li>Check token expiration settings</li>
                    <li>Ensure proper token format</li>
                    <li>Review authentication middleware</li>
                  </ul>
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

export default Documentation; 
import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
 import logo from './logo.png';

const Contact = () => {
  return (
    <div className="contact-page">
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
            <h1 className="hero-title">Contact Us</h1>
            <p className="hero-subtitle">Get in touch with our team for support, inquiries, or collaboration opportunities</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">We're here to help and answer any questions you might have</p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email Support</h3>
              <p>For technical support and general inquiries</p>
              <div className="contact-details">
                <a href="mailto:support@internhub.com">support@internhub.com</a>
                <a href="mailto:info@internhub.com">info@internhub.com</a>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Phone Support</h3>
              <p>Call us during business hours</p>
              <div className="contact-details">
                <a href="tel:+919876543210">+91 98765 43210</a>
                <a href="tel:+919876543211">+91 98765 43211</a>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Visit Us</h3>
              <p>Drop by our campus office</p>
              <div className="contact-details">
                <p>LJ Institute of Engineering & Technology</p>
                <p>Near Sarkhej-Gandhinagar Highway</p>
                <p>Ahmedabad, Gujarat 382210</p>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">🕒</div>
              <h3>Business Hours</h3>
              <p>When we're available to help</p>
              <div className="contact-details">
                <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                <p><strong>Saturday:</strong> 9:00 AM - 2:00 PM</p>
                <p><strong>Sunday:</strong> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institution Contact */}
      <section className="institution-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">LJ Institute of Engineering & Technology</h2>
            <p className="section-subtitle">Contact information for the institution</p>
          </div>
          
          <div className="institution-contact">
            <div className="institution-info">
              <div className="institution-logo">🎓</div>
              <div className="institution-details">
                <h3>LJ Institute of Engineering & Technology</h3>
                <p className="institution-description">
                  A premier engineering institution committed to academic excellence and industry collaboration. 
                  LJ Institute provides cutting-edge education and fosters innovation through practical learning approaches.
                </p>
                
                <div className="institution-contact-grid">
                  <div className="contact-item">
                    <div className="contact-label">📧 Email</div>
                    <div className="contact-value">
                      <a href="mailto:info@ljiet.ac.in">info@ljiet.ac.in</a>
                      <a href="mailto:placement@ljiet.ac.in">placement@ljiet.ac.in</a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-label">📞 Phone</div>
                    <div className="contact-value">
                      <a href="tel:+917275123456">+91 72751 23456</a>
                      <a href="tel:+917275123457">+91 72751 23457</a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-label">📍 Address</div>
                    <div className="contact-value">
                      <p>LJ Institute of Engineering & Technology</p>
                      <p>Near Sarkhej-Gandhinagar Highway</p>
                      <p>Ahmedabad, Gujarat 382210</p>
                      <p>India</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-label">🌐 Website</div>
                    <div className="contact-value">
                      <a href="https://www.ljiet.ac.in" target="_blank" rel="noopener noreferrer">www.ljiet.ac.in</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Developer Contact */}
      <section className="developer-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Project Developer</h2>
            <p className="section-subtitle">Get in touch with the developer behind InternHub</p>
          </div>
          
          <div className="developer-contact">
            <div className="developer-info">
              <div className="developer-avatar">👨‍💻</div>
              <div className="developer-details">
                <h3>Gajjar Hardik</h3>
                <p className="developer-role">Full Stack Developer</p>
                <p className="developer-description">
                  A passionate developer with expertise in modern web technologies. 
                  Specialized in creating scalable, user-friendly applications that solve real-world problems.
                  Committed to delivering high-quality software solutions that make a difference.
                </p>
                
                <div className="developer-contact-grid">
                  <div className="contact-item">
                    <div className="contact-label">📧 Email</div>
                    <div className="contact-value">
                      <a href="mailto:developer@internhub.com">gajjarhardik0010@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-label">📱 Phone</div>
                    <div className="contact-value">
                      <a href="tel:+919876543212">+91 9687219575</a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-label">💼 LinkedIn</div>
                    <div className="contact-value">
                      <a href="https://www.linkedin.com/in/gajjar-hardik-5b45a12ab/" target="_blank" rel="noopener noreferrer">gajjar-hardik</a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-label">🐙 GitHub</div>
                    <div className="contact-value">
                      <a href="https://github.com/hardik0010" target="_blank" rel="noopener noreferrer">hardik0010</a>
                    </div>
                  </div>
                </div>
                
                <div className="developer-skills">
                  <h4>Technical Skills</h4>
                  <div className="skills-grid">
                    <span className="skill-tag">React.js</span>
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">MongoDB</span>
                    <span className="skill-tag">Express.js</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">HTML/CSS</span>
                    <span className="skill-tag">Git</span>
                    <span className="skill-tag">REST APIs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Send Us a Message</h2>
            <p className="section-subtitle">Have a question or feedback? We'd love to hear from you</p>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select id="category" name="category">
                  <option value="">Select a category</option>
                  <option value="technical">Technical Support</option>
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" rows="6" required></textarea>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-large">
                  Send Message
                </button>
              </div>
            </form>
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
              <h3>How do I register for InternHub?</h3>
              <p>Simply click the "Register" button in the header and fill out the registration form with your details. You'll need to provide your academic information and upload your resume.</p>
            </div>
            
            <div className="faq-item">
              <h3>Is InternHub free to use?</h3>
              <p>Yes, InternHub is completely free for LJIET students. There are no hidden fees or charges for using the platform.</p>
            </div>
            
            <div className="faq-item">
              <h3>How do I apply to companies?</h3>
              <p>Browse the companies section, find opportunities that match your profile, and click "Apply" to submit your application. You can track your application status in real-time.</p>
            </div>
            
            <div className="faq-item">
              <h3>What if I need technical support?</h3>
              <p>For technical issues, please email us at support@internhub.com or call our support line at +91 98765 43210 during business hours.</p>
            </div>
            
            <div className="faq-item">
              <h3>How secure is my data?</h3>
              <p>We use enterprise-grade security measures to protect your data. All information is encrypted and stored securely following industry best practices.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I update my profile after registration?</h3>
              <p>Yes, you can update your profile, resume, and other information at any time through your dashboard.</p>
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

export default Contact; 
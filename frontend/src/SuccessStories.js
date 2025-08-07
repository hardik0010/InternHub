import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessStories.css';
 import logo from './logo.png';

const SuccessStories = () => {
  return (
    <div className="success-stories-page">
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
            <h1 className="hero-title">Success Stories</h1>
            <p className="hero-subtitle">Inspiring journeys of students who transformed their careers through InternHub</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Students Placed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Partner Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">₹12L</div>
              <div className="stat-label">Average Package</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="featured-stories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Success Stories</h2>
            <p className="section-subtitle">Real stories from real students who achieved their dreams through InternHub</p>
          </div>
          
          <div className="stories-grid">
            <div className="story-card featured">
              <div className="story-header">
                <div className="student-avatar">👨‍💻</div>
                <div className="student-info">
                  <h3>Rahul Sharma</h3>
                  <p className="student-role">Software Engineer at Google</p>
                  <p className="student-batch">Computer Engineering, 2024</p>
                </div>
                <div className="company-logo">🔍</div>
              </div>
              
              <div className="story-content">
                <p>"InternHub completely transformed my placement journey. The AI-powered resume analysis helped me optimize my profile, and the real-time tracking kept me updated throughout the process. Within 2 months, I secured a position at Google with a package of ₹18 LPA!"</p>
                
                <div className="story-highlights">
                  <div className="highlight">
                    <span className="highlight-label">Package:</span>
                    <span className="highlight-value">₹18 LPA</span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Company:</span>
                    <span className="highlight-value">Google</span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Role:</span>
                    <span className="highlight-value">Software Engineer</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-card">
              <div className="story-header">
                <div className="student-avatar">👩‍💼</div>
                <div className="student-info">
                  <h3>Priya Patel</h3>
                  <p className="student-role">Data Scientist at Amazon</p>
                  <p className="student-batch">Information Technology, 2024</p>
                </div>
                <div className="company-logo">📦</div>
              </div>
              
              <div className="story-content">
                <p>"The platform's advanced search filters helped me find the perfect opportunity that matched my skills. The application tracking feature was a game-changer, and I could focus on my preparation knowing everything was being managed efficiently."</p>
                
                <div className="story-highlights">
                  <div className="highlight">
                    <span className="highlight-label">Package:</span>
                    <span className="highlight-value">₹15 LPA</span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Company:</span>
                    <span className="highlight-value">Amazon</span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Role:</span>
                    <span className="highlight-value">Data Scientist</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-card">
              <div className="story-header">
                <div className="student-avatar">👨‍🔬</div>
                <div className="student-info">
                  <h3>Arjun Mehta</h3>
                  <p className="student-role">Product Manager at Microsoft</p>
                  <p className="student-batch">Electronics & Communication, 2024</p>
                </div>
                <div className="company-logo">🪟</div>
              </div>
              
              <div className="story-content">
                <p>"InternHub's comprehensive company profiles and detailed job descriptions helped me understand exactly what each role required. The bookmark feature allowed me to organize my applications strategically."</p>
                
                <div className="story-highlights">
                  <div className="highlight">
                    <span className="highlight-label">Package:</span>
                    <span className="highlight-value">₹16 LPA</span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Company:</span>
                    <span className="highlight-value">Microsoft</span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Role:</span>
                    <span className="highlight-value">Product Manager</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="more-stories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">More Success Stories</h2>
            <p className="section-subtitle">Discover how InternHub helped students across different domains</p>
          </div>
          
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-header">
                <div className="student-avatar">👩‍🎨</div>
                <div className="student-info">
                  <h3>Ananya Desai</h3>
                  <p className="student-role">UX Designer at Adobe</p>
                  <p className="student-batch">Computer Engineering, 2024</p>
                </div>
                <div className="company-logo">🎨</div>
              </div>
              
              <div className="story-content">
                <p>"The resume analyzer provided invaluable feedback that helped me showcase my design portfolio effectively. The platform's user-friendly interface made the entire process smooth and stress-free."</p>
                
                <div className="story-highlights">
                  <div className="highlight">
                    <span className="highlight-label">Package:</span>
                    <span className="highlight-value">₹14 LPA</span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Company:</span>
                    <span className="highlight-value">Adobe</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-card">
              <div className="story-header">
                <div className="student-avatar">👨‍💻</div>
                <div className="student-info">
                  <h3>Vikram Singh</h3>
                  <p className="student-role">DevOps Engineer at Netflix</p>
                  <p className="student-batch">Information Technology, 2024</p>
                </div>
                <div className="company-logo">🎬</div>
              </div>
              
              <div className="story-content">
                <p>"The real-time notifications kept me updated about interview schedules and results. The platform's analytics helped me understand my application patterns and improve my approach."</p>
                
                <div className="story-highlights">
                  <div className="highlight">
                    <span className="highlight-label">Package:</span>
                    <span className="highlight-value">₹17 LPA</span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Company:</span>
                    <span className="highlight-value">Netflix</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-card">
              <div className="story-header">
                <div className="student-avatar">👩‍⚕️</div>
                <div className="student-info">
                  <h3>Dr. Sneha Reddy</h3>
                  <p className="student-role">Research Scientist at IBM</p>
                  <p className="student-batch">Computer Engineering, 2024</p>
                </div>
                <div className="company-logo">🔬</div>
              </div>
              
              <div className="story-content">
                <p>"InternHub's comprehensive tracking system helped me manage multiple applications efficiently. The detailed company profiles gave me insights into each organization's culture and expectations."</p>
                
                <div className="story-highlights">
                  <div className="highlight">
                    <span className="highlight-label">Package:</span>
                    <span className="highlight-value">₹20 LPA</span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Company:</span>
                    <span className="highlight-value">IBM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Students Say</h2>
            <p className="section-subtitle">Hear directly from our successful graduates</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"InternHub made the placement process incredibly smooth. The AI resume analysis was spot-on and helped me improve my profile significantly."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🎓</div>
                <div className="author-info">
                  <h4>Karan Malhotra</h4>
                  <p>Software Engineer at TCS</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The real-time tracking and notifications kept me informed throughout the process. I never missed any important updates or deadlines."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍🎓</div>
                <div className="author-info">
                  <h4>Zara Khan</h4>
                  <p>Data Analyst at Infosys</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The platform's user-friendly interface and comprehensive features made my placement journey stress-free and successful."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🎓</div>
                <div className="author-info">
                  <h4>Aditya Verma</h4>
                  <p>Full Stack Developer at Wipro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Write Your Success Story?</h2>
            <p>Join thousands of students who have transformed their careers through InternHub</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-large">Get Started Today</Link>
              <Link to="/companies" className="btn btn-secondary btn-large">Browse Opportunities</Link>
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

export default SuccessStories; 
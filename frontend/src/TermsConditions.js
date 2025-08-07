import React from 'react';
import { Link } from 'react-router-dom';
import './TermsConditions.css';
 import logo from './logo.png';

const TermsConditions = () => {
  return (
    <div className="terms-conditions-page">
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
            <h1 className="hero-title">Terms and Conditions</h1>
            <p className="hero-subtitle">Please read these terms carefully before using InternHub</p>
            <p className="last-updated">Last updated: January 2025</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="terms-content">
        <div className="container">
          <div className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using InternHub ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
            <p>
              These Terms and Conditions ("Terms") govern your use of the InternHub platform operated by LJ Institute of Engineering & Technology 
              ("we," "us," or "our"). Your use of the Platform constitutes acceptance of these Terms.
            </p>
          </div>

          <div className="terms-section">
            <h2>2. Description of Service</h2>
            <p>
              InternHub is a campus placement platform that connects students, companies, and educational institutions. 
              The Platform provides the following services:
            </p>
            <ul>
              <li>Student profile creation and management</li>
              <li>Company registration and job posting</li>
              <li>Application submission and tracking</li>
              <li>Resume analysis and optimization</li>
              <li>Interview scheduling and management</li>
              <li>Placement analytics and reporting</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>3. User Accounts and Registration</h2>
            
            <h3>3.1 Account Creation</h3>
            <p>To use certain features of the Platform, you must create an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Keep your account credentials secure</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h3>3.2 Account Types</h3>
            <ul>
              <li><strong>Student Accounts:</strong> Available to enrolled students of LJIET</li>
              <li><strong>Company Accounts:</strong> Available to verified companies and organizations</li>
              <li><strong>Institution Accounts:</strong> Available to authorized institutional administrators</li>
            </ul>

            <h3>3.3 Account Termination</h3>
            <p>We reserve the right to terminate or suspend accounts that violate these Terms or engage in fraudulent activities.</p>
          </div>

          <div className="terms-section">
            <h2>4. User Obligations and Conduct</h2>
            
            <h3>4.1 Acceptable Use</h3>
            <p>You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul>
              <li>Use the Platform for any illegal or unauthorized purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Upload malicious code or attempt to hack the Platform</li>
              <li>Impersonate another person or entity</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Upload false or misleading information</li>
            </ul>

            <h3>4.2 Content Standards</h3>
            <p>All content uploaded to the Platform must:</p>
            <ul>
              <li>Be accurate and truthful</li>
              <li>Not violate any third-party rights</li>
              <li>Not contain offensive or inappropriate material</li>
              <li>Comply with applicable laws and regulations</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>5. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, 
              which is incorporated into these Terms by reference. By using the Platform, you consent to our collection and use 
              of information as described in our Privacy Policy.
            </p>
          </div>

          <div className="terms-section">
            <h2>6. Intellectual Property Rights</h2>
            
            <h3>6.1 Platform Ownership</h3>
            <p>
              The Platform and its original content, features, and functionality are owned by LJ Institute of Engineering & Technology 
              and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>

            <h3>6.2 User Content</h3>
            <p>
              You retain ownership of content you upload to the Platform. However, you grant us a non-exclusive, worldwide, 
              royalty-free license to use, display, and distribute your content in connection with the Platform's services.
            </p>

            <h3>6.3 License to Use</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to access and use the Platform for its intended purpose, 
              subject to these Terms.
            </p>
          </div>

          <div className="terms-section">
            <h2>7. Disclaimers and Limitations</h2>
            
            <h3>7.1 Service Availability</h3>
            <p>
              We strive to maintain the Platform's availability but do not guarantee uninterrupted access. The Platform may be temporarily 
              unavailable due to maintenance, updates, or technical issues.
            </p>

            <h3>7.2 No Warranty</h3>
            <p>
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
              INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h3>7.3 Limitation of Liability</h3>
            <p>
              IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, 
              INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </div>

          <div className="terms-section">
            <h2>8. Job Placement and Employment</h2>
            
            <h3>8.1 No Guarantee of Employment</h3>
            <p>
              We do not guarantee job placement or employment opportunities. The Platform facilitates connections between students 
              and companies, but employment decisions are made by the respective parties.
            </p>

            <h3>8.2 Third-Party Relationships</h3>
            <p>
              We are not responsible for the actions, policies, or practices of companies or other third parties. 
              Any agreements or arrangements between users are solely between those parties.
            </p>

            <h3>8.3 Background Verification</h3>
            <p>
              Companies may conduct background checks and verification processes. We are not responsible for the results 
              or consequences of such verification processes.
            </p>
          </div>

          <div className="terms-section">
            <h2>9. Payment and Fees</h2>
            
            <h3>9.1 Free Service</h3>
            <p>
              Basic Platform services are provided free of charge to LJIET students. However, we reserve the right to 
              introduce fees for premium features or services with appropriate notice.
            </p>

            <h3>9.2 Company Fees</h3>
            <p>
              Companies may be charged fees for certain services or features. All fees will be clearly communicated 
              before service provision.
            </p>
          </div>

          <div className="terms-section">
            <h2>10. Termination</h2>
            
            <h3>10.1 Termination by User</h3>
            <p>You may terminate your account at any time by contacting our support team or using the account deletion feature.</p>

            <h3>10.2 Termination by Us</h3>
            <p>We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or the Platform.</p>

            <h3>10.3 Effect of Termination</h3>
            <p>Upon termination, your right to use the Platform will cease immediately. We may delete your account and data in accordance with our data retention policies.</p>
          </div>

          <div className="terms-section">
            <h2>11. Governing Law and Dispute Resolution</h2>
            
            <h3>11.1 Governing Law</h3>
            <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>

            <h3>11.2 Dispute Resolution</h3>
            <p>
              Any disputes arising from these Terms or your use of the Platform shall be resolved through good faith negotiations. 
              If such negotiations fail, disputes shall be resolved through binding arbitration in accordance with Indian law.
            </p>
          </div>

          <div className="terms-section">
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting 
              the updated Terms on the Platform and updating the "Last Updated" date. Your continued use of the Platform 
              after such changes constitutes acceptance of the updated Terms.
            </p>
          </div>

          <div className="terms-section">
            <h2>13. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and 
              the remaining provisions shall be enforced to the fullest extent under law.
            </p>
          </div>

          <div className="terms-section">
            <h2>14. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding 
              the use of the Platform and supersede all prior agreements and understandings.
            </p>
          </div>

          <div className="terms-section">
            <h2>15. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong> legal@internhub.com
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> +91 98765 43210
              </div>
              <div className="contact-item">
                <strong>Address:</strong> LJ Institute of Engineering & Technology, Ahmedabad, Gujarat
              </div>
              <div className="contact-item">
                <strong>Legal Department:</strong> legal@internhub.com
              </div>
            </div>
          </div>

          <div className="terms-section">
            <h2>16. Acknowledgment</h2>
            <p>
              By using InternHub, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. 
              If you do not agree to these Terms, please do not use the Platform.
            </p>
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

export default TermsConditions; 
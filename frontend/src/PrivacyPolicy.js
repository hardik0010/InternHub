import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';
 import logo from './logo.png';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
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
            <h1 className="hero-title">Privacy Policy</h1>
            <p className="hero-subtitle">How we collect, use, and protect your personal information</p>
            <p className="last-updated">Last updated: January 2025</p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="policy-content">
        <div className="container">
          <div className="policy-section">
            <h2>1. Introduction</h2>
            <p>
              InternHub ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p>
              By using InternHub, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, please do not use our platform.
            </p>
          </div>

          <div className="policy-section">
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>We collect the following types of personal information:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, phone number, and password</li>
              <li><strong>Profile Information:</strong> Academic details, skills, work experience, and educational background</li>
              <li><strong>Resume and Documents:</strong> Uploaded resumes, certificates, and other supporting documents</li>
              <li><strong>Application Data:</strong> Job applications, interview schedules, and selection results</li>
              <li><strong>Communication Data:</strong> Messages, notifications, and feedback exchanged through the platform</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>We automatically collect certain information when you use our platform:</p>
            <ul>
              <li><strong>Usage Data:</strong> Pages visited, time spent, and features used</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
              <li><strong>Cookies and Tracking:</strong> Session cookies, preference cookies, and analytics cookies</li>
              <li><strong>Log Data:</strong> Server logs, error logs, and performance metrics</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>3. How We Use Your Information</h2>
            
            <h3>3.1 Primary Purposes</h3>
            <ul>
              <li><strong>Platform Operation:</strong> To provide and maintain our campus placement services</li>
              <li><strong>User Authentication:</strong> To verify your identity and secure your account</li>
              <li><strong>Profile Management:</strong> To create and manage your professional profile</li>
              <li><strong>Job Matching:</strong> To connect you with relevant opportunities</li>
              <li><strong>Communication:</strong> To send important updates, notifications, and announcements</li>
            </ul>

            <h3>3.2 Secondary Purposes</h3>
            <ul>
              <li><strong>Analytics:</strong> To analyze platform usage and improve our services</li>
              <li><strong>Research:</strong> To conduct research on placement trends and outcomes</li>
              <li><strong>Security:</strong> To detect and prevent fraud, abuse, and security threats</li>
              <li><strong>Compliance:</strong> To comply with legal obligations and regulatory requirements</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>4. Information Sharing and Disclosure</h2>
            
            <h3>4.1 With Your Consent</h3>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Companies:</strong> When you apply for jobs, we share your profile and resume with the respective companies</li>
              <li><strong>Institutions:</strong> Your academic institution may access your placement-related data</li>
              <li><strong>Service Providers:</strong> Third-party services that help us operate the platform</li>
            </ul>

            <h3>4.2 Legal Requirements</h3>
            <p>We may disclose your information when required by law, including:</p>
            <ul>
              <li>Compliance with legal processes or government requests</li>
              <li>Protection of our rights, property, or safety</li>
              <li>Investigation of potential violations of our terms</li>
              <li>Emergency situations involving public safety</li>
            </ul>

            <h3>4.3 Business Transfers</h3>
            <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</p>
          </div>

          <div className="policy-section">
            <h2>5. Data Security</h2>
            
            <h3>5.1 Security Measures</h3>
            <p>We implement comprehensive security measures to protect your information:</p>
            <ul>
              <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols</li>
              <li><strong>Access Controls:</strong> Strict access controls and authentication mechanisms</li>
              <li><strong>Regular Audits:</strong> Regular security assessments and vulnerability testing</li>
              <li><strong>Data Backup:</strong> Secure backup systems with disaster recovery procedures</li>
              <li><strong>Employee Training:</strong> Regular security training for all employees</li>
            </ul>

            <h3>5.2 Data Retention</h3>
            <p>We retain your information for as long as necessary to:</p>
            <ul>
              <li>Provide our services and maintain your account</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Improve our services and develop new features</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>6. Your Rights and Choices</h2>
            
            <h3>6.1 Access and Control</h3>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Restriction:</strong> Limit how we use your information</li>
            </ul>

            <h3>6.2 Communication Preferences</h3>
            <p>You can control how we communicate with you:</p>
            <ul>
              <li>Opt out of marketing communications</li>
              <li>Choose notification preferences</li>
              <li>Unsubscribe from email lists</li>
              <li>Manage cookie preferences</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>7. Cookies and Tracking Technologies</h2>
            
            <h3>7.1 Types of Cookies</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how you use our platform</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Analytics Cookies:</strong> Provide insights into platform usage</li>
            </ul>

            <h3>7.2 Cookie Management</h3>
            <p>You can manage cookies through your browser settings or our cookie consent tool.</p>
          </div>

          <div className="policy-section">
            <h2>8. Third-Party Services</h2>
            
            <h3>8.1 Service Providers</h3>
            <p>We use third-party services for specific functions:</p>
            <ul>
              <li><strong>Cloud Storage:</strong> Cloudinary for file storage and management</li>
              <li><strong>Email Services:</strong> SendGrid for email delivery</li>
              <li><strong>Database:</strong> MongoDB Atlas for data storage</li>
              <li><strong>Analytics:</strong> Google Analytics for usage insights</li>
            </ul>

            <h3>8.2 Third-Party Links</h3>
            <p>Our platform may contain links to third-party websites. We are not responsible for their privacy practices.</p>
          </div>

          <div className="policy-section">
            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your data during international transfers.
            </p>
          </div>

          <div className="policy-section">
            <h2>10. Children's Privacy</h2>
            <p>
              Our platform is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you believe we have collected such information, 
              please contact us immediately.
            </p>
          </div>

          <div className="policy-section">
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new policy on our platform and updating the "Last Updated" date. Your continued 
              use of the platform after such changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div className="policy-section">
            <h2>12. Contact Information</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong> privacy@internhub.com
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> +91 98765 43210
              </div>
              <div className="contact-item">
                <strong>Address:</strong> LJ Institute of Engineering & Technology, Ahmedabad, Gujarat
              </div>
              <div className="contact-item">
                <strong>Data Protection Officer:</strong> dpo@internhub.com
              </div>
            </div>
          </div>

          <div className="policy-section">
            <h2>13. Legal Basis for Processing (GDPR)</h2>
            <p>For users in the European Union, we process your data based on:</p>
            <ul>
              <li><strong>Consent:</strong> When you explicitly agree to data processing</li>
              <li><strong>Contract:</strong> To provide our services under our terms of service</li>
              <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>14. California Privacy Rights (CCPA)</h2>
            <p>California residents have additional rights under the CCPA:</p>
            <ul>
              <li>Right to know what personal information is collected</li>
              <li>Right to know whether personal information is sold or disclosed</li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to equal service and price</li>
            </ul>
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

export default PrivacyPolicy; 
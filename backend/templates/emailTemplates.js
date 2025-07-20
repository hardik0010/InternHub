const createEmailTemplate = (type, data) => {
  const baseTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>InternHub - ${type === 'verification' ? 'Email Verification' : 'Password Reset'}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color:rgb(220, 197, 197);
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color:rgb(230, 218, 218);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
        }
        .message {
          font-size: 16px;
          margin-bottom: 30px;
          color: #555;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color:rgb(255, 255, 255);
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 16px;
          margin: 20px 0;
          transition: transform 0.2s ease;
        }
        .button:hover {
          transform: translateY(-2px);
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px 30px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .warning {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 4px;
          padding: 15px;
          margin: 20px 0;
          color: #856404;
        }
        .info {
          background-color: #d1ecf1;
          border: 1px solid #bee5eb;
          border-radius: 4px;
          padding: 15px;
          margin: 20px 0;
          color: #0c5460;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>InternHub</h1>
          <p>Your Campus Placement Platform</p>
        </div>
        <div class="content">
          ${getEmailContent(type, data)}
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} InternHub. All rights reserved.</p>
          <p>This email was sent to ${data.email}. If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return baseTemplate;
};

const getEmailContent = (type, data) => {
  switch (type) {
    case 'verification':
      return `
        <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
        <div class="message">
          <p>Hello <strong>${data.name}</strong>,</p>
          <p>Welcome to InternHub! We're excited to have you join our platform for campus placements and internship opportunities.</p>
          <p>To complete your registration and start exploring opportunities, please verify your email address by clicking the button below:</p>
        </div>
        <div style="text-align: center;">
          <a href="${data.verificationUrl}" class="button">Verify Email Address</a>
        </div>
        <div class="warning">
          <strong>Important:</strong> This verification link will expire in 24 hours. If you don't verify your email within this time, you'll need to register again.
        </div>
        <div class="info">
          <strong>What's next?</strong> After verifying your email, you can:
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Complete your profile</li>
            <li>Browse company listings</li>
            <li>Apply for internships and placements</li>
            <li>Track your applications</li>
          </ul>
        </div>
        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          If the button doesn't work, you can copy and paste this link into your browser:<br>
          <a href="${data.verificationUrl}" style="color: #667eea; word-break: break-all;">${data.verificationUrl}</a>
        </p>
      `;

    case 'passwordReset':
      return `
        <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
        <div class="message">
          <p>Hello <strong>${data.name}</strong>,</p>
          <p>We received a request to reset your password for your InternHub account.</p>
          <p>Click the button below to create a new password:</p>
        </div>
        <div style="text-align: center;">
          <a href="${data.resetUrl}" class="button">Reset Password</a>
        </div>
        <div class="warning">
          <strong>Security Notice:</strong> This password reset link will expire in 1 hour. If you didn't request this password reset, please ignore this email and your password will remain unchanged.
        </div>
        <div class="info">
          <strong>Need help?</strong> If you're having trouble resetting your password, contact our support team at support@internhub.com
        </div>
        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          If the button doesn't work, you can copy and paste this link into your browser:<br>
          <a href="${data.resetUrl}" style="color: #667eea; word-break: break-all;">${data.resetUrl}</a>
        </p>
      `;

    default:
      return '';
  }
};

module.exports = { createEmailTemplate };

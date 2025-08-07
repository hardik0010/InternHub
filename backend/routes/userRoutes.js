const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { createEmailTemplate } = require('../templates/emailTemplates');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for profile picture upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// JWT authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Test endpoint to check if backend is working
router.get('/test', (req, res) => {
  res.json({ message: 'User routes are working!', timestamp: new Date().toISOString() });
});

// Debug endpoint to check if a token exists (for testing only)
router.get('/debug-token/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (user) {
      res.json({ 
        exists: true, 
        email: user.email, 
        isVerified: user.isVerified,
        token: req.params.token 
      });
    } else {
      res.json({ 
        exists: false, 
        token: req.params.token,
        message: 'No user found with this token' 
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Registration Route
router.post('/register', upload.single('profilePic'), async (req, res) => {
  try {
    const { name, email, phone, collegeId, branch, batch, cgpa, password, acceptTerms } = req.body;
    if (!acceptTerms) return res.status(400).json({ error: 'Terms must be accepted' });
    if (!name || !email || !phone || !collegeId || !branch || !batch || !cgpa || !password)
      return res.status(400).json({ error: 'All fields are required' });
    if (collegeId.length !== 14) return res.status(400).json({ error: 'College ID must be 14 characters' });
    let profilePicUrl = '';
    if (req.file) {
      profilePicUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        });
        stream.end(req.file.buffer);
      });
    }
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = new User({ name, email, phone, collegeId, branch, batch, cgpa, password, profilePicUrl, verificationToken });
    await user.save();
    // Send verification email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const verificationUrl = `${frontendUrl}/verify-email/${verificationToken}`;
    console.log('Verification URL generated:', verificationUrl);
    const emailHtml = createEmailTemplate('verification', {
      name,
      email,
      verificationUrl
    });
    
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM || 'noreply@internhub.com',
      subject: 'Verify your email - InternHub',
      html: emailHtml
    };
    try {
      await sgMail.send(msg);
    } catch (emailErr) {
      console.error('SendGrid error:', emailErr);
      return res.status(500).json({ error: 'Failed to send verification email.' });
    }
    res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
  } catch (err) {
    // Duplicate key error handling
    if (err.code === 11000) {
      // Log the error for debugging
      console.error('Duplicate key error:', err);
      // Check keyPattern
      if (err.keyPattern) {
        if (err.keyPattern.email) {
          return res.status(409).json({ error: 'Email is already registered.' });
        }
        if (err.keyPattern.collegeId) {
          return res.status(409).json({ error: 'Enrollment number is already registered.' });
        }
      }
      // Check keyValue
      if (err.keyValue) {
        if (err.keyValue.email) {
          return res.status(409).json({ error: 'Email is already registered.' });
        }
        if (err.keyValue.collegeId) {
          return res.status(409).json({ error: 'Enrollment number is already registered.' });
        }
      }
      // Fallback: generic message
      return res.status(409).json({ error: 'A unique field is already registered. Please check your email and enrollment number.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Email Verification Route
router.get('/verify-email/:token', async (req, res) => {
  try {
    console.log('Verification attempt for token:', req.params.token);
    
    const user = await User.findOne({ verificationToken: req.params.token });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('No user found with token:', req.params.token);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired verification link. Please check your email or register again.' 
      });
    }
    
    console.log('User found:', user.email, 'Current verification status:', user.isVerified);
    
    // Check if already verified
    if (user.isVerified) {
      return res.json({ 
        success: true, 
        message: 'Email already verified! You can login to your account.' 
      });
    }
    
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    
    console.log('User verified successfully:', user.email);
    
    return res.json({ 
      success: true, 
      message: 'Email verified successfully! You can now login to your account.' 
    });
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Could not verify email. Please try again later.' 
    });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    if (!user.isVerified) return res.status(403).json({ error: 'Email not verified' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'No user with that email' });
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const emailHtml = createEmailTemplate('passwordReset', {
      name: user.name,
      email,
      resetUrl
    });
    
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM || 'noreply@internhub.com',
      subject: 'Reset your password - InternHub',
      html: emailHtml
    };
    await sgMail.send(msg);
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users/change-password - Change user password
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Old and new password are required.' });
    }
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(400).json({ error: 'Current password is incorrect.' });
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// POST /api/users/profile-pic - Upload or change profile picture
router.post('/profile-pic', authenticateToken, upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Delete old profile picture from Cloudinary if it exists
    if (user.profilePicPublicId) {
      try {
        await cloudinary.uploader.destroy(user.profilePicPublicId);
      } catch (err) {
        console.error('Failed to delete old profile picture from Cloudinary:', err);
      }
    }
    // Upload new profile picture to Cloudinary
    const cloudinaryResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      stream.end(req.file.buffer);
    });
    user.profilePicUrl = cloudinaryResult.secure_url;
    user.profilePicPublicId = cloudinaryResult.public_id;
    await user.save();
    const updatedUser = user.toObject();
    delete updatedUser.password;
    delete updatedUser.verificationToken;
    delete updatedUser.resetPasswordToken;
    delete updatedUser.resetPasswordExpires;
    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Profile picture upload error:', error);
    res.status(500).json({ error: 'Failed to update profile picture' });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PATCH /api/users/profile - Update user profile
router.patch('/profile', authenticateToken, async (req, res) => {
  try {
    const allowedFields = ['name', 'phone', 'branch', 'batch', 'cgpa'];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -verificationToken -resetPasswordToken -resetPasswordExpires');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router; 
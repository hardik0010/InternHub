const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');
const Application = require('../models/Application');
const Bookmark = require('../models/Bookmark');
const Activity = require('../models/Activity');
const Announcement = require('../models/Announcement');
const Notification = require('../models/Notification');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Middleware to verify JWT token
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

// Get student dashboard stats
router.get('/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const studentId = req.user._id;

    // Get total companies
    const totalCompanies = await Company.countDocuments({ status: 'published' });

    // Get applications count
    const applicationsCount = await Application.countDocuments({ studentId });

    // Get bookmarks count
    const bookmarksCount = await Bookmark.countDocuments({ studentId });

    // Calculate profile completion percentage
    const profileFields = ['name', 'email', 'phone', 'collegeId', 'branch', 'batch', 'cgpa', 'profilePicUrl'];
    const completedFields = profileFields.filter(field => req.user[field] && req.user[field] !== '');
    const profileCompletion = Math.round((completedFields.length / profileFields.length) * 100);

    // Get upcoming deadlines (applications with deadlines in next 7 days)
    const upcomingDeadlines = await Application.find({
      studentId,
      deadline: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    }).populate('companyId', 'name role').limit(5);

    // Get recent activities
    const recentActivities = await Activity.find({ studentId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('companyId', 'name');

    // Get unread notifications count
    const unreadNotifications = await Notification.countDocuments({
      studentId,
      isRead: false
    });

    res.json({
      stats: {
        totalCompanies,
        applicationsCount,
        bookmarksCount,
        profileCompletion,
        unreadNotifications
      },
      upcomingDeadlines,
      recentActivities
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get student applications
router.get('/applications', authenticateToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const studentId = req.user._id;

    let query = { studentId };
    if (status && status !== 'all') {
      query.status = status;
    }

    const applications = await Application.find(query)
      .populate('companyId', 'name role description visitDate eligibility')
      .sort({ appliedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Application.countDocuments(query);

    res.json({
      applications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Applications fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Submit application
router.post('/applications', authenticateToken, async (req, res) => {
  try {
    const { companyId, resumeUrl, coverLetter, notes } = req.body;
    const studentId = req.user._id;

    // Check if already applied
    const existingApplication = await Application.findOne({ studentId, companyId });
    if (existingApplication) {
      return res.status(400).json({ error: 'Already applied to this company' });
    }

    // Get company details for deadline
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const application = new Application({
      studentId,
      companyId,
      status: 'applied',
      resumeUrl,
      coverLetter,
      notes,
      deadline: company.visitDate
    });

    await application.save();

    // Create activity
    await Activity.create({
      studentId,
      type: 'application_submitted',
      title: 'Application Submitted',
      description: `You applied to ${company.name} for ${company.role} position`,
      companyId,
      applicationId: application._id
    });

    // Create notification
    await Notification.create({
      studentId,
      title: 'Application Submitted',
      message: `Your application to ${company.name} has been submitted successfully`,
      type: 'application',
      relatedId: application._id,
      relatedType: 'application'
    });

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Get bookmarks
router.get('/bookmarks', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const studentId = req.user._id;

    const bookmarks = await Bookmark.find({ studentId })
      .populate('companyId', 'name role description visitDate eligibility status')
      .sort({ addedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Bookmark.countDocuments({ studentId });

    res.json({
      bookmarks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Bookmarks fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

// Add bookmark
router.post('/bookmarks', authenticateToken, async (req, res) => {
  try {
    const { companyId, notes } = req.body;
    const studentId = req.user._id;

    // Check if already bookmarked
    const existingBookmark = await Bookmark.findOne({ studentId, companyId });
    if (existingBookmark) {
      return res.status(400).json({ error: 'Company already bookmarked' });
    }

    const bookmark = new Bookmark({
      studentId,
      companyId,
      notes
    });

    await bookmark.save();

    // Get company name for activity
    const company = await Company.findById(companyId);

    // Create activity
    await Activity.create({
      studentId,
      type: 'bookmark_added',
      title: 'Company Bookmarked',
      description: `You bookmarked ${company.name}`,
      companyId
    });

    res.status(201).json({ message: 'Company bookmarked successfully', bookmark });
  } catch (error) {
    console.error('Bookmark creation error:', error);
    res.status(500).json({ error: 'Failed to bookmark company' });
  }
});

// Remove bookmark
router.delete('/bookmarks/:companyId', authenticateToken, async (req, res) => {
  try {
    const { companyId } = req.params;
    const studentId = req.user._id;

    const bookmark = await Bookmark.findOneAndDelete({ studentId, companyId });
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Bookmark removal error:', error);
    res.status(500).json({ error: 'Failed to remove bookmark' });
  }
});

// Get notifications
router.get('/notifications', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    const studentId = req.user._id;

    let query = { studentId };
    if (unreadOnly === 'true') {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ studentId, isRead: false });

    res.json({
      notifications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      unreadCount
    });
  } catch (error) {
    console.error('Notifications fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark notification as read
router.patch('/notifications/:id/read', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user._id;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, studentId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ message: 'Notification marked as read', notification });
  } catch (error) {
    console.error('Notification update error:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

// Mark all notifications as read
router.patch('/notifications/read-all', authenticateToken, async (req, res) => {
  try {
    const studentId = req.user._id;

    await Notification.updateMany(
      { studentId, isRead: false },
      { isRead: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Notifications update error:', error);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
});

// Get announcements
router.get('/announcements', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const studentId = req.user._id;

    // Get user details for filtering
    const user = await User.findById(studentId);

    // Build query for announcements relevant to the student
    let query = {
      isActive: true,
      $or: [
        { targetAudience: 'all' },
        { 
          targetAudience: 'specific_branch',
          'targetFilters.branch': user.branch
        },
        {
          targetAudience: 'specific_batch',
          'targetFilters.batch': user.batch
        }
      ]
    };

    // Add expiry filter
    query.$or.push({ expiresAt: { $exists: false } });
    query.$or.push({ expiresAt: { $gt: new Date() } });

    const announcements = await Announcement.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Announcement.countDocuments(query);

    res.json({
      announcements,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Announcements fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

// Update profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, branch, batch, cgpa } = req.body;
    const studentId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      studentId,
      { name, phone, branch, batch, cgpa },
      { new: true, runValidators: true }
    );

    // Create activity
    await Activity.create({
      studentId,
      type: 'profile_updated',
      title: 'Profile Updated',
      description: 'You updated your profile information'
    });

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Upload resume
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-resume', authenticateToken, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { 
          resource_type: 'raw',
          folder: 'resumes',
          format: 'pdf'
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Update user profile with resume URL
    await User.findByIdAndUpdate(req.user._id, {
      resumeUrl: result.secure_url
    });

    // Create activity
    await Activity.create({
      studentId: req.user._id,
      type: 'resume_uploaded',
      title: 'Resume Uploaded',
      description: 'You uploaded a new resume'
    });

    res.json({ 
      message: 'Resume uploaded successfully',
      resumeUrl: result.secure_url
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ error: 'Failed to upload resume' });
  }
});

// Get available companies
router.get('/companies', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', branch = '', batch = '' } = req.query;
    const studentId = req.user._id;

    let query = { status: 'published' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    const companies = await Company.find(query)
      .sort({ visitDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Check which companies are bookmarked by the student
    const bookmarkedCompanyIds = await Bookmark.find({ studentId })
      .distinct('companyId');

    // Check which companies the student has applied to
    const appliedCompanyIds = await Application.find({ studentId })
      .distinct('companyId');

    const companiesWithStatus = companies.map(company => ({
      ...company.toObject(),
      isBookmarked: bookmarkedCompanyIds.includes(company._id),
      hasApplied: appliedCompanyIds.includes(company._id)
    }));

    const total = await Company.countDocuments(query);

    res.json({
      companies: companiesWithStatus,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Companies fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

module.exports = router; 
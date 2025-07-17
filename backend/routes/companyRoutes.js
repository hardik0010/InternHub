const express = require('express');
const router = express.Router();
const multer = require('multer');
const Company = require('../models/Company');
const cloudinary = require('cloudinary').v2;
const adminAuth = require('../middleware/auth');

// Multer setup for PDF upload (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to upload to Cloudinary as a Promise
function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'raw', folder: 'jd_pdfs' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
}

// Add new company (with JD upload)
router.post('/', adminAuth, upload.single('jd'), async (req, res) => {
  try {
    let jdUrl = '';
    if (req.file) {
      console.log('Uploading JD to Cloudinary...');
      try {
        const result = await uploadToCloudinary(req.file.buffer);
        jdUrl = result.secure_url;
        console.log('Cloudinary upload success:', jdUrl);
      } catch (uploadErr) {
        console.error('Cloudinary upload failed:', uploadErr);
        return res.status(500).json({ error: 'Cloudinary upload failed', details: uploadErr.message });
      }
    }
    const {
      name, role, description, visitDate, applyLink,
      eligibility, selectionRounds, faqs, prepTips, status
    } = req.body;
    const company = new Company({
      name, role, description, visitDate, applyLink,
      eligibility: eligibility ? JSON.parse(eligibility) : {},
      selectionRounds: selectionRounds ? JSON.parse(selectionRounds) : [],
      faqs: faqs ? JSON.parse(faqs) : [],
      prepTips: prepTips ? JSON.parse(prepTips) : [],
      jdUrl,
      status: status || 'draft',
    });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all companies (with search and filter)
router.get('/', adminAuth, async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }
    let companies = await Company.find(query);
    // Add static applicantCount for now
    companies = companies.map(c => ({ ...c.toObject(), applicantCount: 42 }));
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a company
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get total company count
router.get('/count', adminAuth, async (req, res) => {
  try {
    const count = await Company.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get published company count
router.get('/count/published', adminAuth, async (req, res) => {
  try {
    const count = await Company.countDocuments({ status: 'published' });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get closed company count
router.get('/count/closed', adminAuth, async (req, res) => {
  try {
    const count = await Company.countDocuments({ status: 'closed' });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get company details
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save as draft (update or create)
router.put('/:id/draft', adminAuth, upload.single('jd'), async (req, res) => {
  try {
    let jdUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      jdUrl = result.secure_url;
    }
    const update = {
      ...req.body,
      eligibility: req.body.eligibility ? JSON.parse(req.body.eligibility) : {},
      selectionRounds: req.body.selectionRounds ? JSON.parse(req.body.selectionRounds) : [],
      faqs: req.body.faqs ? JSON.parse(req.body.faqs) : [],
      prepTips: req.body.prepTips ? JSON.parse(req.body.prepTips) : [],
      status: 'draft',
    };
    if (jdUrl) update.jdUrl = jdUrl;
    const company = await Company.findByIdAndUpdate(req.params.id, update, { new: true, upsert: true });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update company details (edit)
router.put('/:id', adminAuth, upload.single('jd'), async (req, res) => {
  try {
    let jdUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      jdUrl = result.secure_url;
    }
    const update = {
      ...req.body,
      eligibility: req.body.eligibility ? JSON.parse(req.body.eligibility) : {},
      selectionRounds: req.body.selectionRounds ? JSON.parse(req.body.selectionRounds) : [],
      faqs: req.body.faqs ? JSON.parse(req.body.faqs) : [],
      prepTips: req.body.prepTips ? JSON.parse(req.body.prepTips) : [],
    };
    if (jdUrl) update.jdUrl = jdUrl;
    const company = await Company.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Publish a draft company
router.put('/:id/publish', adminAuth, async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, { status: 'published' }, { new: true });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Close a published company
router.put('/:id/close', adminAuth, async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, { status: 'closed' }, { new: true });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get applicant list for a company
router.get('/:id/applicants', adminAuth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('applicantList');
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company.applicantList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 
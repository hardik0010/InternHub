const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['general', 'deadline', 'interview', 'result', 'urgent'], 
    default: 'general' 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'], 
    default: 'medium' 
  },
  targetAudience: { 
    type: String, 
    enum: ['all', 'specific_branch', 'specific_batch', 'specific_company'], 
    default: 'all' 
  },
  targetFilters: { 
    branch: [String],
    batch: [String],
    companyId: mongoose.Schema.Types.ObjectId
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  expiresAt: { 
    type: Date 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

// Index for efficient queries
AnnouncementSchema.index({ isActive: 1, type: 1, createdAt: -1 });
AnnouncementSchema.index({ expiresAt: 1 });

module.exports = mongoose.model('Announcement', AnnouncementSchema); 
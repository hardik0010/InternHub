const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['application_submitted', 'bookmark_added', 'profile_updated', 'resume_uploaded', 'interview_scheduled', 'status_updated'], 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company' 
  },
  applicationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application' 
  },
  metadata: { 
    type: mongoose.Schema.Types.Mixed 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

// Index for efficient queries
ActivitySchema.index({ studentId: 1, createdAt: -1 });
ActivitySchema.index({ studentId: 1, isRead: 1 });

module.exports = mongoose.model('Activity', ActivitySchema); 
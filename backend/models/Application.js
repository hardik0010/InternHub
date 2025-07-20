const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'applied', 'shortlisted', 'interviewed', 'selected', 'rejected'], 
    default: 'pending' 
  },
  appliedAt: { 
    type: Date, 
    default: Date.now 
  },
  deadline: { 
    type: Date 
  },
  resumeUrl: { 
    type: String 
  },
  coverLetter: { 
    type: String 
  },
  notes: { 
    type: String 
  },
  interviewDate: { 
    type: Date 
  },
  interviewLocation: { 
    type: String 
  },
  feedback: { 
    type: String 
  }
}, { timestamps: true });

// Index for efficient queries
ApplicationSchema.index({ studentId: 1, companyId: 1 }, { unique: true });
ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ deadline: 1 });

module.exports = mongoose.model('Application', ApplicationSchema); 
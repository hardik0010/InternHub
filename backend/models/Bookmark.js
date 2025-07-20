const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
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
  addedAt: { 
    type: Date, 
    default: Date.now 
  },
  notes: { 
    type: String 
  }
}, { timestamps: true });

// Index for efficient queries
BookmarkSchema.index({ studentId: 1, companyId: 1 }, { unique: true });
BookmarkSchema.index({ studentId: 1 });

module.exports = mongoose.model('Bookmark', BookmarkSchema); 
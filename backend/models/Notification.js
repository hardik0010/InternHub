const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['application', 'interview', 'deadline', 'announcement', 'reminder', 'result'], 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'], 
    default: 'medium' 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  isSent: { 
    type: Boolean, 
    default: false 
  },
  relatedId: { 
    type: mongoose.Schema.Types.ObjectId 
  },
  relatedType: { 
    type: String, 
    enum: ['application', 'company', 'announcement'] 
  },
  actionUrl: { 
    type: String 
  },
  scheduledFor: { 
    type: Date 
  },
  sentAt: { 
    type: Date 
  }
}, { timestamps: true });

// Index for efficient queries
NotificationSchema.index({ studentId: 1, isRead: 1, createdAt: -1 });
NotificationSchema.index({ studentId: 1, isSent: 1 });
NotificationSchema.index({ scheduledFor: 1, isSent: 0 });

module.exports = mongoose.model('Notification', NotificationSchema); 
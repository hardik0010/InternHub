const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  visitDate: { type: Date, required: true },
  applyLink: { type: String },
  eligibility: {
    cgpa: { type: Number },
    branch: [{ type: String }],
    batch: [{ type: String }],
    skills: [{ type: String }],
  },
  selectionRounds: [{ type: String }],
  jdUrl: { type: String },
  faqs: [{
    question: String,
    answer: String
  }],
  prepTips: [{ type: String }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  applicantList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema); 
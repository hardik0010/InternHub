require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdmin() {
  const adminExists = await User.findOne({ role: 'admin' });
  if (adminExists) {
    console.log('Admin already exists');
    process.exit();
  }
  const admin = new User({
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin@123', // Set ADMIN_PASSWORD in .env for production
    role: 'admin'
  });
  await admin.save();
  console.log('Admin user created');
  process.exit();
}

createAdmin(); 
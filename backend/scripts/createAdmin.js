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
    username: 'admin',
    password: 'admin@123', // Change this to a secure password
    role: 'admin'
  });
  await admin.save();
  console.log('Admin user created');
  process.exit();
}

createAdmin(); 
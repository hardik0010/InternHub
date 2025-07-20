const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function testVerification() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all users with verification tokens
    const usersWithTokens = await User.find({ verificationToken: { $exists: true } });
    
    console.log(`\nFound ${usersWithTokens.length} users with verification tokens:`);
    
    usersWithTokens.forEach((user, index) => {
      console.log(`\n${index + 1}. Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Verified: ${user.isVerified}`);
      console.log(`   Token: ${user.verificationToken}`);
      console.log(`   Created: ${user.createdAt}`);
    });

    // Find all verified users
    const verifiedUsers = await User.find({ isVerified: true });
    console.log(`\nFound ${verifiedUsers.length} verified users:`);
    
    verifiedUsers.forEach((user, index) => {
      console.log(`\n${index + 1}. Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Verified: ${user.isVerified}`);
    });

    // Test a specific token if provided
    const testToken = process.argv[2];
    if (testToken) {
      console.log(`\nTesting token: ${testToken}`);
      const user = await User.findOne({ verificationToken: testToken });
      if (user) {
        console.log('✅ Token found!');
        console.log(`   Email: ${user.email}`);
        console.log(`   Verified: ${user.isVerified}`);
      } else {
        console.log('❌ Token not found in database');
      }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

// Run the test
testVerification(); 
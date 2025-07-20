const mongoose = require('mongoose');
const Company = require('../models/Company');
const Announcement = require('../models/Announcement');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for sample data creation'))
.catch((err) => console.error('MongoDB connection error:', err));

const sampleCompanies = [
  {
    name: 'Google',
    role: 'Software Engineer Intern',
    description: 'Join Google for an exciting internship opportunity. Work on cutting-edge projects and learn from industry experts.',
    visitDate: new Date('2024-12-15'),
    applyLink: 'https://careers.google.com',
    eligibility: {
      cgpa: 7.5,
      branch: ['Computer Engineering', 'Information Technology'],
      batch: ['2024', '2025'],
      skills: ['JavaScript', 'Python', 'React']
    },
    selectionRounds: ['Online Test', 'Technical Interview', 'HR Round'],
    prepTips: ['Practice coding problems', 'Review data structures', 'Prepare for system design'],
    status: 'published'
  },
  {
    name: 'Microsoft',
    role: 'Full Stack Developer Intern',
    description: 'Microsoft is looking for talented interns to work on Azure cloud services and web applications.',
    visitDate: new Date('2024-12-20'),
    applyLink: 'https://careers.microsoft.com',
    eligibility: {
      cgpa: 7.0,
      branch: ['Computer Engineering', 'Information Technology', 'Electronics & Communication'],
      batch: ['2024', '2025'],
      skills: ['C#', '.NET', 'Azure']
    },
    selectionRounds: ['Coding Test', 'Technical Interview', 'Final Round'],
    prepTips: ['Learn C# and .NET', 'Practice Azure concepts', 'Review algorithms'],
    status: 'published'
  },
  {
    name: 'Amazon',
    role: 'SDE Intern',
    description: 'Amazon Web Services internship program. Work on scalable cloud solutions and distributed systems.',
    visitDate: new Date('2024-12-25'),
    applyLink: 'https://amazon.jobs',
    eligibility: {
      cgpa: 8.0,
      branch: ['Computer Engineering', 'Information Technology'],
      batch: ['2024', '2025'],
      skills: ['Java', 'AWS', 'System Design']
    },
    selectionRounds: ['Online Assessment', 'Technical Interview', 'Bar Raiser'],
    prepTips: ['Practice system design', 'Review Java concepts', 'Learn AWS services'],
    status: 'published'
  },
  {
    name: 'TCS',
    role: 'Digital Intern',
    description: 'Tata Consultancy Services digital internship program focusing on emerging technologies.',
    visitDate: new Date('2024-12-30'),
    applyLink: 'https://www.tcs.com/careers',
    eligibility: {
      cgpa: 6.5,
      branch: ['Computer Engineering', 'Information Technology', 'Electronics & Communication', 'Mechanical Engineering'],
      batch: ['2024', '2025'],
      skills: ['Java', 'Python', 'SQL']
    },
    selectionRounds: ['Aptitude Test', 'Technical Interview', 'HR Interview'],
    prepTips: ['Practice aptitude questions', 'Review programming basics', 'Prepare for HR questions'],
    status: 'published'
  },
  {
    name: 'Infosys',
    role: 'Systems Engineer Intern',
    description: 'Infosys internship program with focus on software development and testing.',
    visitDate: new Date('2025-01-05'),
    applyLink: 'https://career.infosys.com',
    eligibility: {
      cgpa: 6.0,
      branch: ['Computer Engineering', 'Information Technology', 'Electronics & Communication'],
      batch: ['2024', '2025'],
      skills: ['Java', 'SQL', 'Testing']
    },
    selectionRounds: ['Online Test', 'Technical Interview', 'HR Round'],
    prepTips: ['Practice Java programming', 'Learn testing concepts', 'Review database concepts'],
    status: 'published'
  }
];

const sampleAnnouncements = [
  {
    title: 'Campus Placement Drive Starting Soon!',
    content: 'The campus placement season is about to begin. All eligible students are requested to update their profiles and prepare their resumes.',
    type: 'general',
    priority: 'high',
    targetAudience: 'all'
  },
  {
    title: 'Resume Workshop Tomorrow',
    content: 'Join us for a resume writing workshop tomorrow at 2 PM in the auditorium. Learn how to create an impactful resume.',
    type: 'general',
    priority: 'medium',
    targetAudience: 'all'
  },
  {
    title: 'Google Interview Preparation Session',
    content: 'Special preparation session for Google interviews. Open to all Computer Engineering and IT students.',
    type: 'interview',
    priority: 'high',
    targetAudience: 'specific_branch',
    targetFilters: {
      branch: ['Computer Engineering', 'Information Technology']
    }
  }
];

async function createSampleData() {
  try {
    console.log('Creating sample companies...');
    
    // Clear existing sample data
    await Company.deleteMany({});
    await Announcement.deleteMany({});
    
    // Create companies
    const companies = await Company.insertMany(sampleCompanies);
    console.log(`Created ${companies.length} companies`);
    
    // Create announcements
    const announcements = await Announcement.insertMany(sampleAnnouncements);
    console.log(`Created ${announcements.length} announcements`);
    
    console.log('Sample data created successfully!');
    console.log('\nSample Companies:');
    companies.forEach(company => {
      console.log(`- ${company.name}: ${company.role}`);
    });
    
    console.log('\nSample Announcements:');
    announcements.forEach(announcement => {
      console.log(`- ${announcement.title}`);
    });
    
  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    mongoose.connection.close();
  }
}

createSampleData(); 
# InternHub Student Dashboard

A comprehensive student dashboard for campus placement and internship management built with React, Node.js, and MongoDB.

## 🚀 Features

### Student Dashboard (`/student/dashboard`)
- **4 Stats Cards**: Total companies, Applications submitted, Bookmarked companies, Profile completion %
- **Quick Actions Panel**: Browse companies, Upload resume, View applications, Bookmarked companies
- **Recent Activities Feed**: Track all student actions and activities
- **Upcoming Deadlines**: Applications with approaching deadlines
- **Real-time Notifications**: Bell icon with unread notification count
- **Responsive Design**: Works on desktop, tablet, and mobile

### Additional Pages
- **Companies** (`/companies`): Browse and apply to companies
- **Applications** (`/applications`): Track application status with filtering
- **Bookmarks** (`/bookmarks`): Manage saved companies
- **Resume Upload** (`/upload-resume`): Upload and manage resumes

## 🛠️ Tech Stack

### Frontend
- **React 19** with functional components and hooks
- **React Router** for navigation
- **React Icons** for UI icons
- **Axios** for API calls
- **Socket.io-client** for real-time notifications
- **CSS3** with custom styling

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Socket.io** for real-time features
- **JWT** for authentication
- **Cloudinary** for file uploads
- **SendGrid** for email notifications

## 📊 Database Schema

### New Models Created
1. **Application** - Track student applications to companies
2. **Bookmark** - Student bookmarked companies
3. **Activity** - Student activities and actions
4. **Announcement** - System-wide announcements
5. **Notification** - Real-time notifications

### Existing Models Enhanced
- **User** - Student profile information
- **Company** - Company listings and details

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run create-sample-data  # Add sample companies and announcements
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 3. Access the Dashboard
- Register a new student account
- Login with your credentials
- You'll be automatically redirected to `/student/dashboard`

## 📱 Dashboard Features

### Stats Cards
- **Total Companies**: Number of active company listings
- **Applications**: Count of submitted applications
- **Bookmarks**: Number of saved companies
- **Profile Completion**: Percentage of completed profile fields

### Quick Actions
- **Browse Companies**: Navigate to companies listing
- **Upload Resume**: Upload PDF resume
- **View Applications**: Check application status
- **Bookmarked Companies**: Access saved companies

### Real-time Features
- **Notifications**: Real-time updates via Socket.io
- **Activity Feed**: Live tracking of student actions
- **Deadline Alerts**: Upcoming application deadlines

## 🔧 API Endpoints

### Student Routes (`/api/student/`)
- `GET /dashboard/stats` - Get dashboard statistics
- `GET /applications` - Get student applications
- `POST /applications` - Submit new application
- `GET /bookmarks` - Get bookmarked companies
- `POST /bookmarks` - Add bookmark
- `DELETE /bookmarks/:id` - Remove bookmark
- `GET /notifications` - Get notifications
- `PATCH /notifications/:id/read` - Mark notification as read
- `GET /announcements` - Get relevant announcements
- `PUT /profile` - Update student profile
- `POST /upload-resume` - Upload resume file
- `GET /companies` - Get available companies

## 🎨 UI Components

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface elements

### Color Scheme
- Primary: Blue gradient (#667eea to #764ba2)
- Secondary: Light blue (#3b82f6)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Error: Red (#ef4444)

## 🔐 Authentication & Security

- JWT-based authentication
- Protected routes for student dashboard
- Role-based access control (admin vs student)
- Secure file uploads with Cloudinary

## 📊 Sample Data

The system includes sample data for testing:
- **5 Companies**: Google, Microsoft, Amazon, TCS, Infosys
- **3 Announcements**: General and branch-specific announcements
- **Realistic Eligibility Criteria**: CGPA, branch, and batch requirements

## 🚀 Deployment

### Environment Variables Required
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=your_email
FRONTEND_URL=your_frontend_url
```

## 🔄 Future Enhancements

- Resume analyzer with AI feedback
- Interview scheduling system
- Company-specific chat/communication
- Advanced analytics and reporting
- Mobile app development
- Integration with college ERP systems

## 📝 Notes

- The old `UserDashboard.js` has been removed and replaced with the comprehensive `StudentDashboard.js`
- All student routes now redirect to `/student/dashboard`
- Real-time notifications are implemented but require active Socket.io connections
- File uploads are handled through Cloudinary for secure storage

## 🐛 Troubleshooting

1. **Import Errors**: Make sure all dependencies are installed
2. **API Errors**: Check backend server is running and MongoDB is connected
3. **File Upload Issues**: Verify Cloudinary credentials
4. **Real-time Features**: Ensure Socket.io is properly configured

## 📞 Support

For issues or questions, check the browser console and backend logs for detailed error messages. 
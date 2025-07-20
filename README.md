# InternHub

A complete MERN stack platform for managing campus placements, company listings, and applicant tracking.

> **⚠️ Project Status: Under Active Development**  
> This project is currently in development and not yet completed. Features are being actively worked on and may change. Please check the issues and pull requests for current development status.

---

## 🚧 Development Status

- **Current Phase**: Active Development
- **Completion**: ~70% Complete
- **Last Updated**: December 2024
- **Contributors**: Open for contributions

### What's Working:
- ✅ Admin Dashboard with company management
- ✅ User authentication and authorization
- ✅ Company CRUD operations
- ✅ File upload functionality (Cloudinary)
- ✅ Email verification system
- ✅ Student dashboard (basic)

### In Progress:
- 🔄 Real-time notifications
- 🔄 Advanced analytics
- 🔄 Mobile responsiveness improvements
- 🔄 Performance optimizations

### Planned Features:
- 📋 Advanced reporting system
- 📋 Interview scheduling
- 📋 Resume parsing
- 📋 Integration with job boards
- 📋 Advanced search and filtering

---

## 🚀 Features

- **Admin Dashboard**: Manage companies, view analytics, and more.
- **Add Company**: Multi-step form with:
  - Basic info, eligibility, selection rounds, JD PDF upload (Cloudinary), FAQs, and preparation tips.
  - Save as draft, preview, and publish options.
- **Edit Company**: 
  - Edit all company details, update JD, eligibility, selection rounds, deadlines, FAQs, and tips.
  - View and manage drafted, published, and closed companies separately.
  - Publish drafted companies, close published companies, and view applicant list for each company.
- **Company Management Page** (`/admin/companies`):
  - Table view of all companies with columns: Name, Role, Status, Applicant Count, Actions.
  - Search by name or role.
  - Filter by status (Active, Closed, Draft, All).
  - Edit, Delete, and Close actions for each company.
  - Export to CSV/Excel (static for now).
  - Applicant count (static for now, ready for future dynamic update).
- **Cloudinary Integration**: Secure JD PDF uploads and storage.
- **MongoDB Atlas**: All data stored securely in the cloud.
- **JWT Authentication**: Secure admin routes and actions.
- **Modern UI/UX**: Responsive, professional design throughout.

---

## 🛠️ Setup Instructions

### 1. **Clone the Repository**
```sh
git clone https://github.com/yourusername/InternHub.git
cd InternHub
```

### 2. **Backend Setup**
- Go to the backend folder:
  ```sh
  cd backend
  ```
- **Set up environment variables:**
  ```sh
  # Copy the example environment file
  cp ../env.example .env
  ```
- **Edit the `.env` file** with your actual values:
  - Get MongoDB Atlas URI from [MongoDB Cloud](https://cloud.mongodb.com)
  - Get Cloudinary credentials from [Cloudinary Dashboard](https://cloudinary.com)
  - Get SendGrid API key from [SendGrid Settings](https://sendgrid.com)
  - Generate a JWT secret (see `env.example` for instructions)
- Install dependencies:
  ```sh
  npm install
  ```
- Start the backend server:
  ```sh
  node server.js
  ```

### 3. **Frontend Setup**
- Go to the frontend folder:
  ```sh
  cd ../frontend
  ```
- **Set up environment variables** (optional - defaults to localhost):
  ```sh
  # Create .env file if you need to override defaults
  echo "REACT_APP_BACKEND_URL=http://localhost:5000" > .env
  ```
- Install dependencies:
  ```sh
  npm install
  ```
- Start the frontend server:
  ```sh
  npm start
  ```

---

## 🔒 Environment & Security

### Environment Variables
- **Required Variables**: See `env.example` for a complete list of all required environment variables
- **Setup**: Copy `env.example` to `.env` and fill in your actual values
- **Security**: Never commit your `.env` file to version control
- **Gitignore**: `.env` files are already listed in `.gitignore`

### Required Services
1. **MongoDB Atlas**: Free cloud database
2. **Cloudinary**: File upload and storage
3. **SendGrid**: Email delivery service

### Security Features
- ✅ JWT-based authentication
- ✅ Environment variable management
- ✅ No hardcoded secrets in codebase
- ✅ CORS protection
- ✅ Input validation and sanitization

---

## 💾 Backup & Version Control

### Pushing Updates to GitHub
1. **Check for uncommitted changes:**
   ```sh
   git status
   ```
2. **Add and commit your changes:**
   ```sh
   git add .
   git commit -m "Update: Company Management page, UI improvements, bugfixes"
   ```
3. **Pull latest changes from remote (if needed):**
   ```sh
   git pull origin main
   ```
   - Resolve any merge conflicts if prompted, then commit again.
4. **Push your changes to GitHub:**
   ```sh
   git push origin main
   ```

> **Tip:** Always verify that `.env` and other sensitive files are not being tracked by git.

---

## 🤝 Contribution

We welcome contributions! Since this project is under active development, there are many opportunities to help.

### How to Contribute
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Areas Needing Help
- 🐛 Bug fixes and improvements
- 📱 Mobile responsiveness
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 📊 Analytics and reporting features
- 🔔 Real-time notification system

### Known Issues
- Some features may be incomplete or have bugs
- Mobile responsiveness needs improvement
- Real-time notifications are partially implemented
- Performance optimizations needed for large datasets

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 🛠️ Troubleshooting

### Common Issues
1. **Environment Variables**: Make sure all required variables are set in `.env`
2. **MongoDB Connection**: Verify your MongoDB Atlas connection string
3. **Port Conflicts**: Ensure ports 3000 (frontend) and 5000 (backend) are available
4. **CORS Issues**: Check that `FRONTEND_URL` is correctly set in your `.env`

### Getting Help
- Check the `TROUBLESHOOTING.md` file for detailed solutions
- Open an issue on GitHub for bugs or feature requests
- Review the `STUDENT_DASHBOARD_README.md` for student-specific features

---

## 📄 License

[MIT](LICENSE)

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/InternHub/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/InternHub/discussions)
- **Email**: For security issues, please email directly

---

**Note**: This project is actively maintained. Please check the issues and pull requests for the latest updates and known issues. 

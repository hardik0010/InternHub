# InternHub

A complete MERN stack platform for managing campus placements, company listings, and applicant tracking.

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
- Create a `.env` file with the following:
  ```env
  MONGODB_URI=your_mongodb_atlas_uri
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  ```
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
- **Never commit your `.env` file.** All secrets and credentials must be kept out of version control.
- `.env` is already listed in `.gitignore`.
- All sensitive configuration (API keys, secrets, URIs) are managed via environment variables.
- No hardcoded secrets are present in the codebase.

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

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE) 

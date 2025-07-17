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
  - View and manage drafted and published companies separately.
  - Publish drafted companies directly from the dashboard.
  - View applicant list for each company.
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


## 🤝 Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE) 

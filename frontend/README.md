# InternHub

A complete MERN stack platform for managing campus placements, company listings, and applicant tracking.

## Features

- **Admin Dashboard**: Manage companies, view analytics, and more.
- **Add Company**: Multi-step form with:
  - Basic info, eligibility, selection rounds, JD PDF upload (Cloudinary), FAQs, and preparation tips.
  - Save as draft, preview, and publish options.
- **Cloudinary Integration**: Secure JD PDF uploads and storage.
- **MongoDB Atlas**: All data stored securely in the cloud.
- **JWT Authentication**: Secure admin routes and actions.
- **Modern UI/UX**: Responsive, professional design.

## Setup Instructions

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
  ```
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

### 4. **Environment & Security**
- **Never commit your `.env` file.** All secrets and credentials must be kept out of version control.
- Ensure `.env` is listed in `.gitignore`.

## Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)
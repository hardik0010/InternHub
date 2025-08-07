import React from 'react';
import './App.css';
import { FaBuilding, FaUserGraduate, FaChartBar, FaClipboardCheck, FaRegClock, FaSearch, FaCloudUploadAlt, FaUserShield, FaBell, FaBookmark, FaFileAlt, FaUserCircle, FaPlus } from 'react-icons/fa';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AddCompany from './AddCompany';
import EditCompany from './EditCompany'; // (to be created)
import CompanyManagement from './CompanyManagement'; // (to be created)
import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import EmailVerification from './EmailVerification';
import LandingPage from './LandingPage';
import AboutUs from './AboutUs';
import HowItWorks from './HowItWorks';
import SuccessStories from './SuccessStories';
import Contact from './Contact';
import HelpCenter from './HelpCenter';
import Documentation from './Documentation';
import PrivacyPolicy  from './PrivacyPolicy';
import TermsOfService from './TermsConditions';
import ProtectedRoute from './components/ProtectedRoute';


import StudentDashboard from './StudentDashboard';
import Companies from './Companies';
import Applications from './Applications';
import Bookmarks from './Bookmarks';
import ResumeUpload from './ResumeUpload';
import CompanyDetails from './CompanyDetails';
// import PrivacyPolicy from './PrivacyPolicy';

function RequireAdminAuth({ children }) {
  const isAuthenticated = !!localStorage.getItem('admin_token');
  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={
        <RequireAdminAuth>
          <AdminDashboard />
        </RequireAdminAuth>
      } />
      <Route path="/admin/companies/add" element={<AddCompany />} />
      <Route path="/admin/companies/edit" element={
        <RequireAdminAuth>
          <EditCompany selectMode={true} />
        </RequireAdminAuth>
      } />
      <Route path="/admin/companies/edit/:id" element={
        <RequireAdminAuth>
          <EditCompany />
        </RequireAdminAuth>
      } />
      <Route path="/admin/companies" element={
        <RequireAdminAuth>
          <CompanyManagement />
        </RequireAdminAuth>
      } />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email/:token" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/user-dashboard" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="/student/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
      <Route path="/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
      <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
      <Route path="/upload-resume" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
      <Route path="/company/:id" element={<ProtectedRoute><CompanyDetails /></ProtectedRoute>} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/help-center' element={<HelpCenter/>}/>
      <Route path="/documentation" element={<Documentation/>}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
      <Route path="/terms-conditions" element={<TermsOfService/>}/>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;

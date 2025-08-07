import React, { useRef, useState } from 'react';
import { FaUserCircle, FaSignOutAlt, FaEdit, FaCamera, FaEnvelope, FaPhone, FaIdCard, FaGraduationCap, FaCalendarAlt, FaStar, FaLock, FaTrash, FaTimes, FaArrowLeft } from 'react-icons/fa';
import './App.css';

const ProfileMenu = ({ user, onLogout, onEdit, onChangePassword, onProfilePicChange, onClose }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    branch: user?.branch || '',
    batch: user?.batch || '',
    cgpa: user?.cgpa || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [editError, setEditError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const fileInputRef = useRef();

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicPreview(URL.createObjectURL(file));
      onProfilePicChange(file);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEditError('');
    if (!editForm.name || !editForm.phone || !editForm.branch || !editForm.batch || !editForm.cgpa) {
      setEditError('All fields are required.');
      return;
    }
    onEdit(editForm);
    setShowEdit(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    onChangePassword(passwordForm);
    setShowChangePassword(false);
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="profile-menu-dropdown">
      {/* Mobile Back Button */}
      <button
        className="profile-menu-back-btn"
        onClick={onClose}
      >
        <FaArrowLeft/>
      </button>
      <div className="profile-menu-header">
        <div className="profile-pic-wrapper" onClick={handleProfilePicClick} title="Change profile picture">
          {user?.profilePicUrl || profilePicPreview ? (
            <img
              src={profilePicPreview || user.profilePicUrl}
              alt="Profile"
              className="profile-pic"
            />
          ) : (
            <FaUserCircle className="profile-pic-placeholder" />
          )}
          <div className="profile-pic-overlay">
            <FaCamera />
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleProfilePicChange}
          />
        </div>
        <div className="profile-menu-details">
          <h3>{user?.name}</h3>
          <div className="profile-menu-email"><FaEnvelope /> {user?.email}</div>
        </div>
      </div>
      <div className="profile-menu-body">
        <div className="profile-menu-info"><FaPhone /> {user?.phone}</div>
        <div className="profile-menu-info"><FaIdCard /> {user?.collegeId}</div>
        <div className="profile-menu-info"><FaGraduationCap /> {user?.branch} ({user?.batch})</div>
        <div className="profile-menu-info"><FaStar /> CGPA: {user?.cgpa}</div>
        <div className="profile-menu-info"><FaLock /> {user?.isVerified ? 'Verified' : 'Not Verified'}</div>
      </div>
      <div className="profile-menu-actions">
        <button className="btn secondary" onClick={() => setShowEdit(true)}><FaEdit /> Edit Profile</button>
        <button className="btn secondary" onClick={() => setShowChangePassword(true)}><FaLock /> Change Password</button>
        <button className="btn primary" onClick={onLogout}><FaSignOutAlt /> Logout</button>
        {/* Optional: Delete Account */}
        {/* <button className="btn danger" onClick={() => setShowDelete(true)}><FaTrash /> Delete Account</button> */}
      </div>
      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <button className="profile-modal-close" onClick={() => setShowEdit(false)}><FaTimes /></button>
            <h3>Edit Profile</h3>
            {editError && <div className="error-msg">{editError}</div>}
            <form onSubmit={handleEditSubmit} className="profile-edit-form">
              <label>Name
                <input name="name" value={editForm.name} onChange={handleEditChange} required />
              </label>
              <label>Phone
                <input name="phone" value={editForm.phone} onChange={handleEditChange} required />
              </label>
              <label>Branch
                <input name="branch" value={editForm.branch} onChange={handleEditChange} required />
              </label>
              <label>Batch
                <input name="batch" value={editForm.batch} onChange={handleEditChange} required />
              </label>
              <label>CGPA
                <input name="cgpa" value={editForm.cgpa} onChange={handleEditChange} required type="number" min="0" max="10" step="0.01" />
              </label>
              <button className="btn primary" type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <button className="profile-modal-close" onClick={() => setShowChangePassword(false)}><FaTimes /></button>
            <h3>Change Password</h3>
            {passwordError && <div className="error-msg">{passwordError}</div>}
            <form onSubmit={handlePasswordSubmit} className="profile-edit-form">
              <label>Current Password
                <input name="oldPassword" value={passwordForm.oldPassword} onChange={handlePasswordChange} type="password" required />
              </label>
              <label>New Password
                <input name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} type="password" required />
              </label>
              <label>Confirm New Password
                <input name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} type="password" required />
              </label>
              <button className="btn primary" type="submit">Change Password</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu; 
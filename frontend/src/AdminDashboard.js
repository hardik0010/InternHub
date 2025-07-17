import React from 'react';
import './App.css';
import { FaBuilding, FaUserGraduate, FaChartBar, FaClipboardCheck, FaPlus, FaBullhorn, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const analyticsData = [
  { title: 'Total Companies', value: 24, icon: <FaBuilding />, color: '#4f8cff' },
  { title: 'Student Applications', value: 320, icon: <FaUserGraduate />, color: '#22c55e' },
  { title: 'Active Positions', value: 8, icon: <FaCheckCircle />, color: '#2563eb' },
  { title: 'Closed Positions', value: 5, icon: <FaTimesCircle />, color: '#e53e3e' },
];

const applicationStats = [
  { month: 'Jan', applications: 30 },
  { month: 'Feb', applications: 45 },
  { month: 'Mar', applications: 60 },
  { month: 'Apr', applications: 50 },
  { month: 'May', applications: 80 },
  { month: 'Jun', applications: 55 },
];

const domainData = [
  { name: 'Software', value: 120 },
  { name: 'Electronics', value: 60 },
  { name: 'Mechanical', value: 40 },
  { name: 'Civil', value: 25 },
  { name: 'Other', value: 15 },
];
const domainColors = ['#4f8cff', '#22c55e', '#fbbf24', '#e53e3e', '#a78bfa'];

const recentActivity = [
  { time: '2 min ago', action: 'Added new company: TechNova' },
  { time: '10 min ago', action: 'Posted announcement: "Placement drive on 5th June"' },
  { time: '1 hr ago', action: 'Closed position: Web Developer at CodeWorks' },
  { time: '2 hrs ago', action: 'Added new student application' },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [companyCount, setCompanyCount] = React.useState(null);
  const [publishedCount, setPublishedCount] = React.useState(null);
  const [closedCount, setClosedCount] = React.useState(null);
  React.useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    axios.get('/api/companies/count', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCompanyCount(res.data.count))
      .catch(() => setCompanyCount('—'));
    axios.get('/api/companies/count/published', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPublishedCount(res.data.count))
      .catch(() => setPublishedCount('—'));
    axios.get('/api/companies/count/closed', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setClosedCount(res.data.count))
      .catch(() => setClosedCount('—'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin-login';
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="btn secondary" onClick={handleLogout}>Logout</button>
      </header>
      <div className="dashboard-content">
        {/* Analytics Cards */}
        <div className="dashboard-cards-grid">
          <div className="dashboard-card" style={{ borderTop: '4px solid #4f8cff', cursor: 'pointer' }} onClick={() => navigate('/admin/companies')}>
            <div className="dashboard-card-icon" style={{ color: '#4f8cff' }}><FaBuilding /></div>
            <div className="dashboard-card-info">
              <h3>{companyCount === null ? '...' : companyCount}</h3>
              <p>Total Companies</p>
            </div>
          </div>
          <div className="dashboard-card" style={{ borderTop: '4px solid #22c55e' }}>
            <div className="dashboard-card-icon" style={{ color: '#22c55e' }}><FaUserGraduate /></div>
            <div className="dashboard-card-info">
              <h3>320</h3>
              <p>Student Applications</p>
            </div>
          </div>
          <div className="dashboard-card" style={{ borderTop: '4px solid #2563eb', cursor: 'pointer' }} onClick={() => navigate('/admin/companies/edit')}>
            <div className="dashboard-card-icon" style={{ color: '#2563eb' }}><FaCheckCircle /></div>
            <div className="dashboard-card-info">
              <h3>{publishedCount === null ? '...' : publishedCount}</h3>
              <p>Active Positions</p>
            </div>
          </div>
          <div className="dashboard-card" style={{ borderTop: '4px solid #e53e3e', cursor: 'pointer' }} onClick={() => navigate('/admin/companies/edit')}>
            <div className="dashboard-card-icon" style={{ color: '#e53e3e' }}><FaTimesCircle /></div>
            <div className="dashboard-card-info">
              <h3>{closedCount === null ? '...' : closedCount}</h3>
              <p>Closed Positions</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="dashboard-charts-section">
          <div className="dashboard-chart-card">
            <h4>Student Application Analytics</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={applicationStats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#4f8cff" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="dashboard-chart-card">
            <h4>Domain-wise Interest</h4>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={domainData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {domainData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={domainColors[idx % domainColors.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="dashboard-bottom-section">
          <div className="dashboard-activity-feed">
            <h4>Recent Activity</h4>
            <ul>
              {recentActivity.map((item, idx) => (
                <li key={idx}><span className="activity-time">{item.time}</span> {item.action}</li>
              ))}
            </ul>
          </div>
          <div className="dashboard-quick-actions">
            <h4>Quick Actions</h4>
            <button className="btn secondary dashboard-action-btn" onClick={() => navigate('/admin/companies/add')}><FaPlus style={{marginRight:8}}/>Add Company</button>
            <button className="btn secondary dashboard-action-btn" onClick={() => navigate('/admin/companies/edit')}><FaClipboardCheck style={{marginRight:8}}/>Edit Company</button>
            <button className="btn secondary dashboard-action-btn"><FaBullhorn style={{marginRight:8}}/>Post Announcement</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 
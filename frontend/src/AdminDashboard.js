import React from 'react';
import './App.css';
import { FaBuilding, FaUserGraduate, FaChartBar, FaClipboardCheck, FaPlus, FaBullhorn, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';

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
          {analyticsData.map((card, idx) => (
            <div className="dashboard-card" key={idx} style={{ borderTop: `4px solid ${card.color}` }}>
              <div className="dashboard-card-icon" style={{ color: card.color }}>{card.icon}</div>
              <div className="dashboard-card-info">
                <h3>{card.value}</h3>
                <p>{card.title}</p>
              </div>
            </div>
          ))}
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
            <button className="btn secondary dashboard-action-btn"><FaBullhorn style={{marginRight:8}}/>Post Announcement</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 
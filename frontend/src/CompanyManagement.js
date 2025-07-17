import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCompany.css';

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Active' },
  { value: 'closed', label: 'Closed' },
  { value: 'draft', label: 'Draft' },
];

function CompanyManagement() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [success, setSuccess] = useState('');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchCompanies = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/companies', {
        headers: getAuthHeaders(),
        params: { search, status },
      });
      setCompanies(res.data);
    } catch (err) {
      setError('Failed to load companies');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line
  }, [search, status]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;
    setSuccess('');
    setError('');
    try {
      await axios.delete(`/api/companies/${id}`, { headers: getAuthHeaders() });
      setSuccess('Company deleted!');
      fetchCompanies();
    } catch (err) {
      setError('Failed to delete company');
    }
  };

  const handleClose = async (id) => {
    if (!window.confirm('Are you sure you want to close this company?')) return;
    setSuccess('');
    setError('');
    try {
      await axios.put(`/api/companies/${id}/close`, {}, { headers: getAuthHeaders() });
      setSuccess('Company closed!');
      fetchCompanies();
    } catch (err) {
      setError('Failed to close company');
    }
  };

  return (
    <div className="add-company-container" style={{maxWidth:'1200px', minWidth:'1000px', width:'100%'}}>
      <button className="btn secondary" style={{alignSelf:'flex-start',marginBottom:8}} onClick={() => navigate('/admin-dashboard')}>
        ← Back to Admin Dashboard
      </button>
      <h2>Company Management</h2>
      <div style={{display:'flex',gap:16,marginBottom:16,flexWrap:'wrap'}}>
        <input
          type="text"
          placeholder="Search by name or role..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{flex:'1 1 200px',minWidth:180}}
        />
        <select value={status} onChange={e => setStatus(e.target.value)} style={{padding:'10px 12px',borderRadius:6}}>
          {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <button className="btn secondary" style={{marginLeft:'auto'}} onClick={() => alert('Export to CSV/Excel coming soon!')}>Export to CSV/Excel</button>
      </div>
      {error && <div className="add-company-error">{error}</div>}
      {success && <div className="add-company-success">{success}</div>}
      <div>
        <table style={{width:'100%',minWidth:'900px',borderCollapse:'collapse',background:'#fff',borderRadius:8,boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          <thead>
            <tr style={{background:'#f3f6fa'}}>
              <th style={{padding:'12px'}}>Name</th>
              <th style={{padding:'12px'}}>Role</th>
              <th style={{padding:'12px'}}>Status</th>
              <th style={{padding:'12px'}}>Applicant Count</th>
              <th style={{padding:'12px'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{textAlign:'center',padding:24}}>Loading...</td></tr>
            ) : companies.length === 0 ? (
              <tr><td colSpan={5} style={{textAlign:'center',padding:24}}>No companies found.</td></tr>
            ) : companies.map(c => (
              <tr key={c._id} style={{borderBottom:'1px solid #f3f6fa'}}>
                <td style={{padding:'12px'}}>{c.name}</td>
                <td style={{padding:'12px'}}>{c.role}</td>
                <td style={{padding:'12px',textTransform:'capitalize'}}>{c.status}</td>
                <td style={{padding:'12px'}}>{c.applicantCount}</td>
                <td style={{padding:'12px'}}>
                  <div style={{display:'flex',gap:8,flexWrap:'nowrap',whiteSpace:'nowrap',minWidth:220}}>
                    <button className="btn secondary" onClick={() => navigate(`/admin/companies/edit/${c._id}`)}>Edit</button>
                    <button className="btn secondary remove-btn" onClick={() => handleDelete(c._id)}>Delete</button>
                    {c.status === 'published' && (
                      <button className="btn secondary" style={{background:'#f8d7da',color:'#b71c1c'}} onClick={() => handleClose(c._id)}>Close</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyManagement; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddCompany.css';

function EditCompany({ selectMode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(null);
  const [jdPreview, setJdPreview] = useState(null);
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [showApplicants, setShowApplicants] = useState(false);

  // Helper to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Company selection mode
  useEffect(() => {
    if (selectMode) {
      setLoading(true);
      axios.get('/api/companies', { headers: getAuthHeaders() })
        .then(res => setCompanies(res.data))
        .catch(err => setError('Failed to load companies'))
        .finally(() => setLoading(false));
    }
  }, [selectMode]);

  // Fetch company details for editing
  useEffect(() => {
    if (!selectMode && id) {
      setLoading(true);
      axios.get(`/api/companies/${id}`, { headers: getAuthHeaders() })
        .then(res => {
          setForm(res.data);
          setJdPreview(res.data.jdUrl ? res.data.jdUrl.split('/').pop() : null);
        })
        .catch(err => setError('Failed to load company details'))
        .finally(() => setLoading(false));
    }
  }, [selectMode, id]);

  // Fetch applicants
  const fetchApplicants = () => {
    setShowApplicants(true);
    setLoading(true);
    axios.get(`/api/companies/${id}/applicants`, { headers: getAuthHeaders() })
      .then(res => setApplicants(res.data))
      .catch(() => setError('Failed to load applicants'))
      .finally(() => setLoading(false));
  };

  // Handle JD upload
  const handleJdChange = (e) => {
    const file = e.target.files[0];
    setForm(f => ({ ...f, jd: file }));
    setJdPreview(file ? file.name : null);
  };

  // Handle form field changes
  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  // Handle eligibility/selectionRounds changes
  const handleNestedChange = (parent, field, value) => {
    setForm(f => ({ ...f, [parent]: { ...f[parent], [field]: value } }));
  };

  // Save changes
  const handleSave = async (publish = false) => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'applicantList') return; // Do not send applicantList to backend
        if (key === 'status') return; // We'll handle status separately
        if (key === 'jd' && value instanceof File) data.append('jd', value);
        else if (typeof value === 'object' && value !== null && !Array.isArray(value)) data.append(key, JSON.stringify(value));
        else if (Array.isArray(value)) data.append(key, JSON.stringify(value));
        else data.append(key, value);
      });
      data.append('status', publish ? 'published' : 'draft');
      await axios.put(`/api/companies/${id}`, data, { headers: { ...getAuthHeaders() } });
      setSuccess(publish ? 'Company published!' : 'Changes saved!');
      if (publish) setTimeout(() => navigate('/admin-dashboard'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to save changes');
    }
    setSaving(false);
  };

  // UI: Company selection
  if (selectMode) {
    const published = companies.filter(c => c.status === 'published');
    const drafts = companies.filter(c => c.status === 'draft');
    const closed = companies.filter(c => c.status === 'closed');
    return (
      <div className="add-company-container">
        <button className="btn secondary" style={{alignSelf:'flex-start',marginBottom:8}} onClick={() => navigate('/admin-dashboard')}>
          ← Back to Admin Dashboard
        </button>
        <h2>Select Company to Edit</h2>
        {error && <div className="add-company-error">{error}</div>}
        <div style={{marginBottom:24}}>
          <h3 style={{marginBottom:12}}>Published Companies</h3>
          {published.length === 0 && <div style={{color:'#888',marginBottom:12}}>No published companies.</div>}
          <ul style={{listStyle:'none',padding:0}}>
            {published.map(c => (
              <li key={c._id} style={{marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f3f6fa',padding:'12px 16px',borderRadius:8}}>
                <span><b>{c.name}</b> <span style={{color:'#888',fontSize:'0.95em'}}>({c.role})</span></span>
                <button className="btn" onClick={() => navigate(`/admin/companies/edit/${c._id}`)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{marginBottom:24}}>
          <h3 style={{marginBottom:12}}>Drafted Companies</h3>
          {drafts.length === 0 && <div style={{color:'#888',marginBottom:12}}>No drafted companies.</div>}
          <ul style={{listStyle:'none',padding:0}}>
            {drafts.map(c => (
              <li key={c._id} style={{marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-between',background:'#fffbe6',padding:'12px 16px',borderRadius:8}}>
                <span><b>{c.name}</b> <span style={{color:'#888',fontSize:'0.95em'}}>({c.role})</span></span>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn" onClick={() => navigate(`/admin/companies/edit/${c._id}`)}>Edit</button>
                  <button className="btn secondary" onClick={async () => {
                    try {
                      await axios.put(`/api/companies/${c._id}/publish`, {}, { headers: getAuthHeaders() });
                      setCompanies(prev => prev.map(comp => comp._id === c._id ? { ...comp, status: 'published' } : comp));
                    } catch (err) {
                      setError('Failed to publish company');
                    }
                  }}>Publish</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{marginBottom:12}}>Closed Companies</h3>
          {closed.length === 0 && <div style={{color:'#888',marginBottom:12}}>No closed companies.</div>}
          <ul style={{listStyle:'none',padding:0}}>
            {closed.map(c => (
              <li key={c._id} style={{marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f8d7da',padding:'12px 16px',borderRadius:8}}>
                <span><b>{c.name}</b> <span style={{color:'#888',fontSize:'0.95em'}}>({c.role})</span></span>
                <button className="btn" onClick={() => navigate(`/admin/companies/edit/${c._id}`)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // UI: Edit form
  if (loading || !form) return <div className="add-company-container">Loading...</div>;

  return (
    <div className="add-company-container">
      <button className="btn secondary" style={{alignSelf:'flex-start',marginBottom:8}} onClick={() => navigate('/admin/companies/edit')}>
        ← Back to Company List
      </button>
      <h2>Edit Company</h2>
      {error && <div className="add-company-error">{error}</div>}
      {success && <div className="add-company-success">{success}</div>}
      <form className="add-company-form" onSubmit={e => { e.preventDefault(); handleSave(); }}>
        <label>Company Name*</label>
        <input name="name" value={form.name} onChange={e => handleChange('name', e.target.value)} />
        <label>Role*</label>
        <input name="role" value={form.role} onChange={e => handleChange('role', e.target.value)} />
        <label>Description*</label>
        <textarea name="description" value={form.description} onChange={e => handleChange('description', e.target.value)} />
        <label>Visit Date*</label>
        <input name="visitDate" type="date" value={form.visitDate ? form.visitDate.slice(0,10) : ''} onChange={e => handleChange('visitDate', e.target.value)} />
        <label>Apply Link</label>
        <input name="applyLink" value={form.applyLink} onChange={e => handleChange('applyLink', e.target.value)} />
        <label>CGPA</label>
        <input name="cgpa" value={form.eligibility?.cgpa || ''} onChange={e => handleNestedChange('eligibility', 'cgpa', e.target.value)} />
        <label>Branch (comma separated)</label>
        <input name="branch" value={form.eligibility?.branch?.join(',') || ''} onChange={e => handleNestedChange('eligibility', 'branch', e.target.value.split(','))} />
        <label>Batch (comma separated)</label>
        <input name="batch" value={form.eligibility?.batch?.join(',') || ''} onChange={e => handleNestedChange('eligibility', 'batch', e.target.value.split(','))} />
        <label>Skills (comma separated)</label>
        <input name="skills" value={form.eligibility?.skills?.join(',') || ''} onChange={e => handleNestedChange('eligibility', 'skills', e.target.value.split(','))} />
        <label>Selection Rounds</label>
        <input name="selectionRounds" value={form.selectionRounds?.join(',') || ''} onChange={e => handleChange('selectionRounds', e.target.value.split(','))} />
        <label>JD Upload (PDF)</label>
        <input type="file" accept="application/pdf" onChange={handleJdChange} />
        {jdPreview && <div>Current/Selected JD: {jdPreview}</div>}
        <label>FAQs</label>
        {(form.faqs || []).map((faq, idx) => (
          <div className="faq-tip-row" key={idx} style={{marginBottom:8}}>
            <input placeholder="Question" value={faq.question} onChange={e => {
              const faqs = [...form.faqs];
              faqs[idx].question = e.target.value;
              setForm(f => ({ ...f, faqs }));
            }} />
            <input placeholder="Answer" value={faq.answer} onChange={e => {
              const faqs = [...form.faqs];
              faqs[idx].answer = e.target.value;
              setForm(f => ({ ...f, faqs }));
            }} />
            <button type="button" className="btn secondary remove-btn" onClick={() => {
              const faqs = form.faqs.filter((_, i) => i !== idx);
              setForm(f => ({ ...f, faqs }));
            }}>Remove</button>
          </div>
        ))}
        <button type="button" className="btn secondary add-btn" style={{marginBottom:16}} onClick={() => setForm(f => ({ ...f, faqs: [...(f.faqs||[]), { question: '', answer: '' }] }))}>Add FAQ</button>
        <label style={{ marginTop: 16 }}>Preparation Tips</label>
        {(form.prepTips || []).map((tip, idx) => (
          <div className="faq-tip-row" key={idx} style={{marginBottom:8}}>
            <input placeholder="Preparation Tip" value={tip} onChange={e => {
              const prepTips = [...form.prepTips];
              prepTips[idx] = e.target.value;
              setForm(f => ({ ...f, prepTips }));
            }} />
            <button type="button" className="btn secondary remove-btn" onClick={() => {
              const prepTips = form.prepTips.filter((_, i) => i !== idx);
              setForm(f => ({ ...f, prepTips }));
            }}>Remove</button>
          </div>
        ))}
        <button type="button" className="btn secondary add-btn" onClick={() => setForm(f => ({ ...f, prepTips: [...(f.prepTips||[]), ''] }))}>Add Tip</button>
        <div className="add-company-btn-row">
          <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
          <button type="button" className="btn secondary" onClick={() => handleSave(true)} disabled={saving}>Publish</button>
          {form.status === 'published' && (
            <button type="button" className="btn secondary" style={{background:'#f8d7da',color:'#b71c1c'}} onClick={async () => {
              setSaving(true);
              setError('');
              setSuccess('');
              try {
                await axios.put(`/api/companies/${form._id}/close`, {}, { headers: getAuthHeaders() });
                setForm(f => ({ ...f, status: 'closed' }));
                setSuccess('Company closed!');
              } catch (err) {
                setError('Failed to close company');
              }
              setSaving(false);
            }}>Close Company</button>
          )}
          <button type="button" className="btn secondary" onClick={fetchApplicants}>View Applicants</button>
        </div>
      </form>
      {/* Applicant List Modal */}
      {showApplicants && (
        <div className="add-company-modal-overlay" onClick={() => setShowApplicants(false)}>
          <div className="add-company-modal" onClick={e => e.stopPropagation()}>
            <h3>Applicant List</h3>
            {loading ? <div>Loading...</div> : (
              <ul style={{listStyle:'none',padding:0}}>
                {applicants.length === 0 && <li>No applicants yet.</li>}
                {applicants.map(a => (
                  <li key={a._id} style={{marginBottom:8}}>
                    <b>{a.username}</b> <span style={{color:'#888',fontSize:'0.95em'}}>&#40;{a.role}&#41;</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="add-company-btn-row">
              <button className="btn secondary" onClick={() => setShowApplicants(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCompany; 
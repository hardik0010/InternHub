import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const steps = [
  'Basic Info',
  'Eligibility Criteria',
  'Selection Rounds',
  'JD Upload',
  'FAQs & Prep Tips',
];

const initialState = {
  name: '',
  role: '',
  description: '',
  visitDate: '',
  applyLink: '',
  eligibility: { cgpa: '', branch: [], batch: [], skills: [] },
  selectionRounds: [],
  jd: null,
  faqs: [{ question: '', answer: '' }],
  prepTips: [''],
};

function AddCompany() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialState);
  const [jdPreview, setJdPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [preview, setPreview] = useState(false);
  const [showConfirm, setShowConfirm] = useState({ publish: false, draft: false });
  const [fileUploading, setFileUploading] = useState(false);
  const navigate = useNavigate();

  // Helper to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Validation logic for each step
  const validateStep = () => {
    switch (step) {
      case 0:
        if (!form.name.trim() || !form.role.trim() || !form.description.trim() || !form.visitDate.trim()) {
          setError('Please fill all required fields in Basic Info.');
          return false;
        }
        break;
      case 1:
        if (!form.eligibility.cgpa || isNaN(form.eligibility.cgpa)) {
          setError('Please enter a valid CGPA.');
          return false;
        }
        break;
      case 2:
        if (!form.selectionRounds.length || !form.selectionRounds[0].trim()) {
          setError('Please enter at least one selection round.');
          return false;
        }
        break;
      case 3:
        if (!form.jd) {
          setError('Please upload a JD PDF.');
          return false;
        }
        break;
      default:
        break;
    }
    setError('');
    return true;
  };

  // Step navigation
  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  // JD upload
  const handleJdChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, jd: file }));
    setJdPreview(file ? file.name : null);
  };

  // Save as draft
  const saveAsDraft = async () => {
    setShowConfirm({ ...showConfirm, draft: false });
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'jd' && value) data.append('jd', value);
        else if (typeof value === 'object') data.append(key, JSON.stringify(value));
        else data.append(key, value);
      });
      data.append('status', 'draft');
      await axios.post('/api/companies', data, { headers: { ...getAuthHeaders() } });
      setSuccess('Draft saved!');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to save draft');
    }
    setSaving(false);
  };

  // Submit (publish)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirm({ ...showConfirm, publish: false });
    if (!validateStep()) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'jd' && value) data.append('jd', value);
        else if (typeof value === 'object') data.append(key, JSON.stringify(value));
        else data.append(key, value);
      });
      data.append('status', 'published');
      await axios.post('/api/companies', data, { headers: { ...getAuthHeaders() } });
      setSuccess('Company published!');
      setTimeout(() => navigate('/admin-dashboard'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to publish company');
    }
    setSaving(false);
  };

  // Preview
  const handlePreview = () => setPreview(true);
  const closePreview = () => setPreview(false);

  // Stepper/progress indicator
  const renderStepper = () => (
    <div className="add-company-stepper">
      {steps.map((label, idx) => (
        <div
          key={label}
          className={`add-company-step${idx === step ? ' active' : ''}`}
          onClick={() => idx <= step ? setStep(idx) : null}
          style={{ cursor: idx <= step ? 'pointer' : 'default' }}
        >
          {label}
        </div>
      ))}
    </div>
  );

  // Render step content (with labels, spacing, and grouping)
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <label>Company Name<span style={{ color: 'red' }}>*</span></label>
            <input name="name" placeholder="Company Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <label>Role<span style={{ color: 'red' }}>*</span></label>
            <input name="role" placeholder="Role" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
            <label>Description<span style={{ color: 'red' }}>*</span></label>
            <textarea name="description" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <label>Visit Date<span style={{ color: 'red' }}>*</span></label>
            <input name="visitDate" type="date" value={form.visitDate} onChange={e => setForm(f => ({ ...f, visitDate: e.target.value }))} />
            <label>Apply Link</label>
            <input name="applyLink" placeholder="Apply Link" value={form.applyLink} onChange={e => setForm(f => ({ ...f, applyLink: e.target.value }))} />
          </div>
        );
      case 1:
        return (
          <div>
            <label>CGPA<span style={{ color: 'red' }}>*</span></label>
            <input name="cgpa" placeholder="CGPA" value={form.eligibility.cgpa} onChange={e => setForm(f => ({ ...f, eligibility: { ...f.eligibility, cgpa: e.target.value } }))} />
            <label>Branch (comma separated)</label>
            <input name="branch" placeholder="Branch" value={form.eligibility.branch.join(',')} onChange={e => setForm(f => ({ ...f, eligibility: { ...f.eligibility, branch: e.target.value.split(',') } }))} />
            <label>Batch (comma separated)</label>
            <input name="batch" placeholder="Batch" value={form.eligibility.batch.join(',')} onChange={e => setForm(f => ({ ...f, eligibility: { ...f.eligibility, batch: e.target.value.split(',') } }))} />
            <label>Skills (comma separated)</label>
            <input name="skills" placeholder="Skills" value={form.eligibility.skills.join(',')} onChange={e => setForm(f => ({ ...f, eligibility: { ...f.eligibility, skills: e.target.value.split(',') } }))} />
          </div>
        );
      case 2:
        return (
          <div>
            <label>Selection Rounds<span style={{ color: 'red' }}>*</span></label>
            <input name="selectionRounds" placeholder="Rounds (comma separated)" value={form.selectionRounds.join(',')} onChange={e => setForm(f => ({ ...f, selectionRounds: e.target.value.split(',') }))} />
          </div>
        );
      case 3:
        return (
          <div>
            <label>JD Upload (PDF)<span style={{ color: 'red' }}>*</span></label>
            <input type="file" accept="application/pdf" onChange={handleJdChange} />
            {jdPreview && <div>Selected: {jdPreview}</div>}
          </div>
        );
      case 4:
        return (
          <div style={{paddingBottom: 16}}>
            <label>FAQs</label>
            {form.faqs.map((faq, idx) => (
              <div className="faq-tip-row" key={idx} style={{marginBottom: 8}}>
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
            <button type="button" className="btn secondary add-btn" style={{marginBottom: 16}} onClick={() => setForm(f => ({ ...f, faqs: [...f.faqs, { question: '', answer: '' }] }))}>Add FAQ</button>
            <label style={{ marginTop: 16 }}>Preparation Tips</label>
            {form.prepTips.map((tip, idx) => (
              <div className="faq-tip-row" key={idx} style={{marginBottom: 8}}>
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
            <button type="button" className="btn secondary add-btn" onClick={() => setForm(f => ({ ...f, prepTips: [...f.prepTips, ''] }))}>Add Tip</button>
          </div>
        );
      default:
        return null;
    }
  };

  // Preview modal (simple)
  const renderPreview = () => (
    <div className="add-company-preview-modal">
      <div className="add-company-preview-content">
        <h2>Preview</h2>
        <pre>{JSON.stringify(form, null, 2)}</pre>
        <button onClick={closePreview}>Close Preview</button>
      </div>
    </div>
  );

  // Confirmation dialog
  const renderConfirmDialog = (type) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 8, minWidth: 300 }}>
        <h3>Are you sure you want to {type === 'publish' ? 'publish' : 'save as draft'}?</h3>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={() => setShowConfirm({ ...showConfirm, [type]: false })}>Cancel</button>
          <button onClick={type === 'publish' ? handleSubmit : saveAsDraft} disabled={saving} style={{ background: '#007bff', color: '#fff' }}>{type === 'publish' ? 'Publish' : 'Save as Draft'}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="add-company-container">
      <h2>Add New Company</h2>
      {renderStepper()}
      <form className="add-company-form" onSubmit={e => { e.preventDefault(); setShowConfirm({ ...showConfirm, publish: true }); }}>
        {renderStep()}
        <div className="form-actions">
          {step > 0 && <button type="button" className="btn secondary" onClick={prevStep} disabled={saving || fileUploading}>Back</button>}
          {step < steps.length - 1 && <button type="button" className="btn primary" onClick={nextStep} disabled={saving || fileUploading}>Next</button>}
          {step === steps.length - 1 && <button type="submit" className="btn primary" disabled={saving || fileUploading}>{saving ? 'Publishing...' : 'Publish'}</button>}
          <button type="button" className="btn secondary" onClick={() => setShowConfirm({ ...showConfirm, draft: true })} disabled={saving || fileUploading}>{saving ? 'Saving...' : 'Save as Draft'}</button>
          <button type="button" className="btn secondary" onClick={handlePreview}>Preview</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        {(saving || fileUploading) && <div style={{marginTop:10, color:'#2563eb'}}>Please wait...</div>}
      </form>
      {preview && renderPreview()}
      {showConfirm.publish && renderConfirmDialog('publish')}
      {showConfirm.draft && renderConfirmDialog('draft')}
    </div>
  );
}

export default AddCompany; 
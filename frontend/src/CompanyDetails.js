import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import './CompanyDetails.css';

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('user_token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get(`/api/companies/${id}`);
        setCompany(res.data);
      } catch (err) {
        setError('Failed to load company details');
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) return <div className="auth-container"><h2>Loading...</h2></div>;
  if (error) return <div className="auth-container"><h2>{error}</h2></div>;
  if (!company) return null;

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <button className="btn btn-outline back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> 
          </button>
          <div className="company-header-info">
            <h1 className="company-name">{company.name}</h1>
            <p className="company-role">{company.role}</p>
          </div>
        </div>
      </header>

      <main className="company-details-main">
        <div className="company-details-card">
          <h2 className="card-title">{company.role}</h2>
          <div className="detail-item">
            <b>Visit Date:</b>
            <span>{company.visitDate ? new Date(company.visitDate).toLocaleDateString() : 'N/A'}</span>
          </div>        
          <div className="detail-item">
            <b>Description:</b>
            <span>{company.description || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <b>Eligibility:</b>
            <div className="eligibility-details">
              {company.eligibility ? (
                Object.entries(company.eligibility).map(([key, value]) => (
                  <div key={key} className="eligibility-item">
                    <b>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</b>
                    <span>
                      {Array.isArray(value)
                        ? value.join(', ')
                        : typeof value === 'object'
                        ? JSON.stringify(value)
                        : value}</span>
                  </div>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
          <div className="detail-item">
            <b>Selection Rounds:</b>
            <span>{company.selectionRounds && company.selectionRounds.length > 0 ? company.selectionRounds.join(', ') : 'N/A'}</span>
          </div>
          <div className="detail-item">
            <b>FAQs:</b>
            <div className="faqs-list">
              {company.faqs && company.faqs.length > 0 ? (
                company.faqs.map((faq, index) => (
                  <div key={faq._id || index} className="faq-item">
                    <p className="faq-question"><strong>Q{index + 1}. {faq.question}</strong></p>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
          <div className="detail-item">
            <b>Preparation Tips:</b>
            <span>{company.prepTips && company.prepTips.length > 0 ? company.prepTips.join(', ') : 'N/A'}</span>
          </div>
          {company.jdUrl && (
            <button
              className="btn btn-primary download-btn"
              onClick={async () => {
                try {
                  const res = await axios.get(company.jdUrl, { responseType: 'blob' });
                  const blob = new Blob([res.data], { type: 'application/pdf' });
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', `${company.name?.replace(/\s+/g, '_') || 'JD'}.pdf`);
                  document.body.appendChild(link);
                  link.click();
                  link.parentNode.removeChild(link);
                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  alert('Failed to download JD');
                }
              }}
            >
              <FaDownload style={{ marginRight: 8 }} /> Download JD
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default CompanyDetails;
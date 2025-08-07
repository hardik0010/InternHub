import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import './App.css';

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
          <button className="btn secondary back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h1>{company.name}</h1>
          <p>{company.role}</p>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="company-details-card">
          <h2>{company.role}</h2>
          <p><b>Visit Date:</b> {company.visitDate ? new Date(company.visitDate).toLocaleDateString() : 'N/A'}</p>
          <p><b>CGPA:</b> {company.cgpa || 'N/A'}</p>
          <p><b>Branches:</b> {company.branches ? company.branches.join(', ') : 'N/A'}</p>
          <p><b>Description:</b> {company.description || 'N/A'}</p>
          <p><b>Eligibility:</b> {company.eligibility ? JSON.stringify(company.eligibility) : 'N/A'}</p>
          <p><b>Selection Rounds:</b> {company.selectionRounds ? company.selectionRounds.join(', ') : 'N/A'}</p>
          <p><b>FAQs:</b> {company.faqs ? company.faqs.join(', ') : 'N/A'}</p>
          <p><b>Preparation Tips:</b> {company.prepTips ? company.prepTips.join(', ') : 'N/A'}</p>
          {company.jdUrl && (
            <a href={company.jdUrl} target="_blank" rel="noopener noreferrer" className="btn primary" style={{marginTop: '1rem', display: 'inline-flex', alignItems: 'center'}}>
              <FaDownload style={{marginRight: 8}} /> Download JD
            </a>
          )}
        </div>
      </main>
    </div>
  );
};

export default CompanyDetails; 
import React, { useState } from 'react';
import { useFoodShare } from '../context/FoodShareContext';

const NgoDashboard = () => {
  const { ngos, donations, currentUser, submitNgoDocs, openAuthForRole } = useFoodShare();

  const [selectedFile, setSelectedFile] = useState(null);
  const [docUploadMsg, setDocUploadMsg] = useState('');

  if (currentUser.role !== 'ngo') {
    return (
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '540px' }}>
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: '#0f172a' }}>NGO Portal</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Sign in to claim food listings and submit the required documents.
            </p>
            <button onClick={() => openAuthForRole('ngo', 'login')} className="btn-amber" style={{ width: '100%', justifyContent: 'center' }}>
              Sign In / Register NGO
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentNgoData = ngos.find(n => n.id === currentUser.id) || ngos[0];
  const myClaimedDonations = donations.filter(d => d.claimedByNgoId === currentUser.id || d.claimedByNgoName === currentUser.name);

  const handleDocSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    submitNgoDocs(currentNgoData.id, [selectedFile]);
    setDocUploadMsg(`File "${selectedFile.name}" submitted successfully.`);
    setSelectedFile(null);
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', marginBottom: '0.25rem', color: '#0f172a' }}>{currentUser.name || 'NGO Dashboard'}</h1>
              <p style={{ color: '#475569', fontSize: '0.95rem' }}>Review your claims and keep your documents up to date.</p>
            </div>
            <span className={`badge badge-${currentNgoData.verificationStatus.toLowerCase()}`}>{currentNgoData.verificationStatus} NGO</span>
          </div>
        </div>

        {currentNgoData.verificationStatus !== 'Verified' && (
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: '#0f172a' }}>Verification Documents</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Upload your documents for review.</p>
            {docUploadMsg && <div style={{ padding: '0.75rem 1rem', background: '#dcfce7', color: '#15803d', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 600 }}>{docUploadMsg}</div>}
            <form onSubmit={handleDocSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <input type="file" id="doc-upload-field" style={{ display: 'none' }} onChange={e => setSelectedFile(e.target.files[0])} />
              <label htmlFor="doc-upload-field" className="btn-secondary" style={{ cursor: 'pointer' }}>Choose File</label>
              <button type="submit" disabled={!selectedFile} className="btn-amber">Upload</button>
            </form>
          </div>
        )}

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a' }}>Your Claims</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Food Item</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Restaurant</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Pickup</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {myClaimedDonations.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No active claims yet.</td>
                  </tr>
                ) : (
                  myClaimedDonations.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem' }}>
                        <strong style={{ color: '#0f172a', display: 'block' }}>{item.foodTitle}</strong>
                        <span style={{ color: '#059669', fontSize: '0.8rem', fontWeight: 600 }}>{item.quantityKg} kg • {item.servings} Servings</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong style={{ color: '#0f172a', display: 'block' }}>{item.restaurantName}</strong>
                        <span style={{ color: '#64748b', fontSize: '0.78rem' }}>{item.restaurantPhone}</span>
                      </td>
                      <td style={{ padding: '1rem', color: '#475569', fontSize: '0.85rem' }}>{item.pickupAddress}</td>
                      <td style={{ padding: '1rem' }}><span className={`badge badge-${item.status.toLowerCase().replace(' ', '')}`}>{item.status}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoDashboard;

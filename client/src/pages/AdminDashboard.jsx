import React, { useState } from 'react';
import { useFoodShare } from '../context/FoodShareContext';
import { ShieldCheck, CheckCircle, XCircle, FileText, Eye, Lock, Search, ExternalLink } from 'lucide-react';

const AdminDashboard = () => {
  const { ngos, approveNgo, rejectNgo, analytics, currentUser, openAuthForRole } = useFoodShare();

  const [tabFilter, setTabFilter] = useState('Pending');
  const [selectedNgoForDocView, setSelectedNgoForDocView] = useState(null);
  const [rejectModalNgo, setRejectModalNgo] = useState(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Auth Gate check for Admin role
  if (currentUser.role !== 'admin') {
    return (
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '540px' }}>
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <Lock size={48} color="#2563eb" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: '#0f172a' }}>Admin Portal Gate</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Please log in as a System Admin Officer to inspect NGO tax documents, verify authentic Jaipur organizations, and approve/reject accounts.
            </p>
            <button
              onClick={() => openAuthForRole('admin', 'login')}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', background: '#2563eb' }}
            >
              Sign In as Admin Officer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredNgos = ngos.filter(ngo => {
    const matchesTab = tabFilter === 'All' || ngo.verificationStatus === tabFilter;
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ngo.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ngo.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (rejectModalNgo) {
      rejectNgo(rejectModalNgo.id, rejectionReasonInput);
      setRejectModalNgo(null);
      setRejectionReasonInput('');
    }
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', background: '#dbeafe', borderColor: '#bfdbfe' }}>
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span className="badge badge-completed">
                  <ShieldCheck size={13} /> Admin Verification Portal
                </span>
                <span style={{ fontSize: '0.85rem', color: '#1e3a8a', fontWeight: 600 }}>Jaipur Region</span>
              </div>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.2rem', color: '#0f172a' }}>
                NGO Credential & Document Audit
              </h1>
              <p style={{ color: '#1e3a8a', fontSize: '0.9rem' }}>
                Inspect uploaded 80G tax certificates and government IDs to verify authentic NGOs in Jaipur.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: '#ffffff', padding: '0.65rem 1.2rem', borderRadius: '12px', border: '1px solid #bfdbfe', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#d97706' }}>{analytics.pendingNgoCount}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Pending Reviews</div>
              </div>

              <div style={{ background: '#ffffff', padding: '0.65rem 1.2rem', borderRadius: '12px', border: '1px solid #bfdbfe', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>{analytics.verifiedNgoCount}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Verified Jaipur NGOs</div>
              </div>
            </div>
          </div>
        </div>

        {/* NGO Verification Table */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.2rem', color: '#0f172a' }}>Registered NGO Verification Roster</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Review details and uploaded PDF documents</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search NGO or Reg No..."
                  className="form-input"
                  style={{ paddingLeft: '2.3rem', width: '200px', fontSize: '0.85rem' }}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.3rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '8px' }}>
                {['Pending', 'Verified', 'Rejected', 'All'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setTabFilter(tab)}
                    style={{
                      background: tabFilter === tab ? '#2563eb' : 'transparent',
                      color: tabFilter === tab ? '#ffffff' : '#64748b',
                      border: 'none',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {tab} {tab === 'Pending' && analytics.pendingNgoCount > 0 && `(${analytics.pendingNgoCount})`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>NGO Name & Contact</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Govt / 80G Reg No</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Jaipur Address</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Uploaded Documents</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Admin Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNgos.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                      No NGOs found under status filter "{tabFilter}".
                    </td>
                  </tr>
                ) : (
                  filteredNgos.map(ngo => (
                    <tr key={ngo.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem' }}>
                        <strong style={{ color: '#0f172a', display: 'block' }}>{ngo.name}</strong>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{ngo.email} • {ngo.phone}</span>
                      </td>

                      <td style={{ padding: '1rem', color: '#2563eb', fontWeight: 600, fontSize: '0.85rem' }}>
                        {ngo.regNumber}
                      </td>

                      <td style={{ padding: '1rem', color: '#475569', fontSize: '0.85rem' }}>
                        {ngo.address}
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => setSelectedNgoForDocView(ngo)}
                          className="btn-secondary btn-sm"
                          style={{ fontSize: '0.8rem' }}
                        >
                          <Eye size={14} color="#059669" /> View Docs ({ngo.submittedDocuments?.length || 0})
                        </button>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <span className={`badge badge-${ngo.verificationStatus.toLowerCase()}`}>
                          {ngo.verificationStatus}
                        </span>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {ngo.verificationStatus !== 'Verified' && (
                            <button
                              onClick={() => approveNgo(ngo.id)}
                              className="btn-primary btn-sm"
                              style={{ padding: '0.35rem 0.7rem' }}
                            >
                              <CheckCircle size={14} /> Approve
                            </button>
                          )}

                          {ngo.verificationStatus !== 'Rejected' && (
                            <button
                              onClick={() => {
                                setRejectModalNgo(ngo);
                                setRejectionReasonInput('Uploaded document requires valid 80G validity stamp.');
                              }}
                              className="btn-secondary btn-sm"
                              style={{ color: '#dc2626', borderColor: '#fca5a5', padding: '0.35rem 0.7rem' }}
                            >
                              <XCircle size={14} /> Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Document Preview Modal */}
        {selectedNgoForDocView && (
          <div className="modal-overlay" onClick={() => setSelectedNgoForDocView(null)}>
            <div className="modal-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#0f172a' }}>Document Inspection - {selectedNgoForDocView.name}</h3>
                <button onClick={() => setSelectedNgoForDocView(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                  <XCircle size={20} />
                </button>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div><span style={{ color: '#64748b' }}>Reg No:</span> <strong>{selectedNgoForDocView.regNumber}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Status:</span> <span className={`badge badge-${selectedNgoForDocView.verificationStatus.toLowerCase()}`}>{selectedNgoForDocView.verificationStatus}</span></div>
                  <div><span style={{ color: '#64748b' }}>Phone:</span> {selectedNgoForDocView.phone}</div>
                  <div><span style={{ color: '#64748b' }}>Email:</span> {selectedNgoForDocView.email}</div>
                </div>
                <div style={{ marginTop: '0.4rem' }}><span style={{ color: '#64748b' }}>Address:</span> {selectedNgoForDocView.address}</div>
              </div>

              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: '#059669' }}>Uploaded Certificates & IDs</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                {selectedNgoForDocView.submittedDocuments?.map((doc, idx) => (
                  <div key={idx} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.75rem 0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <FileText size={20} color="#059669" />
                      <div>
                        <strong style={{ color: '#0f172a', fontSize: '0.875rem', display: 'block' }}>{doc.name}</strong>
                        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Size: {doc.size} • Date: {doc.date}</span>
                      </div>
                    </div>

                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); alert(`Document Preview: ${doc.name}\n\n[JAIPUR ADMIN VERIFICATION CHECK]: Verified 80G Government Tax Exemption & Local NGO Registration Authority.`); }}
                      className="btn-secondary btn-sm"
                      style={{ fontSize: '0.75rem' }}
                    >
                      <ExternalLink size={13} /> Preview
                    </a>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setSelectedNgoForDocView(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Close Window
                </button>
                {selectedNgoForDocView.verificationStatus !== 'Verified' && (
                  <button
                    onClick={() => {
                      approveNgo(selectedNgoForDocView.id);
                      setSelectedNgoForDocView(null);
                    }}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <CheckCircle size={16} /> Approve NGO Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reject Reason Modal */}
        {rejectModalNgo && (
          <div className="modal-overlay" onClick={() => setRejectModalNgo(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.3rem', color: '#dc2626', marginBottom: '0.4rem' }}>Reject NGO Registration</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Specify reason for rejecting <strong style={{ color: '#0f172a' }}>{rejectModalNgo.name}</strong>.
              </p>

              <form onSubmit={handleConfirmReject}>
                <div className="form-group">
                  <label className="form-label">Rejection Reason *</label>
                  <textarea
                    className="form-textarea"
                    rows="3"
                    value={rejectionReasonInput}
                    onChange={e => setRejectionReasonInput(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button type="button" onClick={() => setRejectModalNgo(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-secondary" style={{ flex: 1, justifyContent: 'center', background: '#dc2626', color: '#fff', borderColor: '#dc2626' }}>
                    Confirm Rejection
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;

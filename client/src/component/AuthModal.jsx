import React, { useState, useEffect } from 'react';
import { useFoodShare } from '../context/FoodShareContext';

const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, authTargetRole, loginUser, registerUser } = useFoodShare();

  const [role, setRole] = useState(authTargetRole || 'restaurant');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('C-Scheme, Jaipur, Rajasthan');
  const [regNumber, setRegNumber] = useState('');
  const [license, setLicense] = useState('');
  const [docFile, setDocFile] = useState(null);

  useEffect(() => {
    if (authTargetRole) {
      setRole(authTargetRole);
    }
  }, [authTargetRole]);

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authMode === 'login') {
      loginUser(email || (role === 'restaurant' ? 'donations@rajputana.com' : role === 'ngo' ? 'contact@jaipurfoodrelief.org' : 'admin@jaipurfoodshare.org'), 'password', role);
      return;
    }

    registerUser({
      role,
      name: name || (role === 'restaurant' ? 'Jaipur Heritage Restaurant' : 'Pinkcity Hope Seva Trust'),
      email: email || 'contact@jaipurorg.org',
      phone: phone || '+91 98290 99887',
      address: address || 'Malviya Nagar, Jaipur, Rajasthan',
      regNumber: regNumber || 'NGO-JPR-2026',
      license: license || 'FSSAI-JPR-9988',
      docName: docFile ? docFile.name : 'Jaipur_NGO_80G_Certificate.pdf'
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.2rem', color: '#0f172a' }}>
              {authMode === 'login' ? `Login to ${role.toUpperCase()} Portal` : `Register ${role.toUpperCase()}`}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Simple access for restaurants, NGOs, and admins.</p>
          </div>
          <button onClick={() => setAuthModalOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.25rem' }}>✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', background: '#f1f5f9', padding: '0.3rem', borderRadius: '10px', marginBottom: '1rem' }}>
          <button type="button" onClick={() => setRole('restaurant')} style={{ background: role === 'restaurant' ? '#059669' : 'transparent', color: role === 'restaurant' ? '#fff' : '#475569', border: 'none', padding: '0.55rem 0.4rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' }}>Restaurant</button>
          <button type="button" onClick={() => setRole('ngo')} style={{ background: role === 'ngo' ? '#d97706' : 'transparent', color: role === 'ngo' ? '#fff' : '#475569', border: 'none', padding: '0.55rem 0.4rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' }}>NGO</button>
          <button type="button" onClick={() => setRole('admin')} style={{ background: role === 'admin' ? '#2563eb' : 'transparent', color: role === 'admin' ? '#fff' : '#475569', border: 'none', padding: '0.55rem 0.4rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' }}>Admin</button>
        </div>

        <form onSubmit={handleSubmit}>
          {authMode === 'register' && (
            <>
              <div className="form-group">
                <label className="form-label">{role === 'restaurant' ? 'Restaurant Name *' : role === 'ngo' ? 'Organization Name *' : 'Admin Name *'}</label>
                <input type="text" className="form-input" placeholder={role === 'restaurant' ? 'e.g. Royal Palace Bistro' : 'e.g. Relief NGO'} value={name} onChange={e => setName(e.target.value)} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input type="tel" className="form-input" placeholder="+91 98290 12345" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">{role === 'restaurant' ? 'FSSAI License *' : 'Registration Number *'}</label>
                  <input type="text" className="form-input" placeholder={role === 'restaurant' ? 'FSSAI-JPR-100200' : 'NGO-JPR-2026-XXXX'} value={role === 'restaurant' ? license : regNumber} onChange={e => role === 'restaurant' ? setLicense(e.target.value) : setRegNumber(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Address *</label>
                <input type="text" className="form-input" placeholder="e.g. C-Scheme, Jaipur" value={address} onChange={e => setAddress(e.target.value)} required />
              </div>

              {role === 'ngo' && (
                <div className="form-group" style={{ background: '#fef3c7', border: '1px dashed #fde68a', padding: '1rem', borderRadius: '12px' }}>
                  <label className="form-label" style={{ color: '#b45309' }}>Verification Document *</label>
                  <input type="file" id="ngo-doc-file-jaipur" style={{ display: 'none' }} accept=".pdf,.png,.jpg,.jpeg" onChange={e => setDocFile(e.target.files[0])} />
                  <label htmlFor="ngo-doc-file-jaipur" className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', cursor: 'pointer', background: '#ffffff' }}>{docFile ? `Selected: ${docFile.name}` : 'Upload Document'}</label>
                </div>
              )}
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input type="email" className="form-input" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <input type="password" className="form-input" placeholder="••••••••••••" required />
          </div>

          <button type="submit" className={role === 'ngo' ? 'btn-amber' : 'btn-primary'} style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem' }}>
            {authMode === 'login' ? `Login ${role.toUpperCase()}` : `Register ${role.toUpperCase()}`}
          </button>
        </form>

        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          {authMode === 'login' ? <span>New here? <button type="button" onClick={() => setAuthMode('register')} style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 700, cursor: 'pointer' }}>Register</button></span> : <span>Already registered? <button type="button" onClick={() => setAuthMode('login')} style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 700, cursor: 'pointer' }}>Back to login</button></span>}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

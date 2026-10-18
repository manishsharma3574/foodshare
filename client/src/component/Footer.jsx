import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#0f172a', color: '#cbd5e1', padding: '2rem 0', marginTop: '3rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>FoodShare</div>
          <div style={{ fontSize: '0.9rem' }}>Simple food sharing for restaurants and NGOs.</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#cbd5e1' }}>Home</Link>
          <Link to="/about" style={{ color: '#cbd5e1' }}>About</Link>
          <Link to="/analytics" style={{ color: '#cbd5e1' }}>Analytics</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

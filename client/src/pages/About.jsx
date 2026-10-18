import React from 'react';
import { HeartHandshake, ShieldCheck, Utensils, Globe, CheckCircle, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: '750px', margin: '0 auto 3.5rem auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: '#e6f4ea',
            color: '#047857',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            <MapPin size={15} /> Jaipur Surplus Food Network
          </div>

          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#0f172a' }}>
            About FoodShare Jaipur
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6 }}>
            FoodShare creates a direct digital bridge connecting Jaipur restaurants, hotels, and caterers with verified local NGOs. We help redirect fresh, untouched surplus food to community night shelters and orphanages.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid-cols-3" style={{ marginBottom: '4rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <Utensils size={32} color="#059669" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>For Jaipur Restaurants</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Donate extra banquet food, bakery bread, or surplus buffet meals directly to verified NGOs instead of throwing them away.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <HeartHandshake size={32} color="#d97706" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>For Jaipur NGOs</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Browse real-time available food listings nearby in Jaipur, reserve items with pickup ETAs, and distribute meals to those in need.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <ShieldCheck size={32} color="#2563eb" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>Admin Verification</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
              All registered NGOs upload government registration IDs and 80G tax clearance certificates for admin document inspection.
            </p>
          </div>

        </div>

        {/* FSSAI Hygiene Guidelines Banner */}
        <div className="glass-card" style={{ padding: '2rem', background: '#e6f4ea', borderColor: '#a7f3d0' }}>
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ maxWidth: '680px' }}>
              <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={22} color="#059669" /> Food Safety & Hygiene Guidelines
              </h3>
              <p style={{ color: '#475569', fontSize: '0.9rem' }}>
                Donated food must be packed in clean container boxes within strict thermal safety limits to ensure wholesome consumption.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;

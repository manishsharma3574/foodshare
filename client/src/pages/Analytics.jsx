import React from 'react';
import { useFoodShare } from '../context/FoodShareContext';
import { BarChart3, Trophy, HeartHandshake, Leaf, Award, MapPin } from 'lucide-react';

const Analytics = () => {
  const { analytics, donations } = useFoodShare();

  const topDonors = [
    { rank: '#1', name: 'The Rajputana Royal Hotel', location: 'C-Scheme, Jaipur', kg: 95, meals: 190 },
    { rank: '#2', name: 'Jaipur Sweets & Bakery', location: 'Johari Bazaar, Jaipur', kg: 48, meals: 96 },
    { rank: '#3', name: 'Saffron Curry House', location: 'MI Road, Jaipur', kg: 37, meals: 74 },
  ];

  return (
    <div style={{ padding: '3.5rem 0' }}>
      <div className="container">
        
        {/* Analytics Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
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
            <MapPin size={15} /> Live Food Rescue Impact • Jaipur Region
          </div>

          <h1 style={{ fontSize: '2.4rem', marginBottom: '0.75rem', color: '#0f172a' }}>
            Jaipur FoodShare Impact Analytics
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
            Real-time tracking of food saved from landfills, community meals distributed, and carbon emission reductions across Jaipur.
          </p>
        </div>

        {/* 4 Impact Stat Cards */}
        <div className="grid-cols-4" style={{ marginBottom: '3rem' }}>
          
          <div className="glass-card" style={{ padding: '1.75rem', background: '#ffffff' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>
              Total Surplus Rescued
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '0.4rem 0' }}>
              {analytics.totalFoodRescuedKg} kg
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Prevents organic food waste in Jaipur dump yards</p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', background: '#ffffff' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase' }}>
              Community Meals Served
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '0.4rem 0' }}>
              {analytics.totalMealsServed}+
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Nourishing Jaipur shelters & children</p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', background: '#ffffff' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
              CO2 Carbon Reduced
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '0.4rem 0' }}>
              {analytics.totalCo2OffsetKg} kg
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Methane & greenhouse gas offset</p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', background: '#ffffff' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>
              Verified Jaipur NGOs
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '0.4rem 0' }}>
              {analytics.verifiedNgoCount} Active
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Approved 80G distribution partners</p>
          </div>

        </div>

        {/* Leaderboard & Distribution Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Category Breakdown */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={20} color="#059669" /> Food Category Breakdown (Jaipur)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <div className="flex-between" style={{ fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>Cooked Buffet & Banquet Meals</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>62% (112 kg)</span>
                </div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '62%', height: '100%', background: '#059669' }}></div>
                </div>
              </div>

              <div>
                <div className="flex-between" style={{ fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>Bakery Breads & Savories</span>
                  <span style={{ color: '#d97706', fontWeight: 700 }}>22% (40 kg)</span>
                </div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '22%', height: '100%', background: '#d97706' }}></div>
                </div>
              </div>

              <div>
                <div className="flex-between" style={{ fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>Fresh Produce & Fruits</span>
                  <span style={{ color: '#2563eb', fontWeight: 700 }}>16% (28 kg)</span>
                </div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '16%', height: '100%', background: '#2563eb' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Donor Leaderboard */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={20} color="#d97706" /> Top Jaipur Donor Leaderboard
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {topDonors.map(donor => (
                <div key={donor.rank} style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      background: donor.rank === '#1' ? '#fef3c7' : '#f1f5f9',
                      color: donor.rank === '#1' ? '#b45309' : '#475569',
                      fontWeight: 800,
                      padding: '0.3rem 0.6rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem'
                    }}>
                      {donor.rank}
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.9rem', display: 'block' }}>{donor.name}</strong>
                      <span style={{ color: '#64748b', fontSize: '0.78rem' }}>{donor.location}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ color: '#059669', fontSize: '0.95rem', display: 'block' }}>{donor.kg} kg</strong>
                    <span style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: 600 }}>{donor.meals} Meals</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Analytics;
